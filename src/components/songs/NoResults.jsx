/**
 * Standalone no results view
 */
const NoResults = () => {
  return (
    <div className="no-results">
      <h3>No songs found</h3>
      <img
        src="/eli_no_result.png"
        alt="Error Illustration"
        className="no-illustration"
        style={{ maxWidth: '200px', margin: '2rem auto' }}
      />
      <p>Try adjusting your filters or search</p>
    </div>
  );
};

export default NoResults;
