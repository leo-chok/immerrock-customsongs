import { useEffect, useRef } from 'react';
import './FlameExplosion.css';

const FlameExplosion = ({ onComplete }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Particules de flammes
    const particles = [];
    const particleCount = 250; // Augmenté pour couvrir tout l'écran
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const emitterRadius = 200; // Rayon de la zone d'émission

    class Particle {
      constructor() {
        // Position aléatoire dans un cercle autour du centre
        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * emitterRadius;
        this.x = centerX + Math.cos(angle) * distance;
        this.y = centerY + Math.sin(angle) * distance;
        
        this.size = Math.random() * 25 + 10; // Particules plus grandes
        this.speedX = (Math.random() - 0.5) * 30; // Vitesse augmentée pour couvrir plus d'espace
        this.speedY = (Math.random() - 0.5) * 30;
        this.life = 1;
        this.decay = Math.random() * 0.012 + 0.008; // Durée de vie plus longue
        this.angle = Math.random() * Math.PI * 2;
        this.spin = (Math.random() - 0.5) * 0.1;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.speedY -= 0.1; // Gravité
        this.speedX *= 0.98; // Friction
        this.life -= this.decay;
        this.angle += this.spin;
        this.size *= 0.97;
      }

      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        
        // Gradient de flamme
        const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, this.size);
        
        if (this.life > 0.7) {
          // Flamme blanche/jaune au début
          gradient.addColorStop(0, `rgba(255, 255, 200, ${this.life})`);
          gradient.addColorStop(0.3, `rgba(255, 200, 100, ${this.life * 0.9})`);
          gradient.addColorStop(0.6, `rgba(255, 100, 0, ${this.life * 0.7})`);
          gradient.addColorStop(1, `rgba(255, 69, 0, 0)`);
        } else if (this.life > 0.4) {
          // Flamme orange
          gradient.addColorStop(0, `rgba(255, 180, 50, ${this.life})`);
          gradient.addColorStop(0.4, `rgba(255, 100, 0, ${this.life * 0.8})`);
          gradient.addColorStop(0.7, `rgba(200, 50, 0, ${this.life * 0.5})`);
          gradient.addColorStop(1, `rgba(100, 20, 0, 0)`);
        } else {
          // Flamme rouge/fumée
          gradient.addColorStop(0, `rgba(200, 80, 0, ${this.life})`);
          gradient.addColorStop(0.5, `rgba(100, 40, 0, ${this.life * 0.6})`);
          gradient.addColorStop(0.8, `rgba(50, 20, 0, ${this.life * 0.3})`);
          gradient.addColorStop(1, `rgba(30, 10, 0, 0)`);
        }

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(0, 0, this.size, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.restore();
      }
    }

    // Créer les particules
    for (let i = 0; i < particleCount; i++) {
      setTimeout(() => {
        particles.push(new Particle());
      }, i * 3); // Décalage pour effet d'explosion progressive
    }

    let animationId;
    let frame = 0;
    const maxFrames = 200; // Durée de l'animation réduite

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Ajouter des nouvelles particules au début
      if (frame < 40 && frame % 2 === 0) { // Plus de particules au début
        particles.push(new Particle());
      }

      // Mettre à jour et dessiner les particules
      for (let i = particles.length - 1; i >= 0; i--) {
        particles[i].update();
        particles[i].draw();

        // Supprimer les particules mortes
        if (particles[i].life <= 0 || particles[i].size < 0.5) {
          particles.splice(i, 1);
        }
      }

      frame++;

      if (frame < maxFrames && particles.length > 0) {
        animationId = requestAnimationFrame(animate);
      } else {
        // Animation terminée
        if (onComplete) {
          onComplete();
        }
      }
    };

    // Démarrer l'animation après un court délai
    setTimeout(() => {
      animate();
    }, 5);

    // Cleanup
    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [onComplete]);

  return (
    <canvas
      ref={canvasRef}
      className="flame-explosion-canvas"
    />
  );
};

export default FlameExplosion;
