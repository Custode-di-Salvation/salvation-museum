# Quel che la montagna conserva — Silent Auction

Webapp per la silent auction dell'evento del Salvation Museum. Vite + React,
persistenza su Firebase Realtime Database (offerte condivise in tempo reale tra
tutti gli utenti, nessun backend custom).

## Setup

```bash
npm install
cp .env.example .env.local
```

Poi compila `.env.local` con le credenziali del tuo progetto Firebase:

1. Vai su [console.firebase.google.com](https://console.firebase.google.com) e crea
   un progetto (piano gratuito Spark, sufficiente per un evento).
2. **Build → Realtime Database → Create Database** (scegli una region, es. `europe-west1`).
3. Nella tab **Rules**, incolla il contenuto di `firebase.rules.json` (lettura/scrittura
   aperte: non c'è autenticazione, coerente col fatto che l'app non ha un backend —
   pensato per un evento fidato, non per produzione pubblica).
4. **Project settings → General → Your apps → Web app (</>) → registra un'app** e copia
   i valori dell'oggetto `firebaseConfig` dentro `.env.local` (incluso `databaseURL`,
   tipo `https://<project-id>-default-rtdb.<region>.firebasedatabase.app`).

## Sviluppo locale

```bash
npm run dev
```

Apre l'app su `http://localhost:5173` (o la prima porta libera). Senza un `.env.local`
valido l'app parte comunque (mostra "Nessuna offerta" per ogni opera), ma i listener
Firebase non ricevono/scrivono dati — in console compare un warning.

## Struttura dati su Firebase (Realtime Database)

```
/auctionOpen: true | false          # flag manuale, gestibile dalla console Firebase
/bids/{workId}/{pushId}:
  pgName: string
  amount: number
  timestamp: number (server timestamp)
```

Il `workId` è l'`id` dell'opera definito in `src/data/artists.js`.

## Aggiungere opere/artisti

Basta aggiungere un oggetto all'array `artists` in `src/data/artists.js` (o un'opera
all'array `works` di un artista esistente) — nessuna modifica alla logica dell'app.

## Chiusura dell'asta

- **Manuale**: metti `auctionOpen` a `false` dalla console Firebase (Realtime Database
  → Data → aggiungi/modifica il nodo `auctionOpen`).
- **Automatica**: l'asta si considera chiusa da sé al superare di `AUCTION_CLOSE_DATE`
  in `src/data/artists.js` (impostata al 20 settembre 2026), calcolata lato client.

Quando l'asta è chiusa: tutte le offerte restano visibili, i form sono disabilitati e
compare il banner "L'asta è chiusa — i vincitori verranno annunciati a breve."

## Deploy su Netlify

Build command: `npm run build` — Publish directory: `dist` (già in `netlify.toml`).

Ricorda di impostare le stesse variabili `VITE_FIREBASE_*` di `.env.local` nelle
**Environment variables** del sito Netlify (Site settings → Environment variables),
altrimenti la build online non si collegherà a Firebase.

**Il repository non va inizializzato/pushato su GitHub finché non richiesto esplicitamente.**
