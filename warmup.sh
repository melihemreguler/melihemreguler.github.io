#!/bin/bash
# Portfolio warmup script to prevent cold starts

echo "Starting portfolio warmup..."

# Wait for nginx to fully start
sleep 15

# Continuously warm up the application
while true; do
    # Basic health check - keep the main page warm
    curl -s http://localhost/ > /dev/null 2>&1
    
    # Try to warm up common assets (these will be cached by nginx)
    curl -s http://localhost/assets/ > /dev/null 2>&1
    curl -s http://localhost/profile-photo.webp > /dev/null 2>&1
    
    echo "$(date): Warmup cycle completed"
    
    # Sleep for 25 seconds (shorter than your health check interval)
    sleep 25
done
