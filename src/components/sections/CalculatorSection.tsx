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
    <section id="calculator" className={`py-16 bg-background ${visibleSections.has('calculator') ? 'animate-slide-up' : 'opacity-0'}`}>
      <div className="container px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Калькулятор стоимости</h2>
          <p className="text-muted-foreground">Рассчитайте стоимость металла онлайн</p>
        </div>

        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Расчет стоимости металлопродукции</CardTitle>
            <CardDescription>Выберите продукцию и укажите вес для расчета</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="calculator">
                  <Icon name="Calculator" className="mr-2 h-4 w-4" />
                  Калькулятор
                </TabsTrigger>
                <TabsTrigger value="order">
                  <Icon name="ShoppingCart" className="mr-2 h-4 w-4" />
                  Оформить заказ
                </TabsTrigger>
              </TabsList>

              <TabsContent value="calculator" className="space-y-6 mt-6">
                <div className="space-y-2">
                  <Label htmlFor="product">Выберите продукцию</Label>
                  <Select value={calcProduct} onValueChange={setCalcProduct}>
                    <SelectTrigger id="product">
                      <SelectValue placeholder="Выберите из каталога" />
                    </SelectTrigger>
                    <SelectContent>
                      {metalProducts.map((category) => (
                        <div key={category.category}>
                          <div className="px-2 py-1.5 text-sm font-semibold text-muted-foreground">
                            {category.category}
                          </div>
                          {category.items.map((item, idx) => (
                            <SelectItem key={idx} value={item.name}>
                              {item.name} - {item.price.toLocaleString('ru-RU')} ₽/тонна
                            </SelectItem>
                          ))}
                        </div>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="weight">Вес (кг)</Label>
                  <Input
                    id="weight"
                    type="number"
                    placeholder="Введите вес в килограммах"
                    value={calcWeight}
                    onChange={(e) => setCalcWeight(e.target.value)}
                  />
                </div>

                <Button className="w-full" size="lg" onClick={calculatePrice}>
                  <Icon name="Calculator" className="mr-2 h-5 w-5" />
                  Рассчитать
                </Button>

                {calcResult !== null && (
                  <div className="p-6 bg-accent/10 rounded-lg border-2 border-accent animate-fade-in">
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground mb-2">Итоговая стоимость:</p>
                      <p className="text-4xl font-bold text-accent">
                        {calcResult.toLocaleString('ru-RU', { maximumFractionDigits: 2 })} ₽
                      </p>
                      <Button 
                        className="mt-4" 
                        variant="secondary"
                        onClick={() => setActiveTab('order')}
                      >
                        <Icon name="ShoppingCart" className="mr-2 h-4 w-4" />
                        Оформить заказ
                      </Button>
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