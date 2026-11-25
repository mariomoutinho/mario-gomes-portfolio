import { useEffect, useRef, useState, type PointerEvent, type CSSProperties } from 'react';
import { Plus, Minus } from 'lucide-react';
import { siteContent } from '../data/site-content';
import styles from './services-section.module.css';
export function ServiceAccordion() {
  const [active, setActive] = useState<number | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  useEffect(() => () => clearTimeout(timer.current), []);
  const [spot, setSpot] = useState({ x: 0, y: 0, index: -1 });
  const illuminate = (event: PointerEvent<HTMLDivElement>, index: number) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    setSpot({ x: event.clientX - bounds.left, y: event.clientY - bounds.top, index });
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setSpot((current) => ({ ...current, index: -1 })), 650);
  };
  return (
    <div className={styles.list}>
      {siteContent.services.map((service, index) => (
        <div
          key={service.title}
          className={styles.service}
          onPointerDown={(event) => illuminate(event, index)}
        >
          <span
            aria-hidden="true"
            className={styles.spot}
            style={
              {
                '--x': `${spot.x}px`,
                '--y': `${spot.y}px`,
                opacity: spot.index === index ? 1 : 0,
              } as CSSProperties
            }
          />
          <h3>
            <button
              aria-expanded={active === index}
              aria-controls={`service-${index}`}
              onClick={() => setActive(active === index ? null : index)}
            >
              <span>0{index + 1}</span>
              {service.title}
              {active === index ? <Minus /> : <Plus />}
            </button>
          </h3>
          <div
            id={`service-${index}`}
            className={styles.expansion}
            data-open={active === index}
            inert={active !== index}
            aria-hidden={active !== index}
          >
            <div>
              <p>{service.description}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
