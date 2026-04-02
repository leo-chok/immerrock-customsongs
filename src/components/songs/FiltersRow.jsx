/**
 * Component for song type and tuning filters
 */
const FiltersRow = ({ 
  filterType, 
  onFilterTypeChange, 
  filterTuning, 
  onFilterTuningChange, 
  tunings 
}) => {
  return (
    <div className="filters-row">
      <span className="filter-by-label">Filter by:</span>
      <div className="filters-wrapper">
        <div className="filter-group">
          <label htmlFor="type-select">TYPE:</label>
          <select
            id="type-select"
            className="filter-select"
            value={filterType}
            onChange={(e) => onFilterTypeChange(e.target.value)}
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
            onChange={(e) => onFilterTuningChange(e.target.value)}
          >
            <option value="all">All</option>
            {tunings.map((tuning) => (
              <option key={tuning} value={tuning}>
                {tuning}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default FiltersRow;
