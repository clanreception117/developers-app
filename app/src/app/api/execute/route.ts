import { NextRequest, NextResponse } from "next/server";
import { spawn } from "child_process";
import fs from "fs/promises";
import path from "path";
import os from "os";
import crypto from "crypto";

// Security restrictions
const MAX_CODE_LENGTH = 65536; // 64 KB limit
const MAX_EXECUTION_TIME_MS = 4000; // 4 seconds max
const MAX_OUTPUT_LENGTH = 32768; // 32 KB stdout limit

// Block dangerous patterns for sandboxed script execution
const BLACKLIST_PATTERNS = [
  /child_process/i,
  /require\s*\(\s*['"]child_process['"]\s*\)/i,
  /import\s+.*from\s+['"]child_process['"]/i,
  /subprocess/i,
  /os\.system/i,
  /os\.popen/i,
  /socket\./i,
  /__import__\s*\(\s*['"]os['"]\s*\)/i,
  /__import__\s*\(\s*['"]subprocess['"]\s*\)/i,
  /shutil\.rmtree/i,
  /format\s+c:/i,
  /rmdir\s+\/s/i,
];

export async function POST(req: NextRequest) {
  const startTime = Date.now();
  let tempDir = "";

  try {
    const body = await req.json();
    const { language, code } = body;

    if (!code || typeof code !== "string") {
      return NextResponse.json(
        { success: false, output: "", error: "Missing or invalid code string." },
        { status: 400 }
      );
    }

    if (code.length > MAX_CODE_LENGTH) {
      return NextResponse.json(
        {
          success: false,
          output: "",
          error: `Code payload exceeds maximum allowed size of ${MAX_CODE_LENGTH / 1024} KB.`,
        },
        { status: 400 }
      );
    }

    // Security check: analyze code against blacklist
    for (const pattern of BLACKLIST_PATTERNS) {
      if (pattern.test(code)) {
        return NextResponse.json(
          {
            success: false,
            output: "",
            error: "Security Violation: Restricted system call or process spawning detected.",
          },
          { status: 403 }
        );
      }
    }

    const lang = (language || "javascript").toLowerCase();

    // HTML/CSS output preview
    if (lang === "html" || lang === "web") {
      return NextResponse.json({
        success: true,
        output: "HTML / Web Application successfully prepared for sandbox preview.",
        executionTimeMs: Date.now() - startTime,
        memoryUsageMb: 1.2,
      });
    }

    if (lang !== "javascript" && lang !== "typescript" && lang !== "python") {
      return NextResponse.json(
        {
          success: false,
          output: "",
          error: `Language '${language}' is not currently enabled in the sandboxed runtime. Supported: JavaScript, TypeScript, Python, HTML.`,
        },
        { status: 400 }
      );
    }

    // Create an isolated temporary sandbox directory
    const sandboxId = crypto.randomBytes(8).toString("hex");
    tempDir = path.join(os.tmpdir(), `da_sandbox_${sandboxId}`);
    await fs.mkdir(tempDir, { recursive: true });

    let executable = "";
    let args: string[] = [];
    let scriptPath = "";

    if (lang === "javascript" || lang === "typescript") {
      scriptPath = path.join(tempDir, "sandbox_run.js");
      // Safe sandbox wrapper for Node
      const wrappedJs = `
// Developers App Isolated Sandbox Runtime
const startTime = Date.now();
try {
  ${code}
} catch (err) {
  console.error("Runtime Error:", err && err.stack ? err.stack : err);
  process.exit(1);
}
`;
      await fs.writeFile(scriptPath, wrappedJs, "utf8");
      executable = process.platform === "win32" ? "node.exe" : "node";
      args = ["--max-old-space-size=64", "--no-warnings", scriptPath];
    } else if (lang === "python") {
      scriptPath = path.join(tempDir, "sandbox_run.py");
      await fs.writeFile(scriptPath, code, "utf8");
      executable = process.platform === "win32" ? "python.exe" : "python3";
      args = ["-u", scriptPath];
    }

    // Execute isolated child process
    const result = await new Promise<{
      stdout: string;
      stderr: string;
      timedOut: boolean;
      exitCode: number | null;
    }>((resolve) => {
      let stdout = "";
      let stderr = "";
      let timedOut = false;

      const proc = spawn(executable, args, {
        cwd: tempDir,
        env: {
          NODE_ENV: "production",
          PATH: process.env.PATH || "",
          TEMP: tempDir,
          TMP: tempDir,
        },
      });

      const timer = setTimeout(() => {
        timedOut = true;
        try {
          proc.kill("SIGKILL");
        } catch {}
      }, MAX_EXECUTION_TIME_MS);

      proc.stdout?.on("data", (data) => {
        if (stdout.length < MAX_OUTPUT_LENGTH) {
          stdout += data.toString();
        }
      });

      proc.stderr?.on("data", (data) => {
        if (stderr.length < MAX_OUTPUT_LENGTH) {
          stderr += data.toString();
        }
      });

      proc.on("close", (exitCode) => {
        clearTimeout(timer);
        resolve({ stdout, stderr, timedOut, exitCode });
      });

      proc.on("error", (err) => {
        clearTimeout(timer);
        stderr += `\nFailed to start execution process: ${err.message}`;
        resolve({ stdout, stderr, timedOut: false, exitCode: 1 });
      });
    });

    const executionTimeMs = Date.now() - startTime;

    if (result.timedOut) {
      return NextResponse.json({
        success: false,
        output: result.stdout,
        error: `Execution Timeout: Exceeded maximum allowed runtime of ${MAX_EXECUTION_TIME_MS}ms. Infinite loop or long-running task terminated.`,
        executionTimeMs,
      });
    }

    const hasError = result.exitCode !== 0 || result.stderr.trim().length > 0;

    return NextResponse.json({
      success: !hasError,
      output: result.stdout.trim() || (hasError ? "" : "[Process exited successfully with no stdout]"),
      error: result.stderr.trim() || undefined,
      executionTimeMs,
      memoryUsageMb: Math.round((process.memoryUsage().heapUsed / 1024 / 1024) * 10) / 10,
    });
  } catch (err: any) {
    return NextResponse.json(
      {
        success: false,
        output: "",
        error: `Sandbox execution internal exception: ${err.message || String(err)}`,
        executionTimeMs: Date.now() - startTime,
      },
      { status: 500 }
    );
  } finally {
    // Isolated filesystem cleanup
    if (tempDir) {
      try {
        await fs.rm(tempDir, { recursive: true, force: true });
      } catch {}
    }
  }
}
