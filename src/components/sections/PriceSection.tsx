import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { metalProducts } from '@/data/metalProducts';

interface PriceSectionProps {
  visibleSections: Set<string>;
}

const PriceSection: React.FC<PriceSectionProps> = ({ visibleSections }) => {
  return (
    <section id="price" className={`py-16 bg-muted/30 ${visibleSections.has('price') ? 'animate-slide-up' : 'opacity-0'}`}>
      <div className="container px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Прайс-лист</h2>
          <p className="text-muted-foreground">Полный перечень продукции с актуальными ценами</p>
        </div>

        <div className="grid gap-8 max-w-6xl mx-auto">
          {metalProducts.map((category, catIdx) => (
            <Card 
              key={category.category}
              className={`overflow-hidden border-0 shadow-lg ${visibleSections.has('price') ? 'animate-slide-up' : 'opacity-0'}`}
              style={{ animationDelay: `${catIdx * 150}ms` }}
            >
              <div className="grid md:grid-cols-[300px,1fr]">
                <div className="relative h-64 md:h-auto overflow-hidden">
                  <img 
                    src={category.image} 
                    alt={category.category}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                    <h3 className="text-2xl font-bold text-white">{category.category}</h3>
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 px-4 font-semibold">Наименование</th>
                          <th className="text-left py-3 px-4 font-semibold">Размер</th>
                          <th className="text-right py-3 px-4 font-semibold">Цена, ₽/т</th>
                        </tr>
                      </thead>
                      <tbody>
                        {category.items.map((item, idx) => (
                          <tr 
                            key={`${category.category}-${idx}`} 
                            className="border-b hover:bg-muted/20 transition-colors"
                          >
                            <td className="py-3 px-4">{item.name}</td>
                            <td className="py-3 px-4 text-muted-foreground text-sm">{item.description}</td>
                            <td className="py-3 px-4 text-right font-semibold text-accent">
                              {item.price.toLocaleString('ru-RU')}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Button size="lg">
            <Icon name="Download" className="mr-2 h-4 w-4" />
            Скачать полный прайс-лист (PDF)
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PriceSection;