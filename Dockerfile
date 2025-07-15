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

# Production stage with nginx
FROM nginx:alpine

# Remove default nginx static assets
RUN rm -rf /usr/share/nginx/html/*

# Copy built application
COPY --from=builder /app/.next/standalone /usr/share/nginx/html
COPY --from=builder /app/.next/static /usr/share/nginx/html/.next/static
COPY --from=builder /app/public /usr/share/nginx/html/public

# Copy warmup script from local (not from builder stage)
COPY warmup.sh /usr/local/bin/warmup.sh
RUN chmod +x /usr/local/bin/warmup.sh

# Install curl and nodejs for running the Next.js server
RUN apk add --no-cache curl nodejs npm

# Copy custom nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Add compression and caching
RUN echo 'gzip on; gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript image/svg+xml;' > /etc/nginx/conf.d/gzip.conf

# Expose port
EXPOSE 80

# Create startup script for Next.js + nginx
RUN echo '#!/bin/sh' > /usr/local/bin/start.sh && \
    echo 'cd /usr/share/nginx/html' >> /usr/local/bin/start.sh && \
    echo 'echo "Starting Next.js server..."' >> /usr/local/bin/start.sh && \
    echo 'PORT=3001 node server.js &' >> /usr/local/bin/start.sh && \
    echo 'echo "Starting nginx..."' >> /usr/local/bin/start.sh && \
    echo 'nginx -g "daemon off;" &' >> /usr/local/bin/start.sh && \
    echo 'echo "Starting warmup script..."' >> /usr/local/bin/start.sh && \
    echo '/usr/local/bin/warmup.sh &' >> /usr/local/bin/start.sh && \
    echo 'wait' >> /usr/local/bin/start.sh && \
    chmod +x /usr/local/bin/start.sh

# Start Next.js server, nginx and warmup together
CMD ["/usr/local/bin/start.sh"]
