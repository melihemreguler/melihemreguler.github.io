import Head from "next/head";
import { motion } from "framer-motion";
import { 
  Github, 
  Linkedin, 
  Mail, 
  ExternalLink, 
  Menu, 
  X,
  ChevronRight,
  Languages
} from "lucide-react";
import { useState, useEffect, useRef, lazy, Suspense } from "react";
import styles from "@/styles/Home.module.css";
import IntroAnimation from "@/components/IntroAnimation";
import TypewriterText from "@/components/TypewriterText";
import { introUtils } from "@/utils/introUtils";
import { getSavedLanguage, saveLanguage, SupportedLanguage } from "@/utils/languageUtils";
import translations from "../data/translations.json";
import HeroView from "../views/HeroView";
import { Code, Zap, Globe, Database, Cloud, Shield } from "lucide-react";

// Lazy load non-critical components for better LCP
const AboutView = lazy(() => import("../views/AboutView"));
const TechStackView = lazy(() => import("../views/TechStackView"));
const ProjectsView = lazy(() => import("../views/ProjectsView"));
const ExperienceView = lazy(() => import("../views/ExperienceView"));
const ContactView = lazy(() => import("../views/ContactView"));
const FooterView = lazy(() => import("../views/FooterView"));

// Import tech stack data normally (JSON can't be lazy loaded)
import techStackData from "../data/techStack.json";

const iconMap: Record<string, any> = { Code, Zap, Globe, Database, Cloud, Shield };

// Map tech stack data with icons
const techStack = techStackData.map((item: any) => ({ ...item, icon: iconMap[item.icon] }));

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [language, setLanguage] = useState<SupportedLanguage>('en');
  const [isLanguageLoaded, setIsLanguageLoaded] = useState(false);
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const [introCompleted, setIntroCompleted] = useState(false);
  const [currentCodeLine, setCurrentCodeLine] = useState(0);
  const languageToggleRef = useRef<HTMLDivElement>(null);

  const t = translations[language as keyof typeof translations];

  // Load language preference from localStorage on component mount
  useEffect(() => {
    const savedLanguage = getSavedLanguage();
    setLanguage(savedLanguage);
    setIsLanguageLoaded(true);
  }, []);

  // Save language preference to localStorage whenever language changes
  useEffect(() => {
    if (isLanguageLoaded) {
      saveLanguage(language);
    }
  }, [language, isLanguageLoaded]);

  // Handle clicking outside language menu
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (languageToggleRef.current && !languageToggleRef.current.contains(event.target as Node)) {
        setIsLanguageMenuOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Check if intro has been shown before
  useEffect(() => {
    if (introUtils.hasSeenIntro()) {
      setShowIntro(false);
      setIntroCompleted(true);
    }
  }, []);

  const handleIntroComplete = () => {
    setShowIntro(false);
    setIntroCompleted(true);
    introUtils.markIntroAsShown();
    
    // Start code typing animation after a delay
    setTimeout(() => {
      setCurrentCodeLine(0);
    }, 1000);
  };

  const handleCodeLineComplete = () => {
    if (currentCodeLine < 4) {
      setCurrentCodeLine(prev => prev + 1);
    } else {
      // Animation completed, restart after a delay
      setTimeout(() => {
        setCurrentCodeLine(0);
      }, 2000);
    }
  };

  const restartCodeAnimation = () => {
    setCurrentCodeLine(0);
  };

  const toggleLanguage = () => {
    const newLanguage: SupportedLanguage = language === 'tr' ? 'en' : 'tr';
    setLanguage(newLanguage);
    setIsLanguageMenuOpen(false);
  };

  // Don't render main content until intro is completed
  if (!introCompleted) {
    return (
      <>
        <Head>
          <title>Melih Güler - Backend Developer</title>
          <meta name="description" content="Backend Developer specialized in Golang, Java and PostgreSQL." />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Space+Grotesk:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        </Head>
        {showIntro && <IntroAnimation onComplete={handleIntroComplete} />}
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Melih Güler - Backend Developer</title>
        <meta name="description" content="Backend Developer specialized in Golang, Java and PostgreSQL." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Space+Grotesk:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </Head>

      <motion.div 
        className={styles.container}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.4, 0.0, 0.2, 1] }}
      >
        {/* Navigation */}
        <nav className={styles.navbar}>
          <div className={styles.navContent}>
            <motion.div 
              className={styles.logo}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              melihemre.dev
            </motion.div>
            
            <div className={styles.navLinks}>
              <a href="#home">{t.nav.home}</a>
              <a href="#about">{t.nav.about}</a>
              <a href="#projects">{t.nav.projects}</a>
              <a href="#experience">{t.nav.experience}</a>
              <a href="#contact">{t.nav.contact}</a>
              {/* Language toggle button for desktop */}
              <motion.button 
                className={styles.languageNavItem}
                onClick={toggleLanguage}
                title={language === 'tr' ? 'Switch to English' : 'Türkçe\'ye geç'}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                key={language} // This will trigger animation when language changes
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
              >
                {language === 'tr' ? '🇹🇷 TR' : '🇺🇸 EN'}
              </motion.button>
            </div>

            <div className={styles.navActions}>
              {/* Navigation actions removed */}
            </div>

            <button 
              className={styles.mobileMenuButton}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {isMenuOpen && (
            <motion.div 
              className={styles.mobileMenu}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <a href="#home">{t.nav.home}</a>
              <a href="#about">{t.nav.about}</a>
              <a href="#projects">{t.nav.projects}</a>
              <a href="#experience">{t.nav.experience}</a>
              <a href="#contact">{t.nav.contact}</a>
              <div className={styles.mobileLanguageToggle}>
                <button 
                  onClick={() => {
                    if (language !== 'tr') {
                      setLanguage('tr');
                    }
                    setIsMenuOpen(false);
                  }} 
                  className={language === 'tr' ? styles.active : ''}
                >
                  🇹🇷 Türkçe
                </button>
                <button 
                  onClick={() => {
                    if (language !== 'en') {
                      setLanguage('en');
                    }
                    setIsMenuOpen(false);
                  }} 
                  className={language === 'en' ? styles.active : ''}
                >
                  🇺🇸 English
                </button>
              </div>
            </motion.div>
          )}
        </nav>

        {/* Hero Section - Keep this for LCP */}
        <HeroView t={t} currentCodeLine={currentCodeLine} handleCodeLineComplete={handleCodeLineComplete} />
        
        {/* Lazy load below-the-fold content for better LCP */}
        <Suspense fallback={<div className={styles.loadingSpinner}>Loading...</div>}>
          {/* About Section */}
          <AboutView t={t} />
          {/* Tech Stack Section */}
          <TechStackView t={t} techStack={techStack} />
          {/* Projects Section */}
          <ProjectsView language={language} />
          {/* Experience Section */}
          <ExperienceView language={language} />
          {/* Contact Section */}
          <ContactView t={t} />
          {/* Footer */}
          <FooterView t={t} />
        </Suspense>
      </motion.div>
    </>
  );
}
