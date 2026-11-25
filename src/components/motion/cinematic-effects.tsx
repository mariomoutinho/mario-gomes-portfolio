import { useEffect, useRef, type ReactNode } from 'react';
import styles from './cinematic-effects.module.css';

export function CinematicReveal({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          node.dataset.visible = 'true';
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  return (
    <div ref={ref} className={styles.reveal}>
      {children}
    </div>
  );
}

function AmbientComposition({ flow, simplified = false }: { flow: boolean; simplified?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    let visible = false;
    const update = () => {
      node.dataset.running = String(visible && !document.hidden);
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = Boolean(entry?.isIntersecting);
      update();
    });
    observer.observe(node);
    document.addEventListener('visibilitychange', update);
    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', update);
    };
  }, []);
  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={`${styles.ambient} ${flow ? styles.flow : styles.aurora}`}
    >
      <i />
      <i />
      {!simplified && <i />}
      {flow && <span className={styles.grain} />}
    </div>
  );
}
export function CinematicAmbientLight() {
  return <AmbientComposition flow={false} />;
}
export function CinematicLightFlow({ simplified = false }: { simplified?: boolean }) {
  return <AmbientComposition flow simplified={simplified} />;
}
