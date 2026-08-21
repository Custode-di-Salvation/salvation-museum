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
3. **Build → Authentication → Get started → Sign-in method → Anonymous → Enable**
   (nessun form di login per l'utente: serve solo per dare a ogni browser un'identità
   univoca, così le regole del database possono impedire che una persona cancelli le
   offerte di un'altra).
4. Nella tab **Rules** del Realtime Database, incolla il contenuto di `firebase.rules.json`.
   Lettura pubblica per tutti; scrittura/cancellazione di un'offerta permessa solo a chi
   l'ha creata (verificato via `ownerUid` + autenticazione anonima); `auctionOpen` è
   scrivibile solo dalla console Firebase (che bypassa le regole), non dall'app.
5. **Project settings → General → Your apps → Web app (</>) → registra un'app** e copia
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
/auctionOpen: true | false          # flag manuale, gestibile SOLO dalla console Firebase
/bids/{workId}/{pushId}:
  pgName: string
  amount: number
  timestamp: number (server timestamp)
  ownerUid: string                  # uid dell'autenticazione anonima di chi ha fatto l'offerta
```

Il `workId` è l'`id` dell'opera definito in `src/data/artists.js`.

## Sicurezza: chi può cancellare cosa

Ogni browser, al primo caricamento, ottiene in automatico un'identità anonima da
Firebase Authentication (nessun form, invisibile all'utente). Ogni offerta salva
l'`ownerUid` di chi l'ha creata, e le **regole del database** (non solo l'interfaccia)
permettono di cancellare/modificare un'offerta solo a chi corrisponde a quell'uid.
Significa che nessuno può toccare le offerte di qualcun altro nemmeno chiamando
direttamente le API di Firebase (bypassando l'app) — è stato testato esplicitamente.

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

Questa app **non ha un suo sito Netlify separato**: viene pubblicata come pagina del
sito del museo, sotto `/asta/` (es. `https://salvation-museum.netlify.app/asta/`).

La build combinata è gestita dal `package.json` di root del repo (`salvation-museum/`,
la cartella sopra questa):

- `npm run build:auction` → installa le dipendenze qui dentro e fa `vite build`
- `npm run build:site` → build Eleventy del museo + `build:auction` + copia
  `silent-auction/dist/` dentro `_site/asta/`

Impostazioni del sito Netlify (Project configuration → Build & deploy):
- **Base directory**: (vuoto, radice del repo)
- **Build command**: `npm run build:site`
- **Publish directory**: `_site`

Il `base: '/asta/'` in `vite.config.js` serve perché gli asset (JS/CSS) vengano
referenziati con il percorso giusto una volta serviti da sotto `/asta/`.

Ricorda di impostare le variabili `VITE_FIREBASE_*` di `.env.local` nelle
**Environment variables** del sito Netlify, altrimenti la build online non si
collegherà a Firebase.
