// src/App.jsx
import { useState, useEffect } from "react";
import "./App.css";
import SongList from "./components/SongList";
import AddSongForm from "./components/AddSongForm";
import appLogo from "./assets/Immerrock_logo.png";

function App() {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState(''); 

  const API_URL =
    "https://immerrock-customsongs-backend.onrender.com/api/songs";

  const fetchSongs = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }
      const data = await response.json();
      setSongs(data);
    } catch (err) {
      console.error("Erreur lors de la récupération des chansons:", err);
      setError(
        "Impossible de charger les chansons. Veuillez réessayer plus tard."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSongs();
  }, []);

  // Fonction pour basculer la visibilité du formulaire
  const toggleAddForm = () => {
    setShowAddForm(!showAddForm);
  };

    // Fonction pour gérer le changement de la barre de recherche
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSongUpdated = (updatedSong) => {
    setSongs(prevSongs => 
      prevSongs.map(song => 
        song._id === updatedSong._id ? updatedSong : song
      )
    );
  };

   // Logique de filtrage des chansons
  const filteredSongs = songs.filter(song => {
    // Convertir la requête de recherche et les valeurs des chansons en minuscules pour une recherche insensible à la casse
    const query = searchQuery.toLowerCase();
    return (
      song.artist.toLowerCase().includes(query) ||
      song.title.toLowerCase().includes(query) ||
      song.type.toLowerCase().includes(query) ||
      song.tuning.toLowerCase().includes(query)
    );
  });

  return (
    <div className="App">
      <image></image>
      <img
        src={appLogo}
        className="app-logo"
        alt="IMMERROCK Community Custom Songs Logo"
      />{" "}
      <h2>🤘 Community Custom Songs 🤘</h2>

      


      <div className="form-toggle-section">
        <button onClick={toggleAddForm} className="toggle-form-button">
          {showAddForm
            ? "▲ Hide Form"
            : "▼ Add New Song"}
        </button>
      </div>
      {/* Rendu conditionnel du formulaire basé sur l'état showAddForm */}
      {showAddForm && <AddSongForm onSongAdded={fetchSongs} />}

      <div className="search-bar-container"> {/* Nouveau conteneur pour la barre de recherche */}
        <input
          type="text"
          placeholder="Search by artist, song ..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="search-input"
        />
      </div>


      {loading && <h2>Fetching database ...</h2>}
      {error && <p className="error-message">{error}</p>}
      {!loading && !error && <SongList songs={filteredSongs} onSongUpdated={handleSongUpdated}/>}
      <div>
      <h2>Made by leochok</h2>
      </div>
    </div>
  );
}

export default App;
