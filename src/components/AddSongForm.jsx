// src/components/AddSongForm.jsx

import { useState } from 'react';

function AddSongForm({ onSongAdded }) { // Reçoit la fonction de rappel comme prop
  const [artist, setArtist] = useState('');
  const [title, setTitle] = useState('');
  const [type, setType] = useState('');
  const [tuning, setTuning] = useState('');
  const [link, setLink] = useState('');
  const [submitting, setSubmitting] = useState(false); // Pour désactiver le bouton pendant l'envoi
  const [formError, setFormError] = useState(null); // Pour les erreurs du formulaire
  const [formSuccess, setFormSuccess] = useState(null); // Pour le message de succès

  const API_URL = 'https://immerrock-customsongs-backend.onrender.com/api/songs';

  const handleSubmit = async (e) => {
    e.preventDefault(); // Empêche le rechargement de la page par défaut du formulaire
    setSubmitting(true);
    setFormError(null);
    setFormSuccess(null);

    const newSong = { artist, title, type, tuning, link };

    try {
      const response = await fetch(API_URL, {
        method: 'POST', // Méthode HTTP POST
        headers: {
          'Content-Type': 'application/json', // Indique que le corps de la requête est du JSON
        },
        body: JSON.stringify(newSong), // Convertit l'objet JS en chaîne JSON
      });

      if (!response.ok) {
        const errorData = await response.json(); // Tente de lire le message d'erreur du backend
        throw new Error(errorData.message || `Erreur HTTP: ${response.status}`);
      }

      const addedSong = await response.json();
      setFormSuccess(`Chanson "${addedSong.title}" ajoutée avec succès !`);
      // Réinitialiser le formulaire
      setArtist('');
      setTitle('');
      setType('');
      setTuning('');
      setLink('');

      // Appeler la fonction de rappel pour rafraîchir la liste des chansons dans App.jsx
      if (onSongAdded) {
        onSongAdded();
      }

    } catch (err) {
      console.error("Erreur lors de l'ajout de la chanson:", err);
      setFormError(err.message || "Erreur lors de l'ajout de la chanson. Veuillez réessayer.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="add-song-form-container">
      <h2>Ajouter une Nouvelle Chanson</h2>
      {formSuccess && <p className="success-message">{formSuccess}</p>}
      {formError && <p className="error-message">{formError}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="artist">Artist:</label>
          <input
            type="text"
            id="artist"
            value={artist}
            onChange={(e) => setArtist(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="type">Type:</label>
          <input
            type="text"
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="tuning">Tuning:</label>
          <input
            type="text"
            id="tuning"
            value={tuning}
            onChange={(e) => setTuning(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="link">Download Link:</label>
          <input
            type="url" // Type "url" pour une validation basique du navigateur
            id="link"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={submitting}>
          {submitting ? 'Adding...' : 'Add the song'}
        </button>
      </form>
    </div>
  );
}

export default AddSongForm;