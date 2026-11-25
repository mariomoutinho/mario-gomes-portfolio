import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import styles from './header.module.css';
import { BrandLogo } from './brand-logo';
const links = [
  ['trabalhos', 'Trabalhos'],
  ['sobre', 'Sobre'],
  ['servicos', 'Serviços'],
  ['processo', 'Processo'],
] as const;
export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 24);
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);
  useEffect(() => {
    const node = dialog.current;
    if (open) node?.showModal();
    else node?.close();
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);
  const close = () => {
    setOpen(false);
    trigger.current?.focus();
  };
  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <a className={styles.brand} href="#inicio" aria-label="Mário Gomes — início">
        <BrandLogo />
      </a>
      <nav className={styles.desktop} aria-label="Principal">
        {links.map(([id, label]) => (
          <a key={id} href={`#${id}`}>
            {label}
          </a>
        ))}
      </nav>
      <a className={styles.contact} href="#contato">
        Vamos conversar <ArrowUpRight size={16} />
      </a>
      <button
        ref={trigger}
        className={styles.toggle}
        aria-label="Abrir menu"
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen(true)}
      >
        <Menu />
      </button>
      <dialog
        ref={dialog}
        id="mobile-menu"
        className={styles.panel}
        aria-label="Menu principal"
        onKeyDown={(event) => {
          if (event.key !== 'Tab') return;
          const items = dialog.current?.querySelectorAll<HTMLElement>('button, a[href]');
          const first = items?.[0];
          const last = items?.[items.length - 1];
          if (event.shiftKey && document.activeElement === first) {
            event.preventDefault();
            last?.focus();
          } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first?.focus();
          }
        }}
        onCancel={close}
        onClose={() => {
          setOpen(false);
          trigger.current?.focus();
        }}
      >
        <div className={styles.panelTop}>
          <span className={styles.brand}>
            <BrandLogo />
          </span>
          <button aria-label="Fechar menu" onClick={close}>
            <X />
          </button>
        </div>
        <div className={styles.panelContent}>
          <p className={styles.panelEyebrow}>BEYOND THE FRAME</p>
          <nav aria-label="Navegação mobile">
            {[...links, ['contato', 'Contato']].map(([id, label]) => (
              <a key={id} href={`#${id}`} onClick={close}>
                {label}
              </a>
            ))}
          </nav>
        </div>
        <p className={styles.panelFooter}>
          Imagem. Ritmo. <span>Intenção.</span>
        </p>
      </dialog>
    </header>
  );
}
