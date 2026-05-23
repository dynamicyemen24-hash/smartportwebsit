Write-Host "Checking for pnpm..."
try {
  pnpm --version | Out-Null
  Write-Host "pnpm is installed"
} catch {
  Write-Host "pnpm not found. Attempting to enable via corepack..."
  try {
    corepack enable
    corepack prepare pnpm@latest --activate
  } catch {
    Write-Error "Failed to enable pnpm. Please install pnpm manually: https://pnpm.io/installation"
    exit 1
  }
}

Write-Host "Installing dependencies..."
pnpm install
Write-Host "Setup complete. Run 'pnpm dev' or use VS Code Debug (F5)."
