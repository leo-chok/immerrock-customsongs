import { useEffect, useRef } from 'react';
import './FireParticles.css';

const FireParticles = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    
    // Ajuster la taille du canvas
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Particules de feu
    const particles = [];
    const particleCount = 60;

    class Particle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height + 10;
        this.size = Math.random() * 5 + 2;
        this.speedY = Math.random() * 2.5 + 1;
        this.speedX = (Math.random() - 0.5) * 1.5;
        this.opacity = 1;
        this.hue = Math.random() * 30; // Orange-rouge (0-30 en HSL)
        this.life = 0;
      }

      update() {
        this.y -= this.speedY;
        this.x += this.speedX;
        this.life += 0.01;
        
        // Oscillation horizontale pour effet de danse
        this.x += Math.sin(this.life * 2) * 0.5;
        
        // Diminution progressive
        this.opacity -= 0.004;
        this.size *= 0.99;

        if (this.y < -20 || this.opacity <= 0 || this.size < 0.5) {
          this.reset();
        }
      }

      draw() {
        ctx.save();
        ctx.globalAlpha = this.opacity;
        
        // Gradient radial pour effet de feu réaliste
        const gradient = ctx.createRadialGradient(
          this.x, this.y, 0,
          this.x, this.y, this.size * 3
        );
        
        // Cœur blanc/jaune brillant
        gradient.addColorStop(0, `hsla(${this.hue + 50}, 100%, 70%, 1)`);
        // Orange vif
        gradient.addColorStop(0.3, `hsla(${this.hue + 20}, 100%, 60%, 0.9)`);
        // Orange/rouge
        gradient.addColorStop(0.6, `hsla(${this.hue}, 100%, 50%, 0.7)`);
        // Rouge sombre qui se dissipe
        gradient.addColorStop(1, `hsla(${this.hue - 10}, 100%, 30%, 0)`);

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * 3, 0, Math.PI * 2);
        ctx.fill();
        
        // Ajout d'une lueur supplémentaire
        ctx.globalAlpha = this.opacity * 0.3;
        ctx.fillStyle = `hsla(${this.hue}, 100%, 50%, 0.3)`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * 5, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.restore();
      }
    }

    // Créer les particules
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    // Animation
    const animate = () => {
      // Fond semi-transparent pour effet de traînée
      ctx.fillStyle = 'rgba(10, 10, 10, 0.15)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

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

  return <canvas ref={canvasRef} className="fire-particles" />;
};

export default FireParticles;
