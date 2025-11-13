import React, { useContext, useState } from "react";
import { SongsContext } from '../../contexts/SongsContext';
import { FaEdit, FaTrash } from "react-icons/fa";
import "./AdminSongTable.css";

const AdminSongTable = ({ onEdit, onDelete }) => {
  const { songs, loading, error } = useContext(SongsContext);
  const [search, setSearch] = useState("");


  // Simple filtering
  const filteredSongs = songs.filter(song => {
    const term = search.toLowerCase();
    return (
      song.title.toLowerCase().includes(term) ||
      song.artist.toLowerCase().includes(term) ||
      song.author.toLowerCase().includes(term)
    );
  });

  // Pagination
  const SONGS_PER_PAGE = 20;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(filteredSongs.length / SONGS_PER_PAGE);
  const startIdx = (currentPage - 1) * SONGS_PER_PAGE;
  const endIdx = startIdx + SONGS_PER_PAGE;
  const paginatedSongs = filteredSongs.slice(startIdx, endIdx);

  if (loading) return <div className="admin-table-loading">Loading...</div>;
  if (error) return <div className="admin-table-error">Error: {error}</div>;

  return (
    <div className="admin-song-table-wrapper">
      <div className="admin-table-header">
        <input
          type="text"
          className="admin-table-search"
          placeholder="Search by title, artist or author..."
          value={search}
          onChange={e => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
        />
      </div>
      <table className="admin-song-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Artist</th>
            <th>Type</th>
            <th>Tuning</th>
            <th>Author</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedSongs.map(song => (
            <tr key={song._id}>
              <td>{song.title}</td>
              <td>{song.artist}</td>
              <td>{song.type}</td>
              <td>{song.tuning}</td>
              <td>{song.author}</td>
              <td style={{ display: "flex", justifyContent: "flex-end" }}>
                <button className="admin-action-btn edit" title="Edit" onClick={() => onEdit(song)}><FaEdit /></button>
                <button className="admin-action-btn delete" title="Delete" onClick={() => onDelete(song)}><FaTrash /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Pagination controls */}
      {totalPages > 1 && (
        <div className="admin-pagination">
          <button
            className="admin-pagination-btn"
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            &lt; Prev
          </button>
          <span className="admin-pagination-info">
            Page {currentPage} / {totalPages}
          </span>
          <button
            className="admin-pagination-btn"
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next &gt;
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminSongTable;
