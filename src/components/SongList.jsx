import { useState } from 'react';
import PropTypes from 'prop-types';
import SongCard from './SongCard';
import './SongList.css';

function SongList({ songs, onSongUpdated }) {
  const [currentPage, setCurrentPage] = useState(1);
  const songsPerPage = 20;
  // Assure-toi que l'état initial est bien 'createdAt' et 'desc'
  const [sortColumn, setSortColumn] = useState('createdAt');
  const [sortDirection, setSortDirection] = useState('desc');

  const sortedSongs = [...songs].sort((a, b) => {
    if (!sortColumn) return 0;

    // Logique de tri pour la date
    if (sortColumn === 'createdAt') {
      const aDate = new Date(a.createdAt);
      const bDate = new Date(b.createdAt);
      if (sortDirection === 'asc') {
        return aDate - bDate;
      } else {
        return bDate - aDate;
      }
    }
    
    // Logique de tri pour les nombres (votes, downloads)
    if (sortColumn === 'upvotes' || sortColumn === 'downloads') {
        if (sortDirection === 'asc') {
            return a[sortColumn] - b[sortColumn];
        } else {
            return b[sortColumn] - a[sortColumn];
        }
    }

    // Logique de tri pour les chaînes de caractères (artist, title, etc.)
    const aValue = String(a[sortColumn]).toLowerCase();
    const bValue = String(b[sortColumn]).toLowerCase();

    if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  // Cette fonction gère le clic sur les en-têtes de colonnes
  const handleHeaderSort = (column) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection(column === 'createdAt' || column === 'upvotes' || column === 'downloads' ? 'desc' : 'asc');
    }
    setCurrentPage(1);
  };

  const indexOfLastSong = currentPage * songsPerPage;
  const indexOfFirstSong = indexOfLastSong - songsPerPage;
  const currentSongs = sortedSongs.slice(indexOfFirstSong, indexOfLastSong);

  const totalPages = Math.ceil(sortedSongs.length / songsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="song-list-container">
      <h2> {songs.length} songs found.</h2>
      
      {songs.length > 0 && (
        <>
          <div className="table-header-row">
            <div className="table-header-cell sortable" onClick={() => handleHeaderSort('createdAt')}>
              Added {sortColumn === 'createdAt' && <span className="sort-arrow">{sortDirection === 'asc' ? '▲' : '▼'}</span>}
            </div>
            <div className="table-header-cell sortable" onClick={() => handleHeaderSort('artist')}>
              Artist {sortColumn === 'artist' && <span className="sort-arrow">{sortDirection === 'asc' ? '▲' : '▼'}</span>}
            </div>
            <div className="table-header-cell sortable" onClick={() => handleHeaderSort('title')}>
              Title {sortColumn === 'title' && <span className="sort-arrow">{sortDirection === 'asc' ? '▲' : '▼'}</span>}
            </div>
            <div className="table-header-cell sortable" onClick={() => handleHeaderSort('type')}>
              Type {sortColumn === 'type' && <span className="sort-arrow">{sortDirection === 'asc' ? '▲' : '▼'}</span>}
            </div>
            <div className="table-header-cell sortable" onClick={() => handleHeaderSort('tuning')}>
              Tuning {sortColumn === 'tuning' && <span className="sort-arrow">{sortDirection === 'asc' ? '▲' : '▼'}</span>}
            </div>
            <div className="table-header-cell sortable" onClick={() => handleHeaderSort('upvotes')}>
              Votes {sortColumn === 'upvotes' && <span className="sort-arrow">{sortDirection === 'asc' ? '▲' : '▼'}</span>}
            </div>
            <div className="table-header-cell">Download</div>
            <div className="table-header-cell sortable" onClick={() => handleHeaderSort('downloads')}>
              DL Count {sortColumn === 'downloads' && <span className="sort-arrow">{sortDirection === 'asc' ? '▲' : '▼'}</span>}
            </div>
          </div>

          <div className="song-cards-grid">
            {currentSongs.map(song => (
              <SongCard key={song._id} song={song} onSongUpdated={onSongUpdated} />
            ))}
          </div>

          <div className="pagination">
            {pageNumbers.map((number) => (
              <button
                key={number}
                onClick={() => paginate(number)}
                className={currentPage === number ? 'active' : ''}
              >
                {number}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

SongList.propTypes = {
  songs: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string.isRequired,
    artist: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    tuning: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    upvotes: PropTypes.number,
    downvotes: PropTypes.number,
    downloads: PropTypes.number,
    createdAt: PropTypes.string,
  })).isRequired,
  onSongUpdated: PropTypes.func.isRequired,
};

export default SongList;