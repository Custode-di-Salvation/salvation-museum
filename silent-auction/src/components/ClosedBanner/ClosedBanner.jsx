import styles from './ClosedBanner.module.css';

export default function ClosedBanner() {
  return (
    <div className={styles.banner}>
      <i className="fa-solid fa-flag" aria-hidden="true" />
      <p>
        <strong>L'asta è chiusa</strong> — i vincitori verranno annunciati a breve.
      </p>
    </div>
  );
}
