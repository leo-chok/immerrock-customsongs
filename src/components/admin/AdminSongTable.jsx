import React from "react";
import { useSongs } from '../../hooks/useSongs';
import { useSongsFilter } from '../../hooks/useSongsFilter';
import { FaEdit, FaTrash } from "react-icons/fa";
import Pagination from "../songs/Pagination";
import "./AdminSongTable.css";

const AdminSongTable = ({ onEdit, onDelete }) => {
  const { songs, loading, error } = useSongs();
  
  // Reuse the logic from the main list
  const {
    searchTerm, setSearchTerm,
    filteredSongs
  } = useSongsFilter(songs);

  const [currentPage, setCurrentPage] = React.useState(1);
  const SONGS_PER_PAGE = 20;

  const totalPages = Math.ceil(filteredSongs.length / SONGS_PER_PAGE);
  const startIdx = (currentPage - 1) * SONGS_PER_PAGE;
  const paginatedSongs = filteredSongs.slice(startIdx, startIdx + SONGS_PER_PAGE);

  if (loading) return <div className="admin-table-loading">Loading...</div>;
  if (error) return <div className="admin-table-error">Error: {error}</div>;

  return (
    <div className="admin-song-table-wrapper">
      <div className="admin-table-header">
        <input
          type="text"
          className="admin-table-search"
          placeholder="Search by title, artist or author..."
          value={searchTerm}
          onChange={e => {
            setSearchTerm(e.target.value);
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
            <th className="actions-header">Actions</th>
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
              <td className="actions-cell">
                <button className="admin-action-btn edit" title="Edit" onClick={() => onEdit(song)}><FaEdit /></button>
                <button className="admin-action-btn delete" title="Delete" onClick={() => onDelete(song)}><FaTrash /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {totalPages > 1 && (
        <Pagination 
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
};

export default AdminSongTable;
