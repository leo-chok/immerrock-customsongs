import api from './api';

/**
 * Song Service - Handles all API interactions for songs
 */
export const songService = {
  /**
   * Get all songs from the library
   */
  async getAllSongs() {
    return await api.get('/api/songs');
  },

  /**
   * Add a new song to the library
   */
  async addSong(songData) {
    // Note: songData should include 'password' for the backend validation code
    return await api.post('/api/songs', songData);
  },

  /**
   * Update an existing song (Admin only)
   */
  async updateSong(id, songData, adminToken) {
    return await api.put(`/api/admin/songs/${id}`, songData, {
      headers: {
        'Authorization': `Bearer ${adminToken}`
      }
    });
  },

  /**
   * Delete a song (Admin only)
   */
  async deleteSong(id, adminToken) {
    return await api.delete(`/api/admin/songs/${id}`, {
      headers: {
        'Authorization': `Bearer ${adminToken}`
      }
    });
  },

  /**
   * Vote for a song (up or down)
   */
  async voteSong(id, voteType) {
    // backend expects { type: 'up' | 'down' }
    const type = (voteType === 'upvote' || voteType === 'up') ? 'up' : 'down';
    return await api.patch(`/api/songs/${id}/vote`, { type });
  },

  /**
   * Increment the download counter for a song
   */
  async incrementDownload(id) {
    return await api.patch(`/api/songs/${id}/download`);
  }
};

export default songService;
