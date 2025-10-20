import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface AboutSectionProps {
  visibleSections: Set<string>;
  counters: { years: number; warehouse: number; clients: number };
}

const AboutSection: React.FC<AboutSectionProps> = ({ visibleSections, counters }) => {
  return (
    <section id="about" className={`py-16 bg-background ${visibleSections.has('about') ? 'animate-slide-up' : 'opacity-0'}`}>
      <div className="container px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">О компании</h2>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="grid gap-6 md:grid-cols-3 mb-12">
            <Card className="text-center p-6 bg-gradient-to-br from-accent/10 to-accent/5 border-accent/20">
              <CardContent className="p-0">
                <Icon name="Calendar" className="h-12 w-12 text-accent mx-auto mb-4" />
                <div className="text-5xl font-bold text-accent mb-2">
                  {counters.years}+
                </div>
                <p className="text-lg font-semibold mb-1">лет на рынке</p>
                <p className="text-sm text-muted-foreground">Опыт и надежность</p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 bg-gradient-to-br from-accent/10 to-accent/5 border-accent/20">
              <CardContent className="p-0">
                <Icon name="Warehouse" className="h-12 w-12 text-accent mx-auto mb-4" />
                <div className="text-5xl font-bold text-accent mb-2">
                  {counters.warehouse.toLocaleString('ru-RU')}
                </div>
                <p className="text-lg font-semibold mb-1">м² склад</p>
                <p className="text-sm text-muted-foreground">Всегда в наличии</p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 bg-gradient-to-br from-accent/10 to-accent/5 border-accent/20">
              <CardContent className="p-0">
                <Icon name="Users" className="h-12 w-12 text-accent mx-auto mb-4" />
                <div className="text-5xl font-bold text-accent mb-2">
                  {counters.clients}+
                </div>
                <p className="text-lg font-semibold mb-1">клиентов</p>
                <p className="text-sm text-muted-foreground">Доверяют нам</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardContent className="p-8">
              <div className="grid gap-8 md:grid-cols-2">
                <div>
                  <h3 className="text-xl font-semibold mb-4">Краев Металл Компани</h3>
                  <p className="text-muted-foreground mb-4">
                    Наша компания специализируется на поставках металлопроката с 2010 года. 
                    Мы работаем напрямую с ведущими металлургическими комбинатами России.
                  </p>
                  <p className="text-muted-foreground">
                    Гарантируем высокое качество продукции, конкурентные цены и оперативную доставку.
                  </p>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Icon name="Award" className="h-6 w-6 text-accent mt-1" />
                    <div>
                      <p className="font-semibold">Сертифицированная продукция</p>
                      <p className="text-sm text-muted-foreground">Все товары с паспортами качества</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Icon name="Truck" className="h-6 w-6 text-accent mt-1" />
                    <div>
                      <p className="font-semibold">Собственный автопарк</p>
                      <p className="text-sm text-muted-foreground">Быстрая доставка по Москве и МО</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Icon name="Headphones" className="h-6 w-6 text-accent mt-1" />
                    <div>
                      <p className="font-semibold">Поддержка 24/7</p>
                      <p className="text-sm text-muted-foreground">Всегда на связи для консультаций</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;