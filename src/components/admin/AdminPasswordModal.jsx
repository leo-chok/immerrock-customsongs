import React, { useState } from "react";
import "./AdminPasswordModal.css";

const AdminPasswordModal = ({ isOpen, onClose, onSubmit, error }) => {
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(password);
  };

  if (!isOpen) return null;

  return (
    <div className="admin-modal-overlay">
      <div className="admin-modal-content">
        <button className="admin-modal-close" onClick={onClose}>&times;</button>
        <h2>Admin Access</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            placeholder="Enter admin password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoFocus
          />
          <button type="submit">Login</button>
        </form>
        {error && <div className="admin-modal-error">{error}</div>}
      </div>
    </div>
  );
};

export default AdminPasswordModal;
