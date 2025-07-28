// src/components/SongList.jsx
import React, { useState } from 'react';

function SongList({ songs }) {
  // États pour le tri (inchangés)
  const [sortColumn, setSortColumn] = useState('artist');
  const [sortDirection, setSortDirection] = useState('asc');

  // Nouveaux états pour la pagination
  const [currentPage, setCurrentPage] = useState(1); // Page actuelle, commence à 1
  const songsPerPage = 20; // Nombre de chansons par page (fixé à 50)

  // Logique de tri (inchangée)
  const sortedSongs = [...songs].sort((a, b) => {
    if (sortColumn === null) {
      return 0;
    }

    const aValue = a[sortColumn];
    const bValue = b[sortColumn];

    let comparison = 0;
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      comparison = aValue.localeCompare(bValue);
    } else {
      if (aValue > bValue) {
        comparison = 1;
      } else if (aValue < bValue) {
        comparison = -1;
      }
    }

    return sortDirection === 'asc' ? comparison : -comparison;
  });

  // Calcul des chansons à afficher sur la page actuelle
  const indexOfLastSong = currentPage * songsPerPage;
  const indexOfFirstSong = indexOfLastSong - songsPerPage;
  const currentSongs = sortedSongs.slice(indexOfFirstSong, indexOfLastSong);

  // Calcul du nombre total de pages
  const totalPages = Math.ceil(sortedSongs.length / songsPerPage);

  // Fonction pour changer de page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Fonction pour générer les numéros de page à afficher
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
    setCurrentPage(1); // Retourne à la première page lors d'un nouveau tri
  };


  return (
    <div className="song-list-container">
      <h2>Available Songs ({songs.length} total)</h2>
      <table>
        <thead>
          <tr>
            <th onClick={() => handleSort('artist')}>
              Artist {sortColumn === 'artist' && (sortDirection === 'asc' ? '▲' : '▼')}
            </th>
            <th onClick={() => handleSort('title')}>
              Title {sortColumn === 'title' && (sortDirection === 'asc' ? '▲' : '▼')}
            </th>
            <th onClick={() => handleSort('type')}>
              Track Type {sortColumn === 'type' && (sortDirection === 'asc' ? '▲' : '▼')}
            </th>
            <th onClick={() => handleSort('tuning')}>
              Tuning {sortColumn === 'tuning' && (sortDirection === 'asc' ? '▲' : '▼')}
            </th>
            <th>Download Link</th>
          </tr>
        </thead>
        <tbody>
          {/* On map sur le tableau des chansons de la page actuelle */}
          {currentSongs.map((song) => (
            <tr key={song.id}>
              <td>{song.artist}</td>
              <td>{song.title}</td>
              <td>{song.type}</td>
              <td>{song.tuning}</td>
              <td>
                <a href={song.link} target="_blank" rel="noopener noreferrer">
                  Download
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Contrôles de pagination */}
      <div className="pagination">
        {pageNumbers.map(number => (
          <button
            key={number}
            onClick={() => paginate(number)}
            className={currentPage === number ? 'active' : ''}
            style={{
              margin: '0 5px',
              padding: '8px 12px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              backgroundColor: currentPage === number ? '#007bff' : '#f8f8f8',
              color: currentPage === number ? 'white' : 'black',
              cursor: 'pointer',
              fontWeight: currentPage === number ? 'bold' : 'normal',
            }}
          >
            {number}
          </button>
        ))}
      </div>
    </div>
  );
}

export default SongList;