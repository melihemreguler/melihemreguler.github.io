# Melih Emre Güler - Portfolio Website

A modern, responsive portfolio website built with Next.js, React, and TypeScript. Features dynamic image galleries, multilingual support, and an integrated contact form with EmailJS.

## Table of Contents

- [Features](#features)
- [Live Website](#live-website)
- [Deployment Architecture](#deployment-architecture)
- [Setup Instructions](#setup-instructions)
  - [1. Clone and Install](#1-clone-and-install)
  - [2. Environment Configuration](#2-environment-configuration)
  - [3. EmailJS Setup](#3-emailjs-setup)
  - [4. Development](#4-development)
  - [5. Production Build](#5-production-build)
- [Docker Deployment](#docker-deployment)
- [Project Structure](#project-structure)
- [Technologies Used](#technologies-used)
- [Contact Form Features](#contact-form-features)
- [Image Optimization](#image-optimization)
- [API Routes](#api-routes)
- [Security Notes](#security-notes)

## Features

- **Dynamic Image Gallery**: Random background image rotation from organized asset folders
- **API Integration**: Next.js API routes for image management and metadata
- **Multilingual Support**: English and Turkish translations with dynamic content
- **Contact Form**: EmailJS integration with user metadata collection
- **Responsive Design**: Modern UI with custom CSS modules
- **Image Optimization**: Automated image compression and resizing
- **Fast Performance**: Built with Next.js for optimal loading speeds and SEO

## Live Website

**Current Deployment**: [https://melihemre.dev](https://melihemre.dev)

**Infrastructure**: AWS EC2 with Docker containerization and nginx reverse proxy

## Deployment Architecture

This portfolio website is deployed on **AWS EC2** using a modern containerized infrastructure:

- **Container**: Docker with nginx for static file serving
- **Reverse Proxy**: jwilder/nginx-proxy for automatic domain routing
- **SSL**: Automatic Let's Encrypt certificate management
- **CI/CD**: GitHub Actions for automated deployment
- **Domain**: Custom domain with Cloudflare DNS management

**Note**: Previously deployed on GitHub Pages but migrated to AWS EC2 due to performance issues. GitHub Pages had significant loading delays (up to 60 seconds) and was too slow for optimal user experience. The current AWS infrastructure provides faster loading times and better reliability.

## Setup Instructions

### 1. Clone and Install

```bash
git clone https://github.com/melihemreguler/melihemreguler.github.io.git
cd melihemreguler.github.io
npm install
```

### 2. Environment Configuration

Create a `.env.local` file in the root directory:

```bash
# Copy the example file
cp .env.example .env.local
```

Fill in your EmailJS credentials in the `.env.local` file:

```env
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id_here
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id_here
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key_here
```

### 3. EmailJS Setup

1. Create an account at [EmailJS.com](https://www.emailjs.com/)
2. Add your email service (Gmail, Outlook, etc.)
3. Create an email template
4. Get your Service ID, Template ID, and Public Key
5. Update the `.env` file with these values

### 4. Development

```bash
npm run dev
```

The development server will start on `http://localhost:3000` (or next available port).

### 5. Production Build

```bash
npm run build
npm run start
```

## Docker Deployment

The website is containerized using Docker with a multi-stage build process optimized for Next.js:

### Local Docker Build

```bash
# Build the Docker image with build arguments
docker build \
  --build-arg NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id \
  --build-arg NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id \
  --build-arg NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key \
  -t portfolio:latest .

# Run locally
docker run -p 3000:80 portfolio:latest
```

### Production Deployment

The production deployment uses Docker Compose with nginx-proxy:

```bash
# Deploy to production (on AWS EC2)
docker compose up -d portfolio
```

**Deployment Features**:
- Multi-stage Docker build (Node.js build + nginx serving)
- Automatic SSL certificate management
- Health checks and monitoring
- Automated cleanup and resource management
- Comprehensive deployment validation

## Project Structure

```
src/
├── components/
│   ├── IntroAnimation.tsx        # Animated intro component
│   └── TypewriterText.tsx        # Typewriter animation effect
├── data/
│   ├── experience.json           # Work experience data
│   ├── projects.json             # Project portfolio data
│   ├── techStack.json            # Technology stack information
│   ├── translations.json         # Multilingual content
│   └── socialLinks.json          # Social media links
├── pages/
│   ├── api/
│   │   └── images.ts             # API route for image management
│   ├── _app.tsx                  # Next.js app configuration
│   ├── _document.tsx             # Custom document structure
│   └── index.tsx                 # Main homepage
├── styles/
│   ├── globals.css               # Global styles
│   ├── Home.module.css           # Homepage specific styles
│   ├── IntroAnimation.module.css # Intro animation styles
│   └── CodeTypingAnimation.module.css # Code typing styles
├── utils/
│   ├── imageUtils.ts             # Image processing utilities
│   ├── introUtils.ts             # Intro animation utilities
│   ├── languageUtils.ts          # Language switching utilities
│   └── translationUtils.ts       # Translation interpolation
└── views/
    ├── AboutView.tsx             # About section component
    ├── ContactView.tsx           # Contact form with EmailJS
    ├── ExperienceView.tsx        # Work experience section
    ├── FooterView.tsx            # Footer with dynamic year
    ├── HeroView.tsx              # Hero section with background images
    ├── ProjectsView.tsx          # Projects showcase
    └── TechStackView.tsx         # Technology stack display

# Configuration & Deployment
├── next.config.ts                # Next.js configuration
├── Dockerfile                    # Multi-stage Docker build
├── docker-compose.yml            # Production deployment config
├── nginx.conf                    # nginx configuration
└── .github/workflows/deploy.yml  # CI/CD pipeline
```

## Technologies Used

- **Next.js 15** with TypeScript and React 19
- **CSS Modules** for component-scoped styling
- **Framer Motion** for animations and transitions
- **EmailJS** for contact form functionality
- **Custom API Routes** for dynamic image management
- **Docker** for containerization
- **nginx** for static file serving
- **AWS EC2** for hosting infrastructure
- **GitHub Actions** for CI/CD automation
- **ImageMagick** for image optimization

## Contact Form Features

- Real-time form validation
- Loading states and success/error messages
- Bilingual support (English/Turkish)
- User metadata collection (IP, browser info, timezone)
- Direct email sending via EmailJS
- Responsive design with animations
- Environment variable protection for API keys

## Image Optimization

The project includes automated image optimization for better performance:

```bash
# Optimize images in public/assets directory (using ImageMagick)
cd public/assets
find . -type f \( -iname "*.jpg" -o -iname "*.jpeg" \) -exec mogrify -resize '1200x1200>' -quality 85 {} \;
find . -type f -iname "*.png" -exec mogrify -resize '1200x1200>' {} \;
```

**Optimization Results:**
- Original size: ~82MB → Optimized: ~7.3MB (91% reduction)
- Maximum dimensions: 1200x1200 pixels
- JPEG quality: 85% (optimal for web)
- Supports JPG, PNG, WebP formats

## API Routes

The project uses Next.js API routes for dynamic functionality:

### `/api/images`

Returns organized image folder structure from `public/assets`:

```json
{
  "success": true,
  "folders": [
    {
      "path": "assets/graduation",
      "images": ["IMG-20250701-WA0001.jpg", "..."]
    }
  ],
  "totalFolders": 8,
  "totalImages": 38
}
```

**Features:**
- Recursive directory scanning
- Web-format filtering (JPG, PNG, WebP, etc.)
- Error handling and logging
- CORS headers for development

## Security Notes

- Environment variables are used to protect EmailJS credentials
- `.env.local` file is excluded from version control
- GitHub Actions secrets ensure secure deployment
- No sensitive information is exposed in the public repository
- Docker multi-stage builds for optimized production images
- nginx security headers and proper configuration
- CORS headers configured for API routes
- Image optimization reduces server load and improves performance

## Performance Optimizations

### Cache Configuration

The nginx configuration includes advanced caching mechanisms for optimal performance:

#### Static File Caching
- **Images**: 30-day cache with `max-age=2592000`
- **CSS/JS**: 7-day cache with `max-age=604800`
- **Fonts**: 1-year cache with `immutable` directive
- **JSON/XML**: 1-day cache with `max-age=86400`

#### Proxy Cache
- Configured proxy cache path: `/var/cache/nginx`
- Cache zone: `static_cache` with 10MB memory and 1GB disk space
- Cache validity: 10 minutes for successful responses, 1 minute for 404s
- Background cache updates and stale content serving for high availability

#### Cache Headers
- `Cache-Control` headers for browser caching
- `Vary: Accept-Encoding` for proper compression handling
- `ETag` support for efficient cache validation
- Access logs disabled for static assets to reduce I/O

#### Performance Benefits
- Reduced server load by serving cached content
- Faster page load times for returning visitors
- Improved bandwidth efficiency
- Better user experience with instant static content delivery

### Docker Volume Configuration
- Persistent nginx cache volume for container restarts
- Proper cache directory permissions and ownership
