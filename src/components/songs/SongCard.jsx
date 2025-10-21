import { useSongs } from '../../hooks/useSongs';
import { useVoting } from '../../hooks/useVoting';
import { FaArrowUp, FaArrowDown, FaDownload } from 'react-icons/fa';
import './SongCard.css';

const SongCard = ({ song }) => {
  const { voteSong, incrementDownload } = useSongs();
  const { hasVoted, getVoteType, recordVote } = useVoting();
  
  const userVote = getVoteType(song._id);
  const score = song.upvotes - song.downvotes;

  const handleVote = async (voteType) => {
    // Si l'utilisateur a déjà voté, on ne peut pas voter à nouveau
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

  const getTypeLabel = (type) => {
    // Gérer les types multiples (séparés par virgule)
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
    <div className="song-card-row">
      {/* Song Info - EN PREMIER */}
      <div className="song-cell info-cell">
        <h3 className="song-title">{song.title}</h3>
        <p className="song-artist">{song.artist}</p>
      </div>

      {/* Type - SANS ICONE */}
      <div className="song-cell type-cell">
        <div className="song-type-text">
          {getTypeLabel(song.type)}
        </div>
      </div>

      {/* Tuning */}
      <div className="song-cell tuning-cell">
        <div className="song-tuning">{song.tuning}</div>
      </div>

      {/* Author */}
      <div className="song-cell author-cell">
        <p className="song-author">
          By <span className="author-name">{song.author}</span>
        </p>
      </div>

      {/* Votes - AVEC FLECHES */}
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

      {/* Downloads - AVEC ICONE */}
      <div className="song-cell downloads-cell">
        <FaDownload className="download-icon" />
        <span className="download-count">{song.downloads || 0}</span>
      </div>

      {/* Download Button - AVEC ICONE DOWNLOAD */}
      <div className="song-cell action-cell">
        <button className="download-btn" onClick={handleDownload}>
          <FaDownload className="btn-icon" />
          <span className="btn-text">Download</span>
        </button>
      </div>
    </div>
  );
};

export default SongCard;
