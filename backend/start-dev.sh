#!/usr/bin/env bash
# ========================================
# Spring Boot Development Startup Script
# ========================================
# Loads .env variables and runs the backend.
# Usage: ./start-dev.sh
# ========================================

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ENV_FILE="$SCRIPT_DIR/.env"

if [ ! -f "$ENV_FILE" ]; then
  echo "❌ .env file not found at $ENV_FILE"
  echo "   Copy backend/.env.example to backend/.env and fill in your secrets."
  exit 1
fi

# Export all variables from .env
set -a
. "$ENV_FILE"
set +a

echo "✅ Loaded environment from $ENV_FILE"
echo "🚀 Starting Spring Boot..."

cd "$SCRIPT_DIR"
exec mvn spring-boot:run "$@"
