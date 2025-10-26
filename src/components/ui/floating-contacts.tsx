import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import QuickMessages from '@/components/ui/quick-messages';
import { addHoverSound } from '@/utils/buttonSound';

const FloatingContacts: React.FC = () => {
  const [showWhatsAppModal, setShowWhatsAppModal] = useState(false);
  const [message, setMessage] = useState('');
  const [name, setName] = useState('');
  const phoneButtonRef = useRef<HTMLButtonElement>(null);
  const whatsappButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const cleanupPhone = addHoverSound(phoneButtonRef.current);
    const cleanupWhatsapp = addHoverSound(whatsappButtonRef.current);
    
    return () => {
      cleanupPhone?.();
      cleanupWhatsapp?.();
    };
  }, []);

  const handleCall = () => {
    window.location.href = 'tel:+79891500555';
  };

  const handleWhatsAppClick = () => {
    setShowWhatsAppModal(true);
  };

  const handleSendMessage = () => {
    const text = encodeURIComponent(`Привет! Меня зовут ${name}. ${message}`);
    window.open(`https://wa.me/79891500555?text=${text}`, '_blank');
    setShowWhatsAppModal(false);
    setMessage('');
    setName('');
  };

  return (
    <>
      <style>{`
        @keyframes shake {
          0%, 100% { transform: rotate(0deg); }
          10%, 30%, 50%, 70%, 90% { transform: rotate(-10deg); }
          20%, 40%, 60%, 80% { transform: rotate(10deg); }
        }
        
        @keyframes bounce-gentle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }

        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }

        .animate-bounce-gentle {
          animation: bounce-gentle 2s ease-in-out infinite;
        }
      `}</style>

      <div className="fixed right-6 bottom-24 z-50 flex flex-col gap-4">
        <button
          ref={phoneButtonRef}
          onClick={handleCall}
          className="relative group animate-bounce-gentle"
        >
          <div className="absolute inset-0 rounded-full bg-blue-500 animate-ping opacity-75"></div>
          <div className="relative h-16 w-16 rounded-full bg-blue-500 flex items-center justify-center shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 hover:scale-110 group-hover:animate-shake">
            <Icon name="Phone" size={30} className="text-white" />
          </div>
          <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-gray-900 text-white px-3 py-1 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
            Позвонить
          </span>
        </button>

        <button
          ref={whatsappButtonRef}
          onClick={handleWhatsAppClick}
          className="relative group animate-bounce-gentle"
          style={{ animationDelay: '0.3s' }}
        >
          <div className="absolute inset-0 rounded-full bg-green-600 animate-ping opacity-75"></div>
          <div className="relative h-16 w-16 rounded-full bg-green-700 shadow-2xl hover:shadow-green-600/50 transition-all duration-300 hover:scale-110 flex items-center justify-center group-hover:animate-shake">
            <svg viewBox="0 0 24 24" className="w-9 h-9 text-white fill-current">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
          </div>
          <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-gray-900 text-white px-3 py-1 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
            WhatsApp
          </span>
        </button>
      </div>

      {showWhatsAppModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 animate-in slide-in-from-bottom-4 duration-300">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-12 w-12 rounded-full bg-green-700 flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-7 h-7 text-white fill-current">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">Написать в WhatsApp</h3>
                <p className="text-sm text-gray-600">Быстрая связь с нами</p>
              </div>
              <button
                onClick={() => setShowWhatsAppModal(false)}
                className="ml-auto text-gray-400 hover:text-gray-600 transition-colors"
              >
                <Icon name="X" size={24} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ваше имя
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Как вас зовут?"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Сообщение
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Напишите ваш вопрос..."
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all resize-none"
                />
              </div>

              <QuickMessages onSelectMessage={(msg) => setMessage(msg)} />

              <Button
                onClick={handleSendMessage}
                disabled={!name.trim() || !message.trim()}
                className="w-full bg-green-700 hover:bg-green-800 text-white py-3 rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <Icon name="Send" size={20} />
                Отправить сообщение
              </Button>

              <p className="text-xs text-gray-500 text-center">
                Вы будете перенаправлены в WhatsApp для отправки сообщения
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FloatingContacts;