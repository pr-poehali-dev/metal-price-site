import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface DeliverySectionProps {
  visibleSections: Set<string>;
}

const DeliverySection: React.FC<DeliverySectionProps> = ({ visibleSections }) => {
  return (
    <section id="delivery" className={`py-16 bg-muted/30 transition-all duration-700 ${visibleSections.has('delivery') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
      <div className="container px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Доставка</h2>
          <p className="text-muted-foreground">Быстрая и надежная доставка по всей России</p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <Card 
            className="opacity-0 animate-fade-in hover:scale-105 transition-transform"
            style={{ animationDelay: '0ms', animationFillMode: 'forwards' }}
          >
            <CardHeader>
              <Icon name="Truck" className="h-12 w-12 text-accent mb-4" />
              <CardTitle>По Москве и МО</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Доставка собственным транспортом в течение 1-2 рабочих дней
              </p>
              <p className="font-semibold">от 3 000 ₽</p>
            </CardContent>
          </Card>

          <Card 
            className="opacity-0 animate-fade-in hover:scale-105 transition-transform"
            style={{ animationDelay: '150ms', animationFillMode: 'forwards' }}
          >
            <CardHeader>
              <Icon name="MapPin" className="h-12 w-12 text-accent mb-4" />
              <CardTitle>По России</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Отправка транспортными компаниями в любой регион РФ
              </p>
              <p className="font-semibold">Расчет индивидуально</p>
            </CardContent>
          </Card>

          <Card 
            className="opacity-0 animate-fade-in hover:scale-105 transition-transform"
            style={{ animationDelay: '300ms', animationFillMode: 'forwards' }}
          >
            <CardHeader>
              <Icon name="Store" className="h-12 w-12 text-accent mb-4" />
              <CardTitle>Самовывоз</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Забрать заказ можно со склада в удобное для вас время
              </p>
              <p className="font-semibold">Бесплатно</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default DeliverySection;
