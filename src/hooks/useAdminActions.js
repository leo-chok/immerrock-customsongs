import { useState, useCallback } from 'react';
import { getAdminToken } from '../utils/auth';
import { useSongs } from './useSongs';
import { useToast } from '../components/common/ToastProvider';

/**
 * Hook to manage administrative actions (edit, delete) and associated modal states
 */
export const useAdminActions = () => {
  const { editSong, deleteSong, fetchSongs } = useSongs();
  const { showToast } = useToast();

  // Edit Modal State
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editSongData, setEditSongData] = useState(null);

  // Delete Modal State
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteSongData, setDeleteSongData] = useState(null);

  const openEditModal = useCallback((song) => {
    setEditSongData(song);
    setEditModalOpen(true);
  }, []);

  const closeEditModal = useCallback(() => {
    setEditModalOpen(false);
    setEditSongData(null);
  }, []);

  const openDeleteModal = useCallback((song) => {
    setDeleteSongData(song);
    setDeleteModalOpen(true);
  }, []);

  const closeDeleteModal = useCallback(() => {
    setDeleteModalOpen(false);
    setDeleteSongData(null);
  }, []);

  const handleSaveEdit = async (updatedSong) => {
    const token = getAdminToken();
    if (!token || !updatedSong?._id) return;

    const { success, error } = await editSong(updatedSong._id, updatedSong, token);
    
    if (success) {
      closeEditModal();
      fetchSongs();
      showToast("Song updated successfully!", "success");
    } else {
      showToast(`Error updating song: ${error || "unknown"}`, "error");
    }
  };

  const handleConfirmDelete = async (song) => {
    const token = getAdminToken();
    if (!token || !song?._id) return;

    const { success, error } = await deleteSong(song._id, token);
    
    if (success) {
      closeDeleteModal();
      fetchSongs();
      showToast("Song deleted successfully!", "success");
    } else {
      showToast(`Error deleting song: ${error || "unknown"}`, "error");
    }
  };

  return {
    editModalOpen,
    editSongData,
    openEditModal,
    closeEditModal,
    handleSaveEdit,
    deleteModalOpen,
    deleteSongData,
    openDeleteModal,
    closeDeleteModal,
    handleConfirmDelete
  };
};

export default useAdminActions;
