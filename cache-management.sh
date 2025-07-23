#!/bin/bash

# Cache Management Script for Portfolio Website
# This script provides utilities for managing nginx cache

CONTAINER_NAME="portfolio-app"
CACHE_PATH="/var/cache/nginx"

echo "Portfolio Website Cache Management"
echo "================================="

# Function to check if container is running
check_container() {
    if ! docker ps | grep -q "$CONTAINER_NAME"; then
        echo "Error: Container '$CONTAINER_NAME' is not running"
        exit 1
    fi
}

# Function to clear all cache
clear_cache() {
    echo "Clearing nginx cache..."
    check_container
    docker exec "$CONTAINER_NAME" sh -c "rm -rf $CACHE_PATH/*"
    echo "Cache cleared successfully!"
}

# Function to show cache statistics
show_cache_stats() {
    echo "Cache Statistics:"
    echo "=================="
    check_container
    docker exec "$CONTAINER_NAME" sh -c "
        if [ -d '$CACHE_PATH' ]; then
            echo 'Cache directory size:'
            du -sh $CACHE_PATH 2>/dev/null || echo 'Cache directory empty or not accessible'
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
    echo "Restarting nginx..."
    check_container
    docker exec "$CONTAINER_NAME" nginx -s reload
    echo "Nginx reloaded successfully!"
}

# Function to test nginx configuration
test_config() {
    echo "Testing nginx configuration..."
    check_container
    docker exec "$CONTAINER_NAME" nginx -t
}

# Main menu
case "$1" in
    "clear")
        clear_cache
        ;;
    "stats")
        show_cache_stats
        ;;
    "restart")
        restart_nginx
        ;;
    "test")
        test_config
        ;;
    "help"|*)
        echo "Usage: $0 {clear|stats|restart|test|help}"
        echo
        echo "Commands:"
        echo "  clear   - Clear all nginx cache"
        echo "  stats   - Show cache statistics"
        echo "  restart - Reload nginx configuration"
        echo "  test    - Test nginx configuration"
        echo "  help    - Show this help message"
        ;;
esac
