import { useEffect } from 'react';
import styles from './ImageLightbox.module.css';

export default function ImageLightbox({ open, src, title, onClose }) {
  useEffect(() => {
    if (!open) return undefined;
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className={styles.overlay} role="presentation" onClick={onClose}>
      <figure className={styles.figure} onClick={(event) => event.stopPropagation()}>
        <button type="button" className={styles.close} onClick={onClose} aria-label="Chiudi">
          <i className="fa-solid fa-xmark" aria-hidden="true" />
        </button>
        <img src={src} alt={title} />
        {title && <figcaption>{title}</figcaption>}
      </figure>
    </div>
  );
}
