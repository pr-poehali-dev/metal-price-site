import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import FloatingContacts from '@/components/ui/floating-contacts';
import VisitorCounter from '@/components/VisitorCounter';
import AnimatedBackground from '@/components/ui/animated-background';

import Navigation from '@/components/sections/Navigation';
import HeroSection from '@/components/sections/HeroSection';
import CatalogSection from '@/components/sections/CatalogSection';
import PriceSection from '@/components/sections/PriceSection';
import CalculatorSection from '@/components/sections/CalculatorSection';
import DeliverySection from '@/components/sections/DeliverySection';
import AboutSection from '@/components/sections/AboutSection';
import ReviewsSection from '@/components/sections/ReviewsSection';
import FAQSection from '@/components/sections/FAQSection';
import GallerySection from '@/components/sections/GallerySection';
import ContactsSection from '@/components/sections/ContactsSection';
import { metalProducts } from '@/data/metalProducts';

const Index = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [calcWeight, setCalcWeight] = useState('');
  const [calcProduct, setCalcProduct] = useState('');
  const [calcResult, setCalcResult] = useState<number | null>(null);
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());
  const [counters, setCounters] = useState({ years: 0, warehouse: 0, clients: 0 });
  const [showScrollTop, setShowScrollTop] = useState(false);


  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set([...prev, entry.target.id]));
            
            if (entry.target.id === 'about') {
              const animateCounter = (target: number, setter: (val: number) => void) => {
                let current = 0;
                const increment = target / 60;
                const timer = setInterval(() => {
                  current += increment;
                  if (current >= target) {
                    setter(target);
                    clearInterval(timer);
                  } else {
                    setter(Math.floor(current));
                  }
                }, 30);
              };

              animateCounter(15, (val) => setCounters((prev) => ({ ...prev, years: val })));
              animateCounter(5000, (val) => setCounters((prev) => ({ ...prev, warehouse: val })));
              animateCounter(1200, (val) => setCounters((prev) => ({ ...prev, clients: val })));
            }
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
    );

    const sections = document.querySelectorAll('section[id]');
    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const calculatePrice = () => {
    if (!calcWeight || !calcProduct) return;
    
    const weight = parseFloat(calcWeight);
    const product = metalProducts
      .flatMap(cat => cat.items)
      .find(item => item.name === calcProduct);
    
    if (product) {
      setCalcResult((weight * product.price) / 1000);
    }
  };

  const scrollToSection = (section: string) => {
    setActiveSection(section);
    const element = document.getElementById(section);
    element?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const sendToWhatsApp = () => {
    const message = `Новая заявка с сайта Краев Металл Компани\n\nИмя: ${formData.name}\nТелефон: ${formData.phone}\nEmail: ${formData.email}\nСообщение: ${formData.message}`;
    const whatsappUrl = `https://wa.me/79185086059?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const sendToEmail = () => {
    const subject = 'Новая заявка с сайта Краев Металл Компани';
    const body = `Имя: ${formData.name}\nТелефон: ${formData.phone}\nEmail: ${formData.email}\n\nСообщение:\n${formData.message}`;
    const mailtoUrl = `mailto:KraevK.working@yandex.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoUrl;
  };

  const handleSubmit = async (e: React.FormEvent, method: 'whatsapp' | 'email') => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;
    
    setIsSubmitting(true);
    
    if (method === 'whatsapp') {
      sendToWhatsApp();
    } else {
      sendToEmail();
    }
    
    setSubmitSuccess(true);
    setTimeout(() => {
      setFormData({ name: '', phone: '', email: '', message: '' });
      setSubmitSuccess(false);
      setIsSubmitting(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      <AnimatedBackground />
      <Navigation
        activeSection={activeSection}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        scrollToSection={scrollToSection}
      />

      <HeroSection scrollToSection={scrollToSection} />

      <section className="py-8 bg-background border-b">
        <div className="container px-4">
          <div className="flex justify-center">
            <VisitorCounter />
          </div>
        </div>
      </section>

      <CatalogSection visibleSections={visibleSections} />
      <PriceSection visibleSections={visibleSections} />
      <CalculatorSection
        visibleSections={visibleSections}
        calcWeight={calcWeight}
        setCalcWeight={setCalcWeight}
        calcProduct={calcProduct}
        setCalcProduct={setCalcProduct}
        calcResult={calcResult}
        calculatePrice={calculatePrice}
      />
      <DeliverySection visibleSections={visibleSections} />
      <AboutSection visibleSections={visibleSections} counters={counters} />
      <ReviewsSection visibleSections={visibleSections} />
      <FAQSection visibleSections={visibleSections} />
      <GallerySection visibleSections={visibleSections} />
      <ContactsSection
        visibleSections={visibleSections}
        formData={formData}
        handleFormChange={handleFormChange}
        isSubmitting={isSubmitting}
        submitSuccess={submitSuccess}
        handleSubmit={handleSubmit}
      />

      <footer className="py-8 bg-primary/90 text-primary-foreground/80 border-t border-primary-foreground/10">
        <div className="container px-4 text-center">
          <p className="text-sm">
            © {new Date().getFullYear()} Краев Металл Компани. Все права защищены.
          </p>
        </div>
      </footer>

      {showScrollTop && (
        <Button
          onClick={scrollToTop}
          className="fixed bottom-24 left-6 z-50 rounded-full h-14 w-14 p-0 bg-transparent hover:bg-accent/10 border-2 border-accent/30 backdrop-blur-sm animate-fade-in"
          size="icon"
        >
          <Icon name="ArrowUp" className="h-6 w-6 text-accent" />
        </Button>
      )}

      <FloatingContacts />
    </div>
  );
};

export default Index;