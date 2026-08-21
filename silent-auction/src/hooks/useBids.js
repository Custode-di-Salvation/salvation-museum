import { useEffect, useState } from 'react';
import { onValue, ref } from 'firebase/database';
import { db, hasFirebaseConfig } from '../firebase';

/**
 * Sottoscrive in tempo reale (onValue, nessun polling) tutte le offerte per una
 * singola opera, salvate in /bids/{workId}/{pushId} = { pgName, amount, timestamp }.
 *
 * Ritorna:
 *  - history: array di offerte ordinate dalla più recente alla più vecchia
 *  - highest: l'offerta più alta corrente (o null se nessuno ha ancora offerto)
 *  - loading: true finché non arriva la prima risposta da Firebase
 */
export function useBids(workId) {
  const [bids, setBids] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!hasFirebaseConfig) {
      setLoading(false);
      return undefined;
    }
    const bidsRef = ref(db, `bids/${workId}`);
    const unsubscribe = onValue(
      bidsRef,
      (snapshot) => {
        const value = snapshot.val() || {};
        const list = Object.entries(value).map(([key, bid]) => ({ key, ...bid }));
        list.sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));
        setBids(list);
        setLoading(false);
      },
      (error) => {
        // eslint-disable-next-line no-console
        console.error(`[useBids] lettura offerte fallita per ${workId}:`, error);
        setLoading(false);
      }
    );
    return () => unsubscribe();
  }, [workId]);

  const highest = bids.length > 0
    ? bids.reduce((max, bid) => (bid.amount > max.amount ? bid : max), bids[0])
    : null;

  return { history: bids, highest, loading };
}
