import { useEffect, useState } from 'react';
import { onValue, ref } from 'firebase/database';
import { db, hasFirebaseConfig } from '../firebase';
import { AUCTION_CLOSE_DATE } from '../data/artists';

/**
 * L'asta è considerata chiusa se:
 *  - il flag `auctionOpen` su Firebase è stato messo a false a mano, oppure
 *  - è stata superata la data di chiusura automatica (20 settembre 2026).
 *
 * Finché il nodo `auctionOpen` non esiste su Firebase, si assume true (asta aperta):
 * così l'app funziona anche prima di aver impostato il flag manualmente.
 */
export function useAuctionStatus() {
  const [remoteOpen, setRemoteOpen] = useState(true);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!hasFirebaseConfig) {
      setLoaded(true);
      return undefined;
    }
    const flagRef = ref(db, 'auctionOpen');
    const unsubscribe = onValue(
      flagRef,
      (snapshot) => {
        const value = snapshot.val();
        setRemoteOpen(value === null ? true : value === true);
        setLoaded(true);
      },
      (error) => {
        // eslint-disable-next-line no-console
        console.error('[useAuctionStatus] lettura auctionOpen fallita:', error);
        setLoaded(true);
      }
    );
    return () => unsubscribe();
  }, []);

  const pastDeadline = Date.now() >= AUCTION_CLOSE_DATE.getTime();
  const isOpen = remoteOpen && !pastDeadline;

  return { isOpen, loaded, closedByDeadline: pastDeadline && remoteOpen };
}
