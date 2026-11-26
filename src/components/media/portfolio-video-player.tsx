import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import type { PortfolioWork } from '../../data/portfolio';
import styles from './portfolio-video-player.module.css';
import { ResponsiveVideo } from './responsive-video';
export function PortfolioVideoPlayer({
  work,
  onClose,
}: {
  work: PortfolioWork;
  onClose: () => void;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    const node = dialog.current;
    node?.showModal();
    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.querySelectorAll('video').forEach((video) => video.pause());
    return () => {
      node?.querySelector('video')?.pause();
      node?.close();
      document.body.style.overflow = overflow;
      previous?.focus({ preventScroll: true });
    };
  }, []);
  return (
    <dialog
      ref={dialog}
      aria-labelledby="portfolio-preview-title"
      className={styles.dialog}
      onCancel={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      onKeyDown={(event) => {
        if (event.key !== 'Tab' || work.videoSrc) return;
        const controls = dialog.current?.querySelectorAll<HTMLElement>('button, a[href], video');
        const first = controls?.[0];
        const last = controls?.[controls.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }}
    >
      <div className={styles.content}>
        <div className={styles.top}>
          <div>
            <p>{work.isPlaceholder ? 'CONTEÚDO ILUSTRATIVO' : work.category}</p>
            <h3 id="portfolio-preview-title">{work.title}</h3>
          </div>
          <button autoFocus aria-label="Fechar visualização" onClick={onClose}>
            <X />
          </button>
        </div>
        {work.videoSrc && work.rotateToLandscape ? (
          <ResponsiveVideo
            source={{
              src: work.videoSrc,
              poster: work.posterSrc,
              description: work.title,
              rotateToLandscape: true,
            }}
          />
        ) : work.videoSrc ? (
          <video
            key={work.id}
            className={styles.media}
            controls
            playsInline
            preload="metadata"
            poster={work.posterSrc}
            aria-label={work.title}
            tabIndex={0}
          >
            <source src={work.videoSrc} />
            {work.captions?.map((track) => (
              <track
                key={track.src}
                kind="captions"
                src={track.src}
                srcLang={track.language}
                label={track.label}
              />
            ))}
          </video>
        ) : (
          <img
            className={styles.media}
            src={work.posterSrc}
            alt={work.posterAlt}
            width={work.orientation === 'portrait' ? 600 : 800}
            height={work.orientation === 'portrait' ? 1066 : 450}
          />
        )}
        <p className={styles.note}>
          {work.isPlaceholder
            ? 'Referência de composição visual. Não é um trabalho de Mário Gomes.'
            : work.posterAlt}
        </p>
        {work.sourceCredit && (
          <a
            className={styles.credit}
            href={work.sourceCredit.url}
            target="_blank"
            rel="noreferrer"
          >
            {work.sourceCredit.label}
          </a>
        )}
      </div>
    </dialog>
  );
}
