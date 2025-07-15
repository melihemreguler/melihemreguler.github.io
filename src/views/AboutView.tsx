import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import styles from "@/styles/Home.module.css";

interface AboutViewProps {
  t: any;
}

export default function AboutView({ t }: AboutViewProps) {
  const [yearsOfExperience, setYearsOfExperience] = useState<string>("3+");
  const [totalRepos, setTotalRepos] = useState<string>("10+");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Calculate years since the start year from translations
    const calculateYearsOfExperience = () => {
      const startYear = t.about.startYear || 2023; // Fallback to 2023 if not found
      const currentYear = new Date().getFullYear();
      const currentMonth = new Date().getMonth() + 1; // getMonth() returns 0-11
      
      let years = currentYear - startYear;
      
      // If we're in early part of the year, we might want to be more conservative
      // You can adjust this logic based on when exactly you started in the year
      if (currentMonth < 6) { // If before June, be conservative
        years = Math.max(0, years - 1);
      }
      
      return years > 0 ? `${years}+` : "1+";
    };

    // Fetch GitHub repository count
    const fetchGitHubRepos = async () => {
      try {
        const githubUsername = t.about.githubUsername || 'melihemreguler'; // Fallback username
        const response = await fetch(`https://api.github.com/users/${githubUsername}`);
        if (response.ok) {
          const userData = await response.json();
          const publicRepos = userData.public_repos;
          return `${publicRepos}`;
        }
      } catch (error) {
        console.warn('Failed to fetch GitHub repos:', error);
      }
      return "10+"; // Fallback value
    };

    const loadDynamicData = async () => {
      // Calculate years of experience
      const years = calculateYearsOfExperience();
      setYearsOfExperience(years);

      // Fetch GitHub repo count
      const repos = await fetchGitHubRepos();
      setTotalRepos(repos);

      setIsLoading(false);
    };

    loadDynamicData();
  }, [t]); // Add t as dependency so years recalculate when language changes

  return (
    <section id="about" className={styles.section}>
      <div className={styles.sectionContent}>
        <motion.h2 
          className={styles.sectionTitle}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {t.about.title}
        </motion.h2>
        <div className={styles.aboutContent}>
          <div className={styles.aboutText}>
            <p>{t.about.description1}</p>
            <p>{t.about.description2}</p>
          </div>
          <div className={styles.aboutStats}>
            <div className={styles.stat}>
              <h3>{isLoading ? "..." : yearsOfExperience}</h3>
              <p>{t.about.yearsExperience}</p>
            </div>
            <div className={styles.stat}>
              <h3>{isLoading ? "..." : totalRepos}</h3>
              <p>{t.about.projectsCompleted}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}