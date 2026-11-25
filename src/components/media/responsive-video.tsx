import { useEffect, useRef, useState } from 'react';
import { AudioLines, Pause, Play, Volume2 } from 'lucide-react';
import styles from './responsive-video.module.css';
export interface VideoSource {
  src: string;
  poster: string;
  description: string;
  verticalSrc?: string;
  rotateToLandscape?: boolean;
}
export function ResponsiveVideo({
  source,
  autoPlay = false,
}: {
  source: VideoSource;
  autoPlay?: boolean;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const onPlay = (event: Event) => {
      if (event.target !== video) video.pause();
    };
    document.addEventListener('play', onPlay, true);
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    const connection = (
      navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }
    ).connection;
    if (
      autoPlay &&
      !reduced.matches &&
      !connection?.saveData &&
      !connection?.effectiveType?.includes('2g')
    )
      void video.play().catch(() => {});
    const pauseHidden = () => {
      if (document.hidden) video.pause();
    };
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry?.isIntersecting) video.pause();
    });
    observer.observe(video);
    document.addEventListener('visibilitychange', pauseHidden);
    return () => {
      document.removeEventListener('play', onPlay, true);
      document.removeEventListener('visibilitychange', pauseHidden);
      observer.disconnect();
    };
  }, [autoPlay]);
  return (
    <div className={styles.player}>
      <div className={styles.stage}>
        <video
          ref={ref}
          className={source.rotateToLandscape ? styles.rotated : undefined}
          poster={source.poster}
          muted={muted}
          playsInline
          loop
          preload="none"
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onError={() => setFailed(true)}
          onTimeUpdate={() => {
            const video = ref.current;
            if (video?.duration) setProgress((video.currentTime / video.duration) * 100);
          }}
          aria-label={source.description}
        >
          {source.verticalSrc && <source src={source.verticalSrc} media="(max-width: 767px)" />}
          <source src={source.src} />
        </video>
        {failed ? (
          <p>Vídeo indisponível. {source.description}</p>
        ) : (
          <div className={styles.controls}>
            <button
              aria-label={playing ? 'Pausar vídeo' : 'Reproduzir vídeo'}
              onClick={() => {
                const video = ref.current;
                if (!video) return;
                if (playing) video.pause();
                else void video.play().catch(() => setFailed(true));
              }}
            >
              {playing ? <Pause aria-hidden="true" /> : <Play aria-hidden="true" />}
              <span>{playing ? 'Pausar' : 'Ver vídeo'}</span>
            </button>
            <button
              aria-label={muted ? 'Ativar som' : 'Desativar som'}
              aria-pressed={!muted}
              onClick={() => setMuted(!muted)}
            >
              {muted ? <AudioLines aria-hidden="true" /> : <Volume2 aria-hidden="true" />}
              <span className={styles.desktopLabel}>
                {muted ? 'Clique para ouvir o som' : 'Som ativado'}
              </span>
              <span className={styles.mobileLabel}>{muted ? 'Ouvir o som' : 'Som ativado'}</span>
            </button>
          </div>
        )}
        <progress
          className={styles.progress}
          max="100"
          value={progress}
          aria-label="Progresso do vídeo"
        />
      </div>
      <p className={styles.description}>{source.description}</p>
    </div>
  );
}
