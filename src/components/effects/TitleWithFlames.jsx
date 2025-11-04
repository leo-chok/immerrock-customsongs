import { useEffect, useRef, useState } from 'react';
import logo from '../../assets/Immerrock_logo.png';
import './TitleWithFlames.css';

const TitleWithFlames = () => {
  const canvasRef = useRef(null);
  const titleRef = useRef(null);
  const [titleWidth, setTitleWidth] = useState(0);

  // Mesurer la largeur du titre
  useEffect(() => {
    const measureTitle = () => {
      if (titleRef.current) {
        const width = titleRef.current.offsetWidth;
        setTitleWidth(width);
      }
    };

    // Mesurer initialement et au resize
    measureTitle();
    window.addEventListener('resize', measureTitle);

    return () => {
      window.removeEventListener('resize', measureTitle);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || titleWidth === 0) return;

    const ctx = canvas.getContext('2d');
    const particles = [];
    let animationFrameId;

    // Ajuster la taille du canvas en fonction du titre
    const resizeCanvas = () => {
      const container = canvas.parentElement;
      // Utiliser la largeur du titre
      canvas.width = titleWidth;
      canvas.height = container.offsetHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Classe de particule de feu
    class FlameParticle {
      constructor() {
        this.reset();
      }

      reset() {
        // Les particules commencent au bas du titre (environ 85% de la hauteur du canvas)
        this.x = Math.random() * canvas.width;
        this.y = canvas.height * .75;
        // Taille augmentée : entre 3 et 10 (au lieu de 2-6)
        this.size = Math.random() * 3 + 3;
        // Vitesse horizontale ralentie : divisée par 2
        this.speedX = (Math.random() - 0.5) * 1;
        // Vitesse verticale ralentie : entre -0.5 et -2 (au lieu de -1 à -4)
        this.speedY = -Math.random() * 1.5 - 0.5;
        this.life = 5;
        // Decay ralenti pour vivre plus longtemps
        this.decay = Math.random() * 0.008 + 0.005;
        this.hue = Math.random() * 20; // Orange-rouge
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.life -= this.decay;
        // Réduction de taille ralentie
        this.size *= 0.982;

        // Oscillation ralentie
        this.x += Math.sin(this.y * 0.03) * 0.3;

        // Les particules peuvent monter plus haut (jusqu'à -20% du canvas au lieu de 0)
        if (this.life <= 0 || this.y < -canvas.height * 0.5) {
          this.reset();
        }
      }

      draw() {
        ctx.save();
        ctx.globalAlpha = this.life;
        
        // Gradient radial pour chaque particule
        const gradient = ctx.createRadialGradient(
          this.x, this.y, 0,
          this.x, this.y, this.size
        );
        
        gradient.addColorStop(0, `hsla(${this.hue}, 100%, 60%, ${this.life})`);
        gradient.addColorStop(0.5, `hsla(${this.hue + 10}, 100%, 50%, ${this.life * 0.6})`);
        gradient.addColorStop(1, `hsla(${this.hue + 20}, 100%, 40%, 0)`);
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    // Créer les particules
    const particleCount = 117;
    for (let i = 0; i < particleCount; i++) {
      particles.push(new FlameParticle());
    }

    // Animation
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [titleWidth]);

  return (
    <div className="title-flames-container">
      {/* Logo flottant */}
      <a href="https://immerrock.com" target="_blank" rel="noopener noreferrer">
      <img src={logo} alt="Immerrock Logo" className="floating-logo" />
      </a>
      {/* Titre */}
      <h1 ref={titleRef} className="flame-title">
        Custom Songs Library
      </h1>
      
      {/* Canvas des particules de feu (au-dessus de tout) */}
      <canvas ref={canvasRef} className="flames-canvas" />
    </div>
  );
};

export default TitleWithFlames;
