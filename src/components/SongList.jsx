// src/components/SongList.jsx
import { useState } from 'react';
import PropTypes from 'prop-types';
import SongCard from './SongCard';
import './SongList.css';

function SongList({ songs, onSongUpdated }) {
  const [currentPage, setCurrentPage] = useState(1);
  const songsPerPage = 20;
  const [sortColumn, setSortColumn] = useState('artist');
  const [sortDirection, setSortDirection] = useState('asc');

  const sortedSongs = [...songs].sort((a, b) => {
    if (!sortColumn) return 0;

    const aValue = String(a[sortColumn]).toLowerCase();
    const bValue = String(b[sortColumn]).toLowerCase();

    // Ajout de la gestion du tri numérique pour les votes/downloads si on les trie
    if (sortColumn === 'upvotes' || sortColumn === 'downloads') {
        if (sortDirection === 'asc') {
            return a[sortColumn] - b[sortColumn];
        } else {
            return b[sortColumn] - a[sortColumn];
        }
    }

    if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  // Cette fonction est pour les <select>
  const handleSortChange = (e) => {
    const newSortColumn = e.target.value;
    if (newSortColumn === sortColumn) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(newSortColumn);
      setSortDirection('asc');
    }
    setCurrentPage(1);
  };

  // Nouvelle fonction pour le tri via clic sur les "en-têtes" simulées
  const handleHeaderSort = (column) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
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


      {songs.length === 0 && <p>At this moment no song in the database, add one !</p>}

      {songs.length > 0 && (
        <>
                <div className="table-header-row">
                    <div className="table-header-cell sortable" onClick={() => handleHeaderSort('artist')}>
                        Artist {sortColumn === 'artist' && <span className="sort-arrow">{sortDirection === 'asc' ? '▲' : '▼'}</span>}
                    </div>
                    <div className="table-header-cell sortable" onClick={() => handleHeaderSort('title')}>
                        Title {sortColumn === 'title' && <span className="sort-arrow">{sortDirection === 'asc' ? '▲' : '▼'}</span>}
                    </div>
                    <div className="table-header-cell sortable" onClick={() => handleHeaderSort('type')}>
                        Arrangement {sortColumn === 'type' && <span className="sort-arrow">{sortDirection === 'asc' ? '▲' : '▼'}</span>}
                    </div>
                    <div className="table-header-cell sortable" onClick={() => handleHeaderSort('tuning')}>
                        Tuning {sortColumn === 'tuning' && <span className="sort-arrow">{sortDirection === 'asc' ? '▲' : '▼'}</span>}
                    </div>
                    <div className="table-header-cell sortable" onClick={() => handleHeaderSort('upvotes')}>
                        Votes {sortColumn === 'upvotes' && <span className="sort-arrow">{sortDirection === 'asc' ? '▲' : '▼'}</span>}
                    </div>
                    <div className="table-header-cell">Link</div>
                    <div className="table-header-cell sortable" onClick={() => handleHeaderSort('downloads')}>
                       Downloads {sortColumn === 'downloads' && <span className="sort-arrow">{sortDirection === 'asc' ? '▲' : '▼'}</span>}
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
  })).isRequired,
  onSongUpdated: PropTypes.func.isRequired,
};

export default SongList;