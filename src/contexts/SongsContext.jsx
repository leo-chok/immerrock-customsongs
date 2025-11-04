import { createContext, useState, useEffect, useCallback } from 'react';

export const SongsContext = createContext();

// API URL - Change according to your environment
const API_URL = import.meta.env.VITE_API_URL || 'https://immerrock-customsongs-backend.onrender.com';

export const SongsProvider = ({ children }) => {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('recent'); // 'recent', 'popular', 'downloads', 'title', 'artist', 'type', 'tuning', 'author'
  const [sortOrder, setSortOrder] = useState('asc'); // 'asc' or 'desc'
  const [filterType, setFilterType] = useState('all'); // 'all', 'lead', 'rhythm', 'bass', 'ukulele', 'other'
  const [filterTuning, setFilterTuning] = useState('all'); // 'all' or specific tuning

  // Fetch all songs
  const fetchSongs = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    // Start timer for minimum loading duration
    const startTime = Date.now();
    const minLoadingTime = 2000; // 2 seconds
    
    try {
      const response = await fetch(`${API_URL}/api/songs`);
      if (!response.ok) throw new Error('Error loading songs');
      const data = await response.json();
      
      // Calculate remaining time to reach minimum loading duration
      const elapsedTime = Date.now() - startTime;
      const remainingTime = Math.max(0, minLoadingTime - elapsedTime);
      
      // Wait for remaining time before setting songs and hiding loading
      await new Promise(resolve => setTimeout(resolve, remainingTime));
      
      setSongs(data);
    } catch (err) {
      setError(err.message);
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Edit a song (admin)
  const editSong = async (songId, updatedData, adminToken) => {
    try {
      const response = await fetch(`${API_URL}/api/admin/songs/${songId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${adminToken}`,
        },
        body: JSON.stringify(updatedData),
      });
      if (!response.ok) throw new Error('Error updating song');
      const updatedSong = await response.json();
      setSongs(prev => prev.map(song => song._id === songId ? updatedSong : song));
      return { success: true, song: updatedSong };
    } catch (err) {
      console.error('Error:', err);
      return { success: false, error: err.message };
    }
  };

  // Delete a song (admin)
  const deleteSong = async (songId, adminToken) => {
    try {
      const response = await fetch(`${API_URL}/api/admin/songs/${songId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${adminToken}`,
        },
      });
      if (!response.ok) throw new Error('Error deleting song');
      setSongs(prev => prev.filter(song => song._id !== songId));
      return { success: true };
    } catch (err) {
      console.error('Error:', err);
      return { success: false, error: err.message };
    }
  };

  // Add a song
  const addSong = async (songData) => {
    try {
      const response = await fetch(`${API_URL}/api/songs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(songData),
      });
      if (!response.ok) {
        let msg = 'Error adding song';
        try {
          const errBody = await response.json();
          msg = errBody.message || msg;
        } catch (e) {}
        throw new Error(msg);
      }
      const newSong = await response.json();
      setSongs(prev => [newSong, ...prev]);
      return { success: true, song: newSong };
    } catch (err) {
      console.error('Error:', err);
      return { success: false, error: err.message };
    }
  };

  // Voter pour une chanson
  const voteSong = async (songId, voteType) => {
    try {
      // backend expects { type: 'up' | 'down' }
      const payloadType = (voteType === 'upvote' || voteType === 'up') ? 'up' : 'down';
      const response = await fetch(`${API_URL}/api/songs/${songId}/vote`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: payloadType }),
      });
      if (!response.ok) {
        // try to parse server message
        let msg = 'Error during voting';
        try {
          const errBody = await response.json();
          msg = errBody.message || msg;
        } catch (e) {
          // ignore parse error
        }
        throw new Error(msg);
      }
      const updatedSong = await response.json();
      setSongs(prev => prev.map(song => 
        song._id === songId ? updatedSong : song
      ));
      return { success: true };
    } catch (err) {
      console.error('Error:', err);
      return { success: false, error: err.message };
    }
  };

  // Incrémenter le compteur de téléchargements
  const incrementDownload = async (songId) => {
    try {
      const response = await fetch(`${API_URL}/api/songs/${songId}/download`, {
        method: 'PATCH',
      });
      if (!response.ok) {
        let msg = 'Error incrementing download count';
        try {
          const errBody = await response.json();
          msg = errBody.message || msg;
        } catch (e) {}
        throw new Error(msg);
      }
      const updatedSong = await response.json();
      setSongs(prev => prev.map(song => 
        song._id === songId ? updatedSong : song
      ));
      return { success: true };
    } catch (err) {
      console.error('Error:', err);
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
        filtered.sort((a, b) => {
          const diff = (b.upvotes - b.downvotes) - (a.upvotes - a.downvotes);
          return sortOrder === 'asc' ? -diff : diff;
        });
        break;
      case 'downloads':
        filtered.sort((a, b) => {
          const diff = b.downloads - a.downloads;
          return sortOrder === 'asc' ? -diff : diff;
        });
        break;
      case 'title':
        filtered.sort((a, b) => {
          const result = a.title.localeCompare(b.title);
          return sortOrder === 'asc' ? result : -result;
        });
        break;
      case 'artist':
        filtered.sort((a, b) => {
          const result = a.artist.localeCompare(b.artist);
          return sortOrder === 'asc' ? result : -result;
        });
        break;
      case 'type':
        filtered.sort((a, b) => {
          const result = a.type.localeCompare(b.type);
          return sortOrder === 'asc' ? result : -result;
        });
        break;
      case 'tuning':
        filtered.sort((a, b) => {
          const result = a.tuning.localeCompare(b.tuning);
          return sortOrder === 'asc' ? result : -result;
        });
        break;
      case 'author':
        filtered.sort((a, b) => {
          const result = a.author.localeCompare(b.author);
          return sortOrder === 'asc' ? result : -result;
        });
        break;
      case 'recent':
      default:
        filtered.sort((a, b) => {
          const diff = new Date(b.createdAt) - new Date(a.createdAt);
          return sortOrder === 'asc' ? -diff : diff;
        });
        break;
    }

    return filtered;
  };

  // Fetch songs on mount only
  useEffect(() => {
    fetchSongs();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const value = {
    songs,
    loading,
    error,
    searchTerm,
    setSearchTerm,
    sortBy,
    setSortBy,
    sortOrder,
    setSortOrder,
    filterType,
    setFilterType,
    filterTuning,
    setFilterTuning,
    addSong,
    voteSong,
    incrementDownload,
    fetchSongs,
    editSong,
    deleteSong,
    filteredSongs: getFilteredSongs(),
  };

  return (
    <SongsContext.Provider value={value}>
      {children}
    </SongsContext.Provider>
  );
};
