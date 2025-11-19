#!/bin/bash
# Deployment script for VPS deployment
# Usage: ./deploy.sh

set -e  # Exit on error

echo "🚀 Starting deployment..."

# Navigate to project root (assuming script is in modern/)
cd "$(dirname "$0")"

# Pull latest changes
echo "📥 Pulling latest changes..."
git pull origin main || git pull origin master

# Install dependencies
echo "📦 Installing dependencies..."
npm ci

# Build the project
echo "🔨 Building project..."
npm run build

# Copy dist to web root (adjust path as needed)
# Option 1: If nginx serves from /var/www/conceal.network
DEPLOY_PATH="/var/www/conceal.network"

# Option 2: If using a different path, change it here
# DEPLOY_PATH="/path/to/your/webroot"

echo "📤 Deploying to $DEPLOY_PATH..."

# Backup current deployment (optional)
if [ -d "$DEPLOY_PATH" ]; then
    echo "💾 Creating backup..."
    sudo cp -r "$DEPLOY_PATH" "${DEPLOY_PATH}.backup.$(date +%Y%m%d_%H%M%S)" || true
fi

# Deploy new build
sudo mkdir -p "$DEPLOY_PATH"
sudo rm -rf "${DEPLOY_PATH:?}"/*
sudo cp -r dist/* "$DEPLOY_PATH/"

# Set proper permissions
sudo chown -R www-data:www-data "$DEPLOY_PATH" || sudo chown -R nginx:nginx "$DEPLOY_PATH"

# Reload nginx (adjust as needed for your setup)
echo "🔄 Reloading nginx..."
sudo nginx -t && sudo systemctl reload nginx || sudo service nginx reload

echo "✅ Deployment complete!"
echo "🌐 Site should be live at: https://conceal.network"

