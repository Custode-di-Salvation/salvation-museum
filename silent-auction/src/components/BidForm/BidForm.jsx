import { useState } from 'react';
import ConfirmModal from '../ConfirmModal/ConfirmModal';
import { formatAmount, placeBid, validateBid } from '../../lib/placeBid';
import styles from './BidForm.module.css';

export default function BidForm({ work, highest, disabled, pgName, onPgNameChange, ownerUid }) {
  const [amountInput, setAmountInput] = useState('');
  const [error, setError] = useState(null);
  const [pendingAmount, setPendingAmount] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setError(null);

    const amount = Number(amountInput);
    const validationError = validateBid({
      pgName,
      amount,
      basePrice: work.basePrice,
      highestAmount: highest?.amount ?? null,
    });

    if (validationError) {
      setError(validationError);
      return;
    }

    setPendingAmount(amount);
  };

  const handleConfirm = async () => {
    setSubmitting(true);
    try {
      await placeBid(work.id, { pgName, amount: pendingAmount, ownerUid });
      setAmountInput('');
      setPendingAmount(null);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('[BidForm] invio offerta fallito:', err);
      setError("Invio dell'offerta fallito: riprova tra qualche istante.");
      setPendingAmount(null);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.fields}>
          <label className={styles.field}>
            <span className={styles.label}>Nome PG</span>
            <input
              type="text"
              value={pgName}
              onChange={(event) => onPgNameChange(event.target.value)}
              placeholder="Es. Charlie"
              disabled={disabled}
              required
            />
          </label>
          <label className={styles.field}>
            <span className={styles.label}>Offerta ($)</span>
            <input
              type="number"
              min={1}
              step={1}
              value={amountInput}
              onChange={(event) => setAmountInput(event.target.value)}
              placeholder={String(Math.max(work.basePrice, highest?.amount ?? 0) + 100)}
              disabled={disabled}
              required
            />
          </label>
        </div>
        {error && <p className={styles.error}>{error}</p>}
        <button type="submit" className={styles.submit} disabled={disabled}>
          <i className="fa-solid fa-gavel" aria-hidden="true" /> Fai un'offerta
        </button>
      </form>

      <ConfirmModal
        open={pendingAmount !== null}
        title="Conferma offerta"
        message={`Confermi l'offerta di $${formatAmount(pendingAmount ?? 0)} per "${work.title}"?`}
        confirmLabel="Confermo"
        busy={submitting}
        onCancel={() => setPendingAmount(null)}
        onConfirm={handleConfirm}
      />
    </>
  );
}
