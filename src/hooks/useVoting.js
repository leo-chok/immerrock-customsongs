import { useState, useEffect } from 'react';

const STORAGE_KEY = 'immerrock_votes';

export const useVoting = () => {
  const [votedSongs, setVotedSongs] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(votedSongs));
  }, [votedSongs]);

  const hasVoted = (songId) => {
    return !!votedSongs[songId];
  };

  const getVoteType = (songId) => {
    return votedSongs[songId] || null;
  };

  const recordVote = (songId, voteType) => {
    setVotedSongs(prev => ({
      ...prev,
      [songId]: voteType,
    }));
  };

  const removeVote = (songId) => {
    setVotedSongs(prev => {
      const newVotes = { ...prev };
      delete newVotes[songId];
      return newVotes;
    });
  };

  return {
    hasVoted,
    getVoteType,
    recordVote,
    removeVote,
  };
};

export default useVoting;
