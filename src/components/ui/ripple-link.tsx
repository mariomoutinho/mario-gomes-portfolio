import { useEffect, useRef, useState, type PointerEvent, type CSSProperties } from 'react';
import { ArrowUpRight } from 'lucide-react';
import styles from './ripple-link.module.css';
export function RippleLink({ href }: { href: string }) {
  const [ripple, setRipple] = useState({ x: 0, y: 0, active: false });
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  useEffect(() => () => clearTimeout(timer.current), []);
  const press = (event: PointerEvent<HTMLAnchorElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setRipple({ x: event.clientX - rect.left, y: event.clientY - rect.top, active: true });
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setRipple((value) => ({ ...value, active: false })), 500);
  };
  return (
    <a href={href} target="_blank" rel="noreferrer" className={styles.link} onPointerDown={press}>
      <span>Solicitar orçamento</span>
      <ArrowUpRight size={18} />
      {ripple.active && (
        <i
          aria-hidden="true"
          style={{ '--x': `${ripple.x}px`, '--y': `${ripple.y}px` } as CSSProperties}
        />
      )}
    </a>
  );
}
