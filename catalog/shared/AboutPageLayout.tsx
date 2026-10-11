import styles from './AboutPageLayout.module.css';

interface AboutPageLayoutProps {
  children: React.ReactNode;
}

export default function AboutPageLayout({ children }: AboutPageLayoutProps) {
  return <div className={styles.root}>{children}</div>;
}
