import { portfolio } from '../data/media';
import { ResponsiveVideo } from '../components/media/responsive-video';
import { CinematicReveal } from '../components/motion/cinematic-effects';
import styles from './portfolio-gallery.module.css';
export function PortfolioGallery() {
  return (
    <div className={styles.gallery}>
      {portfolio.map((project, index) => (
        <article
          key={project.name}
          className={project.height > project.width ? styles.vertical : styles.horizontal}
        >
          <CinematicReveal>
            {project.video ? (
              <ResponsiveVideo source={project.video} />
            ) : (
              <img
                src={project.image}
                alt={project.description}
                width={project.width}
                height={project.height}
                loading="lazy"
              />
            )}
          </CinematicReveal>
          <p className={styles.category}>
            0{index + 1} / {project.category}
          </p>
          <h3>{project.name}</h3>
          <p>{project.description}</p>
        </article>
      ))}
    </div>
  );
}
