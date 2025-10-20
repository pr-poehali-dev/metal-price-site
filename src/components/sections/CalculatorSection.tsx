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
  const [prevResult, setPrevResult] = useState<number | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  React.useEffect(() => {
    if (calcResult !== null && calcResult !== prevResult) {
      setIsAnimating(true);
      setPrevResult(calcResult);
      const timer = setTimeout(() => setIsAnimating(false), 600);
      return () => clearTimeout(timer);
    }
  }, [calcResult, prevResult]);

  return (
    <section id="calculator" className={`py-12 md:py-20 bg-gradient-to-b from-background via-accent/5 to-background relative overflow-hidden ${visibleSections.has('calculator') ? 'animate-slide-up' : 'opacity-0'}`}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,69,0,0.05),transparent_70%)]"></div>
      
      <div className="container px-4 md:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-8 md:mb-16">
          <div className="inline-flex items-center justify-center p-2 md:p-3 bg-accent/10 rounded-2xl mb-3 md:mb-4">
            <Icon name="Calculator" className="h-6 w-6 md:h-8 md:w-8 text-accent" />
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent px-4">
            Калькулятор стоимости
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
            Рассчитайте стоимость металлопродукции в режиме реального времени
          </p>
        </div>

        <Card className="max-w-3xl mx-auto border-2 border-accent/20 shadow-2xl backdrop-blur-sm bg-card/95">
          <CardHeader className="space-y-1 pb-6 md:pb-8 px-4 md:px-6">
            <CardTitle className="text-xl md:text-2xl">Расчет стоимости металлопродукции</CardTitle>
            <CardDescription className="text-sm md:text-base">Выберите продукцию и укажите вес для мгновенного расчета</CardDescription>
          </CardHeader>
          <CardContent className="px-4 md:px-6">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 h-12 md:h-14 p-1 bg-muted/50">
                <TabsTrigger value="calculator" className="text-sm md:text-base data-[state=active]:bg-background data-[state=active]:shadow-lg">
                  <Icon name="Calculator" className="mr-1 md:mr-2 h-4 w-4 md:h-5 md:w-5" />
                  <span className="hidden sm:inline">Калькулятор</span>
                  <span className="sm:hidden">Расчёт</span>
                </TabsTrigger>
                <TabsTrigger value="order" className="text-sm md:text-base data-[state=active]:bg-background data-[state=active]:shadow-lg">
                  <Icon name="ShoppingCart" className="mr-1 md:mr-2 h-4 w-4 md:h-5 md:w-5" />
                  <span className="hidden sm:inline">Оформить заказ</span>
                  <span className="sm:hidden">Заказ</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="calculator" className="space-y-6 md:space-y-8 mt-6 md:mt-8">
                <div className="space-y-2 md:space-y-3">
                  <Label htmlFor="product" className="text-sm md:text-base font-semibold flex items-center gap-2">
                    <Icon name="Package" className="h-4 w-4 text-accent" />
                    Выберите продукцию
                  </Label>
                  <Select value={calcProduct} onValueChange={setCalcProduct}>
                    <SelectTrigger id="product" className="h-12 md:h-14 text-sm md:text-base border-2 hover:border-accent/50 transition-colors">
                      <SelectValue placeholder="Выберите из каталога" />
                    </SelectTrigger>
                    <SelectContent>
                      {metalProducts.map((category) => (
                        <div key={category.category}>
                          <div className="px-2 py-1.5 md:py-2 text-xs md:text-sm font-bold text-accent uppercase tracking-wide">
                            {category.category}
                          </div>
                          {category.items.map((item, idx) => (
                            <SelectItem key={idx} value={item.name} className="text-sm md:text-base py-2 md:py-3">
                              <div className="flex justify-between items-center w-full gap-2">
                                <span className="truncate">{item.name}</span>
                                <span className="text-accent font-semibold whitespace-nowrap text-xs md:text-sm">
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

                <div className="space-y-2 md:space-y-3">
                  <Label htmlFor="weight" className="text-sm md:text-base font-semibold flex items-center gap-2">
                    <Icon name="Scale" className="h-4 w-4 text-accent" />
                    Вес (кг)
                  </Label>
                  <div className="relative">
                    <Input
                      id="weight"
                      type="number"
                      placeholder="Введите вес"
                      value={calcWeight}
                      onChange={(e) => setCalcWeight(e.target.value)}
                      className="h-12 md:h-14 text-base md:text-lg border-2 hover:border-accent/50 transition-colors pr-12 md:pr-14"
                    />
                    <span className="absolute right-3 md:right-4 top-1/2 -translate-y-1/2 text-muted-foreground font-medium text-sm md:text-base">
                      кг
                    </span>
                  </div>
                </div>

                <Button className="w-full h-12 md:h-14 text-base md:text-lg font-semibold shadow-lg hover:shadow-xl transition-all" size="lg" onClick={calculatePrice}>
                  <Icon name="Calculator" className="mr-2 h-5 w-5 md:h-6 md:w-6" />
                  <span className="hidden sm:inline">Рассчитать стоимость</span>
                  <span className="sm:hidden">Рассчитать</span>
                </Button>

                {calcResult !== null && (
                  <div className="relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-accent/5 to-transparent rounded-2xl"></div>
                    <div className={`relative p-6 md:p-8 bg-accent/5 rounded-2xl border-2 backdrop-blur-sm transition-all duration-300 ${isAnimating ? 'animate-pulse-border' : 'border-accent/30'}`}>
                      <div className="text-center space-y-3 md:space-y-4">
                        <div className={`inline-flex items-center justify-center p-3 bg-accent/10 rounded-full mb-2 ${isAnimating ? 'animate-bounce' : ''}`}>
                          <Icon name="BadgeCheck" className="h-6 w-6 md:h-8 md:w-8 text-accent" />
                        </div>
                        <p className="text-xs md:text-sm font-medium text-muted-foreground uppercase tracking-wide">
                          Итоговая стоимость
                        </p>
                        <p 
                          key={calcResult}
                          className={`text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r from-accent to-accent/70 bg-clip-text text-transparent ${isAnimating ? 'animate-price-up animate-price-glow' : ''}`}
                        >
                          {calcResult.toLocaleString('ru-RU', { maximumFractionDigits: 2 })} ₽
                        </p>
                        {calcProduct && (
                          <p className="text-xs md:text-sm text-muted-foreground">
                            {calcProduct} • {calcWeight} кг
                          </p>
                        )}
                        <div className="pt-2 md:pt-4">
                          <Button 
                            className="h-11 md:h-12 px-6 md:px-8 text-sm md:text-base font-semibold shadow-lg hover:shadow-xl transition-all w-full sm:w-auto" 
                            variant="secondary"
                            onClick={() => setActiveTab('order')}
                          >
                            <Icon name="ShoppingCart" className="mr-2 h-4 w-4 md:h-5 md:w-5" />
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