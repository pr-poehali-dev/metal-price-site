import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

const VisitorCounter = () => {
  const [onlineUsers, setOnlineUsers] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getRandomOnline = () => Math.floor(Math.random() * 1351) + 150;
    
    setTimeout(() => {
      setOnlineUsers(getRandomOnline());
      setIsLoading(false);
    }, 500);

    const interval = setInterval(() => {
      setOnlineUsers(getRandomOnline());
    }, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="bg-background/95 backdrop-blur-sm border-2 shadow-lg">
      <div className="p-4 flex items-center gap-4">
        <div className="relative">
          <Icon name="Users" className="h-8 w-8 text-accent" />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
        </div>
        <div>
          <p className="text-xs text-muted-foreground mb-1">Сейчас онлайн</p>
          <p className="text-2xl font-bold text-accent">
            {isLoading ? '---' : onlineUsers}
          </p>
        </div>
      </div>
    </Card>
  );
};

export default VisitorCounter;