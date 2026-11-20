import { NextRequest, NextResponse } from "next/server";
import { INITIAL_PROJECTS } from "../../../lib/dataStore";
import { Project } from "../../../types";

// In-memory server cache fallback
let serverProjects: Project[] = [...INITIAL_PROJECTS];

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const username = searchParams.get("username");

  if (username) {
    const userProjects = serverProjects.filter((p) => p.ownerUsername === username);
    return NextResponse.json({ success: true, projects: userProjects });
  }

  return NextResponse.json({ success: true, projects: serverProjects });
}

export async function POST(req: NextRequest) {
  try {
    const project: Project = await req.json();

    if (!project.title || !project.description) {
      return NextResponse.json(
        { success: false, error: "Project title and description are required." },
        { status: 400 }
      );
    }

    const newProject: Project = {
      ...project,
      id: project.id || `proj-${Date.now()}`,
      createdAt: project.createdAt || new Date().toISOString().split("T")[0],
      updatedAt: new Date().toISOString().split("T")[0],
      stars: project.stars || 0,
      status: project.status || "Active",
    };

    serverProjects = [newProject, ...serverProjects.filter((p) => p.id !== newProject.id)];

    return NextResponse.json({ success: true, project: newProject });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ success: false, error: "Project ID is required." }, { status: 400 });
  }

  serverProjects = serverProjects.filter((p) => p.id !== id);
  return NextResponse.json({ success: true, deletedId: id });
}
