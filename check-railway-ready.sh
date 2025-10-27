#!/bin/bash

# Railway Readiness Checker
# This script verifies that your project is ready for Railway deployment

echo "🔍 Checking Railway Deployment Readiness..."
echo "=============================================="
echo ""

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

READY=true

# Check if node is installed
if command -v node &> /dev/null; then
    NODE_VERSION=$(node --version)
    echo -e "${GREEN}✓${NC} Node.js installed: $NODE_VERSION"
else
    echo -e "${RED}✗${NC} Node.js is not installed"
    READY=false
fi

# Check if npm is installed
if command -v npm &> /dev/null; then
    NPM_VERSION=$(npm --version)
    echo -e "${GREEN}✓${NC} npm installed: $NPM_VERSION"
else
    echo -e "${RED}✗${NC} npm is not installed"
    READY=false
fi

# Check if git is installed
if command -v git &> /dev/null; then
    GIT_VERSION=$(git --version)
    echo -e "${GREEN}✓${NC} Git installed: $GIT_VERSION"
else
    echo -e "${RED}✗${NC} Git is not installed"
    READY=false
fi

# Check if Railway CLI is accessible
if npx @railway/cli --version &> /dev/null; then
    echo -e "${GREEN}✓${NC} Railway CLI accessible"
else
    echo -e "${YELLOW}!${NC} Railway CLI will be downloaded on first use"
fi

echo ""
echo "Checking repository status..."

# Check if we're in a git repository
if git rev-parse --git-dir > /dev/null 2>&1; then
    echo -e "${GREEN}✓${NC} Git repository initialized"
    
    # Check if there are uncommitted changes
    if [[ -z $(git status -s) ]]; then
        echo -e "${GREEN}✓${NC} No uncommitted changes"
    else
        echo -e "${YELLOW}!${NC} You have uncommitted changes"
    fi
    
    # Check if remote is set
    if git remote get-url origin > /dev/null 2>&1; then
        REMOTE=$(git remote get-url origin)
        echo -e "${GREEN}✓${NC} Remote repository: $REMOTE"
    else
        echo -e "${RED}✗${NC} No remote repository configured"
        READY=false
    fi
else
    echo -e "${RED}✗${NC} Not a git repository"
    READY=false
fi

echo ""
echo "Checking project structure..."

# Check backend files
if [ -f "medical-backend/package.json" ]; then
    echo -e "${GREEN}✓${NC} Backend package.json exists"
else
    echo -e "${RED}✗${NC} Backend package.json not found"
    READY=false
fi

if [ -f "medical-backend/server.js" ]; then
    echo -e "${GREEN}✓${NC} Backend server.js exists"
else
    echo -e "${RED}✗${NC} Backend server.js not found"
    READY=false
fi

# Check frontend files
if [ -f "medical-frontend/package.json" ]; then
    echo -e "${GREEN}✓${NC} Frontend package.json exists"
else
    echo -e "${RED}✗${NC} Frontend package.json not found"
    READY=false
fi

# Check Railway config files
if [ -f "medical-backend/railway.json" ]; then
    echo -e "${GREEN}✓${NC} Backend Railway config exists"
else
    echo -e "${YELLOW}!${NC} Backend Railway config not found (optional)"
fi

if [ -f "medical-frontend/railway.json" ]; then
    echo -e "${GREEN}✓${NC} Frontend Railway config exists"
else
    echo -e "${YELLOW}!${NC} Frontend Railway config not found (optional)"
fi

echo ""
echo "=============================================="

if [ "$READY" = true ]; then
    echo -e "${GREEN}✓ Your project is ready for Railway deployment!${NC}"
    echo ""
    echo "Next steps:"
    echo "1. Run: npx @railway/cli login"
    echo "2. Then run: ./deploy-railway.sh"
    echo ""
    echo "Or see DEPLOY.md for detailed instructions"
else
    echo -e "${RED}✗ Please fix the issues above before deploying${NC}"
fi

echo ""

