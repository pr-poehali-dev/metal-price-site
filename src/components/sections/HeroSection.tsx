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
    <section id="hero" className="relative h-[600px] md:h-[800px] overflow-hidden mt-16">
      <div 
        className="absolute inset-0 animate-fade-in"
        style={{ 
          transform: window.innerWidth >= 768 ? `translateY(${scrollY * 0.5}px)` : 'none',
          transition: 'transform 0.1s ease-out'
        }}
      >
        <img 
          src="https://cdn.poehali.dev/files/c52ad37f-0bbe-49a5-9727-00ff797668eb.jpeg" 
          alt="Металлопрокат - склад" 
          className="w-full h-full object-cover animate-scale-in"
          loading="eager"
          fetchpriority="high"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/90 via-gray-800/70 to-blue-900/60"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(59,130,246,0.2),transparent_60%)]"></div>
      </div>
      
      <div className="container px-4 relative h-full flex items-center">
        <div className="max-w-4xl">
          <div className="inline-block px-5 py-2 bg-blue-500/20 backdrop-blur-sm border border-blue-400/30 text-blue-200 rounded-full text-sm font-semibold mb-6 animate-fade-in">
            ✨ Металлопрокат премиум качества
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 md:mb-6 animate-fade-in leading-tight">
            Металлопрокат от <span className="bg-gradient-to-r from-blue-400 to-sky-300 bg-clip-text text-transparent">производителя</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-200 mb-6 md:mb-10 animate-fade-in animate-delay-200 max-w-2xl leading-relaxed">
            Широкий ассортимент металлопродукции по актуальным ценам. Доставка по всей России.
          </p>
          <div className="flex flex-col sm:flex-row flex-wrap gap-3 md:gap-4 animate-fade-in">
            <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100 shadow-2xl shadow-white/20 px-6 md:px-8 py-5 md:py-6 text-base md:text-lg font-semibold w-full sm:w-auto" onClick={() => scrollToSection('catalog')}>
              <Icon name="Package" className="mr-2 h-5 w-5" />
              Смотреть каталог
            </Button>
            <Button size="lg" variant="outline" className="bg-transparent hover:bg-white/10 text-white border-2 border-white/50 hover:border-white backdrop-blur-sm px-6 md:px-8 py-5 md:py-6 text-base md:text-lg font-semibold w-full sm:w-auto" onClick={() => scrollToSection('calculator')}>
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