import { useState } from 'react';
import PropTypes from 'prop-types';

function AddSongForm({ onSongAdded }) {
  const [artist, setArtist] = useState('');
  const [title, setTitle] = useState('');
  const [type, setType] = useState([]);
  const [tuning, setTuning] = useState('');
  const [link, setLink] = useState('');
  const [password, setPassword] = useState(''); // <-- NOUVEL ÉTAT
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState(null);
  const [formSuccess, setFormSuccess] = useState(null);

  const API_URL = 'https://immerrock-customsongs-backend.onrender.com/api/songs';

  const trackTypes = ['Lead', 'Rhythm', 'Bass', 'Acoustic'];
  const tuningOptions = [
    'E Standard', 'Drop D', 'Eb Standard', 'Drop C', 'D Standard', 'Drop B', 'DADG', 'B Standard'
  ];

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setType(prevTypes => 
      checked 
        ? [...prevTypes, value] 
        : prevTypes.filter(t => t !== value)
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setFormError(null);
    setFormSuccess(null);

    const formattedType = type.join(', ');

    const newSong = { artist, title, type: formattedType, tuning, link, password }; // <-- AJOUT DU MOT DE PASSE

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newSong),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP Error: ${response.status}`);
      }

      const addedSong = await response.json();
      setFormSuccess(`Song "${addedSong.title}" added successfully!`);

      setArtist('');
      setTitle('');
      setType([]);
      setTuning('');
      setLink('');
      setPassword(''); // <-- Réinitialise le champ après envoi

      if (onSongAdded) {
        onSongAdded();
      }

    } catch (err) {
      console.error("Error adding song:", err);
      setFormError(err.message || "Error adding song. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="add-song-form-container">
      <h2>Add a New Song</h2>
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
        <div className="form-group checkbox-group">
          <label>Track Type(s):</label>
          <div className="checkbox-options">
            {trackTypes.map(trackType => (
              <div key={trackType}>
                <input
                  type="checkbox"
                  id={trackType}
                  value={trackType}
                  checked={type.includes(trackType)}
                  onChange={handleCheckboxChange}
                />
                <label htmlFor={trackType}>{trackType}</label>
              </div>
            ))}
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="tuning">Tuning:</label>
          <select
            id="tuning"
            value={tuning}
            onChange={(e) => setTuning(e.target.value)}
            required
          >
            <option value="">Select a tuning...</option>
            {tuningOptions.map(opt => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="link">Download Link:</label>
          <input
            type="url"
            id="link"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password" // <-- type="password" cache les caractères
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={submitting}>
          {submitting ? 'Adding...' : 'Add Song'}
        </button>
      </form>
    </div>
  );
}

AddSongForm.propTypes = {
  onSongAdded: PropTypes.func.isRequired,
};

export default AddSongForm;