import './SkeletonCard.css';

const SkeletonCard = () => {
  return (
    <div className="song-card-row skeleton">
      <div className="song-card-content">
        <div className="song-cell info-cell">
          <div className="skeleton-box title-placeholder"></div>
          <div className="skeleton-box artist-placeholder"></div>
        </div>

        <div className="song-cell type-cell">
          <div className="skeleton-box type-placeholder"></div>
        </div>

        <div className="song-cell tuning-cell">
          <div className="skeleton-box tuning-placeholder"></div>
        </div>

        <div className="song-cell author-cell">
          <div className="skeleton-box author-placeholder"></div>
        </div>

        <div className="song-cell date-cell">
          <div className="skeleton-box date-placeholder"></div>
        </div>

        <div className="song-cell votes-cell">
          <div className="skeleton-box votes-placeholder"></div>
        </div>

        <div className="song-cell downloads-cell">
          <div className="skeleton-box icon-placeholder"></div>
        </div>

        <div className="song-cell action-cell">
          <div className="skeleton-box button-placeholder"></div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonCard;
