import { useEffect, useState } from 'react';

const STORAGE_KEY = 'silent-auction:pg-name';

/** Ricorda il nome del PG in localStorage, così l'utente non deve riscriverlo ad ogni offerta. */
export function usePgName() {
  const [pgName, setPgName] = useState('');

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved) setPgName(saved);
    } catch {
      // localStorage non disponibile (es. modalità privata): l'app funziona comunque,
      // semplicemente il nome non verrà ricordato.
    }
  }, []);

  const updatePgName = (value) => {
    setPgName(value);
    try {
      window.localStorage.setItem(STORAGE_KEY, value);
    } catch {
      // vedi sopra
    }
  };

  return [pgName, updatePgName];
}
