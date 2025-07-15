import { motion } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";
import { useState } from "react";
import emailjs from "@emailjs/browser";
import styles from "@/styles/Home.module.css";
import socialLinks from "@/data/socialLinks.json";

interface ContactFormData {
    name: string;
    email: string;
    message: string;
}

interface UserMetadata {
    ip: string;
    userAgent: string;
    timeZone: string;
    screenResolution: string;
    language: string;
    platform: string;
}

interface ContactViewProps {
  t: any;
}

export default function ContactView({ t }: ContactViewProps) {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);

  const getUserMetadata = async (): Promise<UserMetadata | null> => {
    try {
      // Get IP address from ipify API
      const ipResponse = await fetch('https://api.ipify.org?format=json');
      const ipData = await ipResponse.json();

      const metadata: UserMetadata = {
        ip: ipData.ip,
        userAgent: navigator.userAgent,
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        screenResolution: `${window.screen.width}x${window.screen.height}`,
        language: navigator.language,
        platform: navigator.platform
      };

      return metadata;
    } catch (error) {
      console.error('Error fetching user metadata:', error);
      return null;
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Get user metadata at submission time
      const metadata = await getUserMetadata();
      
      // EmailJS configuration from environment variables
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

      // Check if environment variables are configured
      if (!serviceId || !templateId || !publicKey) {
        throw new Error('EmailJS configuration is missing. Please check your environment variables.');
      }

      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
        to_name: 'Melih Emre Güler',
        user_ip: metadata?.ip || 'Not available',
        user_agent: metadata?.userAgent || 'Not available',
        user_timezone: metadata?.timeZone || 'Not available',
        user_language: metadata?.language || 'Not available',
        user_platform: metadata?.platform || 'Not available',
        contact_time: new Date().toISOString()
      };

      await emailjs.send(serviceId, templateId, templateParams, publicKey);
      
      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Email sending error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <section id="contact" className={styles.section}>
      <div className={styles.sectionContent}>
        <motion.h2 
          className={styles.sectionTitle}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {t.contact.title}
        </motion.h2>
        <div className={styles.contactContent}>
          <form className={styles.contactForm} onSubmit={handleSubmit}>
            {submitStatus === 'success' && (
              <motion.div 
                className={styles.successMessage}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {t.contact.successMessage || 'Message sent successfully!'}
              </motion.div>
            )}
            {submitStatus === 'error' && (
              <motion.div 
                className={styles.errorMessage}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {t.contact.errorMessage || 'Failed to send message. Please try again.'}
              </motion.div>
            )}
            <div className={styles.formGroup}>
              <input 
                type="text" 
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder={t.contact.name}
                required
                disabled={isSubmitting}
              />
            </div>
            <div className={styles.formGroup}>
              <input 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder={t.contact.email}
                required
                disabled={isSubmitting}
              />
            </div>
            <div className={styles.formGroup}>
              <textarea 
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder={t.contact.message} 
                rows={5}
                required
                disabled={isSubmitting}
              ></textarea>
            </div>
            <motion.button 
              type="submit"
              className={styles.submitButton}
              whileHover={{ scale: isSubmitting ? 1 : 1.05 }}
              whileTap={{ scale: isSubmitting ? 1 : 0.95 }}
              disabled={isSubmitting}
            >
              {isSubmitting ? (t.contact.sending || 'Sending...') : t.contact.sendMessage}
            </motion.button>
          </form>
          <div className={styles.socialLinks}>
            <h3>{t.contact.connectWithMe}</h3>
            <div className={styles.socialIcons}>
              <motion.a 
                href={socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialIcon}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                <Github size={24} />
              </motion.a>
              <motion.a 
                href={socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialIcon}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                <Linkedin size={24} />
              </motion.a>
              <motion.a 
                href={socialLinks.email}
                className={styles.socialIcon}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                <Mail size={24} />
              </motion.a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 