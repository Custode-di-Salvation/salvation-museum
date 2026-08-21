import Header from './components/Header/Header';
import ClosedBanner from './components/ClosedBanner/ClosedBanner';
import ArtistSection from './components/ArtistSection/ArtistSection';
import { artists, AUCTION_CLOSE_DATE } from './data/artists';
import { useAuctionStatus } from './hooks/useAuctionStatus';
import styles from './App.module.css';

export default function App() {
  const { isOpen, loaded } = useAuctionStatus();

  return (
    <>
      <Header />

      <main className={styles.main}>
        {loaded && !isOpen && <ClosedBanner />}

        {artists.map((artist) => (
          <ArtistSection key={artist.id} artist={artist} auctionOpen={loaded ? isOpen : false} />
        ))}
      </main>

      <footer className={styles.footer}>
        <p>
          Salvation Museum of History &amp; Natural Sciences — l'asta si chiude
          automaticamente il {AUCTION_CLOSE_DATE.toLocaleDateString('it-IT', { day: 'numeric', month: 'long', year: 'numeric' })}.
        </p>
      </footer>
    </>
  );
}
