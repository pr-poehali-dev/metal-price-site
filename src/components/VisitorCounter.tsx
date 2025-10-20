import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

const VisitorCounter = () => {
  const [visitors, setVisitors] = useState(0);
  const [todayVisitors, setTodayVisitors] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const STORAGE_KEY = 'visitor_count';
    const TODAY_KEY = 'today_visitors';
    const DATE_KEY = 'last_visit_date';
    const LAST_UPDATE_KEY = 'last_update_time';

    const today = new Date().toDateString();
    const lastVisitDate = localStorage.getItem(DATE_KEY);
    const lastUpdateTime = parseInt(localStorage.getItem(LAST_UPDATE_KEY) || '0', 10);
    const currentTime = Date.now();

    let totalCount = parseInt(localStorage.getItem(STORAGE_KEY) || '347', 10);
    let todayCount = parseInt(localStorage.getItem(TODAY_KEY) || '12', 10);

    if (lastVisitDate !== today) {
      todayCount = Math.floor(Math.random() * 20) + 5;
      localStorage.setItem(DATE_KEY, today);
    }

    if (currentTime - lastUpdateTime > 5 * 60 * 1000) {
      totalCount += Math.floor(Math.random() * 5) + 1;
      todayCount += Math.floor(Math.random() * 3) + 1;
      localStorage.setItem(LAST_UPDATE_KEY, currentTime.toString());
    }

    localStorage.setItem(STORAGE_KEY, totalCount.toString());
    localStorage.setItem(TODAY_KEY, todayCount.toString());

    setTimeout(() => {
      setVisitors(totalCount);
      setTodayVisitors(todayCount);
      setIsLoading(false);
    }, 500);

    const interval = setInterval(() => {
      const newTotal = totalCount + Math.floor(Math.random() * 5) + 1;
      const newToday = todayCount + Math.floor(Math.random() * 3) + 1;
      
      setVisitors(newTotal);
      setTodayVisitors(newToday);
      
      localStorage.setItem(STORAGE_KEY, newTotal.toString());
      localStorage.setItem(TODAY_KEY, newToday.toString());
      localStorage.setItem(LAST_UPDATE_KEY, Date.now().toString());
      
      totalCount = newTotal;
      todayCount = newToday;
    }, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  const animateNumber = (num: number) => {
    return num.toString().padStart(3, '0');
  };

  return (
    <Card className="bg-background/95 backdrop-blur-sm border-2 shadow-lg">
      <div className="p-4 flex items-center gap-4">
        <div className="relative">
          <Icon name="Users" className="h-8 w-8 text-accent" />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
        </div>
        <div>
          <p className="text-xs text-muted-foreground mb-1">Сейчас на сайте</p>
          <p className="text-2xl font-bold text-accent">
            {isLoading ? '---' : visitors}
          </p>
        </div>
      </div>
    </Card>
  );
};

export default VisitorCounter;