#!/usr/bin/env bash
# Setup development environment (Unix/macOS)
set -euo pipefail

echo "Checking for pnpm..."
if ! command -v pnpm >/dev/null 2>&1; then
  echo "pnpm not found. Trying to enable via corepack..."
  if command -v corepack >/dev/null 2>&1; then
    corepack enable
    corepack prepare pnpm@latest --activate
  else
    echo "Please install pnpm manually: https://pnpm.io/installation"
    exit 1
  fi
fi

echo "Installing dependencies..."
pnpm install

echo "Setup complete. You can run 'pnpm dev' or use VS Code Run->Start Debugging."
