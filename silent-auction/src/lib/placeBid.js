import { push, ref, remove, serverTimestamp } from 'firebase/database';
import { db, hasFirebaseConfig } from '../firebase';

/**
 * Valida un'offerta rispetto alla base d'asta e all'offerta più alta corrente.
 * Ritorna null se valida, altrimenti un messaggio d'errore pronto per l'utente.
 */
export function validateBid({ pgName, amount, basePrice, highestAmount }) {
  if (!pgName || !pgName.trim()) {
    return 'Inserisci il nome del tuo PG.';
  }
  if (!Number.isFinite(amount) || amount <= 0) {
    return 'Inserisci un importo valido.';
  }
  const floor = highestAmount != null ? Math.max(basePrice, highestAmount) : basePrice;
  if (amount <= floor) {
    return highestAmount != null
      ? `L'offerta deve superare quella attuale di $${formatAmount(highestAmount)}.`
      : `L'offerta deve superare la base d'asta di $${formatAmount(basePrice)}.`;
  }
  return null;
}

export function formatAmount(amount) {
  return Number(amount).toLocaleString('it-IT');
}

/** Scrive una nuova offerta in /bids/{workId}. Il timestamp è assegnato dal server Firebase. */
export async function placeBid(workId, { pgName, amount }) {
  if (!hasFirebaseConfig) {
    throw new Error(
      'Firebase non è configurato: copia .env.example in .env.local con le credenziali del progetto.'
    );
  }
  const bidsRef = ref(db, `bids/${workId}`);
  await push(bidsRef, {
    pgName: pgName.trim(),
    amount,
    timestamp: serverTimestamp(),
  });
}

/** Rimuove una singola offerta (per l'annullamento di un'offerta propria sbagliata). */
export async function cancelBid(workId, bidKey) {
  if (!hasFirebaseConfig) {
    throw new Error(
      'Firebase non è configurato: copia .env.example in .env.local con le credenziali del progetto.'
    );
  }
  await remove(ref(db, `bids/${workId}/${bidKey}`));
}
