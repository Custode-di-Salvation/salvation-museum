import { useState } from 'react';
import { useAnonymousAuth } from '../../hooks/useAnonymousAuth';
import { useBids } from '../../hooks/useBids';
import { usePgName } from '../../hooks/usePgName';
import { cancelBid, formatAmount } from '../../lib/placeBid';
import BidForm from '../BidForm/BidForm';
import BidHistory from '../BidHistory/BidHistory';
import ConfirmModal from '../ConfirmModal/ConfirmModal';
import ImageLightbox from '../ImageLightbox/ImageLightbox';
import styles from './ArtworkCard.module.css';

export default function ArtworkCard({ work, auctionOpen }) {
  const { history, highest, loading } = useBids(work.id);
  // Nome PG indipendente per ogni opera: scrivere in un'opera non deve
  // aggiornare live il campo delle altre opere già a schermo.
  const [pgName, setPgName] = usePgName();
  // Identità anonima stabile di questo browser: usata per marcare "di chi è"
  // ogni offerta, così le regole del database impediscono di cancellare
  // offerte altrui (vedi firebase.rules.json).
  const { uid, ready: authReady } = useAnonymousAuth();

  const [cancelTarget, setCancelTarget] = useState(null);
  const [cancelling, setCancelling] = useState(false);
  const [cancelError, setCancelError] = useState(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const handleConfirmCancel = async () => {
    setCancelling(true);
    setCancelError(null);
    try {
      await cancelBid(work.id, cancelTarget.key);
      setCancelTarget(null);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('[ArtworkCard] annullamento offerta fallito:', err);
      setCancelError(
        "Annullamento fallito: puoi cancellare solo le tue offerte, o riprova tra qualche istante."
      );
    } finally {
      setCancelling(false);
    }
  };

  return (
    <article className={styles.card}>
      {work.image && (
        <div className={styles.imageWrap}>
          <img src={work.image} alt={`${work.title}, ${work.technique.toLowerCase()}`} loading="lazy" />
          <button type="button" className={styles.viewFull} onClick={() => setLightboxOpen(true)}>
            <i className="fa-solid fa-up-right-and-down-left-from-center" aria-hidden="true" /> Vedi per intero
          </button>
        </div>
      )}

      <div className={styles.body}>
        <h4 className={styles.title}>
          {work.title} {work.year && <span className={styles.year}>({work.year})</span>}
        </h4>
        <p className={styles.meta}>
          {work.technique} · {work.dimensions}
        </p>
        <p className={styles.base}>
          Base d'asta: <strong>${formatAmount(work.basePrice)}</strong>
        </p>

        <div className={styles.currentBid}>
          {loading ? (
            <span className={styles.currentLabel}>Caricamento offerte…</span>
          ) : highest ? (
            <>
              <span className={styles.currentLabel}>Offerta più alta</span>
              <span className={styles.currentAmount}>${formatAmount(highest.amount)}</span>
              <span className={styles.currentPg}>{highest.pgName}</span>
            </>
          ) : (
            <>
              <span className={styles.currentLabel}>Nessuna offerta</span>
              <span className={styles.noBidBase}>
                Base d'asta: <strong>${formatAmount(work.basePrice)}</strong>
              </span>
            </>
          )}
        </div>

        {auctionOpen ? (
          <BidForm
            work={work}
            highest={highest}
            disabled={loading || !authReady}
            pgName={pgName}
            onPgNameChange={setPgName}
            ownerUid={uid}
          />
        ) : (
          <p className={styles.closedNote}>Le offerte sono chiuse per quest'opera.</p>
        )}

        {cancelError && <p className={styles.cancelError}>{cancelError}</p>}

        <BidHistory
          history={history}
          myUid={uid}
          canCancel={auctionOpen}
          onRequestCancel={(bid) => {
            setCancelError(null);
            setCancelTarget(bid);
          }}
        />
      </div>

      <ConfirmModal
        open={cancelTarget !== null}
        title="Annulla offerta"
        message={`Vuoi annullare la tua offerta di $${formatAmount(cancelTarget?.amount ?? 0)} per "${work.title}"? Non si può recuperare.`}
        confirmLabel="Sì, annulla"
        cancelLabel="Mantieni offerta"
        busy={cancelling}
        onCancel={() => setCancelTarget(null)}
        onConfirm={handleConfirmCancel}
      />

      {work.image && (
        <ImageLightbox
          open={lightboxOpen}
          src={work.image}
          title={work.year ? `${work.title} (${work.year})` : work.title}
          onClose={() => setLightboxOpen(false)}
        />
      )}
    </article>
  );
}
