#!/usr/bin/env bash
# ========================================
# Spring Boot Development Startup Script
# ========================================
# Loads .env and launches Spring Boot.
#
# Prerequisites:
#   docker compose up -d   (starts local PostgreSQL)
#
# Usage: ./start-dev.sh
# ========================================

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ENV_FILE="$SCRIPT_DIR/.env"

# --- Load .env ---
if [ ! -f "$ENV_FILE" ]; then
  echo "❌ .env file not found at $ENV_FILE"
  echo "   Copy backend/.env.example to backend/.env and fill in your secrets."
  exit 1
fi

set -a
. "$ENV_FILE"
set +a
echo "✅ Loaded environment from $ENV_FILE"

# --- Start Spring Boot ---
echo "🚀 Starting Spring Boot..."
cd "$SCRIPT_DIR"
mvn spring-boot:run "$@"




