import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { SongsContext } from "../contexts/SongsContext";
import { getAdminToken } from "../utils/auth";
import { useToast } from "../components/common/ToastProvider";
import AdminSongTable from "../components/admin/AdminSongTable";
import EditSongModal from "../components/admin/EditSongModal";
import DeleteConfirmModal from "../components/admin/DeleteConfirmModal";
import "./AdminPage.css";

const AdminPage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = getAdminToken();
    if (!token) {
      navigate("/");
    }
  }, [navigate]);

  // Utility to remove admin token
  const removeAdminToken = () => {
    localStorage.removeItem("adminToken");
  };
  // Handler to exit admin page
  const handleExitAdmin = () => {
    removeAdminToken();
    navigate("/");
  };

  // State pour le modal d'édition
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editSongData, setEditSongData] = useState(null);

  const handleEditSong = (song) => {
    setEditSongData(song);
    setEditModalOpen(true);
  };
  const handleCloseEditModal = () => {
    setEditModalOpen(false);
    setEditSongData(null);
  };
  const { editSong, deleteSong, fetchSongs } = useContext(SongsContext);
  const { showToast } = useToast();

  const handleSaveEditSong = async (updatedSong) => {
    const token = getAdminToken();
    if (!token || !updatedSong?._id) return;
    const { success, error } = await editSong(
      updatedSong._id,
      updatedSong,
      token
    );
    setEditModalOpen(false);
    setEditSongData(null);
    if (success) {
      fetchSongs();
      showToast("Song updated successfully!", "success");
    } else {
      showToast(
        "Error updating song: " + (error || "unknown"),
        "error"
      );
    }
  };

  // State pour le modal de suppression
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteSongData, setDeleteSongData] = useState(null);

  const handleDeleteSong = (song) => {
    setDeleteSongData(song);
    setDeleteModalOpen(true);
  };
  const handleCloseDeleteModal = () => {
    setDeleteModalOpen(false);
    setDeleteSongData(null);
  };
  const handleConfirmDelete = async (song) => {
    const token = getAdminToken();
    if (!token || !song?._id) return;
    const { success, error } = await deleteSong(song._id, token);
    setDeleteModalOpen(false);
    setDeleteSongData(null);
    if (success) {
      fetchSongs();
      showToast("Song deleted successfully!", "success");
    } else {
      showToast(
        "Error deleting song: " + (error || "unknown"),
        "error"
      );
    }
  };

  return (
    <div className="admin-page-container">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1>Manage the Library</h1>
        <button onClick={handleExitAdmin} className="exit-admin-btn">
          Exit Admin
        </button>
      </div>
      <AdminSongTable onEdit={handleEditSong} onDelete={handleDeleteSong} />
      <EditSongModal
        isOpen={editModalOpen}
        song={editSongData}
        onClose={handleCloseEditModal}
        onSave={handleSaveEditSong}
      />
      <DeleteConfirmModal
        isOpen={deleteModalOpen}
        song={deleteSongData}
        onClose={handleCloseDeleteModal}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};

export default AdminPage;
