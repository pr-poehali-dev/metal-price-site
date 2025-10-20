import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

const CookieConsent: React.FC = () => {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      setTimeout(() => setShowBanner(true), 1000);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setShowBanner(false);
  };

  const handleDecline = () => {
    localStorage.setItem('cookie-consent', 'declined');
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 animate-slide-up">
      <Card className="max-w-4xl mx-auto p-6 bg-background/95 backdrop-blur-lg border-2 border-accent/20 shadow-2xl">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
          <div className="flex-shrink-0">
            <Icon name="Cookie" className="h-10 w-10 text-accent" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-lg mb-2">Использование cookie</h3>
            <p className="text-sm text-muted-foreground">
              Мы используем файлы cookie для улучшения работы сайта, анализа посещаемости и персонализации контента. 
              Продолжая использовать сайт, вы соглашаетесь с использованием cookie в соответствии с нашей{' '}
              <a href="/privacy" className="text-accent hover:underline">Политикой конфиденциальности</a>.
            </p>
          </div>
          <div className="flex gap-2 w-full md:w-auto">
            <Button onClick={handleAccept} className="flex-1 md:flex-none">
              <Icon name="Check" className="mr-2 h-4 w-4" />
              Принять
            </Button>
            <Button onClick={handleDecline} variant="outline" className="flex-1 md:flex-none">
              Отклонить
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default CookieConsent;
