import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { metalProducts } from '@/data/metalProducts';
import OrderForm from '@/components/OrderForm';

interface CalculatorSectionProps {
  visibleSections: Set<string>;
  calcWeight: string;
  setCalcWeight: (value: string) => void;
  calcProduct: string;
  setCalcProduct: (value: string) => void;
  calcResult: number | null;
  calculatePrice: () => void;
}

const CalculatorSection: React.FC<CalculatorSectionProps> = ({
  visibleSections,
  calcWeight,
  setCalcWeight,
  calcProduct,
  setCalcProduct,
  calcResult,
  calculatePrice
}) => {
  const [activeTab, setActiveTab] = useState('calculator');

  return (
    <section id="calculator" className={`py-20 bg-gradient-to-b from-background via-accent/5 to-background relative overflow-hidden ${visibleSections.has('calculator') ? 'animate-slide-up' : 'opacity-0'}`}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,69,0,0.05),transparent_70%)]"></div>
      
      <div className="container px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center p-3 bg-accent/10 rounded-2xl mb-4">
            <Icon name="Calculator" className="h-8 w-8 text-accent" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Калькулятор стоимости
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Рассчитайте стоимость металлопродукции в режиме реального времени
          </p>
        </div>

        <Card className="max-w-3xl mx-auto border-2 border-accent/20 shadow-2xl backdrop-blur-sm bg-card/95">
          <CardHeader className="space-y-1 pb-8">
            <CardTitle className="text-2xl">Расчет стоимости металлопродукции</CardTitle>
            <CardDescription className="text-base">Выберите продукцию и укажите вес для мгновенного расчета</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 h-14 p-1 bg-muted/50">
                <TabsTrigger value="calculator" className="text-base data-[state=active]:bg-background data-[state=active]:shadow-lg">
                  <Icon name="Calculator" className="mr-2 h-5 w-5" />
                  Калькулятор
                </TabsTrigger>
                <TabsTrigger value="order" className="text-base data-[state=active]:bg-background data-[state=active]:shadow-lg">
                  <Icon name="ShoppingCart" className="mr-2 h-5 w-5" />
                  Оформить заказ
                </TabsTrigger>
              </TabsList>

              <TabsContent value="calculator" className="space-y-8 mt-8">
                <div className="space-y-3">
                  <Label htmlFor="product" className="text-base font-semibold flex items-center gap-2">
                    <Icon name="Package" className="h-4 w-4 text-accent" />
                    Выберите продукцию
                  </Label>
                  <Select value={calcProduct} onValueChange={setCalcProduct}>
                    <SelectTrigger id="product" className="h-14 text-base border-2 hover:border-accent/50 transition-colors">
                      <SelectValue placeholder="Выберите из каталога" />
                    </SelectTrigger>
                    <SelectContent>
                      {metalProducts.map((category) => (
                        <div key={category.category}>
                          <div className="px-2 py-2 text-sm font-bold text-accent uppercase tracking-wide">
                            {category.category}
                          </div>
                          {category.items.map((item, idx) => (
                            <SelectItem key={idx} value={item.name} className="text-base py-3">
                              <div className="flex justify-between items-center w-full">
                                <span>{item.name}</span>
                                <span className="text-accent font-semibold ml-4">
                                  {item.price.toLocaleString('ru-RU')} ₽/т
                                </span>
                              </div>
                            </SelectItem>
                          ))}
                        </div>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="weight" className="text-base font-semibold flex items-center gap-2">
                    <Icon name="Scale" className="h-4 w-4 text-accent" />
                    Вес (кг)
                  </Label>
                  <div className="relative">
                    <Input
                      id="weight"
                      type="number"
                      placeholder="Введите вес в килограммах"
                      value={calcWeight}
                      onChange={(e) => setCalcWeight(e.target.value)}
                      className="h-14 text-lg border-2 hover:border-accent/50 transition-colors pr-12"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">
                      кг
                    </span>
                  </div>
                </div>

                <Button className="w-full h-14 text-lg font-semibold shadow-lg hover:shadow-xl transition-all" size="lg" onClick={calculatePrice}>
                  <Icon name="Calculator" className="mr-2 h-6 w-6" />
                  Рассчитать стоимость
                </Button>

                {calcResult !== null && (
                  <div className="relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-accent/5 to-transparent rounded-2xl"></div>
                    <div className="relative p-8 bg-accent/5 rounded-2xl border-2 border-accent/30 animate-fade-in backdrop-blur-sm">
                      <div className="text-center space-y-4">
                        <div className="inline-flex items-center justify-center p-3 bg-accent/10 rounded-full mb-2">
                          <Icon name="BadgeCheck" className="h-8 w-8 text-accent" />
                        </div>
                        <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                          Итоговая стоимость
                        </p>
                        <p className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-accent to-accent/70 bg-clip-text text-transparent">
                          {calcResult.toLocaleString('ru-RU', { maximumFractionDigits: 2 })} ₽
                        </p>
                        <div className="pt-4">
                          <Button 
                            className="h-12 px-8 text-base font-semibold shadow-lg hover:shadow-xl transition-all" 
                            variant="secondary"
                            onClick={() => setActiveTab('order')}
                          >
                            <Icon name="ShoppingCart" className="mr-2 h-5 w-5" />
                            Оформить заказ
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="order" className="mt-6">
                <OrderForm 
                  productName={calcProduct}
                  weight={calcWeight}
                  calculatedPrice={calcResult}
                  onSuccess={() => setActiveTab('calculator')}
                />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default CalculatorSection;