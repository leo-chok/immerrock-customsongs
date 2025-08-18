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
  const [searchQuery, setSearchQuery] = useState("");

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

  // Nouvelle fonction pour effacer le contenu de la barre de recherche
  const clearSearch = () => {
    setSearchQuery("");
  };

  const handleSongUpdated = (updatedSong) => {
    setSongs((prevSongs) =>
      prevSongs.map((song) =>
        song._id === updatedSong._id ? updatedSong : song
      )
    );
  };



  // Logique de filtrage des chansons
  const filteredSongs = songs.filter((song) => {
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
      <a href="https://immerrock.com/">
        <img
          src={appLogo}
          className="app-logo"
          alt="IMMERROCK Community Custom Songs Logo"
        />{" "}
      </a>
      <h2>🤘 Community Custom Songs 🤘</h2>
      <hr class="separateur-hr"></hr>
      <p>
        Welcome to the ultimate spot to find and master your favorite songs!
        <br></br>Here you can browse our community-created library. If you can't
        find a song you're looking for, feel free to join our{" "}
        <a href="https://discord.com/invite/SP4tumnEx6">Discord</a> to make a
        request.
        <br></br>For our talented creators, thank you for contributing! Please
        use the form below to share your custom songs with the community.
      </p>
      <hr class="separateur-hr"></hr>
      <div className="form-toggle-section">
        <button onClick={toggleAddForm} className="toggle-form-button">
          {showAddForm ? "▲ Hide Form" : "▼ Add New Song"}
        </button>
      </div>
      {!loading && !error && !showAddForm && (
        <div className="search-bar-container">
          <input
            type="text"
            placeholder="Search by artist, song ..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="search-input"
          />
          {searchQuery && (
            <button onClick={clearSearch} className="clear-search-button">
              &times;
            </button>
          )}
        </div>
      )}
      {showAddForm && <AddSongForm onSongAdded={fetchSongs} />}
      {loading && (
        <div className="loader-container">
          <div className="loader"></div>
          <h2>Fetching songs list ...</h2>
        </div>
      )}
      {error && <p className="error-message">{error}</p>}
      {!loading && !error && !showAddForm && (
        <SongList songs={filteredSongs} onSongUpdated={handleSongUpdated} />
      )}
      <div>
        <h2>Made by leochok</h2>
      </div>
    </div>
  );
}

export default App;
