import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface HeroSectionProps {
  scrollToSection: (section: string) => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ scrollToSection }) => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="hero" className="relative h-[600px] md:h-[700px] overflow-hidden">
      <div 
        className="absolute inset-0 animate-fade-in"
        style={{ 
          transform: `translateY(${scrollY * 0.5}px)`,
          transition: 'transform 0.1s ease-out'
        }}
      >
        <img 
          src="https://cdn.poehali.dev/files/c52ad37f-0bbe-49a5-9727-00ff797668eb.jpeg" 
          alt="Металлопрокат - склад" 
          className="w-full h-full object-cover animate-scale-in"
          loading="eager"
          fetchPriority="high"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-red-950/40 to-orange-950/50"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,69,0,0.15),transparent_50%),radial-gradient(circle_at_70%_50%,rgba(255,140,0,0.1),transparent_50%)]"></div>
      </div>
      
      <div className="container px-4 relative h-full flex items-center">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 animate-fade-in drop-shadow-lg hero-glow-text">
            Металлопрокат от производителя
          </h1>
          <p className="text-xl text-white/95 mb-8 animate-fade-in drop-shadow-md animate-delay-200">
            Широкий ассортимент металлопродукции по актуальным ценам. Доставка по всей России.
          </p>
          <div className="flex flex-wrap gap-4 animate-fade-in">
            <Button size="lg" variant="secondary" onClick={() => scrollToSection('catalog')}>
              <Icon name="Package" className="mr-2 h-5 w-5" />
              Смотреть каталог
            </Button>
            <Button size="lg" variant="outline" className="bg-white/10 hover:bg-white/20 text-white border-white/30" onClick={() => scrollToSection('calculator')}>
              <Icon name="Calculator" className="mr-2 h-5 w-5" />
              Рассчитать стоимость
            </Button>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background to-transparent"></div>
    </section>
  );
};

export default HeroSection;