import { useEffect, useState } from 'react';

const PREFIX = 'silent-auction:my-bids:';

function readMyBidKeys(workId) {
  try {
    const raw = window.localStorage.getItem(PREFIX + workId);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

/**
 * Tiene traccia, per questa singola opera, di quali chiavi di offerta sono state
 * fatte da QUESTO browser — indipendentemente da cosa viene scritto dopo nel campo
 * "Nome PG". Così il pulsante "Annulla" resta disponibile sulle proprie offerte
 * anche se nel frattempo si cambia nome per provarne un'altra.
 */
export function useMyBids(workId) {
  const [myBidKeys, setMyBidKeys] = useState(() => readMyBidKeys(workId));

  useEffect(() => {
    setMyBidKeys(readMyBidKeys(workId));
  }, [workId]);

  const rememberBid = (bidKey) => {
    setMyBidKeys((prev) => {
      const next = prev.includes(bidKey) ? prev : [...prev, bidKey];
      try {
        window.localStorage.setItem(PREFIX + workId, JSON.stringify(next));
      } catch {
        // localStorage non disponibile: l'offerta resta comunque valida,
        // semplicemente non si potrà annullare da qui in automatico.
      }
      return next;
    });
  };

  return { myBidKeys, rememberBid };
}
