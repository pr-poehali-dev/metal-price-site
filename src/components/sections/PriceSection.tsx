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
    <section id="price" className={`py-16 bg-muted/30 transition-all duration-700 ${visibleSections.has('price') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
      <div className="container px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Прайс-лист</h2>
          <p className="text-muted-foreground">Полный перечень продукции с актуальными ценами</p>
        </div>

        <Card>
          <CardContent className="p-6">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-semibold">Наименование</th>
                    <th className="text-left py-3 px-4 font-semibold">Размер</th>
                    <th className="text-right py-3 px-4 font-semibold">Цена, ₽/тонна</th>
                  </tr>
                </thead>
                <tbody>
                  {metalProducts.map((category) => (
                    <React.Fragment key={category.category}>
                      <tr className="bg-muted/50">
                        <td colSpan={3} className="py-2 px-4 font-semibold text-sm">
                          {category.category}
                        </td>
                      </tr>
                      {category.items.map((item, idx) => (
                        <tr key={`${category.category}-${idx}`} className="border-b hover:bg-muted/20 transition-colors">
                          <td className="py-3 px-4">{item.name}</td>
                          <td className="py-3 px-4 text-muted-foreground">{item.description}</td>
                          <td className="py-3 px-4 text-right font-semibold">
                            {item.price.toLocaleString('ru-RU')}
                          </td>
                        </tr>
                      ))}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="mt-6 text-center">
              <Button>
                <Icon name="Download" className="mr-2 h-4 w-4" />
                Скачать прайс-лист (PDF)
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default PriceSection;
