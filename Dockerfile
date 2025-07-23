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

# Remove default nginx static assets
RUN rm -rf /usr/share/nginx/html/*

# Copy static export files
COPY --from=builder /app/out /usr/share/nginx/html

# Install curl and brotli module for better compression
RUN apk add --no-cache curl nginx-mod-http-brotli

# Create cache directories
RUN mkdir -p /var/cache/nginx && \
    chown -R nginx:nginx /var/cache/nginx

# Copy custom nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Enhanced compression and caching configuration
RUN echo 'load_module modules/ngx_http_brotli_filter_module.so;' > /etc/nginx/conf.d/brotli.conf && \
    echo 'load_module modules/ngx_http_brotli_static_module.so;' >> /etc/nginx/conf.d/brotli.conf && \
    echo '' >> /etc/nginx/conf.d/brotli.conf && \
    echo '# Gzip Configuration' >> /etc/nginx/conf.d/compression.conf && \
    echo 'gzip on;' >> /etc/nginx/conf.d/compression.conf && \
    echo 'gzip_vary on;' >> /etc/nginx/conf.d/compression.conf && \
    echo 'gzip_min_length 1024;' >> /etc/nginx/conf.d/compression.conf && \
    echo 'gzip_proxied any;' >> /etc/nginx/conf.d/compression.conf && \
    echo 'gzip_comp_level 6;' >> /etc/nginx/conf.d/compression.conf && \
    echo 'gzip_types text/plain text/css text/xml text/javascript application/javascript application/xml+rss application/json image/svg+xml;' >> /etc/nginx/conf.d/compression.conf && \
    echo '' >> /etc/nginx/conf.d/compression.conf && \
    echo '# Brotli Configuration' >> /etc/nginx/conf.d/compression.conf && \
    echo 'brotli on;' >> /etc/nginx/conf.d/compression.conf && \
    echo 'brotli_comp_level 6;' >> /etc/nginx/conf.d/compression.conf && \
    echo 'brotli_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript image/svg+xml;' >> /etc/nginx/conf.d/compression.conf

# Expose port
EXPOSE 80

# Start nginx only (no Node.js server needed)
CMD ["nginx", "-g", "daemon off;"]
