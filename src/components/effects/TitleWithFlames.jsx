import { useEffect, useRef } from 'react';
import logo from '../../assets/Immerrock_logo.png';
import './TitleWithFlames.css';

const TitleWithFlames = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const particles = [];
    let animationFrameId;

    // Ajuster la taille du canvas
    const resizeCanvas = () => {
      const container = canvas.parentElement;
      canvas.width = container.offsetWidth;
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
        // Les particules commencent au bas du titre (environ 80% de la hauteur du canvas)
        this.x = Math.random() * canvas.width;
        this.y = canvas.height * .8;
        this.size = Math.random() * 4 + 2;
        this.speedX = (Math.random() - 0.5) * 2;
        this.speedY = -Math.random() * 3 - 1;
        this.life = 1;
        this.decay = Math.random() * 0.015 + 0.01;
        this.hue = Math.random() * 30; // Orange-rouge
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.life -= this.decay;
        this.size *= 0.98;

        // Oscillation
        this.x += Math.sin(this.y * 0.05) * 0.5;

        if (this.life <= 0 || this.y < 0) {
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
  }, []);

  return (
    <div className="title-flames-container">
      {/* Logo flottant */}
      <a href="https://immerrock.com" target="_blank" rel="noopener noreferrer">
      <img src={logo} alt="Immerrock Logo" className="floating-logo" />
      </a>
      {/* Titre */}
      <h1 className="flame-title">
        Custom Songs Library
      </h1>
      
      {/* Canvas des particules de feu (au-dessus de tout) */}
      <canvas ref={canvasRef} className="flames-canvas" />
    </div>
  );
};

export default TitleWithFlames;
