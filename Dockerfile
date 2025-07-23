# Multi-stage build for optimal performance
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build arguments for environment variables
ARG NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
ARG NEXT_PUBLIC_EMAILJS_SERVICE_ID
ARG NEXT_PUBLIC_EMAILJS_TEMPLATE_ID

# Set environment variables for build
ENV NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=$NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
ENV NEXT_PUBLIC_EMAILJS_SERVICE_ID=$NEXT_PUBLIC_EMAILJS_SERVICE_ID
ENV NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=$NEXT_PUBLIC_EMAILJS_TEMPLATE_ID

# Build the application
RUN npm run build

# Production stage with nginx only
FROM nginx:alpine

# Install brotli module for better compression
RUN apk add --no-cache nginx-mod-http-brotli

# Remove default nginx static assets
RUN rm -rf /usr/share/nginx/html/*

# Create cache directory and set permissions
RUN mkdir -p /var/cache/nginx && \
    chown -R nginx:nginx /var/cache/nginx && \
    chmod -R 755 /var/cache/nginx

# Copy static export files
COPY --from=builder /app/out /usr/share/nginx/html

# Install curl for health checks (no need for Node.js anymore)
RUN apk add --no-cache curl

# Copy custom nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Add compression and caching
RUN echo 'gzip on; gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript image/svg+xml;' > /etc/nginx/conf.d/gzip.conf

# Expose port
EXPOSE 80

# Start nginx only (no Node.js server needed)
CMD ["nginx", "-g", "daemon off;"]
