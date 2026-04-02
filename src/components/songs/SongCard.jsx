import { useState, memo } from 'react';
import { useSongs } from '../../hooks/useSongs';
import { useVoting } from '../../hooks/useVoting';
import { FaArrowUp, FaArrowDown, FaDownload } from 'react-icons/fa';
import './SongCard.css';

const SongCard = memo(({ song }) => {
  const { voteSong, incrementDownload } = useSongs();
  const { hasVoted, getVoteType, recordVote } = useVoting();
  const [isExpanded, setIsExpanded] = useState(false);
  
  const userVote = getVoteType(song._id);
  const score = song.upvotes - song.downvotes;

  const handleVote = async (voteType) => {
    if (hasVoted(song._id)) return;
    const result = await voteSong(song._id, voteType);
    if (result.success) {
      recordVote(song._id, voteType);
    }
  };

  const handleDownload = async (e) => {
    e.preventDefault();
    e.stopPropagation(); // Évite l'expansion mobile au click sur download
    await incrementDownload(song._id);
    window.open(song.link, '_blank');
  };

  const handleVoteLocal = (voteType, e) => {
    e.preventDefault();
    e.stopPropagation();
    handleVote(voteType);
  };

  const getTypeLabel = (type) => {
    if (!type) return '';
    const types = type.split(',').map(t => t.trim());
    return types.map(t => {
      switch (t.toLowerCase()) {
        case 'lead': return 'Lead';
        case 'rhythm': return 'Rhythm';
        case 'bass': return 'Bass';
        case 'ukulele': return 'Ukulele';
        case 'other': return 'Other';
        default: return t;
      }
    }).join(', ');
  };

  return (
    <div 
      className={`song-card-row ${isExpanded ? 'expanded' : ''}`}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      {/* Zone Image Album (Statique à gauche sur Desktop) */}
      <div className="desktop-cover-zone">
        <img 
          src={song.albumImageMedium || '/unknow_vinyle.png'} 
          alt={song.title} 
          className="static-cover-image"
        />
        <div className="cover-gradient-overlay"></div>
      </div>

      {/* Mode Mobile (Top Banner) */}
      <div className="mobile-top-cover">
        <img 
          src={song.albumImageMedium || '/unknow_vinyle.png'} 
          alt={song.title} 
          className="mobile-cover-image"
          loading="lazy"
        />
        <div className="mobile-cover-gradient"></div>
      </div>
      
      <div className="song-card-content">
        <div className="song-cell info-cell">
          <h3 className="song-title">{song.title}</h3>
          <p className="song-artist">{song.artist}</p>
        </div>

        <div className="song-cell type-cell">
          <div className="song-type-text">
            {getTypeLabel(song.type)}
          </div>
        </div>

        <div className="song-cell tuning-cell">
          <div className="song-tuning">{song.tuning}</div>
        </div>

        <div className="song-cell author-cell">
          <p className="song-author">
            By <span className="author-name">{song.author}</span>
          </p>
        </div>

        <div className="song-cell date-cell">
          <span className="song-date">
            {song.createdAt ? new Date(song.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'N/A'}
          </span>
        </div>

        {/* Info mobiles additionnelles (accordéon) */}
        <div className="song-cell metadata-row-mobile">
          <div className="metadata-item">
            <span className="metadata-label">Type:</span> {getTypeLabel(song.type)}
          </div>
          <div className="metadata-item">
            <span className="metadata-label">Tuning:</span> {song.tuning}
          </div>
          <div className="metadata-item">
            <span className="metadata-label">By</span> <span className="author-name-mobile">{song.author}</span>
          </div>
        </div>

        <div className="song-cell votes-cell">
          <div className={`vote-section ${userVote === 'upvote' ? 'voted-up' : userVote === 'downvote' ? 'voted-down' : ''}`}>
            <button
              className={`vote-btn upvote ${userVote === 'upvote' ? 'active' : ''}`}
              onClick={(e) => handleVoteLocal('upvote', e)}
              disabled={hasVoted(song._id)}
            >
              <FaArrowUp className="vote-icon" />
              <span className="vote-count">{song.upvotes}</span>
            </button>
            <div className={`score ${score > 0 ? 'positive' : score < 0 ? 'negative' : 'neutral'}`}>
              {score > 0 ? '+' : ''}{score}
            </div>
            <button
              className={`vote-btn downvote ${userVote === 'downvote' ? 'active' : ''}`}
              onClick={(e) => handleVoteLocal('downvote', e)}
              disabled={hasVoted(song._id)}
            >
              <FaArrowDown className="vote-icon" />
              <span className="vote-count">{song.downvotes}</span>
            </button>
          </div>
        </div>

        <div className="song-cell downloads-cell">
          <FaDownload className="download-icon" />
          <span className="download-count">{song.downloads || 0}</span>
        </div>

        <div className="song-cell action-cell">
          <span className="download-count-mobile">
            <FaDownload className="download-icon-mobile" />
            {song.downloads || 0}
          </span>
          <button className="download-btn" onClick={handleDownload}>
            <FaDownload className="btn-icon" />
            <span className="btn-text">Download</span>
          </button>
        </div>
      </div>
    </div>
  );
});

export default SongCard;
