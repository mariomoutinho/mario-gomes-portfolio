import { useEffect, useRef, useState } from 'react';
import { Pause, Play, Volume2, VolumeX } from 'lucide-react';
import styles from './responsive-video.module.css';
export interface VideoSource {
  src: string;
  poster: string;
  description: string;
  verticalSrc?: string;
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
      <video
        ref={ref}
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
            {playing ? <Pause /> : <Play />}
          </button>
          <button
            aria-label={muted ? 'Ativar som' : 'Desativar som'}
            onClick={() => setMuted(!muted)}
          >
            {muted ? <VolumeX /> : <Volume2 />}
          </button>
          <progress max="100" value={progress} aria-label="Progresso do vídeo" />
        </div>
      )}
      <p className={styles.description}>{source.description}</p>
    </div>
  );
}
