import { useEffect, useRef, useState } from 'react';
import { serviceFormats } from '../data/site-content';
import styles from './service-formats-marquee.module.css';

export function ServiceFormatsMarquee() {
  const viewport = useRef<HTMLDivElement>(null);
  const [running, setRunning] = useState(false);
  useEffect(() => {
    let visible = false;
    const update = () => setRunning(visible && !document.hidden);
    const observer = new IntersectionObserver(([entry]) => {
      visible = Boolean(entry?.isIntersecting);
      update();
    });
    if (viewport.current) observer.observe(viewport.current);
    document.addEventListener('visibilitychange', update);
    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', update);
    };
  }, []);
  return (
    <div
      ref={viewport}
      className={styles.viewport}
      data-running={running}
      tabIndex={0}
      role="region"
      aria-label="Formatos de edição de vídeo"
    >
      <div className={styles.belt}>
        {[false, true].map((duplicate) => (
          <ul
            key={String(duplicate)}
            className={styles.group}
            aria-hidden={duplicate || undefined}
            inert={duplicate}
          >
            {serviceFormats.map((format) => (
              <li key={format.title} className={styles.card}>
                <span className={styles.accent} aria-hidden="true" />
                <h3>{format.title}</h3>
                <span className={styles.format}>{format.formats}</span>
                <p>{format.description}</p>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
