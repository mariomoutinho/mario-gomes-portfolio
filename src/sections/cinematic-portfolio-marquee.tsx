import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent,
} from 'react';
import { Expand, Play } from 'lucide-react';
import type { PortfolioWork } from '../data/portfolio';
import { portfolioCategories } from '../data/portfolio-categories';
import styles from './cinematic-portfolio-marquee.module.css';

function PortfolioMediaCard({
  work,
  duplicate,
  onSelect,
}: {
  work: PortfolioWork;
  duplicate: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      className={styles.card}
      tabIndex={duplicate ? -1 : 0}
      aria-label={`${work.videoSrc ? 'Reproduzir' : 'Ampliar'} ${work.title}${work.isPlaceholder ? ', imagem ilustrativa' : ''}`}
      onClick={onSelect}
    >
      <img
        src={work.posterSrc}
        className={work.rotateToLandscape ? styles.rotatedPoster : undefined}
        alt={duplicate ? '' : work.posterAlt}
        width={work.orientation === 'portrait' ? 600 : 800}
        height={work.orientation === 'portrait' ? 1066 : 450}
        loading="lazy"
        draggable={false}
      />
      <span className={styles.cardOverlay} />
      {work.videoSrc ? (
        <span className={styles.play} aria-hidden="true">
          <Play size={20} />
        </span>
      ) : (
        <span className={styles.expand} aria-hidden="true">
          <Expand size={18} />
        </span>
      )}
      <span className={styles.cardText}>
        <strong>{work.title}</strong>
        {work.isPlaceholder && <span className={styles.provisional}>ILUSTRATIVO</span>}
      </span>
    </button>
  );
}

function MarqueeTrack({
  works,
  category,
  reverse,
  running,
  reduced,
  onSelect,
}: {
  works: PortfolioWork[];
  category: (typeof portfolioCategories)[number];
  reverse: boolean;
  running: boolean;
  reduced: boolean;
  onSelect: (work: PortfolioWork) => void;
}) {
  const viewport = useRef<HTMLDivElement>(null);
  const belt = useRef<HTMLDivElement>(null);
  const group = useRef<HTMLDivElement>(null);
  const animation = useRef<Animation | null>(null);
  const distance = useRef(0);
  const initialized = useRef(false);
  const manuallyExploring = useRef(false);
  const pointerDown = useRef(false);
  const startPoint = useRef({ x: 0, y: 0 });
  const moved = useRef(false);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const [manual, setManual] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [repetitions, setRepetitions] = useState(1);
  const speed = 30;
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) =>
      setVisible(Boolean(entry?.isIntersecting)),
    );
    if (viewport.current) observer.observe(viewport.current);
    return () => observer.disconnect();
  }, []);

  const canRun = useRef(false);
  const resumeAction = useRef<() => void>(() => {});

  const freeze = () => {
    const view = viewport.current;
    const strip = belt.current;
    if (!view || !strip || !animation.current) return;
    const matrix = new DOMMatrixReadOnly(getComputedStyle(strip).transform);
    const position = view.scrollLeft - matrix.m41;
    animation.current.cancel();
    animation.current = null;
    strip.style.transform = 'none';
    view.scrollLeft = position;
  };
  const resume = () => {
    const view = viewport.current;
    const strip = belt.current;
    const width = distance.current;
    if (!view || !strip || !width || reduced) return;
    freeze();
    const phase = (((view.scrollLeft - width) % width) + width) % width;
    const duration = (width / speed) * 1000;
    manuallyExploring.current = false;
    const player = strip.animate(
      [{ transform: 'translateX(0px)' }, { transform: `translateX(-${width}px)` }],
      {
        duration,
        iterations: Infinity,
        easing: 'linear',
        direction: reverse ? 'reverse' : 'normal',
      },
    );
    player.pause();
    player.currentTime = reverse ? duration - (phase / speed) * 1000 : (phase / speed) * 1000;
    view.scrollLeft = width;
    animation.current = player;
    if (canRun.current) player.play();
  };
  useLayoutEffect(() => {
    resumeAction.current = resume;
  });

  useLayoutEffect(() => {
    const view = viewport.current;
    const strip = belt.current;
    const sequence = group.current;
    if (!view || !strip || !sequence) return;
    if (reduced) {
      freeze();
      view.scrollLeft = 0;
      initialized.current = false;
      distance.current = 0;
      return;
    }
    const measure = () => {
      const first = sequence.querySelector<HTMLElement>('button');
      if (!first) return;
      const gap = parseFloat(getComputedStyle(sequence).columnGap) || 0;
      const originals = [...sequence.querySelectorAll<HTMLElement>(':scope > span')].slice(
        0,
        works.length,
      );
      const sequenceWidth = originals.reduce((width, card) => width + card.offsetWidth + gap, 0);
      const needed = Math.max(1, Math.ceil(view.clientWidth / sequenceWidth));
      if (needed !== repetitions) {
        setRepetitions(needed);
        return;
      }
      freeze();
      const oldWidth = distance.current;
      const fraction = oldWidth
        ? ((((view.scrollLeft - oldWidth) % oldWidth) + oldWidth) % oldWidth) / oldWidth
        : 0;
      const width = sequence.getBoundingClientRect().width;
      distance.current = width;
      view.scrollLeft = width + fraction * width;
      initialized.current = true;
      resumeAction.current();
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(view);
    observer.observe(sequence);
    return () => {
      observer.disconnect();
      freeze();
    };
    // Dimension changes preserve phase; the animation state is updated separately below.
  }, [reduced, repetitions, works.length]);

  useEffect(() => {
    canRun.current = running && visible && !manual && !hovered && !focused && !reduced;
    if (animation.current) {
      if (canRun.current) animation.current.play();
      else animation.current.pause();
    } else if (!manual && initialized.current && !reduced) resumeAction.current();
  }, [running, visible, manual, hovered, focused, reduced]);
  useEffect(() => () => clearTimeout(timer.current), []);

  const interact = () => {
    clearTimeout(timer.current);
    freeze();
    manuallyExploring.current = true;
    setManual(true);
  };
  const finish = () => {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      if (pointerDown.current) return;
      manuallyExploring.current = false;
      setManual(false);
      resumeAction.current();
    }, 2500);
  };
  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    startPoint.current = { x: event.clientX, y: event.clientY };
    moved.current = false;
    pointerDown.current = true;
    interact();
  };
  const release = () => {
    pointerDown.current = false;
    finish();
  };
  const navigate = (direction: number) => {
    interact();
    viewport.current?.scrollBy({
      left: direction * 280,
      behavior: 'instant',
    });
    finish();
  };
  if (!works.length) return null;
  return (
    <section
      className={styles.trackBlock}
      data-category={category.id}
      aria-labelledby={`${category.id}-title`}
    >
      <header className={styles.trackHeading}>
        <h3 id={`${category.id}-title`}>{category.title}</h3>
        <span>{category.formats}</span>
      </header>
      <div
        ref={viewport}
        id={`portfolio-${category.id}`}
        className={`${styles.viewport} ${reduced ? styles.reduced : ''}`}
        aria-label={`Galeria de ${category.title}`}
        role="group"
        tabIndex={0}
        aria-description="Use as setas esquerda e direita para explorar a galeria. Selecione uma imagem para ampliar."
        onKeyDown={(event) => {
          if (event.target !== event.currentTarget) return;
          if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
            event.preventDefault();
            navigate(event.key === 'ArrowLeft' ? -1 : 1);
          }
        }}
        onPointerDown={onPointerDown}
        onPointerMove={(event) => {
          if (
            pointerDown.current &&
            Math.hypot(event.clientX - startPoint.current.x, event.clientY - startPoint.current.y) >
              8
          )
            moved.current = true;
        }}
        onPointerUp={release}
        onPointerCancel={release}
        onClickCapture={(event) => {
          if (moved.current) {
            event.preventDefault();
            event.stopPropagation();
            moved.current = false;
          }
        }}
        onWheel={(event) => {
          if (Math.abs(event.deltaX) > 0) {
            interact();
            finish();
          }
        }}
        onScroll={() => {
          if (manuallyExploring.current && !pointerDown.current) finish();
        }}
        onPointerOver={(event) => {
          if (
            event.pointerType === 'mouse' &&
            matchMedia('(hover: hover) and (pointer: fine)').matches
          )
            setHovered(Boolean((event.target as Element).closest('button')));
        }}
        onPointerLeave={() => {
          setHovered(false);
          if (pointerDown.current) release();
        }}
        onFocusCapture={(event) => {
          if (event.target === event.currentTarget || !event.target.matches(':focus-visible'))
            return;
          interact();
          setFocused(true);
          event.target.scrollIntoView({ block: 'nearest', inline: 'nearest', behavior: 'instant' });
        }}
        onBlurCapture={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
            setFocused(false);
            finish();
          }
        }}
      >
        <div ref={belt} className={styles.belt} style={{ '--speed': speed } as CSSProperties}>
          {(reduced ? [1] : [0, 1, 2]).map((copy) => (
            <div
              key={copy}
              ref={copy === 1 ? group : undefined}
              className={styles.sequence}
              aria-hidden={copy !== 1 ? true : undefined}
            >
              {Array.from({ length: reduced ? 1 : repetitions }, (_, repeat) =>
                works.map((work) => (
                  <span
                    key={`${repeat}-${work.id}`}
                    className={styles.cardSlot}
                    data-orientation={work.orientation}
                    aria-hidden={repeat > 0 ? true : undefined}
                  >
                    <PortfolioMediaCard
                      work={work}
                      duplicate={copy !== 1 || repeat > 0}
                      onSelect={() => onSelect(work)}
                    />
                  </span>
                )),
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
export function CinematicPortfolioMarquee({
  works,
  running,
  reduced,
  onSelect,
}: {
  works: PortfolioWork[];
  running: boolean;
  reduced: boolean;
  onSelect: (work: PortfolioWork) => void;
}) {
  return (
    <div className={styles.tracks}>
      {portfolioCategories.map((category, index) => (
        <MarqueeTrack
          key={category.id}
          category={category}
          reverse={index % 2 === 1}
          works={works
            .filter((work) => work.categoryId === category.id)
            .sort((a, b) => Number(a.isPlaceholder) - Number(b.isPlaceholder))}
          running={running}
          reduced={reduced}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}
