import { createContext, useState, useEffect, useCallback } from 'react';

export const SongsContext = createContext();

// API URL - Change according to your environment
const API_URL = import.meta.env.VITE_API_URL || 'https://immerrock-customsongs-backend.onrender.com/api';

export const SongsProvider = ({ children }) => {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('recent'); // 'recent', 'popular', 'downloads', 'title', 'artist'
  const [filterType, setFilterType] = useState('all'); // 'all', 'lead', 'rhythm', 'bass', 'ukulele', 'other'
  const [filterTuning, setFilterTuning] = useState('all'); // 'all' or specific tuning

  // Fetch all songs
  const fetchSongs = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_URL}/songs`);
      if (!response.ok) throw new Error('Error loading songs');
      const data = await response.json();
      setSongs(data);
    } catch (err) {
      setError(err.message);
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Add a song
  const addSong = async (songData) => {
    try {
      const response = await fetch(`${API_URL}/songs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(songData),
      });
      if (!response.ok) throw new Error('Erreur lors de l\'ajout de la chanson');
      const newSong = await response.json();
      setSongs(prev => [newSong, ...prev]);
      return { success: true, song: newSong };
    } catch (err) {
      console.error('Erreur:', err);
      return { success: false, error: err.message };
    }
  };

  // Voter pour une chanson
  const voteSong = async (songId, voteType) => {
    try {
      const response = await fetch(`${API_URL}/songs/${songId}/vote`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ voteType }),
      });
      if (!response.ok) throw new Error('Erreur lors du vote');
      const updatedSong = await response.json();
      setSongs(prev => prev.map(song => 
        song._id === songId ? updatedSong : song
      ));
      return { success: true };
    } catch (err) {
      console.error('Erreur:', err);
      return { success: false, error: err.message };
    }
  };

  // Incrémenter le compteur de téléchargements
  const incrementDownload = async (songId) => {
    try {
      const response = await fetch(`${API_URL}/songs/${songId}/download`, {
        method: 'POST',
      });
      if (!response.ok) throw new Error('Erreur lors de l\'incrémentation');
      const updatedSong = await response.json();
      setSongs(prev => prev.map(song => 
        song._id === songId ? updatedSong : song
      ));
      return { success: true };
    } catch (err) {
      console.error('Erreur:', err);
      return { success: false, error: err.message };
    }
  };

  // Filtrer et trier les chansons
  const getFilteredSongs = () => {
    let filtered = [...songs];

    // Filtre par recherche
    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      filtered = filtered.filter(song =>
        song.artist.toLowerCase().includes(search) ||
        song.title.toLowerCase().includes(search) ||
        song.author.toLowerCase().includes(search)
      );
    }

    // Filtre par type
    if (filterType !== 'all') {
      filtered = filtered.filter(song => {
        // Le type peut être une string simple ou plusieurs types séparés par des virgules
        const songTypes = song.type.toLowerCase().split(',').map(t => t.trim());
        return songTypes.includes(filterType.toLowerCase());
      });
    }

    // Filtre par tuning
    if (filterTuning !== 'all') {
      filtered = filtered.filter(song => 
        song.tuning.toLowerCase() === filterTuning.toLowerCase()
      );
    }

    // Tri
    switch (sortBy) {
      case 'popular':
        filtered.sort((a, b) => (b.upvotes - b.downvotes) - (a.upvotes - a.downvotes));
        break;
      case 'downloads':
        filtered.sort((a, b) => b.downloads - a.downloads);
        break;
      case 'title':
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'artist':
        filtered.sort((a, b) => a.artist.localeCompare(b.artist));
        break;
      case 'recent':
      default:
        filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
    }

    return filtered;
  };

  useEffect(() => {
    fetchSongs();
  }, [fetchSongs]);

  const value = {
    songs,
    loading,
    error,
    searchTerm,
    setSearchTerm,
    sortBy,
    setSortBy,
    filterType,
    setFilterType,
    filterTuning,
    setFilterTuning,
    addSong,
    voteSong,
    incrementDownload,
    fetchSongs,
    filteredSongs: getFilteredSongs(),
  };

  return (
    <SongsContext.Provider value={value}>
      {children}
    </SongsContext.Provider>
  );
};
