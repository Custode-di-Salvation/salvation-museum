import { useEffect, useRef } from 'react';
import styles from './ConfirmModal.module.css';

export default function ConfirmModal({ open, title, message, onConfirm, onCancel, confirmLabel = 'Conferma', cancelLabel = 'Annulla', busy = false }) {
  const confirmRef = useRef(null);

  useEffect(() => {
    if (open) confirmRef.current?.focus();
  }, [open]);

  useEffect(() => {
    if (!open) return undefined;
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onCancel();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, onCancel]);

  if (!open) return null;

  return (
    <div className={styles.overlay} role="presentation" onClick={onCancel}>
      <div
        className={styles.box}
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirm-modal-title"
        onClick={(event) => event.stopPropagation()}
      >
        {title && <h3 id="confirm-modal-title" className={styles.title}>{title}</h3>}
        <p className={styles.message}>{message}</p>
        <div className={styles.actions}>
          <button type="button" className={styles.cancel} onClick={onCancel} disabled={busy}>
            {cancelLabel}
          </button>
          <button type="button" className={styles.confirm} onClick={onConfirm} disabled={busy} ref={confirmRef}>
            {busy ? 'Invio…' : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
