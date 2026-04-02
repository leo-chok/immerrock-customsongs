import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAdminToken } from "../utils/auth";
import { useAdminActions } from "../hooks/useAdminActions";
import AdminSongTable from "../components/admin/AdminSongTable";
import EditSongModal from "../components/admin/EditSongModal";
import DeleteConfirmModal from "../components/admin/DeleteConfirmModal";
import "./AdminPage.css";

const AdminPage = () => {
  const navigate = useNavigate();
  const {
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
  } = useAdminActions();

  useEffect(() => {
    const token = getAdminToken();
    if (!token) {
      navigate("/");
    }
  }, [navigate]);

  const handleExitAdmin = () => {
    localStorage.removeItem("adminToken");
    navigate("/");
  };

  return (
    <div className="admin-page-container">
      <div className="admin-header">
        <h1>Manage the Library</h1>
        <button onClick={handleExitAdmin} className="exit-admin-btn">
          Exit Admin
        </button>
      </div>

      <AdminSongTable 
        onEdit={openEditModal} 
        onDelete={openDeleteModal} 
      />

      <EditSongModal
        isOpen={editModalOpen}
        song={editSongData}
        onClose={closeEditModal}
        onSave={handleSaveEdit}
      />

      <DeleteConfirmModal
        isOpen={deleteModalOpen}
        song={deleteSongData}
        onClose={closeDeleteModal}
        onConfirm={() => handleConfirmDelete(deleteSongData)}
      />
    </div>
  );
};

export default AdminPage;
