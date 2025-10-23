import SongList from '../components/songs/SongList';
import AddSongForm from '../components/songs/AddSongForm';
import TitleWithFlames from '../components/effects/TitleWithFlames';
import WelcomeModal from '../components/common/WelcomeModal';
import './Home.css';

const Home = () => {
  return (
    <div className="home-page">
      <WelcomeModal />
      
      <section className="hero-section">
        {/* Nouveau composant avec logo + titre + flammes */}
        <TitleWithFlames />
        
        <p className="hero-description">
          Discover and share custom songs created by the community.
          <br />
          Vote for your favorites and download them for free!
        </p>
      </section>

      <AddSongForm />

      <section className="songs-section">
        <SongList />
      </section>
    </div>
  );
};

export default Home;
