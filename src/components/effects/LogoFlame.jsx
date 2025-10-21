import { useEffect, useRef } from 'react';
import './LogoFlame.css';

const LogoFlame = ({ logoSrc }) => {
  const canvasRef = useRef(null);
  const particles = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const containerRect = canvas.parentElement.getBoundingClientRect();
    
    canvas.width = containerRect.width;
    canvas.height = containerRect.height;

    // Particle class for flame particles
    class FlameParticle {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 4 + 2;
        this.speedX = (Math.random() - 0.5) * 2;
        this.speedY = -Math.random() * 3 - 1;
        this.life = 1;
        this.decay = Math.random() * 0.02 + 0.01;
        this.color = this.getRandomFireColor();
      }

      getRandomFireColor() {
        const colors = [
          'rgba(255, 69, 0, ',    // Red-orange
          'rgba(255, 140, 0, ',   // Dark orange
          'rgba(255, 165, 0, ',   // Orange
          'rgba(255, 215, 0, '    // Gold
        ];
        return colors[Math.floor(Math.random() * colors.length)];
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.life -= this.decay;
        this.size *= 0.98;
      }

      draw(ctx) {
        ctx.save();
        ctx.globalAlpha = this.life;
        ctx.fillStyle = this.color + this.life + ')';
        ctx.shadowBlur = 15;
        ctx.shadowColor = this.color + '0.8)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      isDead() {
        return this.life <= 0;
      }
    }

    // Create particles around the logo
    const createParticles = () => {
      const centerX = canvas.width / 2;
      const logoHeight = 120; // Match logo height
      const logoWidth = 120; // Approximate width
      const bottomY = canvas.height / 2 + logoHeight / 2;

      // Create particles from bottom and sides of logo
      const positions = [
        // Bottom particles
        { x: centerX + (Math.random() - 0.5) * logoWidth * 0.8, y: bottomY },
        // Left side particles
        { x: centerX - logoWidth / 2 + Math.random() * 20, y: canvas.height / 2 + (Math.random() - 0.5) * logoHeight * 0.6 },
        // Right side particles
        { x: centerX + logoWidth / 2 - Math.random() * 20, y: canvas.height / 2 + (Math.random() - 0.5) * logoHeight * 0.6 },
      ];

      const pos = positions[Math.floor(Math.random() * positions.length)];
      particles.current.push(new FlameParticle(pos.x, pos.y));
    };

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Create new particles
      if (Math.random() < 0.3) {
        createParticles();
      }

      // Update and draw particles
      particles.current = particles.current.filter(particle => {
        particle.update();
        particle.draw(ctx);
        return !particle.isDead();
      });

      requestAnimationFrame(animate);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      const newRect = canvas.parentElement.getBoundingClientRect();
      canvas.width = newRect.width;
      canvas.height = newRect.height;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="logo-flame-container">
      <canvas ref={canvasRef} className="flame-canvas" />
      <div className="logo-wrapper">
        <div className="flame-glow"></div>
        <img src={logoSrc} alt="Immerock Logo" className="flame-logo" />
      </div>
    </div>
  );
};

export default LogoFlame;
