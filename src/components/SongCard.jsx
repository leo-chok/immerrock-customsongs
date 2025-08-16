import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './SongCard.css';

function SongCard({ song, onSongUpdated }) {
  const API_URL = 'https://immerrock-customsongs-backend.onrender.com/api/songs';
  // const API_URL = 'http://localhost:5000/api/songs';

  const [hasVoted, setHasVoted] = useState(false);
  const [votedType, setVotedType] = useState(null);

  useEffect(() => {
    const votes = JSON.parse(localStorage.getItem('userVotes')) || {};
    if (votes[song._id]) {
      setHasVoted(true);
      setVotedType(votes[song._id]);
    }
  }, [song._id]);

  const handleVote = async (type) => {
    if (hasVoted) {
      alert("You have already voted for this song!");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/${song._id}/vote`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ type }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP Error: ${response.status}`);
      }
      const updatedSong = await response.json();
      onSongUpdated(updatedSong);

      const votes = JSON.parse(localStorage.getItem('userVotes')) || {};
      votes[song._id] = type;
      localStorage.setItem('userVotes', JSON.stringify(votes));
      
      setHasVoted(true);
      setVotedType(type);
      
    } catch (error) {
      console.error('Error while voting:', error);
      alert('Could not save your vote. Please try again.');
    }
  };

  const handleDownload = async () => {
    try {
      const response = await fetch(`${API_URL}/${song._id}/download`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP Error: ${response.status}`);
      }
      const updatedSong = await response.json();
      onSongUpdated(updatedSong);

      window.open(song.link, '_blank');
    } catch (error) {
      console.error('Error while recording download:', error);
      alert('An error occurred while downloading. Please try again.');
    }
  };

  const voteScore = song.upvotes - song.downvotes;

  const formatDate = (dateString) => {
      const options = { year: 'numeric', month: 'short', day: 'numeric' };
      return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <div className="song-card table-row">
      <div className="table-cell date-cell">
          {formatDate(song.createdAt)}
      </div>
      <div className="table-cell artist-cell">
          {song.artist}
      </div>
      <div className="table-cell title-cell">
          {song.title}
      </div>
      <div className="table-cell type-cell">
          {song.type}
      </div>
      <div className="table-cell tuning-cell">
          {song.tuning}
      </div>
      <div className="table-cell votes-cell">
          <div className="vote-section">
              <button 
                  onClick={() => handleVote('up')} 
                  className={`vote-button upvote-button ${hasVoted && votedType === 'up' ? 'voted' : ''}`}
                  disabled={hasVoted}
              >
                  👍 {song.upvotes}
              </button>
              <button 
                  onClick={() => handleVote('down')} 
                  className={`vote-button downvote-button ${hasVoted && votedType === 'down' ? 'voted' : ''}`}
                  disabled={hasVoted}
              >
                  👎 {song.downvotes}
              </button>
              <span className="vote-score">({voteScore})</span>
          </div>
      </div>
      <div className="table-cell download-action-cell">
          <button onClick={handleDownload} className="download-button">
              🔗 Download
          </button>
      </div>
      <div className="table-cell downloads-count-cell">
          {song.downloads}
      </div>
    </div>
  );
}

SongCard.propTypes = {
  song: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    artist: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    tuning: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    upvotes: PropTypes.number,
    downvotes: PropTypes.number,
    downloads: PropTypes.number,
    createdAt: PropTypes.string,
  }).isRequired,
  onSongUpdated: PropTypes.func.isRequired,
};

export default SongCard;