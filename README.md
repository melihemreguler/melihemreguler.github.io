# Melih Emre Güler - Portfolio Website

A modern, responsive portfolio website built with React, TypeScript, and Vite. Features rich text formatting, multilingual support, and an integrated contact form.

## 🚀 Features

- **Rich Text Formatting**: Support for bold, italic, underline, code, highlights, and custom links
- **Multilingual Support**: English and Turkish translations
- **Contact Form**: EmailJS integration for direct email communication
- **Responsive Design**: Modern UI with Tailwind CSS
- **Fast Performance**: Built with Vite for optimal loading speeds

## 🛠️ Setup Instructions

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

## 🔐 GitHub Pages Deployment with Secrets

For automated deployment to GitHub Pages with EmailJS integration:

1. Go to your GitHub repository
2. Navigate to **Settings** → **Secrets and variables** → **Actions**
3. Add the following secrets:
   - `VITE_EMAILJS_SERVICE_ID`
   - `VITE_EMAILJS_TEMPLATE_ID`
   - `VITE_EMAILJS_PUBLIC_KEY`

The GitHub Actions workflow will automatically build and deploy your site with the EmailJS configuration.

## 📁 Project Structure

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
```

## 🌐 Technologies Used

- **React 18** with TypeScript
- **Vite** for build tooling
- **Tailwind CSS** for styling
- **React Router** for navigation
- **React i18next** for internationalization
- **EmailJS** for contact form functionality

## 📧 Contact Form Features

- Real-time validation
- Loading states and status messages
- Bilingual support
- Direct email sending via EmailJS
- Responsive design

## 🔒 Security Notes

- Environment variables are used to protect EmailJS credentials
- `.env` file is excluded from version control
- GitHub Actions secrets ensure secure deployment
- No sensitive information is exposed in the public repository
