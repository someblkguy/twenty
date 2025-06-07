#!/usr/bin/env bash
# Usage: ./scripts/rename_crm.sh <old_name> <new_name>
# Example: ./scripts/rename_crm.sh Twenty "Sage Business CRM"

set -e
if [ "$#" -ne 2 ]; then
  echo "Usage: $0 <old_name> <new_name>" >&2
  exit 1
fi

OLD_NAME="$1"
NEW_NAME="$2"
# Use LC_ALL=C to avoid sed & grep locale issues
LC_ALL=C

# Find all tracked text files and replace occurrences
FILES=$(git ls-files | xargs file --mime-type | awk -F: '/text\//{print $1}')
for f in $FILES; do
  if grep -q "$OLD_NAME" "$f"; then
    sed -i "s/${OLD_NAME}/${NEW_NAME}/g" "$f"
  fi
done
