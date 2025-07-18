#!/bin/bash

# Hugo Build Test Script
# This script builds the Hugo site and compares it with the manually optimized HTML

echo "🚀 Starting Hugo build test..."

# Clean previous builds
echo "🧹 Cleaning previous builds..."
rm -rf public/

# Build the Hugo site
echo "🔨 Building Hugo site..."
hugo --minify --gc

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "✅ Hugo build completed successfully!"
    
    # List generated files
    echo "📁 Generated files:"
    find public/ -name "*.html" | head -10
    
    echo ""
    echo "🎉 Build test completed!"
    echo "📍 Generated site is in: public/"
    echo "🌐 You can now compare with the manually optimized HTML files"
else
    echo "❌ Hugo build failed!"
    exit 1
fi
