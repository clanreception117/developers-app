# Developer's App — Google Colab

[![Open In Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/github/USERNAME/REPOSITORY/blob/main/Developers_App_Colab.ipynb)

Runs the original Next.js 14 project on Google Colab with a public Cloudflare quick-tunnel URL.

## One-click run
1. Click **Open in Colab** above.
2. `Runtime → Run all`.
3. The public URL appears in section 9 (~3–5 min on a fresh runtime).

## Layout
| Path | Purpose |
|---|---|
| `app/` | Original project, byte-identical (excluding regenerable `node_modules/` and `.next/`) |
| `Developers_App_Colab.ipynb` | Notebook: Node setup, integrity check, `npm ci`, build, start, health checks, tunnel |
| `SHA256SUMS.txt` | Checksums of all 655 original files, verified by the notebook before it runs |
| `MIGRATION_REPORT.md` | What was preserved, tested, and what could not be verified |
| `publish.sh` | Pushes this package to your GitHub and fills in the Colab links |

## Notes
- No environment variables or API keys are required.
- The tunnel URL is public to anyone who has it while the notebook is running.
- The app's "Dev-Only Evaluation Mode" shows only on `localhost` by design (see report).
