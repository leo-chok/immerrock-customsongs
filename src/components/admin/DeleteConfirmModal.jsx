import React from "react";
import "./DeleteConfirmModal.css";

const DeleteConfirmModal = ({ isOpen, song, onClose, onConfirm }) => {
  if (!isOpen || !song) return null;
  return (
    <div className="delete-modal-overlay">
      <div className="delete-modal-content">
        <button className="delete-modal-close" onClick={onClose}>&times;</button>
        <h2>Delete Song</h2>
        <p>Are you sure you want to delete <b>{song.title}</b> by <b>{song.artist}</b>?</p>
        <div className="delete-modal-actions">
          <button className="delete-cancel-btn" onClick={onClose}>Cancel</button>
          <button className="delete-confirm-btn" onClick={() => onConfirm(song)}>Delete</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;
