import {
  ArrowRight,
  ArrowUpRight,
  Check,
  CirclePlay,
  Clapperboard,
  Info,
  Video,
} from 'lucide-react';
import { editingMaterials } from '../data/editing-process';
import { siteContent } from '../data/site-content';
import { ProductionTimeline } from './production-timeline';
import styles from './editing-process.module.css';

const handoff = [
  { icon: Video, title: 'Você grava', description: 'Captação do material.' },
  { icon: Clapperboard, title: 'Eu edito', description: 'Pós-produção.' },
  { icon: CirclePlay, title: 'Você recebe', description: 'Vídeo finalizado.' },
];
const message =
  'Olá, Mário! Tenho um material gravado e gostaria de solicitar um orçamento para edição de vídeo.';

export function EditingProcess() {
  const contactUrl = siteContent.whatsapp
    ? `https://wa.me/${siteContent.whatsapp}?text=${encodeURIComponent(message)}`
    : undefined;
  return (
    <div className={styles.content}>
      <header className={styles.heading}>
        <p className={styles.eyebrow}>05 / PROCESSO</p>
        <h2 id="process-title">
          Você grava.
          <br />
          <span>Eu transformo.</span>
        </h2>
        <p className={styles.introduction}>
          Envie seus vídeos já gravados e deixe a edição comigo. Transformo seu material bruto em um
          conteúdo com ritmo, identidade e intenção, preparado para o seu objetivo.
        </p>
      </header>
      <ol className={styles.handoff} aria-label="Da gravação ao vídeo finalizado">
        {handoff.map(({ icon: Icon, title, description }, index) => (
          <li key={title}>
            <span className={styles.handoffTop}>
              <Icon size={22} aria-hidden="true" />
              <span>0{index + 1}</span>
            </span>
            <strong>{title}</strong>
            <p>{description}</p>
            {index < handoff.length - 1 && (
              <ArrowRight className={styles.connector} size={14} aria-hidden="true" />
            )}
          </li>
        ))}
      </ol>
      <p className={styles.scope}>
        <Info size={16} aria-hidden="true" />
        <span>
          Serviço especializado em edição de vídeo e pós-produção. A captação das imagens é de
          responsabilidade do cliente e não está inclusa no serviço.
        </span>
      </p>
      <ProductionTimeline />
      <div className={styles.materials}>
        <h3>O que preciso de você?</h3>
        <p>
          Para começarmos seu projeto, prepare os seguintes materiais, conforme a necessidade da
          edição:
        </p>
        <ul>
          {editingMaterials.map((item) => (
            <li key={item.title}>
              <Check size={16} aria-hidden="true" />
              <div>
                <strong>{item.title}</strong>
                <span>{item.description}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.contact}>
        <h3>Já tem seu material gravado?</h3>
        {contactUrl ? (
          <a className={styles.contactButton} href={contactUrl} target="_blank" rel="noreferrer">
            Vamos editar seu próximo vídeo. <ArrowUpRight size={18} aria-hidden="true" />
          </a>
        ) : (
          <>
            <button className={styles.contactButton} type="button" disabled>
              Vamos editar seu próximo vídeo. <ArrowUpRight size={18} aria-hidden="true" />
            </button>
            <p>Canal de contato em breve.</p>
          </>
        )}
      </div>
    </div>
  );
}
