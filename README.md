# Melih Emre Güler - Portfolio Website

A modern, responsive portfolio website built with React, TypeScript, and Vite. Features rich text formatting, multilingual support, and an integrated contact form.

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
- [Security Notes](#security-notes)

## Features

- **Rich Text Formatting**: Support for bold, italic, underline, code, highlights, and custom links
- **Multilingual Support**: English and Turkish translations
- **Contact Form**: EmailJS integration for direct email communication
- **Responsive Design**: Modern UI with Tailwind CSS
- **Fast Performance**: Built with Vite for optimal loading speeds

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

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Fill in your EmailJS credentials in the `.env` file:

```env
VITE_EMAILJS_SERVICE_ID=your_service_id_here
VITE_EMAILJS_TEMPLATE_ID=your_template_id_here
VITE_EMAILJS_PUBLIC_KEY=your_public_key_here
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

### 5. Production Build

```bash
npm run build
```

## Docker Deployment

The website is containerized using Docker with a multi-stage build process:

### Local Docker Build

```bash
# Build the Docker image
docker build -t portfolio:latest .

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
│   ├── common/
│   │   └── RichText.tsx          # Rich text formatting component
│   └── pages/
│       ├── home/
│       │   ├── AboutSection.tsx
│       │   ├── ContactSection.tsx  # Contact form with EmailJS
│       │   ├── EducationSection.tsx
│       │   ├── ExperienceSection.tsx
│       │   └── ...
│       └── projects/
│           └── ProjectsPage.tsx
├── locales/
│   ├── en.json                   # English translations
│   └── tr.json                   # Turkish translations
└── ...

# Docker & Deployment
├── Dockerfile                    # Multi-stage Docker build
├── docker-compose.yml            # Production deployment config
├── nginx.conf                    # nginx configuration for serving
└── .github/workflows/deploy.yml  # CI/CD pipeline
```

## Technologies Used

- **React 18** with TypeScript
- **Vite** for build tooling
- **Tailwind CSS** for styling
- **React Router** for navigation
- **React i18next** for internationalization
- **EmailJS** for contact form functionality
- **Docker** for containerization
- **nginx** for static file serving
- **AWS EC2** for hosting infrastructure
- **GitHub Actions** for CI/CD automation

## Contact Form Features

- Real-time validation
- Loading states and status messages
- Bilingual support
- Direct email sending via EmailJS
- Responsive design

## Security Notes

- Environment variables are used to protect EmailJS credentials
- `.env` file is excluded from version control
- GitHub Actions secrets ensure secure deployment
- No sensitive information is exposed in the public repository
- Docker multi-stage builds for optimized production images
- nginx security headers and proper configuration
