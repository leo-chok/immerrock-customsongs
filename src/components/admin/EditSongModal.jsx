import React, { useState, useEffect } from "react";
import "./EditSongModal.css";

const EditSongModal = ({ isOpen, song, onClose, onSave }) => {
  const [form, setForm] = useState({
    title: "",
    artist: "",
    type: "",
    tuning: "",
    author: "",
    link: ""
  });
  useEffect(() => {
    if (song) {
      setForm({
        title: song.title || "",
        artist: song.artist || "",
        type: song.type || "",
        tuning: song.tuning || "",
        author: song.author || "",
        link: song.link || ""
      });
    }
  }, [song]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSave({ ...song, ...form });
  };

  if (!isOpen) return null;

  return (
    <div className="edit-song-modal-overlay">
      <div className="edit-song-modal-content">
        <button className="edit-song-modal-close" onClick={onClose}>&times;</button>
        <h2>Edit Song</h2>
        <form onSubmit={handleSubmit} className="edit-song-form">
          <label>Title
            <input name="title" value={form.title} onChange={handleChange} required />
          </label>
          <label>Artist
            <input name="artist" value={form.artist} onChange={handleChange} required />
          </label>
          <label>Type
            <input name="type" value={form.type} onChange={handleChange} required />
          </label>
          <label>Tuning
            <input name="tuning" value={form.tuning} onChange={handleChange} required />
          </label>
          <label>Author
            <input name="author" value={form.author} onChange={handleChange} required />
          </label>
          <label>Link
            <input name="link" value={form.link} onChange={handleChange} required />
          </label>
          <button type="submit" className="edit-song-save-btn">Save</button>
        </form>
      </div>
    </div>
  );
};

export default EditSongModal;
