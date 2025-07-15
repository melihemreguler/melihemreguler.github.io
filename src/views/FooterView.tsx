import styles from "@/styles/Home.module.css";
import { interpolateTranslation } from "@/utils/translationUtils";

interface FooterViewProps {
  t: any;
}

export default function FooterView({ t }: FooterViewProps) {
  return (
    <footer className={styles.footer}>
      <p>{interpolateTranslation(t.footer.copyright)}</p>
    </footer>
  );
} 