import { useEffect, useState } from 'react';
import { onAuthStateChanged, signInAnonymously } from 'firebase/auth';
import { auth, hasFirebaseConfig } from '../firebase';

/**
 * Autentica il browser in modo anonimo (nessun form, nessun login visibile)
 * così ogni visitatore ha un uid stabile e univoco. Serve solo perché le regole
 * del Realtime Database possano verificare "questa offerta è davvero tua?"
 * prima di permettere di modificarla o cancellarla — impedisce che un utente
 * possa toccare le offerte di un altro.
 */
export function useAnonymousAuth() {
  const [uid, setUid] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!hasFirebaseConfig) {
      setReady(true);
      return undefined;
    }

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUid(user.uid);
        setReady(true);
      } else {
        signInAnonymously(auth).catch((err) => {
          // eslint-disable-next-line no-console
          console.error(
            '[useAnonymousAuth] accesso anonimo fallito — controlla che "Anonymous" sia abilitato in Firebase Console → Authentication → Sign-in method:',
            err
          );
          setReady(true);
        });
      }
    });

    return () => unsubscribe();
  }, []);

  return { uid, ready };
}
