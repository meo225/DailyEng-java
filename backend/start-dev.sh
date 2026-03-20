#!/usr/bin/env bash
# ========================================
# Spring Boot Development Startup Script
# ========================================
# Starts Cloud SQL Auth Proxy (background), waits for it,
# then launches Spring Boot. Cleans up proxy on exit.
#
# Usage: ./start-dev.sh
# ========================================

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
ENV_FILE="$SCRIPT_DIR/.env"
PROXY_BIN="$PROJECT_DIR/cloud-sql-proxy"

# Cloud SQL instance connection name
INSTANCE_CONNECTION="project-49d09dff-d769-4c78-a56:asia-southeast1:dailyeng-db"
LOCAL_PORT="${CLOUD_SQL_PORT:-5434}"

PROXY_PID=""

cleanup() {
  if [ -n "$PROXY_PID" ] && kill -0 "$PROXY_PID" 2>/dev/null; then
    echo ""
    echo "🛑 Shutting down Cloud SQL Proxy (PID $PROXY_PID)..."
    kill "$PROXY_PID" 2>/dev/null
    wait "$PROXY_PID" 2>/dev/null
  fi
}
trap cleanup EXIT INT TERM

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

# --- Start Cloud SQL Auth Proxy ---
if [ ! -f "$PROXY_BIN" ]; then
  echo "❌ cloud-sql-proxy not found at $PROXY_BIN"
  echo "   Download it from: https://cloud.google.com/sql/docs/postgres/connect-auth-proxy"
  exit 1
fi

echo "🔗 Starting Cloud SQL Auth Proxy on localhost:$LOCAL_PORT..."
"$PROXY_BIN" "$INSTANCE_CONNECTION" --port "$LOCAL_PORT" &
PROXY_PID=$!

# Wait for the proxy to be ready (up to 15 seconds)
echo "⏳ Waiting for proxy to be ready..."
for i in $(seq 1 30); do
  if nc -z localhost "$LOCAL_PORT" 2>/dev/null; then
    echo "✅ Cloud SQL Proxy is ready (localhost:$LOCAL_PORT)"
    break
  fi
  if ! kill -0 "$PROXY_PID" 2>/dev/null; then
    echo "❌ Cloud SQL Proxy exited unexpectedly"
    exit 1
  fi
  sleep 0.5
done

if ! nc -z localhost "$LOCAL_PORT" 2>/dev/null; then
  echo "❌ Timed out waiting for Cloud SQL Proxy"
  exit 1
fi

# --- Start Spring Boot ---
echo "🚀 Starting Spring Boot..."
cd "$SCRIPT_DIR"
mvn spring-boot:run "$@"
