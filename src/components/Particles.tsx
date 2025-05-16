import React, { useRef, useEffect } from 'react';

interface Particle {
  x: number;
  y: number;
  radius: number;
  color: string;
  velocity: {
    x: number;
    y: number;
  };
  opacity: number;
}

interface ParticlesProps {
  count?: number;
  colors?: string[];
  className?: string;
}

const Particles: React.FC<ParticlesProps> = ({ 
  count = 50, 
  colors = ['#9B6B9E', '#E9D2F4', '#FFA07A'],
  className = '',
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    let animationFrameId: number;
    let width: number;
    let height: number;
    
    const resizeCanvas = () => {
      const canvasRect = canvas.getBoundingClientRect();
      width = canvasRect.width;
      height = canvasRect.height;
      canvas.width = width;
      canvas.height = height;
      
      // Reset particles on resize
      initParticles();
    };
    
    const initParticles = () => {
      particlesRef.current = [];
      for (let i = 0; i < count; i++) {
        const radius = Math.random() * 2 + 1;
        particlesRef.current.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius,
          color: colors[Math.floor(Math.random() * colors.length)],
          velocity: {
            x: (Math.random() - 0.5) * 0.5,
            y: (Math.random() - 0.5) * 0.5,
          },
          opacity: Math.random() * 0.5 + 0.2,
        });
      }
    };
    
    const drawParticles = () => {
      ctx.clearRect(0, 0, width, height);
      
      particlesRef.current.forEach((particle) => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = particle.color + Math.floor(particle.opacity * 255).toString(16).padStart(2, '0');
        ctx.fill();
        
        // Update position
        particle.x += particle.velocity.x;
        particle.y += particle.velocity.y;
        
        // Bounce off edges
        if (particle.x + particle.radius > width || particle.x - particle.radius < 0) {
          particle.velocity.x = -particle.velocity.x;
        }
        
        if (particle.y + particle.radius > height || particle.y - particle.radius < 0) {
          particle.velocity.y = -particle.velocity.y;
        }
      });
      
      // Connect nearby particles
      connectParticles(ctx);
      
      animationFrameId = requestAnimationFrame(drawParticles);
    };
    
    const connectParticles = (ctx: CanvasRenderingContext2D) => {
      const maxDistance = 150;
      
      for (let i = 0; i < particlesRef.current.length; i++) {
        for (let j = i + 1; j < particlesRef.current.length; j++) {
          const dx = particlesRef.current[i].x - particlesRef.current[j].x;
          const dy = particlesRef.current[i].y - particlesRef.current[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < maxDistance) {
            const opacity = 1 - (distance / maxDistance);
            ctx.beginPath();
            ctx.strokeStyle = `rgba(155, 107, 158, ${opacity * 0.2})`;
            ctx.lineWidth = 1;
            ctx.moveTo(particlesRef.current[i].x, particlesRef.current[i].y);
            ctx.lineTo(particlesRef.current[j].x, particlesRef.current[j].y);
            ctx.stroke();
          }
        }
      }
    };
    
    // Initialize
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    drawParticles();
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [count, colors]);
  
  return (
    <canvas 
      ref={canvasRef} 
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
    />
  );
};

export default Particles;