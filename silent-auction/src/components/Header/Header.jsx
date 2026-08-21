import styles from './Header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.preHeader}>
        <div className={styles.preHeaderInner}>
          <span>Salvation Museum of History &amp; Natural Sciences</span>
          <span className={styles.dim}>Serata inaugurale</span>
        </div>
      </div>
      <div className={styles.main}>
        <div className={styles.inner}>
          <span className={styles.eyebrow}>
            <span className={styles.eyebrowRule} />
            Silent Auction
          </span>
          <h1 className={styles.title}>Quel che la montagna conserva</h1>
          <p className={styles.subtitle}>
            Le offerte sono pubbliche e in tempo reale. L'offerente con l'offerta più alta al momento della chiusura si aggiudica l'opera.
          </p>
        </div>
      </div>
    </header>
  );
}
