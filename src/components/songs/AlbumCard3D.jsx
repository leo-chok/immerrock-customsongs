import { useRef, useState } from 'react';
import './AlbumCard3D.css';

const AlbumCard3D = ({ artist, title, imageUrl, isInline = false }) => {
  const cardRef = useRef(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  const displayImage = imageUrl || '/unknow_vinyle.png';

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
            src={displayImage} 
            alt={`${title} by ${artist}`}
            className="album-card-image"
            loading="lazy"
          />
          <div className="album-card-shine"></div>
          
          {/* Overlay avec titre et artiste - suit la rotation 3D */}
          <div className="album-card-overlay">
            <h3 className="album-card-title">{title}</h3>
            <p className="album-card-artist">{artist}</p>
          </div>
        </div>
      </div>
    );
  }

  // Mode overlay (ancien comportement - conservé pour compatibilité)
  return null;
};

export default AlbumCard3D;
