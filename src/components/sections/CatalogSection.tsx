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
    <section id="catalog" className={`py-12 md:py-20 bg-gradient-to-b from-white to-gray-50 ${visibleSections.has('catalog') ? 'animate-slide-up' : 'opacity-0'}`}>
      <div className="container px-4">
        <div className="text-center mb-8 md:mb-16">
          <div className="inline-block px-4 py-2 bg-blue-50 text-blue-600 rounded-full text-sm font-semibold mb-4">
            📦 Каталог
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 bg-clip-text text-transparent">Каталог продукции</h2>
          <p className="text-gray-600 text-base md:text-lg">Цены актуальны на {new Date().toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
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
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {category.items.map((item, idx) => (
                  <Card 
                    key={idx} 
                    className="opacity-0 animate-product-appear card-3d-hover active:scale-95 transition-all duration-300 border-0 bg-white shadow-lg group overflow-hidden relative"
                    style={{ 
                      animationDelay: `${idx * 80}ms`,
                      animationFillMode: 'forwards'
                    }}
                  >
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-sky-400 transform scale-x-0 md:group-hover:scale-x-100 transition-transform duration-300"></div>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base md:text-lg font-bold text-gray-900 md:group-hover:text-blue-600 transition-colors">{item.name}</CardTitle>
                      <CardDescription className="text-sm text-gray-600">{item.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-baseline gap-2 mb-4">
                        <span className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-sky-500 bg-clip-text text-transparent">
                          {item.price.toLocaleString('ru-RU')}
                        </span>
                        <span className="text-sm text-gray-500 font-medium">₽/{item.unit}</span>
                      </div>
                      <Button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-md hover:shadow-lg transition-all touch-manipulation click-effect micro-bounce" size="sm">
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