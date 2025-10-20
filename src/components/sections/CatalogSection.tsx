import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { metalProducts } from '@/data/metalProducts';

interface CatalogSectionProps {
  visibleSections: Set<string>;
}

const CatalogSection: React.FC<CatalogSectionProps> = ({ visibleSections }) => {
  return (
    <section id="catalog" className={`py-16 bg-background transition-all duration-700 ${visibleSections.has('catalog') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
      <div className="container px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Каталог продукции</h2>
          <p className="text-muted-foreground text-lg">Цены актуальны на {new Date().toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
        </div>

        <Tabs defaultValue={metalProducts[0].category} className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-8">
            {metalProducts.map((category) => (
              <TabsTrigger key={category.category} value={category.category}>
                {category.category}
              </TabsTrigger>
            ))}
          </TabsList>

          {metalProducts.map((category) => (
            <TabsContent key={category.category} value={category.category}>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {category.items.map((item, idx) => (
                  <Card 
                    key={idx} 
                    className="hover:shadow-lg transition-all hover:scale-105 opacity-0 animate-fade-in"
                    style={{ 
                      animationDelay: `${idx * 100}ms`,
                      animationFillMode: 'forwards'
                    }}
                  >
                    <CardHeader>
                      <CardTitle className="text-lg">{item.name}</CardTitle>
                      <CardDescription>{item.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-bold text-accent">
                          {item.price.toLocaleString('ru-RU')}
                        </span>
                        <span className="text-sm text-muted-foreground">₽/{item.unit}</span>
                      </div>
                      <Button className="w-full mt-4" variant="outline">
                        <Icon name="ShoppingCart" className="mr-2 h-4 w-4" />
                        Заказать
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
};

export default CatalogSection;
