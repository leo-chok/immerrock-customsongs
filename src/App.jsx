// src/App.jsx
import './App.css'
import SongList from './components/SongList';

function App() {
  // Générer plus de 50 chansons pour tester la pagination
  const generateMockSongs = (count) => {
    const mockSongs = [];
    for (let i = 1; i <= count; i++) {
      mockSongs.push({
        id: i,
        artist: `Artist ${Math.ceil(i / 10)}`, // Pour avoir des artistes qui se répètent
        title: `Song Title ${i}`,
        type: i % 2 === 0 ? 'Lead, Rhythm' : 'Rhythm, Bass',
        tuning: i % 3 === 0 ? 'Drop D' : 'E Standard',
        link: `https://drive.google.com/folders/fake_link_${i}`,
      });
    }
    return mockSongs;
  };

  const songs = generateMockSongs(120); // Génère 120 chansons pour avoir 3 pages (2x50 + 1x20)

  return (
    <div className="App">
      <h1>IMMEROCK <br></br>Community Custom Songs</h1>
      <SongList songs={songs} />
    </div>
  )
}

export default App