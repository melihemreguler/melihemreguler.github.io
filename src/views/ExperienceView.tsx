import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp, MapPin, Calendar, Briefcase, ExternalLink } from "lucide-react";
import { useState } from "react";
import styles from "@/styles/Home.module.css";
import experienceData from "../data/experience.json";

interface ExperienceViewProps {
  language: string;
}

export default function ExperienceView({ language }: ExperienceViewProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const experienceContent = experienceData[language as keyof typeof experienceData];
  const experience = experienceContent.items || [];

  return (
    <section id="experience" className={styles.section}>
      <div className={styles.sectionContent}>
        <motion.h2 
          className={styles.sectionTitle}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {experienceContent.title}
        </motion.h2>
        
        <div className={`${styles.collapsibleContainer} ${!isExpanded ? styles.collapsed : ''}`}>
          <div className={styles.experienceGrid}>
            <AnimatePresence>
              {experience.map((exp: any, index: number) => (
                <motion.div 
                  key={exp.company}
                  className={styles.experienceCard}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <div className={styles.experienceHeader}>
                    <div className={styles.experienceHeaderLeft}>
                      <h3 className={styles.experiencePosition}>{exp.position}</h3>
                      <div className={styles.experienceCompany}>
                        <a 
                          href={exp.links?.primodLink} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className={styles.companyLink}
                        >
                          {exp.company}
                          <ExternalLink size={14} />
                        </a>
                        <span className={styles.companyType}>{exp.companyType}</span>
                      </div>
                    </div>
                    <div className={styles.experienceHeaderRight}>
                      <div className={styles.experienceDetail}>
                        <Calendar size={16} />
                        <span>{exp.period}</span>
                      </div>
                      <div className={styles.experienceDetail}>
                        <MapPin size={16} />
                        <span>{exp.location}</span>
                      </div>
                      <div className={styles.experienceDetail}>
                        <Briefcase size={16} />
                        <span>{exp.workType}</span>
                      </div>
                    </div>
                  </div>

                  <div className={styles.experienceContent}>
                    <div className={styles.companyDescription}>
                      <p>{exp.companyDescription}</p>
                    </div>

                    <div className={styles.responsibilitiesSection}>
                      <h4>Key Responsibilities & Achievements</h4>
                      <ul className={styles.responsibilitiesList}>
                        {exp.responsibilities.map((responsibility: string, idx: number) => (
                          <li key={idx}>{responsibility}</li>
                        ))}
                      </ul>
                    </div>

                    <div className={styles.experienceLinks}>
                      <a 
                        href={exp.links?.cloudqueryMainLink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className={styles.techLink}
                      >
                        CloudQuery
                        <ExternalLink size={12} />
                      </a>
                      <a 
                        href={exp.links?.cloudqueryLink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className={styles.techLink}
                      >
                        My API Contribution
                        <ExternalLink size={12} />
                      </a>
                      <a 
                        href={exp.links?.arangodbLink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className={styles.techLink}
                      >
                        ArangoDB
                        <ExternalLink size={12} />
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          
          {!isExpanded && experience.length > 0 && (
            <div className={styles.fadeOverlay}>
              <div className={styles.expandButtonContainer}>
                <motion.button
                  className={styles.expandButton}
                  onClick={() => setIsExpanded(!isExpanded)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {experienceContent.expandText}
                  <ChevronDown size={20} />
                </motion.button>
              </div>
            </div>
          )}
        </div>

        {isExpanded && experience.length > 0 && (
          <motion.button
            className={styles.expandButton}
            onClick={() => setIsExpanded(!isExpanded)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{ margin: '3rem auto 0' }}
          >
            {experienceContent.collapseText}
            <ChevronUp size={20} />
          </motion.button>
        )}
      </div>
    </section>
  );
}