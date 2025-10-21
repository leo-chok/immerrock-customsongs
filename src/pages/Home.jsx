import SongList from '../components/songs/SongList';
import AddSongForm from '../components/songs/AddSongForm';
import LogoFlame from '../components/effects/LogoFlame';
import logo from '../assets/Immerrock_logo.png';
import './Home.css';

const Home = () => {
  return (
    <div className="home-page">
      <LogoFlame logoSrc={logo} />

      <section className="hero-section">
        <h1 className="hero-title">
          Custom Songs Library
        </h1>
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
