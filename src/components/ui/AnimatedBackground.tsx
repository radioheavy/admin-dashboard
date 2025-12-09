import { useEffect, useRef } from 'react';

const AnimatedBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let time = 0;

    // Set canvas size
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Gradient orbs
    const orbs = [
      { x: 0.2, y: 0.3, radius: 0.4, color: 'rgba(236, 72, 153, 0.15)', speed: 0.0003 },
      { x: 0.8, y: 0.7, radius: 0.35, color: 'rgba(139, 92, 246, 0.12)', speed: 0.0004 },
      { x: 0.5, y: 0.5, radius: 0.5, color: 'rgba(236, 72, 153, 0.08)', speed: 0.0002 },
      { x: 0.3, y: 0.8, radius: 0.3, color: 'rgba(59, 130, 246, 0.1)', speed: 0.00035 },
    ];

    const animate = () => {
      time += 1;
      ctx.fillStyle = '#0a0a0a';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      orbs.forEach((orb, i) => {
        // Organic movement
        const offsetX = Math.sin(time * orb.speed + i) * 0.1;
        const offsetY = Math.cos(time * orb.speed * 1.3 + i * 2) * 0.1;

        const x = (orb.x + offsetX) * canvas.width;
        const y = (orb.y + offsetY) * canvas.height;
        const radius = orb.radius * Math.min(canvas.width, canvas.height);

        // Create radial gradient
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
        gradient.addColorStop(0, orb.color);
        gradient.addColorStop(1, 'transparent');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();
      });

      // Noise texture overlay
      ctx.fillStyle = 'rgba(255, 255, 255, 0.01)';
      for (let i = 0; i < 50; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        ctx.fillRect(x, y, 1, 1);
      }

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.8 }}
    />
  );
};

export default AnimatedBackground;
