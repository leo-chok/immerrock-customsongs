import { useState, useRef } from 'react';
import { useSongs } from '../../hooks/useSongs';
import { useVoting } from '../../hooks/useVoting';
import { FaArrowUp, FaArrowDown, FaDownload } from 'react-icons/fa';
import AlbumCard3D from './AlbumCard3D';
import './SongCard.css';

const SongCard = ({ song }) => {
  const { voteSong, incrementDownload } = useSongs();
  const { hasVoted, getVoteType, recordVote } = useVoting();
  const [isHovered, setIsHovered] = useState(false);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const cardRef = useRef(null);
  
  const userVote = getVoteType(song._id);
  const score = song.upvotes - song.downvotes;

  const handleVote = async (voteType) => {
    if (hasVoted(song._id)) return;
    const result = await voteSong(song._id, voteType);
    if (result.success) {
      recordVote(song._id, voteType);
    }
  };

  const handleDownload = async () => {
    await incrementDownload(song._id);
    window.open(song.link, '_blank');
  };

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;

    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Rotation très légère : max ±3 degrés
    const rotX = ((y - centerY) / centerY) * -3;
    const rotY = ((x - centerX) / centerX) * 3;
    
    setRotateX(rotX);
    setRotateY(rotY);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

  const getTypeLabel = (type) => {
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
      ref={cardRef}
      className={`song-card-row ${isHovered ? 'expanded' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${isHovered ? 1.02 : 1})`,
      }}
    >
      <div className="song-card-content">
        <div className="song-cell info-cell">
          <div className={`album-card-wrapper ${isHovered ? 'visible' : 'hidden'}`}>
            <AlbumCard3D 
              artist={song.artist}
              title={song.title}
              isInline={true}
            />
          </div>
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

        <div className="song-cell metadata-row-mobile">
          <span className="metadata-item">
            <span className="metadata-label">Type:</span> {getTypeLabel(song.type)}
          </span>
          <span className="metadata-separator">•</span>
          <span className="metadata-item">
            <span className="metadata-label">Tuning:</span> {song.tuning}
          </span>
          <span className="metadata-separator">•</span>
          <span className="metadata-item">
            <span className="metadata-label">By</span> <span className="author-name-mobile">{song.author}</span>
          </span>
        </div>

        <div className="song-cell votes-cell">
          <div className={`vote-section ${userVote === 'upvote' ? 'voted-up' : userVote === 'downvote' ? 'voted-down' : ''}`}>
            <button
              className={`vote-btn upvote ${userVote === 'upvote' ? 'active' : ''}`}
              onClick={() => handleVote('upvote')}
              disabled={hasVoted(song._id)}
              title={hasVoted(song._id) ? 'You already voted' : 'Upvote'}
            >
              <FaArrowUp className="vote-icon" />
              <span className="vote-count">{song.upvotes}</span>
            </button>
            <div className={`score ${score > 0 ? 'positive' : score < 0 ? 'negative' : 'neutral'}`}>
              {score > 0 ? '+' : ''}{score}
            </div>
            <button
              className={`vote-btn downvote ${userVote === 'downvote' ? 'active' : ''}`}
              onClick={() => handleVote('downvote')}
              disabled={hasVoted(song._id)}
              title={hasVoted(song._id) ? 'You already voted' : 'Downvote'}
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
};

export default SongCard;
