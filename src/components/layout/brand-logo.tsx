import styles from './brand-logo.module.css';

export function BrandLogo() {
  return (
    <span className={styles.logo}>
      <img
        src={`${import.meta.env.BASE_URL}media/brand/mario-gomes-logo.png`}
        alt="Mário Gomes — Editor de vídeo"
        width="2172"
        height="724"
      />
    </span>
  );
}
