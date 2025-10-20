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
        <button
          onClick={handleCall}
          className="relative group"
        >
          <div className="absolute inset-0 rounded-full bg-blue-500 animate-ping opacity-75"></div>
          <div className="relative h-16 w-16 rounded-full bg-blue-500 flex items-center justify-center shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 hover:scale-110">
            <Icon name="Phone" size={30} className="text-white" />
          </div>
          <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-gray-900 text-white px-3 py-1 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
            Позвонить
          </span>
        </button>

        <button
          onClick={handleWhatsApp}
          className="relative group"
        >
          <div className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-75"></div>
          <div className="relative h-16 w-16 rounded-full overflow-hidden shadow-2xl hover:shadow-green-500/50 transition-all duration-300 hover:scale-110">
            <img 
              src="https://cdn.poehali.dev/files/2fe97b00-fc76-4c22-b12e-6be6267750e0.jpeg"
              alt="WhatsApp"
              className="h-full w-full object-cover"
            />
          </div>
          <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-gray-900 text-white px-3 py-1 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
            WhatsApp
          </span>
        </button>
      </div>
    </>
  );
};

export default FloatingContacts;