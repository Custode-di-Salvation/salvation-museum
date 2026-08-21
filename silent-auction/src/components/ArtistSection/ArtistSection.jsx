import ArtworkCard from '../ArtworkCard/ArtworkCard';
import styles from './ArtistSection.module.css';

export default function ArtistSection({ artist, auctionOpen }) {
  return (
    <section className={styles.section}>
      <div className={styles.bio}>
        <span className={styles.eyebrow}>{artist.location}</span>
        <h2 className={styles.name}>{artist.name}</h2>
        <p className={styles.tagline}>{artist.tagline}</p>
        <p className={styles.bioText}>{artist.bio}</p>
      </div>

      <div className={styles.grid}>
        {artist.works.map((work) => (
          <ArtworkCard key={work.id} work={work} auctionOpen={auctionOpen} />
        ))}
      </div>
    </section>
  );
}
