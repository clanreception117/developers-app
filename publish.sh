#!/usr/bin/env bash
# Usage: ./publish.sh GITHUB_USER REPO_NAME
# Requires: git, and either `gh auth login` done or your own credentials for git push.
set -euo pipefail
USER_="${1:?github user}"; REPO_="${2:?repo name}"
sed -i "s#USERNAME/REPOSITORY#${USER_}/${REPO_}#g" README.md Developers_App_Colab.ipynb
sed -i "s#USERNAME/REPOSITORY#${USER_}/${REPO_}#g" MIGRATION_REPORT.md || true
git init -q -b main 2>/dev/null || git init -q
git add -A && git commit -q -m "Developer's App: Colab package"
if command -v gh >/dev/null; then
  gh repo create "${USER_}/${REPO_}" --public --source=. --push
else
  git remote add origin "https://github.com/${USER_}/${REPO_}.git"   # create the empty public repo first
  git push -u origin main
fi
echo "Colab link: https://colab.research.google.com/github/${USER_}/${REPO_}/blob/main/Developers_App_Colab.ipynb"
