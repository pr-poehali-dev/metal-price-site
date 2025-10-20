import React from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface NavigationProps {
  activeSection: string;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  scrollToSection: (section: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({
  activeSection,
  mobileMenuOpen,
  setMobileMenuOpen,
  scrollToSection
}) => {
  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-10 w-10 rounded-lg bg-accent flex items-center justify-center">
            <Icon name="Factory" className="h-6 w-6 text-accent-foreground" />
          </div>
          <div>
            <h1 className="font-bold text-lg leading-tight">Краев Металл Компани</h1>
            <p className="text-xs text-muted-foreground">Металлопрокат от производителя</p>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-6">
          <button
            onClick={() => scrollToSection('catalog')}
            className={`text-sm font-medium transition-colors hover:text-accent ${activeSection === 'catalog' ? 'text-accent' : 'text-muted-foreground'}`}
          >
            Каталог
          </button>
          <button
            onClick={() => scrollToSection('price')}
            className={`text-sm font-medium transition-colors hover:text-accent ${activeSection === 'price' ? 'text-accent' : 'text-muted-foreground'}`}
          >
            Прайс-лист
          </button>
          <button
            onClick={() => scrollToSection('calculator')}
            className={`text-sm font-medium transition-colors hover:text-accent ${activeSection === 'calculator' ? 'text-accent' : 'text-muted-foreground'}`}
          >
            Калькулятор
          </button>
          <button
            onClick={() => scrollToSection('delivery')}
            className={`text-sm font-medium transition-colors hover:text-accent ${activeSection === 'delivery' ? 'text-accent' : 'text-muted-foreground'}`}
          >
            Доставка
          </button>
          <button
            onClick={() => scrollToSection('about')}
            className={`text-sm font-medium transition-colors hover:text-accent ${activeSection === 'about' ? 'text-accent' : 'text-muted-foreground'}`}
          >
            О компании
          </button>
          <button
            onClick={() => scrollToSection('contacts')}
            className={`text-sm font-medium transition-colors hover:text-accent ${activeSection === 'contacts' ? 'text-accent' : 'text-muted-foreground'}`}
          >
            Контакты
          </button>
        </div>

        <div className="hidden md:flex items-center gap-2">
          <Button size="sm" variant="outline" asChild>
            <a href="https://wa.me/79185086059" target="_blank" rel="noopener noreferrer">
              <Icon name="MessageCircle" className="mr-2 h-4 w-4 text-green-500" />
              WhatsApp
            </a>
          </Button>
          <Button size="sm" asChild>
            <a href="tel:+79185086059">
              <Icon name="Phone" className="mr-2 h-4 w-4" />
              +7 (918) 508-60-59
            </a>
          </Button>
        </div>

        <button
          className="md:hidden p-2 hover:bg-accent/10 rounded-lg transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <Icon name={mobileMenuOpen ? "X" : "Menu"} className="h-6 w-6" />
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-t bg-background">
          <div className="container px-4 py-4 space-y-2">
            <button
              onClick={() => scrollToSection('catalog')}
              className="block w-full text-left py-2 px-4 rounded-lg hover:bg-accent/10 transition-colors"
            >
              Каталог
            </button>
            <button
              onClick={() => scrollToSection('price')}
              className="block w-full text-left py-2 px-4 rounded-lg hover:bg-accent/10 transition-colors"
            >
              Прайс-лист
            </button>
            <button
              onClick={() => scrollToSection('calculator')}
              className="block w-full text-left py-2 px-4 rounded-lg hover:bg-accent/10 transition-colors"
            >
              Калькулятор
            </button>
            <button
              onClick={() => scrollToSection('delivery')}
              className="block w-full text-left py-2 px-4 rounded-lg hover:bg-accent/10 transition-colors"
            >
              Доставка
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="block w-full text-left py-2 px-4 rounded-lg hover:bg-accent/10 transition-colors"
            >
              О компании
            </button>
            <button
              onClick={() => scrollToSection('contacts')}
              className="block w-full text-left py-2 px-4 rounded-lg hover:bg-accent/10 transition-colors"
            >
              Контакты
            </button>
            <div className="flex gap-2 mt-2">
              <Button variant="outline" className="flex-1" asChild>
                <a href="https://wa.me/79185086059" target="_blank" rel="noopener noreferrer">
                  <Icon name="MessageCircle" className="mr-2 h-4 w-4 text-green-500" />
                  WhatsApp
                </a>
              </Button>
              <Button variant="outline" className="flex-1" asChild>
                <a href="https://t.me/+79185086059" target="_blank" rel="noopener noreferrer">
                  <Icon name="Send" className="mr-2 h-4 w-4 text-blue-500" />
                  Telegram
                </a>
              </Button>
            </div>
            <Button className="w-full mt-2" asChild>
              <a href="tel:+79185086059">
                <Icon name="Phone" className="mr-2 h-4 w-4" />
                +7 (918) 508-60-59
              </a>
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
