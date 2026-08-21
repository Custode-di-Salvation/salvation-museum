import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

// Le credenziali arrivano dalle variabili d'ambiente VITE_FIREBASE_* (vedi .env.example).
// Nessun segreto è hardcoded: senza un .env.local valido l'app parte comunque,
// ma i listener Firebase non riceveranno dati (vedi avviso in console).
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Senza databaseURL, getDatabase() lancia un errore fatale che manda in crash
// l'intero render: meglio restare senza connessione e lasciare che l'app mostri
// comunque le opere (senza offerte live), avvisando in console.
export const hasFirebaseConfig = Boolean(firebaseConfig.databaseURL);

if (!hasFirebaseConfig) {
  // eslint-disable-next-line no-console
  console.warn(
    '[firebase] VITE_FIREBASE_DATABASE_URL non impostata: copia .env.example in .env.local e compilalo con le credenziali del tuo progetto Firebase. Finché non è impostata, offerte e stato asta restano non collegati.'
  );
}

export const app = hasFirebaseConfig ? initializeApp(firebaseConfig) : null;
export const db = hasFirebaseConfig ? getDatabase(app) : null;
