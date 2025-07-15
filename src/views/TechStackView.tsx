import { motion } from "framer-motion";
import styles from "@/styles/Home.module.css";

interface TechStackViewProps {
  t: any;
  techStack: Array<{ name: string; items: string; icon: any; color: string }>;
}

export default function TechStackView({ t, techStack }: TechStackViewProps) {
  return (
    <section className={styles.section}>
      <div className={styles.sectionContent}>
        <motion.h2 
          className={styles.sectionTitle}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {t.techStack.title}
        </motion.h2>
        <div className={styles.techGrid}>
          {techStack.map((tech, index) => (
            <motion.div 
              key={tech.name}
              className={styles.techCard}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02, y: -3 }}
            >
              <div className={styles.techCardHeader}>
                <tech.icon size={28} style={{ color: tech.color }} />
                <h3 className={styles.techCardTitle}>{tech.name}</h3>
              </div>
              <p className={styles.techCardItems}>{tech.items}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}