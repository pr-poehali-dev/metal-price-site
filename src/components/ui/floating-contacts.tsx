import React from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

const FloatingContacts: React.FC = () => {
  const handleWhatsApp = () => {
    window.open('https://wa.me/79185086059', '_blank');
  };

  const handleCall = () => {
    window.location.href = 'tel:+79185086059';
  };

  return (
    <>
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-4">
        <Button
          onClick={handleCall}
          size="lg"
          className="h-14 w-14 rounded-full shadow-lg bg-blue-500 hover:bg-blue-600 text-white relative group"
        >
          <Icon name="Phone" size={24} />
          <span className="absolute right-full mr-3 bg-gray-900 text-white px-3 py-1 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
            Позвонить
          </span>
        </Button>

        <button
          onClick={handleWhatsApp}
          className="relative group shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
        >
          <img 
            src="https://cdn.poehali.dev/files/2fe97b00-fc76-4c22-b12e-6be6267750e0.jpeg"
            alt="WhatsApp"
            className="h-14 w-14 rounded-2xl"
          />
          <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-gray-900 text-white px-3 py-1 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
            WhatsApp
          </span>
        </button>
      </div>

    </>
  );
};

export default FloatingContacts;