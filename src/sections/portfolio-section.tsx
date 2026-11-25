import { useEffect, useRef, useState } from 'react';
import { portfolioWorks, type PortfolioWork } from '../data/portfolio';
import { CinematicPortfolioMarquee } from './cinematic-portfolio-marquee';
import { PortfolioVideoPlayer } from '../components/media/portfolio-video-player';
import styles from './portfolio-section.module.css';
export function PortfolioSection() {
  const section = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);
  const [reduced, setReduced] = useState(false);
  const [selected, setSelected] = useState<PortfolioWork | null>(null);
  const [revealed, setRevealed] = useState(false);
  useEffect(() => {
    const media = matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(media.matches);
    const visibility = () => setPageVisible(!document.hidden);
    update();
    visibility();
    media.addEventListener('change', update);
    document.addEventListener('visibilitychange', visibility);
    const observer = new IntersectionObserver(([entry]) => {
      const inView = Boolean(entry?.isIntersecting);
      setVisible(inView);
      if (inView) setRevealed(true);
    });
    if (section.current) observer.observe(section.current);
    return () => {
      observer.disconnect();
      media.removeEventListener('change', update);
      document.removeEventListener('visibilitychange', visibility);
    };
  }, []);
  return (
    <section
      ref={section}
      id="trabalhos"
      aria-labelledby="portfolio-title"
      className={styles.section}
      data-running={visible && pageVisible && !selected && !reduced}
    >
      <header className={styles.heading} data-revealed={revealed}>
        <p className={styles.eyebrow}>02 / PORTFÓLIO</p>
        <h2 id="portfolio-title">
          Histórias em <span>movimento.</span>
        </h2>
        <p className={styles.description}>
          Diferentes formatos. Diferentes narrativas. Uma mesma atenção a cada frame.
        </p>
      </header>
      <CinematicPortfolioMarquee
        works={portfolioWorks}
        running={visible && pageVisible && !selected && !reduced}
        reduced={reduced}
        onSelect={setSelected}
      />
      {selected && <PortfolioVideoPlayer work={selected} onClose={() => setSelected(null)} />}
    </section>
  );
}
