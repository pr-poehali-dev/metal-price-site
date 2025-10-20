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

    const today = new Date().toDateString();
    const lastVisitDate = localStorage.getItem(DATE_KEY);

    let totalCount = parseInt(localStorage.getItem(STORAGE_KEY) || '1247', 10);
    let todayCount = parseInt(localStorage.getItem(TODAY_KEY) || '0', 10);

    if (lastVisitDate !== today) {
      todayCount = 1;
      localStorage.setItem(DATE_KEY, today);
    } else {
      todayCount += 1;
    }

    totalCount += 1;

    localStorage.setItem(STORAGE_KEY, totalCount.toString());
    localStorage.setItem(TODAY_KEY, todayCount.toString());

    setTimeout(() => {
      setVisitors(totalCount);
      setTodayVisitors(todayCount);
      setIsLoading(false);
    }, 500);
  }, []);

  const animateNumber = (num: number) => {
    return num.toString().padStart(6, '0');
  };

  return (
    <Card className="fixed bottom-6 right-6 z-50 bg-background/95 backdrop-blur-sm border-2 shadow-xl">
      <div className="p-4 space-y-3">
        <div className="flex items-center gap-2 text-sm font-semibold text-muted-foreground">
          <Icon name="Users" className="h-4 w-4 text-accent" />
          <span>Посетители</span>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between gap-4">
            <span className="text-xs text-muted-foreground">Всего:</span>
            <div className="flex gap-1">
              {isLoading ? (
                <span className="text-lg font-bold text-accent">------</span>
              ) : (
                animateNumber(visitors).split('').map((digit, idx) => (
                  <span
                    key={idx}
                    className="text-lg font-bold text-accent bg-accent/10 px-1.5 rounded animate-fade-in"
                    style={{ animationDelay: `${idx * 50}ms` }}
                  >
                    {digit}
                  </span>
                ))
              )}
            </div>
          </div>

          <div className="flex items-center justify-between gap-4 pt-2 border-t">
            <span className="text-xs text-muted-foreground">Сегодня:</span>
            <div className="flex gap-1">
              {isLoading ? (
                <span className="text-base font-semibold text-primary">--</span>
              ) : (
                <span className="text-base font-semibold text-primary animate-fade-in">
                  {todayVisitors}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1 pt-2 border-t">
          <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse" />
          <span className="text-xs text-muted-foreground">Онлайн</span>
        </div>
      </div>
    </Card>
  );
};

export default VisitorCounter;
