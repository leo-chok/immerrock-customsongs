import { FaArrowUp, FaArrowDown } from 'react-icons/fa';

/**
 * Responsive sort header with dropdown for mobile and clickable columns for desktop
 */
const SortHeader = ({ sortBy, sortOrder, onSortChange }) => {
  const handleColumnSort = (column) => {
    if (sortBy === column) {
      onSortChange(column, sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      onSortChange(column, 'asc');
    }
  };

  return (
    <div className="sort-row">
      <span className="sort-by-label">Sort by:</span>

      {/* Dropdown for mobile/tablet */}
      <select
        className="sort-select-mobile"
        value={`${sortBy}-${sortOrder}`}
        onChange={(e) => {
          const [column, order] = e.target.value.split("-");
          onSortChange(column, order);
        }}
      >
        <option value="title-asc">Song (A-Z)</option>
        <option value="title-desc">Song (Z-A)</option>
        <option value="type-asc">Type (A-Z)</option>
        <option value="type-desc">Type (Z-A)</option>
        <option value="tuning-asc">Tuning (A-Z)</option>
        <option value="tuning-desc">Tuning (Z-A)</option>
        <option value="author-asc">Author (A-Z)</option>
        <option value="author-desc">Author (Z-A)</option>
        <option value="createdAt-asc">Added (Oldest)</option>
        <option value="createdAt-desc">Added (Newest)</option>
        <option value="popular-asc">Votes (Low-High)</option>
        <option value="popular-desc">Votes (High-Low)</option>
        <option value="downloads-asc">Downloads (Low-High)</option>
        <option value="downloads-desc">Downloads (High-Low)</option>
      </select>

      {/* Clickable headers for desktop */}
      <div className="table-header">
        <SortableHeader 
          label="Song" 
          column="title" 
          currentSort={sortBy} 
          currentOrder={sortOrder} 
          onSort={handleColumnSort} 
        />
        <SortableHeader 
          label="Type" 
          column="type" 
          currentSort={sortBy} 
          currentOrder={sortOrder} 
          onSort={handleColumnSort} 
        />
        <SortableHeader 
          label="Tuning" 
          column="tuning" 
          currentSort={sortBy} 
          currentOrder={sortOrder} 
          onSort={handleColumnSort} 
        />
        <SortableHeader 
          label="Author" 
          column="author" 
          currentSort={sortBy} 
          currentOrder={sortOrder} 
          onSort={handleColumnSort} 
        />
        <SortableHeader 
          label="Added" 
          column="createdAt" 
          currentSort={sortBy} 
          currentOrder={sortOrder} 
          onSort={handleColumnSort} 
        />
        <SortableHeader 
          label="Votes" 
          column="popular" 
          currentSort={sortBy} 
          currentOrder={sortOrder} 
          onSort={handleColumnSort} 
        />
        <SortableHeader 
          label="DL" 
          column="downloads" 
          currentSort={sortBy} 
          currentOrder={sortOrder} 
          onSort={handleColumnSort} 
        />
        <div className="header-cell action-header">Link</div>
      </div>
    </div>
  );
};

const SortableHeader = ({ label, column, currentSort, currentOrder, onSort }) => {
  const isActive = currentSort === column;
  return (
    <div
      className={`header-cell ${column}-header ${isActive ? "active" : ""}`}
      onClick={() => onSort(column)}
    >
      {label}{" "}
      {isActive && (currentOrder === "asc" ? <FaArrowUp /> : <FaArrowDown />)}
    </div>
  );
};

export default SortHeader;
