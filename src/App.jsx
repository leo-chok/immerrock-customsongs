// src/App.jsx
import { useState, useEffect } from 'react';
import './App.css';
import SongList from './components/SongList';
import AddSongForm from './components/AddSongForm';

function App() {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // Nouvel état pour la visibilité du formulaire
  const [showAddForm, setShowAddForm] = useState(false); // Initialisé à false pour le cacher par défaut

  const API_URL = 'https://immerrock-customsongs-backend.onrender.com/api/songs';

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
      setError("Impossible de charger les chansons. Veuillez réessayer plus tard.");
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

  return (
    <div className="App">
      <h1>Community Custom Songs</h1>

      <div className="form-toggle-section">
        <button onClick={toggleAddForm} className="toggle-form-button">
          {showAddForm ? '▲ Cacher le formulaire d\'ajout' : '▼ Ajouter une Nouvelle Chanson'}
        </button>
      </div>

      {/* Rendu conditionnel du formulaire basé sur l'état showAddForm */}
      {showAddForm && <AddSongForm onSongAdded={fetchSongs} />}

      {loading && <p>Chargement des chansons...</p>}
      {error && <p className="error-message">{error}</p>}

      {!loading && !error && (
        <SongList songs={songs} />
      )}
    </div>
  );
}

export default App;