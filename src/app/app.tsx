import { useState, type PointerEvent, type CSSProperties } from 'react';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { showreel, portrait } from '../data/media';
import { ResponsiveVideo } from '../components/media/responsive-video';
import { PortfolioSection } from '../sections/portfolio-section';
import { Header } from '../components/layout/header';
import { BrandLogo } from '../components/layout/brand-logo';
import {
  CinematicAmbientLight,
  CinematicLightFlow,
  CinematicReveal,
} from '../components/motion/cinematic-effects';
import { ProductionTimeline } from '../sections/production-timeline';
import { ServiceAccordion } from '../sections/services-section';
import { RippleLink } from '../components/ui/ripple-link';
import { contactUrl } from '../data/site-content';
import styles from './app.module.css';

export function App() {
  const [spotlight, setSpotlight] = useState({ x: 0, y: 0, visible: false });
  const updateSpotlight = (event: PointerEvent<HTMLElement>) => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    const rect = event.currentTarget.getBoundingClientRect();
    setSpotlight({ x: event.clientX - rect.left, y: event.clientY - rect.top, visible: true });
  };
  return (
    <div>
      <a className={styles.skip} href="#conteudo">
        Pular para o conteúdo
      </a>
      <Header />
      <main id="conteudo">
        <section
          className={`${styles.hero} ${styles.videoHero}`}
          id="inicio"
          aria-label="Abertura cinematográfica"
          onPointerMove={updateSpotlight}
          onPointerLeave={() => setSpotlight((value) => ({ ...value, visible: false }))}
        >
          <CinematicAmbientLight />
          <div
            className={styles.spotlight}
            aria-hidden="true"
            style={
              {
                '--x': `${spotlight.x}px`,
                '--y': `${spotlight.y}px`,
                opacity: spotlight.visible ? 1 : 0,
              } as CSSProperties
            }
          />
          <div className={styles.heroTop}>
            <span>MÁRIO GOMES / FILM EDITOR</span>
            <span>IMAGEM. RITMO. INTENÇÃO.</span>
          </div>
          <div className={`${styles.frame} ${styles.videoFrame}`}>
            {showreel ? (
              <ResponsiveVideo source={showreel} autoPlay />
            ) : (
              <>
                <div className={styles.frameCorner} aria-hidden="true" />
                <span className={styles.frameLabel}>SHOWREEL / EM BREVE</span>
                <div className={styles.pendingReel}>
                  <span className={styles.frameWord} aria-hidden="true">
                    frame.
                  </span>
                  <p>Um espaço para histórias em movimento.</p>
                  <span>Showreel aguardando material audiovisual.</span>
                </div>
                <div className={styles.frameBottom}>
                  <span>EDIÇÃO DE VÍDEO</span>
                  <span>— : —</span>
                </div>
              </>
            )}
          </div>
          <div className={styles.heroBottom}>
            <a href="#posicionamento">
              CONTINUE A HISTÓRIA <ArrowDown size={16} />
            </a>
          </div>
        </section>
        <section id="posicionamento" className={`${styles.section} ${styles.light}`}>
          <p className={styles.eyebrow}>01 / MÁRIO GOMES — EDIÇÃO DE VÍDEO</p>
          <div className={styles.introduction}>
            <CinematicReveal>
              <h1>
                Imagens
                <br />
                ganham <span>sentido.</span>
              </h1>
            </CinematicReveal>
            <div className={styles.introCopy}>
              <p>
                Edição de vídeo que transforma imagens em narrativas, conectando ritmo, intenção e
                identidade visual.
              </p>
              <a className={styles.buttonDark} href="#trabalhos">
                Conheça meu trabalho <ArrowUpRight size={18} />
              </a>
              <a className={styles.textLink} href="#contato">
                Solicitar orçamento <ArrowUpRight size={16} />
              </a>
            </div>
          </div>
        </section>
        <PortfolioSection />
        <section id="sobre" className={`${styles.section} ${styles.light}`}>
          <div className={styles.about}>
            <CinematicReveal>
              {portrait ? (
                <div className={styles.portraitFrame}>
                  <img
                    className={styles.portraitImage}
                    src={portrait.src}
                    alt={portrait.alt}
                    width={portrait.width}
                    height={portrait.height}
                    loading="lazy"
                  />
                </div>
              ) : (
                <div className={styles.portrait}>
                  <span aria-hidden="true">
                    Mário
                    <br />
                    Gomes.
                  </span>
                  <p>Fotografia profissional a adicionar.</p>
                </div>
              )}
            </CinematicReveal>
            <div>
              <p className={styles.eyebrow}>03 / POR TRÁS DAS IMAGENS</p>
              <CinematicReveal>
                <h2>
                  Por trás de
                  <br />
                  cada frame.
                </h2>
              </CinematicReveal>
              <p className={styles.aboutCopy}>Mário Gomes. Editor de vídeo.</p>
              <p className={styles.muted}>
                Ritmo, intenção e identidade visual conectam as imagens à história que elas podem
                contar.
              </p>
              <span className={styles.editorialNote}>
                Apresentação profissional completa em preparação.
              </span>
            </div>
          </div>
        </section>
        <section id="servicos" className={`${styles.section} ${styles.services}`}>
          <CinematicLightFlow simplified />
          <div className={styles.foreground}>
            <p className={styles.eyebrow}>04 / SERVIÇOS</p>
            <CinematicReveal>
              <h2>Possibilidades.</h2>
            </CinematicReveal>
            <p className={styles.sectionCopy}>
              Soluções audiovisuais para diferentes formas de contar histórias.
            </p>
            <ServiceAccordion />
          </div>
        </section>
        <section id="processo" className={`${styles.section} ${styles.process}`}>
          <p className={styles.eyebrow}>05 / O PROCESSO</p>
          <CinematicReveal>
            <h2>
              Do material bruto
              <br />
              ao resultado final.
            </h2>
          </CinematicReveal>
          <ProductionTimeline />
        </section>
        <section id="contato" className={styles.contact}>
          <CinematicLightFlow />
          <div className={styles.contactGlass}>
            <p className={styles.eyebrow}>06 / VAMOS CONVERSAR</p>
            <h2>
              Sua próxima
              <br />
              história
              <br />
              <span>começa aqui.</span>
            </h2>
            <p>Da primeira ideia ao último frame.</p>
            {contactUrl ? (
              <RippleLink href={contactUrl} />
            ) : (
              <>
                <button className={styles.finalButton} disabled>
                  Solicitar orçamento <ArrowUpRight size={18} />
                </button>
                <p className={styles.contactNote}>Canal de contato em breve.</p>
              </>
            )}
          </div>
        </section>
      </main>
      <footer className={styles.footer}>
        <a href="#inicio">
          <BrandLogo />
        </a>
        <p>Imagem. Ritmo. Intenção.</p>
        <a href="#inicio" className={styles.backTop}>
          Voltar ao início ↑
        </a>
      </footer>
    </div>
  );
}
