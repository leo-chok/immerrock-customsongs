// src/components/SongList.jsx

import { useState } from 'react'; // Plus besoin de useEffect ici
// import './../App.css'; // Pas besoin si App.css est importé dans App.jsx et couvre tout le DOM

function SongList({ songs }) { // Reçoit 'songs' comme prop
  const [currentPage, setCurrentPage] = useState(1);
  const songsPerPage = 20;
  const [sortColumn, setSortColumn] = useState('artist');
  const [sortDirection, setSortDirection] = useState('asc');

  // Logique de tri (reste la même)
  const sortedSongs = [...songs].sort((a, b) => {
    if (!sortColumn) return 0;

    const aValue = String(a[sortColumn]).toLowerCase();
    const bValue = String(b[sortColumn]).toLowerCase();

    if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
    setCurrentPage(1);
  };

  // Logique de pagination (reste la même)
  const indexOfLastSong = currentPage * songsPerPage;
  const indexOfFirstSong = indexOfLastSong - songsPerPage;
  const currentSongs = sortedSongs.slice(indexOfFirstSong, indexOfLastSong);

  const totalPages = Math.ceil(sortedSongs.length / songsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="song-list-container">
      <h2>List of Custom Songs ({songs.length} songs already !)</h2>

      {songs.length === 0 && <p>No songs for this moment, add one !</p>}

      {songs.length > 0 && ( // N'affiche le tableau que s'il y a des chansons
        <>
          <table>
            <thead>
              <tr>
                <th onClick={() => handleSort('artist')}>Artists {sortColumn === 'artist' && (sortDirection === 'asc' ? '▲' : '▼')}</th>
                <th onClick={() => handleSort('title')}>Titles {sortColumn === 'title' && (sortDirection === 'asc' ? '▲' : '▼')}</th>
                <th onClick={() => handleSort('type')}>Type  {sortColumn === 'type' && (sortDirection === 'asc' ? '▲' : '▼')}</th>
                <th onClick={() => handleSort('tuning')}>Tuning {sortColumn === 'tuning' && (sortDirection === 'asc' ? '▲' : '▼')}</th>
                <th>Download Links</th>
              </tr>
            </thead>
            <tbody>
              {currentSongs.map((song) => (
                <tr key={song._id}>
                  <td>{song.artist}</td>
                  <td>{song.title}</td>
                  <td>{song.type}</td>
                  <td>{song.tuning}</td>
                  <td>
                    <a href={song.link} target="_blank" rel="noopener noreferrer">
                      Télécharger
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="pagination">
            {pageNumbers.map((number) => (
              <button
                key={number}
                onClick={() => paginate(number)}
                className={currentPage === number ? 'active' : ''}
              >
                {number}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default SongList;