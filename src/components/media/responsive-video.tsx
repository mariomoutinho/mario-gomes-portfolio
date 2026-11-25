import { useEffect, useRef, useState } from 'react';
import { Pause, Play } from 'lucide-react';
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
  const [progress, setProgress] = useState(0);
  const [failed, setFailed] = useState(false);
  const [controlsVisible, setControlsVisible] = useState(true);
  const [interaction, setInteraction] = useState(0);
  const revealControls = () => {
    setControlsVisible(true);
    setInteraction((value) => value + 1);
  };
  useEffect(() => {
    if (!playing) return;
    const timer = window.setTimeout(() => setControlsVisible(false), 1000);
    return () => window.clearTimeout(timer);
  }, [playing, interaction]);
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
    ) {
      video.muted = false;
      // Bloqueio de autoplay com som mantém a capa e o botão disponíveis.
      void video.play().catch(() => {});
    }
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
      <div
        className={styles.stage}
        data-controls-visible={controlsVisible}
        onPointerDown={(event) => {
          if (event.target === ref.current) revealControls();
        }}
      >
        <video
          ref={ref}
          className={source.rotateToLandscape ? styles.rotated : undefined}
          poster={source.poster}
          muted={false}
          playsInline
          loop
          preload="none"
          onPlay={() => setPlaying(true)}
          onPause={() => {
            setPlaying(false);
            setControlsVisible(true);
          }}
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
          <p className={styles.error} role="status">
            Vídeo indisponível. {source.description}
          </p>
        ) : (
          <button
            className={styles.control}
            aria-label={playing ? 'Pausar vídeo' : 'Reproduzir vídeo com som'}
            onClick={() => {
              const video = ref.current;
              if (!video) return;
              revealControls();
              if (!video.paused) video.pause();
              else {
                video.muted = false;
                void video.play().catch(() => setFailed(true));
              }
            }}
          >
            {playing ? <Pause aria-hidden="true" /> : <Play aria-hidden="true" />}
          </button>
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
