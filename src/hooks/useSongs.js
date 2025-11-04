import { useContext } from 'react';
import { SongsContext } from '../contexts/SongsContext';

export const useSongs = () => {
  const context = useContext(SongsContext);
  
  if (!context) {
    throw new Error('useSongs must be used within a SongsProvider');
  }
  
  return context;
};

export default useSongs;
