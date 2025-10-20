import { useEffect, useState } from 'react';

interface Cloud {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
}

const CloudBackground = () => {
  const [clouds, setClouds] = useState<Cloud[]>([]);

  useEffect(() => {
    const generatedClouds: Cloud[] = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 150 + Math.random() * 200,
      duration: 20 + Math.random() * 15,
      delay: Math.random() * 10,
    }));
    setClouds(generatedClouds);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {clouds.map((cloud) => (
        <div
          key={cloud.id}
          className="cloud"
          style={{
            left: `${cloud.x}%`,
            top: `${cloud.y}%`,
            width: `${cloud.size}px`,
            height: `${cloud.size * 0.6}px`,
            animation: `cloudFloat ${cloud.duration}s ease-in-out infinite`,
            animationDelay: `${cloud.delay}s`,
          }}
        />
      ))}
    </div>
  );
};

export default CloudBackground;
