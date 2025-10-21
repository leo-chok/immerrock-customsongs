import { useState } from 'react';
import { useSongs } from '../../hooks/useSongs';
import { FaSearch } from 'react-icons/fa';
import SongCard from './SongCard';
import './SongList.css';

const SONGS_PER_PAGE = 20;

const SongList = () => {
  const {
    filteredSongs,
    loading,
    error,
    searchTerm,
    setSearchTerm,
    sortBy,
    setSortBy,
    filterType,
    setFilterType,
    filterTuning,
    setFilterTuning,
    songs,
  } = useSongs();

  const [currentPage, setCurrentPage] = useState(1);

  // Calcul de la pagination
  const totalPages = Math.ceil(filteredSongs.length / SONGS_PER_PAGE);
  const startIndex = (currentPage - 1) * SONGS_PER_PAGE;
  const endIndex = startIndex + SONGS_PER_PAGE;
  const currentSongs = filteredSongs.slice(startIndex, endIndex);

  // Reset page quand les filtres changent
  const handleSearchChange = (value) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const handleSortChange = (value) => {
    setSortBy(value);
    setCurrentPage(1);
  };

  const handleFilterChange = (value) => {
    setFilterType(value);
    setCurrentPage(1);
  };

  const handleTuningFilterChange = (value) => {
    setFilterTuning(value);
    setCurrentPage(1);
  };

  // Obtenir la liste unique des tunings
  const getUniqueTunings = () => {
    const tunings = songs.map(song => song.tuning);
    return [...new Set(tunings)].sort();
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    // Scroll jusqu'au début de la liste
    const songListElement = document.getElementById('song-list-anchor');
    if (songListElement) {
      songListElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  if (loading) {
    return (
      <div className="song-list-container">
        <div className="loading-skeleton">
          <div className="skeleton-card"></div>
          <div className="skeleton-card"></div>
          <div className="skeleton-card"></div>
          <div className="skeleton-card"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="song-list-container">
        <div className="error-message">
          <span className="error-icon">⚠️</span>
          <h3>Erreur de chargement</h3>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="song-list-container">
      <div className="filters-section">
        <div className="search-wrapper">
          <FaSearch className="search-icon" />
          <input
            type="text"
            className="search-input"
            placeholder="Search by title, artist or author..."
            value={searchTerm}
            onChange={(e) => handleSearchChange(e.target.value)}
          />
          {searchTerm && (
            <button
              className="clear-search"
              onClick={() => handleSearchChange('')}
              title="Clear search"
            >
              ×
            </button>
          )}
        </div>

        <div className="filter-controls">
          <div className="filter-group">
            <label htmlFor="sort-select">Sort by:</label>
            <select
              id="sort-select"
              className="filter-select"
              value={sortBy}
              onChange={(e) => handleSortChange(e.target.value)}
            >
              <option value="recent">Most Recent</option>
              <option value="popular">Most Popular</option>
              <option value="downloads">Most Downloaded</option>
              <option value="title">Title (A-Z)</option>
              <option value="artist">Artist (A-Z)</option>
            </select>
          </div>

          <div className="filter-group">
            <label htmlFor="type-select">Type:</label>
            <select
              id="type-select"
              className="filter-select"
              value={filterType}
              onChange={(e) => handleFilterChange(e.target.value)}
            >
              <option value="all">All</option>
              <option value="lead">Lead</option>
              <option value="rhythm">Rhythm</option>
              <option value="bass">Bass</option>
              <option value="ukulele">Ukulele</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="filter-group">
            <label htmlFor="tuning-select">Tuning:</label>
            <select
              id="tuning-select"
              className="filter-select"
              value={filterTuning}
              onChange={(e) => handleTuningFilterChange(e.target.value)}
            >
              <option value="all">All</option>
              {getUniqueTunings().map((tuning) => (
                <option key={tuning} value={tuning}>
                  {tuning}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div id="song-list-anchor" className="results-info">
        <p>
          {filteredSongs.length === 0 ? (
            'No songs found'
          ) : (
            <>
              <span className="count-highlight">{filteredSongs.length}</span>{' '}
              {filteredSongs.length === 1 ? 'song found' : 'songs found'}
              {totalPages > 1 && (
                <span className="page-info"> - Page {currentPage} of {totalPages}</span>
              )}
            </>
          )}
        </p>
      </div>

      {currentSongs.length > 0 ? (
        <>
          <div className="song-table">
            {currentSongs.map((song) => (
              <SongCard key={song._id} song={song} />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="pagination">
              <button
                className="pagination-btn"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                ← Previous
              </button>

              <div className="pagination-numbers">
                {[...Array(totalPages)].map((_, index) => {
                  const page = index + 1;
                  // Afficher uniquement les pages proches de la page actuelle
                  if (
                    page === 1 ||
                    page === totalPages ||
                    (page >= currentPage - 2 && page <= currentPage + 2)
                  ) {
                    return (
                      <button
                        key={page}
                        className={`pagination-number ${page === currentPage ? 'active' : ''}`}
                        onClick={() => handlePageChange(page)}
                      >
                        {page}
                      </button>
                    );
                  } else if (page === currentPage - 3 || page === currentPage + 3) {
                    return <span key={page} className="pagination-dots">...</span>;
                  }
                  return null;
                })}
              </div>

              <button
                className="pagination-btn"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next →
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="no-results">
          <h3>No songs found</h3>
          <p>Try adjusting your filters or search</p>
        </div>
      )}
    </div>
  );
};

export default SongList;
