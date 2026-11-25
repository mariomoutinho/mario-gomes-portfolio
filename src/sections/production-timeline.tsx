import { useState, type CSSProperties } from 'react';
import { siteContent } from '../data/site-content';
import styles from './production-timeline.module.css';
export function ProductionTimeline() {
  const [active, setActive] = useState(0);
  const step = siteContent.steps[active]!;
  return (
    <div className={styles.layout}>
      <div>
        <div className={styles.timeline} aria-hidden="true">
          <div className={styles.ruler}>
            <span>00:00</span>
            <span>00:15</span>
            <span>00:30</span>
            <span>00:45</span>
          </div>
          {['V2', 'V1', 'A1'].map((track, row) => (
            <div className={styles.track} key={track}>
              <span>{track}</span>
              <div className={styles.clips}>
                {siteContent.steps.map((item, index) => (
                  <i
                    key={item.title}
                    className={index === active ? styles.activeClip : ''}
                    style={{ opacity: row === 1 ? 1 : 0.65 }}
                  >
                    {row === 2 ? '▂▅▃▇▅▂▆▃▅▇▃▂' : item.title}
                  </i>
                ))}
              </div>
            </div>
          ))}
          <div
            className={styles.playhead}
            style={{ '--position': step.position / 100 } as CSSProperties}
          />
        </div>
        <p className={styles.note}>TIMELINE ILUSTRATIVA / ETAPAS PROVISÓRIAS</p>
        <div className={styles.selectors} aria-label="Etapas de produção">
          {siteContent.steps.map((item, index) => (
            <button
              key={item.title}
              aria-pressed={active === index}
              aria-controls="step-description"
              onClick={() => setActive(index)}
            >
              <span>0{index + 1}</span>
              {item.title}
            </button>
          ))}
        </div>
      </div>
      <div
        id="step-description"
        className={styles.description}
        aria-live="polite"
        aria-atomic="true"
      >
        <span>0{active + 1} / 04</span>
        <h3>{step.title}</h3>
        <p key={active}>{step.description}</p>
      </div>
    </div>
  );
}
