import { createContext, useState, useEffect, useCallback, useMemo } from 'react';
import songService from '../services/songService';

export const SongsContext = createContext();

/**
 * Global provider for song data and core operations.
 * UI logic (filtering, sorting) is handled by specialized hooks.
 */
export const SongsProvider = ({ children }) => {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all songs
  const fetchSongs = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await songService.getAllSongs();
      setSongs(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // CRUD Wrapper methods
  const editSong = async (songId, updatedData, adminToken) => {
    try {
      const updatedSong = await songService.updateSong(songId, updatedData, adminToken);
      setSongs(prev => prev.map(song => song._id === songId ? updatedSong : song));
      return { success: true, song: updatedSong };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  const deleteSong = async (songId, adminToken) => {
    try {
      await songService.deleteSong(songId, adminToken);
      setSongs(prev => prev.filter(song => song._id !== songId));
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  const addSong = async (songData) => {
    try {
      const newSong = await songService.addSong(songData);
      setSongs(prev => [newSong, ...prev]);
      return { success: true, song: newSong };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  const voteSong = async (songId, voteType) => {
    try {
      const updatedSong = await songService.voteSong(songId, voteType);
      setSongs(prev => prev.map(song => 
        song._id === songId ? updatedSong : song
      ));
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  const incrementDownload = async (songId) => {
    try {
      const updatedSong = await songService.incrementDownload(songId);
      setSongs(prev => prev.map(song => 
        song._id === songId ? updatedSong : song
      ));
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  useEffect(() => {
    fetchSongs();
  }, [fetchSongs]);

  const value = useMemo(() => ({
    songs,
    loading,
    error,
    fetchSongs,
    addSong,
    editSong,
    deleteSong,
    voteSong,
    incrementDownload
  }), [songs, loading, error, fetchSongs]);

  return (
    <SongsContext.Provider value={value}>
      {children}
    </SongsContext.Provider>
  );
};
