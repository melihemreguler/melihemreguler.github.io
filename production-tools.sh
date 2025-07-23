#!/bin/bash

# Portfolio Cache & Performance Management Script
# Usage: curl -s https://raw.githubusercontent.com/melihemreguler/melihemreguler.github.io/main/production-tools.sh | bash -s [command]
# Or download and run locally: ./production-tools.sh [command]

CONTAINER_NAME="portfolio-app"
CACHE_PATH="/var/cache/nginx"

echo "🚀 Portfolio Production Tools"
echo "============================="

# Function to check if container is running
check_container() {
    if ! docker ps | grep -q "$CONTAINER_NAME"; then
        echo "❌ Error: Container '$CONTAINER_NAME' is not running"
        exit 1
    fi
}

# Function to clear nginx cache
clear_cache() {
    echo "🧹 Clearing nginx cache..."
    check_container
    docker exec "$CONTAINER_NAME" sh -c "rm -rf $CACHE_PATH/* 2>/dev/null || true"
    docker exec "$CONTAINER_NAME" nginx -s reload
    echo "✅ Cache cleared and nginx reloaded!"
}

# Function to show cache statistics
show_cache_stats() {
    echo "📊 Cache Statistics:"
    echo "==================="
    check_container
    docker exec "$CONTAINER_NAME" sh -c "
        if [ -d '$CACHE_PATH' ]; then
            echo 'Cache directory size:'
            du -sh $CACHE_PATH 2>/dev/null || echo 'Cache directory empty'
            echo
            echo 'Cache file count:'
            find $CACHE_PATH -type f 2>/dev/null | wc -l || echo '0'
        else
            echo 'Cache directory does not exist'
        fi
    "
}

# Function to restart nginx
restart_nginx() {
    echo "♻️  Restarting nginx..."
    check_container
    docker exec "$CONTAINER_NAME" nginx -s reload
    echo "✅ Nginx reloaded successfully!"
}

# Function to test nginx configuration
test_nginx_config() {
    echo "🔍 Testing nginx configuration..."
    check_container
    docker exec "$CONTAINER_NAME" nginx -t
}

# Function to check performance metrics
check_performance() {
    echo "⚡ Performance Check:"
    echo "===================="
    
    echo "🌐 Testing compression:"
    curl -H "Accept-Encoding: gzip, br" -s -I http://localhost 2>/dev/null | grep -i "content-encoding" && echo "✅ Compression enabled" || echo "❌ No compression detected"
    
    echo
    echo "🗄️  Testing cache headers:"
    echo "Main page:"
    curl -s -I http://localhost 2>/dev/null | grep -i "cache-control" && echo "✅ Cache headers OK" || echo "❌ No cache headers"
    echo "Static assets:"
    curl -s -I http://localhost/favicon.png 2>/dev/null | grep -i "cache-control" && echo "✅ Static cache headers OK" || echo "❌ Static cache headers missing"
    
    echo
    echo "📊 Response times:"
    echo "Main page: $(curl -w '%{time_total}s' -s -o /dev/null http://localhost 2>/dev/null || echo 'Failed')"
    echo "Favicon: $(curl -w '%{time_total}s' -s -o /dev/null http://localhost/favicon.png 2>/dev/null || echo 'Failed')"
}

# Function to analyze bundle sizes
analyze_bundles() {
    echo "📦 Bundle Analysis:"
    echo "=================="
    check_container
    
    docker exec "$CONTAINER_NAME" sh -c "
        cd /usr/share/nginx/html
        echo 'HTML files:'
        find . -name '*.html' -exec ls -lh {} \; | awk '{print \"  \" \$5, \$9}' | head -5
        echo
        echo 'CSS files:'
        find . -name '*.css' -exec ls -lh {} \; | awk '{print \"  \" \$5, \$9}' | head -5
        echo
        echo 'JS files (largest 5):'
        find . -name '*.js' -exec ls -lh {} \; | sort -hr | head -5 | awk '{print \"  \" \$5, \$9}'
        echo
        echo 'Images (largest 5):'
        find . -type f \( -name '*.jpg' -o -name '*.png' -o -name '*.webp' \) -exec ls -lh {} \; | sort -hr | head -5 | awk '{print \"  \" \$5, \$9}'
    " 2>/dev/null || echo "❌ Bundle analysis failed"
}

# Function to generate full report
generate_full_report() {
    echo "📋 Full Performance Report"
    echo "=========================="
    echo "Generated at: $(date)"
    echo
    show_cache_stats
    echo
    check_performance
    echo
    analyze_bundles
    echo
    echo "🔧 Quick Fixes:"
    echo "- Clear cache: curl -s https://raw.githubusercontent.com/melihemreguler/melihemreguler.github.io/main/production-tools.sh | bash -s clear"
    echo "- Restart nginx: curl -s https://raw.githubusercontent.com/melihemreguler/melihemreguler.github.io/main/production-tools.sh | bash -s restart"
    echo "- Performance check: curl -s https://raw.githubusercontent.com/melihemreguler/melihemreguler.github.io/main/production-tools.sh | bash -s performance"
}

# Function to show container logs
show_logs() {
    echo "📄 Container Logs (last 50 lines):"
    echo "=================================="
    docker logs --tail=50 "$CONTAINER_NAME" 2>/dev/null || echo "❌ Could not retrieve logs"
}

# Function to show container stats
show_stats() {
    echo "📈 Container Statistics:"
    echo "======================="
    check_container
    docker stats --no-stream "$CONTAINER_NAME" 2>/dev/null || echo "❌ Could not retrieve stats"
}

# Main command handler
case "${1:-help}" in
    "clear"|"clear-cache")
        clear_cache
        ;;
    "stats"|"cache-stats")
        show_cache_stats
        ;;
    "restart"|"reload")
        restart_nginx
        ;;
    "test"|"test-config")
        test_nginx_config
        ;;
    "performance"|"perf")
        check_performance
        ;;
    "bundles"|"analyze")
        analyze_bundles
        ;;
    "report"|"full-report")
        generate_full_report
        ;;
    "logs")
        show_logs
        ;;
    "container-stats")
        show_stats
        ;;
    "help"|*)
        echo "📖 Usage: $0 [COMMAND]"
        echo
        echo "Available commands:"
        echo "  clear         - Clear nginx cache"
        echo "  stats         - Show cache statistics" 
        echo "  restart       - Reload nginx configuration"
        echo "  test          - Test nginx configuration"
        echo "  performance   - Check performance metrics"
        echo "  bundles       - Analyze bundle sizes"
        echo "  report        - Generate full performance report"
        echo "  logs          - Show container logs"
        echo "  container-stats - Show container resource usage"
        echo "  help          - Show this help message"
        echo
        echo "🌐 Remote usage:"
        echo "curl -s https://raw.githubusercontent.com/melihemreguler/melihemreguler.github.io/main/production-tools.sh | bash -s [COMMAND]"
        echo
        echo "📥 Download and use locally:"
        echo "curl -O https://raw.githubusercontent.com/melihemreguler/melihemreguler.github.io/main/production-tools.sh"
        echo "chmod +x production-tools.sh"
        echo "./production-tools.sh [COMMAND]"
        ;;
esac
