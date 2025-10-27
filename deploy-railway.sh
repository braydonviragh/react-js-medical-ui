#!/bin/bash

# Railway Deployment Script for Medical UI Full-Stack App
# This script deploys the full monorepo as a single service

set -e

echo "🚂 Medical UI - Full-Stack Railway Deployment"
echo "=============================================="
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if Railway CLI is available
if ! command -v npx &> /dev/null; then
    echo "❌ npx is not installed. Please install Node.js first."
    exit 1
fi

echo -e "${BLUE}Step 1: Committing changes...${NC}"
git add .
git commit -m "Update Railway configuration for full-stack deployment" || echo "No changes to commit"
git push origin master

echo ""
echo -e "${BLUE}Step 2: Initializing Railway project...${NC}"
npx @railway/cli init

echo ""
echo -e "${BLUE}Step 3: Deploying full-stack application...${NC}"
npx @railway/cli up

echo ""
echo -e "${BLUE}Step 4: Generating public domain...${NC}"
npx @railway/cli domain

echo ""
APP_URL=$(npx @railway/cli domain)

echo ""
echo -e "${GREEN}=============================================${NC}"
echo -e "${GREEN}✅ Deployment Complete!${NC}"
echo -e "${GREEN}=============================================${NC}"
echo ""
echo -e "🌐 Your app is live at: ${BLUE}https://$APP_URL${NC}"
echo ""
echo -e "${YELLOW}What's deployed:${NC}"
echo "  ✓ React frontend (served at /)"
echo "  ✓ Express backend API (at /api)"
echo "  ✓ Health check endpoint (at /health)"
echo ""
echo -e "${YELLOW}Next steps:${NC}"
echo "1. Visit your app: https://$APP_URL"
echo "2. Check health: https://$APP_URL/health"
echo "3. View logs: npx @railway/cli logs"
echo "4. Railway dashboard: https://railway.app/dashboard"
echo ""

