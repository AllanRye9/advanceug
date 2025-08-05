if [! git status --porcelain | grep -q '^\s*M' ]; then
  echo "No modified files found. Exiting."
  exit 0
fi
  echo "There are modified files. Proceeding with the changes.";
  git add .; git commit -m "Recent edits to files" || { echo "Commit failed"; exit 1; };
  git push || { echo "Push failed"; exit 1; };
  echo "Changes have been committed and pushed successfully.";