#!/usr/bin/env bash
# ========================================
# Cloud SQL Auth Proxy Startup Script
# ========================================
# Connects to Cloud SQL via IAM auth, exposing PostgreSQL on localhost:5433
# to avoid conflicts with local PostgreSQL on port 5432.
#
# Usage: ./start-proxy.sh
# ========================================

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROXY_BIN="$SCRIPT_DIR/cloud-sql-proxy"

# Cloud SQL instance connection name
INSTANCE_CONNECTION="project-49d09dff-d769-4c78-a56:asia-southeast1:dailyeng-db"

# Local port (use 5434 to avoid conflicts with local PostgreSQL on 5432)
LOCAL_PORT="${CLOUD_SQL_PORT:-5434}"

if [ ! -f "$PROXY_BIN" ]; then
  echo "❌ cloud-sql-proxy not found at $PROXY_BIN"
  echo "   Download it from: https://cloud.google.com/sql/docs/postgres/connect-auth-proxy"
  exit 1
fi

echo "🔗 Starting Cloud SQL Auth Proxy..."
echo "   Instance: $INSTANCE_CONNECTION"
echo "   Local port: localhost:$LOCAL_PORT"
echo ""
echo "   Connect with: postgresql://dailyeng_user:PASSWORD@localhost:$LOCAL_PORT/dailyeng"
echo ""

exec "$PROXY_BIN" "$INSTANCE_CONNECTION" --port "$LOCAL_PORT"
