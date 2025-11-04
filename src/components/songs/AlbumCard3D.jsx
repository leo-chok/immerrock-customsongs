import { useRef, useState, useEffect } from 'react';
import './AlbumCard3D.css';

const AlbumCard3D = ({ artist, title, isInline = false }) => {
  const cardRef = useRef(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [spotifyData, setSpotifyData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (artist && title) {
      fetchSpotifyData();
    }
  }, [artist, title]);

  const API_URL = import.meta.env.VITE_API_URL || "https://immerrock-customsongs-backend.onrender.com";

  const fetchSpotifyData = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${API_URL}/api/spotify/search?artist=${artist}&title=${title}`
      );

      if (!response.ok) {
        throw new Error('Album introuvable');
      }

      const data = await response.json();
      
      // Si pas d'image, utiliser l'image par défaut
      if (!data.albumImage) {
        data.albumImage = '/unknow_vinyle.png';
      }
      
      setSpotifyData(data);
    } catch (err) {
      console.error('Erreur Spotify:', err);
      // En cas d'erreur, utiliser l'image par défaut
      setSpotifyData({
        album: 'Unknown Album',
        albumImage: '/unknow_vinyle.png',
        trackUrl: null
      });
      setError(null); // Ne pas afficher d'erreur, juste l'image par défaut
    } finally {
      setLoading(false);
    }
  };

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;

    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -15;
    const rotateY = ((x - centerX) / centerX) * 15;
    
    setRotateX(rotateX);
    setRotateY(rotateY);
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    setRotateX(0);
    setRotateY(0);
  };

  // Mode inline : rendu simplifié sans overlay
  if (isInline) {
    return (
      <div className="album-card-inline-container">
        {loading && (
          <div className="album-card-loading-inline">
            <div className="loading-spinner-album"></div>
          </div>
        )}

        {error && (
          <div className="album-card-error-inline">
            <p>⚠️</p>
          </div>
        )}

        {spotifyData && !loading && !error && (
          <div
            ref={cardRef}
            className={`album-card-3d-inline ${isHovering ? 'hovering' : ''}`}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{
              transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${isHovering ? 1.15 : 1})`,
            }}
          >
            <div className="album-card-glow"></div>
            <img 
              src={spotifyData.albumImage} 
              alt={`${spotifyData.album} by ${artist}`}
              className="album-card-image"
            />
            <div className="album-card-shine"></div>
            
            {/* Overlay avec titre et artiste - suit la rotation 3D */}
            <div className="album-card-overlay">
              <h3 className="album-card-title">{title}</h3>
              <p className="album-card-artist">{artist}</p>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Mode overlay (ancien comportement - conservé pour compatibilité)
  return null;
};

export default AlbumCard3D;
