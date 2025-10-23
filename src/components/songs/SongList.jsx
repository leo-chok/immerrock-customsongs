import { useState, useEffect } from "react";
import { useSongs } from "../../hooks/useSongs";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import SongCard from "./SongCard";
import Loading from "../common/Loading";
import "./SongList.css";

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
    sortOrder,
    setSortOrder,
    filterType,
    setFilterType,
    filterTuning,
    setFilterTuning,
    songs,
  } = useSongs();

  const [currentPage, setCurrentPage] = useState(1);
  const [fadeIn, setFadeIn] = useState(false);

  // Trigger fade-in animation when loading completes
  useEffect(() => {
    if (!loading) {
      // Small delay to ensure DOM is ready
      setTimeout(() => setFadeIn(true), 50);
    } else {
      setFadeIn(false);
    }
  }, [loading]);

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

  const handleColumnSort = (column) => {
    // Si on clique sur la même colonne, inverser l'ordre
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortOrder("asc");
    }
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
    const tunings = songs.map((song) => song.tuning);
    return [...new Set(tunings)].sort();
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    // Scroll jusqu'au début de la liste
    const songListElement = document.getElementById("song-list-anchor");
    if (songListElement) {
      songListElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  if (loading) {
    return (
      <div className="loading-wrapper">
        <Loading />
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
    <div className={`song-list-container ${fadeIn ? 'fade-in' : ''}`}>
      {/* Searchbar indépendante */}
      <div className="search-section">
        <div className="search-wrapper-input">
          <input
            type="text"
            className="flame-search-input"
            placeholder="Search by title, artist or author..."
            value={searchTerm}
            onChange={(e) => handleSearchChange(e.target.value)}
          />
          {searchTerm && (
            <button
              className="clear-search-btn"
              onClick={() => handleSearchChange("")}
              title="Clear search"
            >
              ×
            </button>
          )}
        </div>
      </div>

      {/* Info résultats */}
      <div id="song-list-anchor" className="results-info">
        <p>
          {filteredSongs.length === 0 ? (
            "No songs found"
          ) : (
            <>
              <span className="count-highlight">{filteredSongs.length}</span>{" "}
              {filteredSongs.length === 1 ? "song found" : "songs found"}
            </>
          )}
        </p>
      </div>

      {/* Filtres seulement TYPE et TUNING */}
      <div className="filters-section">
        <div className="filter-group">
          <label htmlFor="type-select">TYPE:</label>
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
          <label htmlFor="tuning-select">TUNING:</label>
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

      {currentSongs.length > 0 ? (
        <>
          {/* En-têtes de colonnes cliquables */}
          <div className="table-header">
            <div
              className={`header-cell title-header ${
                sortBy === "title" ? "active" : ""
              }`}
              onClick={() => handleColumnSort("title")}
            >
              Song{" "}
              {sortBy === "title" &&
                (sortOrder === "asc" ? <FaArrowUp /> : <FaArrowDown />)}
            </div>
            <div
              className={`header-cell type-header ${
                sortBy === "type" ? "active" : ""
              }`}
              onClick={() => handleColumnSort("type")}
            >
              Type{" "}
              {sortBy === "type" &&
                (sortOrder === "asc" ? <FaArrowUp /> : <FaArrowDown />)}
            </div>
            <div
              className={`header-cell tuning-header ${
                sortBy === "tuning" ? "active" : ""
              }`}
              onClick={() => handleColumnSort("tuning")}
            >
              Tuning{" "}
              {sortBy === "tuning" &&
                (sortOrder === "asc" ? <FaArrowUp /> : <FaArrowDown />)}
            </div>
            <div
              className={`header-cell author-header ${
                sortBy === "author" ? "active" : ""
              }`}
              onClick={() => handleColumnSort("author")}
            >
              Author{" "}
              {sortBy === "author" &&
                (sortOrder === "asc" ? <FaArrowUp /> : <FaArrowDown />)}
            </div>
            <div
              className={`header-cell votes-header ${
                sortBy === "popular" ? "active" : ""
              }`}
              onClick={() => handleColumnSort("popular")}
            >
              Votes{" "}
              {sortBy === "popular" &&
                (sortOrder === "asc" ? <FaArrowUp /> : <FaArrowDown />)}
            </div>
            <div
              className={`header-cell downloads-header ${
                sortBy === "downloads" ? "active" : ""
              }`}
              onClick={() => handleColumnSort("downloads")}
            >
              DL{" "}
              {sortBy === "downloads" &&
                (sortOrder === "asc" ? <FaArrowUp /> : <FaArrowDown />)}
            </div>
            <div className="header-cell action-header">Link</div>
          </div>

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
                        className={`pagination-number ${
                          page === currentPage ? "active" : ""
                        }`}
                        onClick={() => handlePageChange(page)}
                      >
                        {page}
                      </button>
                    );
                  } else if (
                    page === currentPage - 3 ||
                    page === currentPage + 3
                  ) {
                    return (
                      <span key={page} className="pagination-dots">
                        ...
                      </span>
                    );
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
