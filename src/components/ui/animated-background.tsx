import { useEffect, useRef } from 'react';

const AnimatedBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
    }> = [];

    const sparks: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      life: number;
      maxLife: number;
      size: number;
      color: string;
    }> = [];

    const gears: Array<{
      x: number;
      y: number;
      radius: number;
      rotation: number;
      rotationSpeed: number;
      teeth: number;
      opacity: number;
    }> = [];

    for (let i = 0; i < 30; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.3 + 0.1,
      });
    }

    for (let i = 0; i < 8; i++) {
      gears.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 30 + 20,
        rotation: 0,
        rotationSpeed: (Math.random() - 0.5) * 0.01,
        teeth: Math.floor(Math.random() * 4 + 6),
        opacity: Math.random() * 0.1 + 0.05,
      });
    }

    const createSparks = () => {
      if (Math.random() > 0.97) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        
        for (let i = 0; i < 5; i++) {
          const angle = Math.random() * Math.PI * 2;
          const speed = Math.random() * 2 + 1;
          
          sparks.push({
            x,
            y,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed - 1,
            life: 60,
            maxLife: 60,
            size: Math.random() * 2 + 1,
            color: Math.random() > 0.5 ? '255, 140, 0' : '212, 175, 55',
          });
        }
      }
    };

    let frame = 0;

    const drawGear = (gear: typeof gears[0]) => {
      ctx.save();
      ctx.translate(gear.x, gear.y);
      ctx.rotate(gear.rotation);
      
      ctx.strokeStyle = `rgba(100, 116, 139, ${gear.opacity})`;
      ctx.lineWidth = 2;
      
      const outerRadius = gear.radius;
      const innerRadius = gear.radius * 0.6;
      const toothHeight = gear.radius * 0.2;
      
      ctx.beginPath();
      for (let i = 0; i < gear.teeth * 2; i++) {
        const angle = (i * Math.PI) / gear.teeth;
        const radius = i % 2 === 0 ? outerRadius + toothHeight : outerRadius;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        
        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.closePath();
      ctx.stroke();
      
      ctx.beginPath();
      ctx.arc(0, 0, innerRadius, 0, Math.PI * 2);
      ctx.stroke();
      
      ctx.restore();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      frame++;
      createSparks();

      gears.forEach((gear) => {
        gear.rotation += gear.rotationSpeed;
        drawGear(gear);
      });

      sparks.forEach((spark, index) => {
        spark.x += spark.vx;
        spark.y += spark.vy;
        spark.vy += 0.1;
        spark.life--;

        const alpha = spark.life / spark.maxLife;
        
        ctx.beginPath();
        ctx.arc(spark.x, spark.y, spark.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${spark.color}, ${alpha * 0.8})`;
        ctx.fill();

        const gradient = ctx.createRadialGradient(spark.x, spark.y, 0, spark.x, spark.y, spark.size * 3);
        gradient.addColorStop(0, `rgba(${spark.color}, ${alpha * 0.3})`);
        gradient.addColorStop(1, `rgba(${spark.color}, 0)`);
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(spark.x, spark.y, spark.size * 3, 0, Math.PI * 2);
        ctx.fill();

        if (spark.life <= 0) {
          sparks.splice(index, 1);
        }
      });

      particles.forEach((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        ctx.save();
        ctx.translate(particle.x, particle.y);
        ctx.rotate(frame * 0.02);
        
        ctx.fillStyle = `rgba(100, 116, 139, ${particle.opacity})`;
        ctx.fillRect(-particle.size / 2, -particle.size / 2, particle.size, particle.size);
        
        ctx.strokeStyle = `rgba(148, 163, 184, ${particle.opacity * 0.5})`;
        ctx.lineWidth = 0.5;
        ctx.strokeRect(-particle.size / 2, -particle.size / 2, particle.size, particle.size);
        
        ctx.restore();
      });

      particles.forEach((p1, i) => {
        particles.slice(i + 1).forEach((p2) => {
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            const gradient = ctx.createLinearGradient(p1.x, p1.y, p2.x, p2.y);
            gradient.addColorStop(0, `rgba(100, 116, 139, ${0.2 * (1 - distance / 150)})`);
            gradient.addColorStop(1, `rgba(148, 163, 184, ${0.1 * (1 - distance / 150)})`);
            ctx.strokeStyle = gradient;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        });
      });

      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-30"
      style={{ background: 'transparent' }}
    />
  );
};

export default AnimatedBackground;