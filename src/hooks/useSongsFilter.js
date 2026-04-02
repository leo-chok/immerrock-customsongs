import { useState, useMemo } from 'react';

/**
 * Hook to manage song filtering and sorting logic
 * @param {Array} songs - The raw list of songs
 */
export const useSongsFilter = (songs) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('createdAt'); 
  const [sortOrder, setSortOrder] = useState('desc'); 
  const [filterType, setFilterType] = useState('all'); 
  const [filterTuning, setFilterTuning] = useState('all'); 

  const filteredSongs = useMemo(() => {
    if (!songs) return [];
    
    let filtered = [...songs];

    // Search filter
    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      filtered = filtered.filter(song =>
        song.artist.toLowerCase().includes(search) ||
        song.title.toLowerCase().includes(search) ||
        song.author.toLowerCase().includes(search)
      );
    }

    // Type filter
    if (filterType !== 'all') {
      filtered = filtered.filter(song => {
        const songTypes = (song.type || '').toLowerCase().split(',').map(t => t.trim());
        return songTypes.includes(filterType.toLowerCase());
      });
    }

    // Tuning filter
    if (filterTuning !== 'all') {
      filtered = filtered.filter(song => 
        (song.tuning || '').toLowerCase() === filterTuning.toLowerCase()
      );
    }

    // Sorting logic
    const sortMultiplier = sortOrder === 'asc' ? 1 : -1;

    filtered.sort((a, b) => {
      let comparison = 0;
      
      switch (sortBy) {
        case 'popular':
          comparison = (a.upvotes - a.downvotes) - (b.upvotes - b.downvotes);
          break;
        case 'downloads':
          comparison = (a.downloads || 0) - (b.downloads || 0);
          break;
        case 'title':
          comparison = (b.title || '').localeCompare(a.title || '');
          break;
        case 'artist':
          comparison = (b.artist || '').localeCompare(a.artist || '');
          break;
        case 'type':
          comparison = (b.type || '').localeCompare(a.type || '');
          break;
        case 'tuning':
          comparison = (b.tuning || '').localeCompare(a.tuning || '');
          break;
        case 'author':
          comparison = (b.author || '').localeCompare(a.author || '');
          break;
        case 'createdAt':
        case 'recent':
        default:
          comparison = new Date(a.createdAt) - new Date(b.createdAt);
          break;
      }
      
      return comparison * sortMultiplier;
    });

    return filtered;
  }, [songs, searchTerm, filterType, filterTuning, sortBy, sortOrder]);

  return {
    searchTerm,
    setSearchTerm,
    sortBy,
    setSortBy,
    sortOrder,
    setSortOrder,
    filterType,
    setFilterType,
    filterTuning,
    setFilterTuning,
    filteredSongs
  };
};

export default useSongsFilter;
