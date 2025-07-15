import { motion } from "framer-motion";
import TypewriterText from "@/components/TypewriterText";
import styles from "@/styles/Home.module.css";
import { useState, useEffect, useRef } from "react";
import { RandomImageSelector } from "@/utils/imageUtils";

interface HeroViewProps {
  t: any;
  currentCodeLine: number;
  handleCodeLineComplete: () => void;
}

export default function HeroView({ t, currentCodeLine, handleCodeLineComplete }: HeroViewProps) {
  const [isJava, setIsJava] = useState(true);
  const [resetKey, setResetKey] = useState(0);
  const [prevCodeLine, setPrevCodeLine] = useState(0);
  const [currentBackgroundImage, setCurrentBackgroundImage] = useState<string>('');
  const [imageOpacity, setImageOpacity] = useState(0);
  const imageSelector = useRef<RandomImageSelector>(new RandomImageSelector());
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Function to scroll to about section
  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Initialize image selector and start background image rotation
  useEffect(() => {
    const initializeImages = async () => {
      await imageSelector.current.initialize();
      changeBackgroundImage();
      
      // Set interval to change image every 3 seconds
      intervalRef.current = setInterval(() => {
        changeBackgroundImage();
      }, 3000);
    };

    initializeImages();

    // Cleanup interval on component unmount
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  // Function to change background image with fade transition
  const changeBackgroundImage = () => {
    const newImage = imageSelector.current.getRandomImage();
    if (newImage) {
      // Fade out current image
      setImageOpacity(0);
      
      // After fade out, change image and fade in
      setTimeout(() => {
        setCurrentBackgroundImage(newImage);
        setTimeout(() => {
          setImageOpacity(1);
        }, 50); // Small delay to ensure image is loaded
      }, 300);
    }
  };

  // Switch language when animation resets (currentCodeLine goes from higher number back to 0)
  useEffect(() => {
    // Detect when currentCodeLine resets from a higher number to 0
    if (currentCodeLine === 0 && prevCodeLine > 0) {
      setTimeout(() => {
        setIsJava(prev => !prev);
        setResetKey(prev => prev + 1);
      }, 500);
    }
    setPrevCodeLine(currentCodeLine);
  }, [currentCodeLine, prevCodeLine]);

  const javaCode = [
    "public class Developer {",
    `    private String name = "${t.hero.title}";`,
    '    private String[] skills = {"Java", "Spring Boot", "Golang"};',
    '    private String passion = "Building scalable backend systems";',
    "}"
  ];

  const goCode = [
    "type Developer struct {",
    `    Name     string // "${t.hero.title}"`,
    '    Skills   []string // ["Golang", "Java", "Spring Boot"]',
    '    Passion  string // "Building scalable backend systems"',
    "}"
  ];

  const currentCode = isJava ? javaCode : goCode;

  return (
    <section id="home" className={styles.hero}>
      {/* Background Image */}
      {currentBackgroundImage && (
        <div 
          className={styles.heroBackground}
          style={{
            backgroundImage: `url('${currentBackgroundImage}')`,
            opacity: imageOpacity
          }}
        />
      )}
      
      {/* Background Overlay */}
      <div className={styles.heroOverlay} />
      
      <div className={styles.heroContent}>
        <div className={styles.heroText}>
          <motion.h1 
            className={styles.heroTitle}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {t.hero.title}
          </motion.h1>
          <motion.h2 
            className={styles.heroSubtitle}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            {t.hero.subtitle}
          </motion.h2>
          <motion.p 
            className={styles.heroTagline}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            {t.hero.tagline}
          </motion.p>
          <motion.p 
            className={styles.heroDescription}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            {t.hero.description}
          </motion.p>
          <motion.div 
            className={styles.heroButtons}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
          >
            <motion.button 
              className={styles.primaryButton}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={scrollToAbout}
            >
              {t.hero.getToKnowMe}
            </motion.button>
          </motion.div>
        </div>
        <div className={styles.heroVisual}>
          <div className={styles.floatingElements}>
            <motion.div 
              className={styles.codeBlock} 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 1.5 }}
              key={`${isJava}-${resetKey}`} // Force re-render on language change
            >
              {currentCodeLine >= 0 && (
                <motion.div 
                  className={styles.codeLine}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <TypewriterText 
                    text={currentCode[0]}
                    delay={80}
                    startDelay={200}
                    onComplete={handleCodeLineComplete}
                    key={`line0-${isJava}-${resetKey}`}
                  />
                </motion.div>
              )}
              {currentCodeLine >= 1 && (
                <motion.div 
                  className={styles.codeLine}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <TypewriterText 
                    text={currentCode[1]}
                    delay={60}
                    startDelay={100}
                    onComplete={handleCodeLineComplete}
                    key={`line1-${isJava}-${resetKey}`}
                  />
                </motion.div>
              )}
              {currentCodeLine >= 2 && (
                <motion.div 
                  className={styles.codeLine}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <TypewriterText 
                    text={currentCode[2]}
                    delay={50}
                    startDelay={100}
                    onComplete={handleCodeLineComplete}
                    key={`line2-${isJava}-${resetKey}`}
                  />
                </motion.div>
              )}
              {currentCodeLine >= 3 && (
                <motion.div 
                  className={styles.codeLine}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <TypewriterText 
                    text={currentCode[3]}
                    delay={60}
                    startDelay={100}
                    onComplete={handleCodeLineComplete}
                    key={`line3-${isJava}-${resetKey}`}
                  />
                </motion.div>
              )}
              {currentCodeLine >= 4 && (
                <motion.div 
                  className={styles.codeLine}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <TypewriterText 
                    text={currentCode[4]}
                    delay={120}
                    startDelay={150}
                    onComplete={handleCodeLineComplete}
                    key={`line4-${isJava}-${resetKey}`}
                  />
                </motion.div>
              )}
              
              {/* Language indicator */}
              <motion.div 
                className={styles.languageIndicator}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.7 }}
                transition={{ duration: 0.3 }}
              >
                {isJava ? "Java" : "Go"}
              </motion.div>
            </motion.div>
            <div className={styles.floatingOrb}></div>
            <div className={styles.floatingOrb}></div>
            <div className={styles.floatingOrb}></div>
          </div>
        </div>
      </div>
    </section>
  );
}