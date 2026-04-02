import { FaPlusCircle } from 'react-icons/fa';

/**
 * Specialized search and action bar for the song list
 */
const SearchBar = ({ 
  searchTerm, 
  onSearchChange, 
  totalCount, 
  onToggleAddForm, 
  isAddFormOpen 
}) => {
  return (
    <div id="song-list-anchor" className="search-unified-section">
      <span className="search-label">Search:</span>
      <div className="search-wrapper-input">
        <input
          type="text"
          className="flame-search-input"
          placeholder="Search by title, artist or author..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
        {searchTerm && (
          <button
            className="clear-search-btn"
            onClick={() => onSearchChange("")}
            title="Clear search"
          >
            ×
          </button>
        )}
      </div>
      
      <div className="results-count">
        {totalCount === 0 ? (
          <span>No result</span>
        ) : (
          <>
            <span className="count-highlight">{totalCount}</span>{" "}
            <span className="count-text">
              {totalCount === 1 ? "song" : "songs"}
            </span>
          </>
        )}
      </div>

      <div className="knob-icons">
        {[0, 1, 2].map((i) => {
          const angle = (totalCount * (i + 1) * 37) % 360;
          return (
            <div
              key={i}
              className="css-knob"
              style={{ "--knob-rotate": `${angle}deg` }}
              aria-label="knob"
            >
              <div className="css-knob-index" />
            </div>
          );
        })}
        <span className="led-indicator" title="Power On" />
      </div>

      <button
        className={`add-song-btn ${isAddFormOpen ? "active" : ""}`}
        onClick={onToggleAddForm}
      >
        <FaPlusCircle style={{ top: "50%", transform: "translateY(10%)", scale: "1.5", marginRight: "0.5rem" }} /> Add a Song
      </button>
    </div>
  );
};

export default SearchBar;
