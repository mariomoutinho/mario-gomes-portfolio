import { useState, type CSSProperties } from 'react';
import { editingSteps } from '../data/editing-process';
import styles from './production-timeline.module.css';

const visualTracks = [
  {
    name: 'V2',
    clips: [
      { title: 'Briefing', start: 0, width: 16, step: 0 },
      { title: 'Arquivos', start: 19, width: 18, step: 1 },
      { title: 'Revisão', start: 69, width: 19, step: 3 },
    ],
  },
  {
    name: 'V1',
    clips: [
      { title: 'Material', start: 19, width: 18, step: 1 },
      { title: 'Edição', start: 39, width: 48, step: 2 },
      { title: 'Export', start: 89, width: 11, step: 4 },
    ],
  },
];

export function ProductionTimeline() {
  const [active, setActive] = useState(0);
  const step = editingSteps[active]!;
  return (
    <div className={styles.layout}>
      <div className={styles.editor}>
        <div className={styles.editorHeader} aria-hidden="true">
          <span>EDITING_SEQUENCE</span>
          <span>0{active + 1} / 05</span>
        </div>
        <div className={styles.timeline} aria-hidden="true">
          <div className={styles.ruler}>
            {Array.from({ length: 13 }, (_, index) => (
              <i key={index} />
            ))}
          </div>
          {visualTracks.map((track) => (
            <div className={styles.track} key={track.name}>
              <span>{track.name}</span>
              <div className={styles.clips}>
                {track.clips.map((clip) => (
                  <i
                    key={clip.title}
                    className={clip.step === active ? styles.activeClip : undefined}
                    style={{ left: `${clip.start}%`, width: `${clip.width}%` }}
                  >
                    {clip.title}
                  </i>
                ))}
              </div>
            </div>
          ))}
          <div className={styles.track}>
            <span>A1</span>
            <div className={styles.audio}>
              {Array.from({ length: 62 }, (_, index) => (
                <i key={index} style={{ height: `${20 + ((index * 17 + 23) % 75)}%` }} />
              ))}
            </div>
          </div>
          <div
            className={styles.playhead}
            style={{ '--position': step.position / 100 } as CSSProperties}
          />
        </div>
        <div className={styles.selectors} role="group" aria-label="Etapas da edição">
          {editingSteps.map((item, index) => (
            <button
              key={item.title}
              type="button"
              aria-pressed={active === index}
              aria-controls="step-description"
              onClick={() => setActive(index)}
            >
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
        <span>
          0{active + 1} — {step.responsibility}
        </span>
        <h3>{step.heading}</h3>
        <p>{step.description}</p>
      </div>
      <p className={styles.note}>
        Mapa do processo de edição. A representação não corresponde à duração real do trabalho.
      </p>
    </div>
  );
}
