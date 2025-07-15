import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, ChevronDown, ChevronUp, Github } from "lucide-react";
import { useState } from "react";
import styles from "@/styles/Home.module.css";
import projectsData from "../data/projects.json";

interface ProjectsViewProps {
  language: string;
}

export default function ProjectsView({ language }: ProjectsViewProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const projectsContent = projectsData[language as keyof typeof projectsData];
  const projects = projectsContent.items || [];
  const displayedProjects = isExpanded ? projects : projects.slice(0, 3);

  return (
    <section id="projects" className={styles.section}>
      <div className={styles.sectionContent}>
        <motion.h2 
          className={styles.sectionTitle}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {projectsContent.title}
        </motion.h2>
        
        <div className={`${styles.collapsibleContainer} ${!isExpanded ? styles.collapsed : ''}`}>
          <div className={styles.projectsGrid}>
            <AnimatePresence>
              {displayedProjects.map((project, index) => (
                <motion.div 
                  key={project.title}
                  className={styles.projectCard}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                >
                  <div className={styles.projectContent}>
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                    <div className={styles.projectTech}>
                      {project.tech.map(tech => (
                        <span key={tech} className={styles.techTag}>{tech}</span>
                      ))}
                    </div>
                    <div className={styles.projectButtons}>
                      <a 
                        href={project.github} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className={styles.projectButton}
                      >
                        <Github size={16} />
                        {projectsContent.viewDetails}
                      </a>
                      {project.demo && (
                        <a 
                          href={project.demo} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className={`${styles.projectButton} ${styles.demoButton}`}
                        >
                          <ExternalLink size={16} />
                          {projectsContent.tryLive}
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          
          {!isExpanded && projects.length > 3 && (
            <div className={styles.fadeOverlay}>
              <div className={styles.expandButtonContainer}>
                <motion.button
                  className={styles.expandButton}
                  onClick={() => setIsExpanded(!isExpanded)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {projectsContent.expandText}
                  <ChevronDown size={20} />
                </motion.button>
              </div>
            </div>
          )}
        </div>

        {isExpanded && projects.length > 3 && (
          <motion.button
            className={styles.expandButton}
            onClick={() => setIsExpanded(!isExpanded)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{ margin: '2rem auto 0' }}
          >
            {projectsContent.collapseText}
            <ChevronUp size={20} />
          </motion.button>
        )}
      </div>
    </section>
  );
}