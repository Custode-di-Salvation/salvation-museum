import { formatAmount } from '../../lib/placeBid';
import styles from './BidHistory.module.css';

function formatTimestamp(timestamp) {
  if (!timestamp || typeof timestamp !== 'number') return '—';
  return new Date(timestamp).toLocaleString('it-IT', {
    day: '2-digit',
    month: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export default function BidHistory({ history, myUid, canCancel, onRequestCancel }) {
  return (
    <details className={styles.panel}>
      <summary className={styles.summary}>
        Storico offerte
        <span className={styles.count}>{history.length}</span>
      </summary>
      <div className={styles.body}>
        {history.length === 0 ? (
          <p className={styles.empty}>Nessuna offerta registrata finora.</p>
        ) : (
          <ol className={styles.list}>
            {history.map((bid) => {
              const isOwn = Boolean(myUid) && bid.ownerUid === myUid;
              return (
                <li key={bid.key}>
                  <span className={styles.pg}>{bid.pgName}</span>
                  <span className={styles.amount}>${formatAmount(bid.amount)}</span>
                  <span className={styles.time}>{formatTimestamp(bid.timestamp)}</span>
                  {canCancel && isOwn && (
                    <button
                      type="button"
                      className={styles.cancel}
                      onClick={() => onRequestCancel(bid)}
                    >
                      Annulla
                    </button>
                  )}
                </li>
              );
            })}
          </ol>
        )}
      </div>
    </details>
  );
}
