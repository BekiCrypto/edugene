#!/bin/bash
# EduGene — Push to GitHub
#
# This script pushes the EduGene codebase to the GitHub repository.
# You need a GitHub Personal Access Token (PAT) with 'repo' scope.
#
# Get a token: https://github.com/settings/tokens/new?scopes=repo
#
# Usage:
#   ./push-to-github.sh YOUR_GITHUB_TOKEN
#
# Or set GITHUB_TOKEN env var first:
#   export GITHUB_TOKEN=your_token_here
#   ./push-to-github.sh

set -e

REPO_URL="https://github.com/BekiCrypto/edugene.git"
TOKEN="${1:-$GITHUB_TOKEN}"

if [ -z "$TOKEN" ]; then
  echo "❌ No GitHub token provided."
  echo ""
  echo "Usage:"
  echo "  ./push-to-github.sh YOUR_GITHUB_TOKEN"
  echo ""
  echo "Or create a token at:"
  echo "  https://github.com/settings/tokens/new?scopes=repo"
  echo ""
  echo "Then run:"
  echo "  export GITHUB_TOKEN=your_token"
  echo "  ./push-to-github.sh"
  exit 1
fi

echo "🚀 Pushing EduGene to GitHub..."
echo "Repository: $REPO_URL"
echo ""

# Set remote URL with token
git remote set-url origin "https://${TOKEN}@github.com/BekiCrypto/edugene.git"

# Push
git push -u origin main

# Reset remote URL to remove token (security)
git remote set-url origin "$REPO_URL"

echo ""
echo "✅ Push complete!"
echo "View your repo: https://github.com/BekiCrypto/edugene"
