#!/bin/bash

echo "🚀 Setting up RobinReach N8N Node for development..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if N8N is installed
if ! command -v n8n &> /dev/null; then
    echo "❌ N8N is not installed. Please install N8N first."
    echo "Run: npm install -g n8n"
    exit 1
fi

echo "✅ Node.js and N8N are installed"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build the project
echo "🔨 Building the project..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed. Please check the errors above."
    exit 1
fi

echo "✅ Build successful"

# Link the package for development
echo "🔗 Linking package for local development..."
npm link

# Create N8N custom directory if it doesn't exist
N8N_CUSTOM_DIR="$HOME/.n8n/custom"
mkdir -p "$N8N_CUSTOM_DIR"

# Link in N8N custom directory
cd "$N8N_CUSTOM_DIR"
npm link n8n-nodes-robinreach

if [ $? -eq 0 ]; then
    echo "✅ Package linked successfully in N8N"
else
    echo "❌ Failed to link package in N8N"
    exit 1
fi

# Go back to project directory
cd - > /dev/null

echo ""
echo "🎉 Setup complete! You can now:"
echo "   1. Start N8N: n8n start"
echo "   2. Open http://localhost:5678 in your browser"
echo "   3. Look for 'RobinReach' in the node list"
echo ""
echo "💡 For development:"
echo "   - Make changes to TypeScript files"
echo "   - Run 'npm run build' to rebuild"
echo "   - Restart N8N to see changes"
echo ""
echo "🔧 Useful commands:"
echo "   npm run dev     - Watch mode for TypeScript compilation"
echo "   npm run lint    - Check code style"
echo "   npm run format  - Format code"
echo ""
