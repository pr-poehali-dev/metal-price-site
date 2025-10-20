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
    <nav className="fixed top-0 z-50 w-full border-b border-white/10 bg-white/80 backdrop-blur-xl supports-[backdrop-filter]:bg-white/70 shadow-lg">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-sky-400 via-blue-500 to-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-shadow">
            <Icon name="Factory" className="h-7 w-7 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-xl leading-tight bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">Краев Металл Компани</h1>
            <p className="text-xs text-gray-600 font-medium">Металлопрокат от производителя</p>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-6">
          <button
            onClick={() => scrollToSection('catalog')}
            className={`text-sm font-semibold transition-all px-3 py-2 rounded-lg ${activeSection === 'catalog' ? 'text-blue-600 bg-blue-50' : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'}`}
          >
            Каталог
          </button>
          <button
            onClick={() => scrollToSection('price')}
            className={`text-sm font-semibold transition-all px-3 py-2 rounded-lg ${activeSection === 'price' ? 'text-blue-600 bg-blue-50' : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'}`}
          >
            Прайс-лист
          </button>
          <button
            onClick={() => scrollToSection('calculator')}
            className={`text-sm font-semibold transition-all px-3 py-2 rounded-lg ${activeSection === 'calculator' ? 'text-blue-600 bg-blue-50' : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'}`}
          >
            Калькулятор
          </button>
          <button
            onClick={() => scrollToSection('delivery')}
            className={`text-sm font-semibold transition-all px-3 py-2 rounded-lg ${activeSection === 'delivery' ? 'text-blue-600 bg-blue-50' : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'}`}
          >
            Доставка
          </button>
          <button
            onClick={() => scrollToSection('about')}
            className={`text-sm font-semibold transition-all px-3 py-2 rounded-lg ${activeSection === 'about' ? 'text-blue-600 bg-blue-50' : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'}`}
          >
            О компании
          </button>
          <button
            onClick={() => scrollToSection('contacts')}
            className={`text-sm font-semibold transition-all px-3 py-2 rounded-lg ${activeSection === 'contacts' ? 'text-blue-600 bg-blue-50' : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'}`}
          >
            Контакты
          </button>
        </div>

        <div className="hidden md:flex items-center gap-3">
          <Button size="sm" variant="ghost" className="hover:bg-green-50 hover:text-green-600 border border-transparent hover:border-green-200" asChild>
            <a href="https://wa.me/79185086059" target="_blank" rel="noopener noreferrer">
              <Icon name="MessageCircle" className="mr-2 h-4 w-4 text-green-500" />
              WhatsApp
            </a>
          </Button>
          <Button size="sm" className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-all" asChild>
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