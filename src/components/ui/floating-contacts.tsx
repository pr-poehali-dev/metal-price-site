import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

const FloatingContacts: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleWhatsApp = () => {
    window.open('https://wa.me/79185086059', '_blank');
  };

  const handleCall = () => {
    window.location.href = 'tel:+79185086059';
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
        {isExpanded && (
          <>
            <Button
              onClick={handleCall}
              size="lg"
              className="h-14 w-14 rounded-full shadow-lg bg-blue-500 hover:bg-blue-600 text-white animate-scale-in relative group"
            >
              <Icon name="Phone" size={24} />
              <span className="absolute right-full mr-3 bg-gray-900 text-white px-3 py-1 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                Позвонить
              </span>
            </Button>

            <Button
              onClick={handleWhatsApp}
              size="lg"
              className="h-14 w-14 rounded-full shadow-lg bg-green-500 hover:bg-green-600 text-white animate-scale-in relative group"
              style={{ animationDelay: '100ms' }}
            >
              <Icon name="MessageCircle" size={24} />
              <span className="absolute right-full mr-3 bg-gray-900 text-white px-3 py-1 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                WhatsApp
              </span>
            </Button>
          </>
        )}

        <Button
          onClick={() => setIsExpanded(!isExpanded)}
          size="lg"
          className={`h-16 w-16 rounded-full shadow-2xl bg-accent hover:bg-accent/90 text-white transition-transform ${
            isExpanded ? 'rotate-45' : 'animate-bounce-slow'
          }`}
        >
          <Icon name={isExpanded ? "X" : "MessageSquare"} size={28} />
        </Button>
      </div>

      <style>{`
        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .animate-scale-in {
          animation: scale-in 0.3s ease-out forwards;
        }

        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }
      `}</style>
    </>
  );
};

export default FloatingContacts;
