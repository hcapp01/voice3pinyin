import React, { useEffect, useState } from 'react';

interface FireworkParticle {
  x: number;
  y: number;
  color: string;
  angle: number;
  velocity: number;
  opacity: number;
}

export function Fireworks() {
  const [particles, setParticles] = useState<FireworkParticle[]>([]);

  useEffect(() => {
    const colors = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF'];
    const particleCount = 50;
    const initialParticles: FireworkParticle[] = [];

    for (let i = 0; i < particleCount; i++) {
      initialParticles.push({
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        angle: (Math.PI * 2 * i) / particleCount,
        velocity: 2 + Math.random() * 3,
        opacity: 1,
      });
    }

    setParticles(initialParticles);

    const animate = () => {
      setParticles(prevParticles =>
        prevParticles
          .map(particle => ({
            ...particle,
            x: particle.x + Math.cos(particle.angle) * particle.velocity,
            y: particle.y + Math.sin(particle.angle) * particle.velocity,
            velocity: particle.velocity * 0.98,
            opacity: particle.opacity * 0.96,
          }))
          .filter(particle => particle.opacity > 0.1)
      );
    };

    const intervalId = setInterval(animate, 16);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none">
      {particles.map((particle, index) => (
        <div
          key={index}
          className="absolute w-2 h-2 rounded-full"
          style={{
            left: particle.x,
            top: particle.y,
            backgroundColor: particle.color,
            opacity: particle.opacity,
            transform: 'translate(-50%, -50%)',
          }}
        />
      ))}
    </div>
  );
}