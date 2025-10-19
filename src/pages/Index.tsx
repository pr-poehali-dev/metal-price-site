import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';

const metalProducts = [
  {
    category: 'Листовой металл',
    items: [
      { name: 'Лист г/к 3мм', price: 58500, unit: 'тонна', description: '1500x6000мм' },
      { name: 'Лист г/к 5мм', price: 59200, unit: 'тонна', description: '1500x6000мм' },
      { name: 'Лист х/к 1мм', price: 67800, unit: 'тонна', description: '1250x2500мм' },
      { name: 'Лист оцинк. 0.5мм', price: 89500, unit: 'тонна', description: '1250x2500мм' },
    ]
  },
  {
    category: 'Сортовой прокат',
    items: [
      { name: 'Уголок 50x50x5', price: 62300, unit: 'тонна', description: 'Длина 6м' },
      { name: 'Швеллер 10П', price: 64100, unit: 'тонна', description: 'Длина 12м' },
      { name: 'Балка 20Б1', price: 68900, unit: 'тонна', description: 'Длина 12м' },
      { name: 'Труба профильная 40x40x2', price: 71200, unit: 'тонна', description: 'Длина 6м' },
    ]
  },
  {
    category: 'Арматура и круг',
    items: [
      { name: 'Арматура А500С 12мм', price: 57800, unit: 'тонна', description: 'Длина 11.7м' },
      { name: 'Арматура А500С 16мм', price: 57500, unit: 'тонна', description: 'Длина 11.7м' },
      { name: 'Круг 20мм', price: 61200, unit: 'тонна', description: 'Сталь 45' },
      { name: 'Круг 40мм', price: 62800, unit: 'тонна', description: 'Сталь 45' },
    ]
  },
  {
    category: 'Трубы',
    items: [
      { name: 'Труба э/с 57x3', price: 69500, unit: 'тонна', description: 'Длина 6м' },
      { name: 'Труба э/с 76x3.5', price: 68900, unit: 'тонна', description: 'Длина 6м' },
      { name: 'Труба б/ш 108x4', price: 98500, unit: 'тонна', description: 'ГОСТ 8732' },
      { name: 'Труба нерж. 25x2', price: 385000, unit: 'тонна', description: 'AISI 304' },
    ]
  },
];

const Index = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [calcWeight, setCalcWeight] = useState('');
  const [calcProduct, setCalcProduct] = useState('');
  const [calcResult, setCalcResult] = useState<number | null>(null);
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());
  const [counters, setCounters] = useState({ years: 0, warehouse: 0, clients: 0 });
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set([...prev, entry.target.id]));
            
            if (entry.target.id === 'about') {
              const animateCounter = (target: number, setter: (val: number) => void) => {
                let current = 0;
                const increment = target / 60;
                const timer = setInterval(() => {
                  current += increment;
                  if (current >= target) {
                    setter(target);
                    clearInterval(timer);
                  } else {
                    setter(Math.floor(current));
                  }
                }, 30);
              };

              animateCounter(15, (val) => setCounters((prev) => ({ ...prev, years: val })));
              animateCounter(5000, (val) => setCounters((prev) => ({ ...prev, warehouse: val })));
              animateCounter(1200, (val) => setCounters((prev) => ({ ...prev, clients: val })));
            }
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
    );

    const sections = document.querySelectorAll('section[id]');
    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const calculatePrice = () => {
    if (!calcWeight || !calcProduct) return;
    
    const weight = parseFloat(calcWeight);
    const product = metalProducts
      .flatMap(cat => cat.items)
      .find(item => item.name === calcProduct);
    
    if (product) {
      setCalcResult((weight * product.price) / 1000);
    }
  };

  const scrollToSection = (section: string) => {
    setActiveSection(section);
    const element = document.getElementById(section);
    element?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const sendToWhatsApp = () => {
    const message = `Новая заявка с сайта Краев Металл Компани\n\nИмя: ${formData.name}\nТелефон: ${formData.phone}\nEmail: ${formData.email}\nСообщение: ${formData.message}`;
    const whatsappUrl = `https://wa.me/79185086059?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const sendToEmail = () => {
    const subject = 'Новая заявка с сайта Краев Металл Компани';
    const body = `Имя: ${formData.name}\nТелефон: ${formData.phone}\nEmail: ${formData.email}\n\nСообщение:\n${formData.message}`;
    const mailtoUrl = `mailto:KraevK.working@yandex.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoUrl;
  };

  const handleSubmit = async (e: React.FormEvent, method: 'whatsapp' | 'email') => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;
    
    setIsSubmitting(true);
    
    if (method === 'whatsapp') {
      sendToWhatsApp();
    } else {
      sendToEmail();
    }
    
    setSubmitSuccess(true);
    setTimeout(() => {
      setFormData({ name: '', phone: '', email: '', message: '' });
      setSubmitSuccess(false);
      setIsSubmitting(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <Icon name="Factory" className="h-8 w-8 text-accent" />
            <span className="text-xl font-bold">Краев Металл Компани</span>
          </div>
          
          <div className="hidden md:flex items-center gap-6">
            <button onClick={() => scrollToSection('hero')} className="text-sm font-medium hover:text-accent transition-colors">
              Главная
            </button>
            <button onClick={() => scrollToSection('catalog')} className="text-sm font-medium hover:text-accent transition-colors">
              Каталог
            </button>
            <button onClick={() => scrollToSection('price')} className="text-sm font-medium hover:text-accent transition-colors">
              Прайс-лист
            </button>
            <button onClick={() => scrollToSection('calculator')} className="text-sm font-medium hover:text-accent transition-colors">
              Калькулятор
            </button>
            <button onClick={() => scrollToSection('delivery')} className="text-sm font-medium hover:text-accent transition-colors">
              Доставка
            </button>
            <button onClick={() => scrollToSection('about')} className="text-sm font-medium hover:text-accent transition-colors">
              О компании
            </button>
            <button onClick={() => scrollToSection('contacts')} className="text-sm font-medium hover:text-accent transition-colors">
              Контакты
            </button>
          </div>

          <div className="flex items-center gap-2">
            <Button 
              size="icon" 
              variant="ghost" 
              className="hidden sm:flex hover:bg-green-500/10 hover:text-green-500"
              asChild
            >
              <a href="https://wa.me/79185086059" target="_blank" rel="noopener noreferrer" title="WhatsApp">
                <Icon name="MessageCircle" className="h-5 w-5" />
              </a>
            </Button>

            <Button 
              size="icon" 
              variant="ghost" 
              className="hidden sm:flex hover:bg-blue-500/10 hover:text-blue-500"
              asChild
            >
              <a href="https://t.me/+79185086059" target="_blank" rel="noopener noreferrer" title="Telegram">
                <Icon name="Send" className="h-5 w-5" />
              </a>
            </Button>

            <Button className="hidden md:flex" asChild>
              <a href="tel:+79185086059">
                <Icon name="Phone" className="mr-2 h-4 w-4" />
                +7 (918) 508-60-59
              </a>
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Icon name={mobileMenuOpen ? "X" : "Menu"} className="h-6 w-6" />
            </Button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden border-t bg-background/98 backdrop-blur animate-fade-in">
            <div className="container px-4 py-4 space-y-3">
              <button
                onClick={() => scrollToSection('hero')}
                className="block w-full text-left py-2 px-4 rounded-lg hover:bg-accent/10 transition-colors"
              >
                Главная
              </button>
              <button
                onClick={() => scrollToSection('catalog')}
                className="block w-full text-left py-2 px-4 rounded-lg hover:bg-accent/10 transition-colors"
              >
                Каталог
              </button>
              <button
                onClick={() => scrollToSection('price')}
                className="block w-full text-left py-2 px-4 rounded-lg hover:bg-accent/10 transition-colors"
              >
                Прайс-лист
              </button>
              <button
                onClick={() => scrollToSection('calculator')}
                className="block w-full text-left py-2 px-4 rounded-lg hover:bg-accent/10 transition-colors"
              >
                Калькулятор
              </button>
              <button
                onClick={() => scrollToSection('delivery')}
                className="block w-full text-left py-2 px-4 rounded-lg hover:bg-accent/10 transition-colors"
              >
                Доставка
              </button>
              <button
                onClick={() => scrollToSection('about')}
                className="block w-full text-left py-2 px-4 rounded-lg hover:bg-accent/10 transition-colors"
              >
                О компании
              </button>
              <button
                onClick={() => scrollToSection('contacts')}
                className="block w-full text-left py-2 px-4 rounded-lg hover:bg-accent/10 transition-colors"
              >
                Контакты
              </button>
              <div className="flex gap-2 mt-2">
                <Button variant="outline" className="flex-1" asChild>
                  <a href="https://wa.me/79185086059" target="_blank" rel="noopener noreferrer">
                    <Icon name="MessageCircle" className="mr-2 h-4 w-4 text-green-500" />
                    WhatsApp
                  </a>
                </Button>
                <Button variant="outline" className="flex-1" asChild>
                  <a href="https://t.me/+79185086059" target="_blank" rel="noopener noreferrer">
                    <Icon name="Send" className="mr-2 h-4 w-4 text-blue-500" />
                    Telegram
                  </a>
                </Button>
              </div>
              <Button className="w-full mt-2" asChild>
                <a href="tel:+79185086059">
                  <Icon name="Phone" className="mr-2 h-4 w-4" />
                  +7 (918) 508-60-59
                </a>
              </Button>
            </div>
          </div>
        )}
      </nav>

      <section id="hero" className="relative h-[600px] md:h-[700px] overflow-hidden">
        <div className="absolute inset-0 animate-fade-in">
          <img 
            src="https://cdn.poehali.dev/files/c52ad37f-0bbe-49a5-9727-00ff797668eb.jpeg" 
            alt="Металлопрокат - склад" 
            className="w-full h-full object-cover animate-scale-in"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30"></div>
        </div>
        
        <div className="container px-4 relative h-full flex items-center">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 animate-fade-in drop-shadow-lg">
              Металлопрокат от производителя
            </h1>
            <p className="text-xl text-white/95 mb-8 animate-fade-in drop-shadow-md">
              Широкий ассортимент металлопродукции по актуальным ценам. Доставка по всей России.
            </p>
            <div className="flex flex-wrap gap-4 animate-fade-in">
              <Button size="lg" variant="secondary" onClick={() => scrollToSection('catalog')}>
                <Icon name="Package" className="mr-2 h-5 w-5" />
                Смотреть каталог
              </Button>
              <Button size="lg" variant="outline" className="bg-white/10 hover:bg-white/20 text-white border-white/30" onClick={() => scrollToSection('calculator')}>
                <Icon name="Calculator" className="mr-2 h-5 w-5" />
                Рассчитать стоимость
              </Button>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background to-transparent"></div>
      </section>

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

      <section id="calculator" className={`py-16 bg-background transition-all duration-700 ${visibleSections.has('calculator') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
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
            <CardContent className="space-y-6">
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
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </section>

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

      <section id="about" className={`py-16 bg-background transition-all duration-700 ${visibleSections.has('about') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
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

      <section id="reviews" className={`py-16 transition-all duration-700 ${visibleSections.has('reviews') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="container px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Отзывы клиентов</h2>
            <p className="text-muted-foreground">Что говорят о нас наши партнеры</p>
          </div>

          <div className="grid gap-6 md:grid-cols-3 max-w-6xl mx-auto">
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center">
                    <Icon name="User" className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <p className="font-semibold">Иван Петров</p>
                    <p className="text-sm text-muted-foreground">ООО "СтройКомплект"</p>
                  </div>
                </div>
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Icon key={i} name="Star" className="h-4 w-4 fill-accent text-accent" />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">
                  Работаем с Краев Металл Компани уже 3 года. Всегда качественная продукция, 
                  быстрая доставка и адекватные цены. Рекомендую!
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center">
                    <Icon name="User" className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <p className="font-semibold">Мария Соколова</p>
                    <p className="text-sm text-muted-foreground">ИП Соколова М.А.</p>
                  </div>
                </div>
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Icon key={i} name="Star" className="h-4 w-4 fill-accent text-accent" />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">
                  Отличная компания! Помогли подобрать нужный металлопрокат, оформили все документы. 
                  Особенно порадовала оперативность менеджеров.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center">
                    <Icon name="User" className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <p className="font-semibold">Алексей Краснов</p>
                    <p className="text-sm text-muted-foreground">АО "МеталлСтрой"</p>
                  </div>
                </div>
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Icon key={i} name="Star" className="h-4 w-4 fill-accent text-accent" />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">
                  Большой ассортимент, все позиции в наличии на складе. 
                  Цены конкурентные, доставка точно в срок. Очень довольны сотрудничеством!
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="faq" className={`py-16 bg-muted/30 transition-all duration-700 ${visibleSections.has('faq') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="container px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Часто задаваемые вопросы</h2>
            <p className="text-muted-foreground">Ответы на популярные вопросы о нашей работе</p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg flex items-start gap-3">
                  <Icon name="HelpCircle" className="h-5 w-5 text-accent mt-1" />
                  Какие способы оплаты вы принимаете?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Мы принимаем безналичный расчет для юридических лиц и ИП, наличные и переводы для физических лиц. 
                  Возможна отсрочка платежа для постоянных клиентов.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg flex items-start gap-3">
                  <Icon name="HelpCircle" className="h-5 w-5 text-accent mt-1" />
                  Как быстро осуществляется доставка?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  По Москве и МО доставка осуществляется в течение 1-2 дней с момента заказа. 
                  В регионы России — от 3 до 7 дней в зависимости от удаленности.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg flex items-start gap-3">
                  <Icon name="HelpCircle" className="h-5 w-5 text-accent mt-1" />
                  Предоставляете ли вы сертификаты качества?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Да, на всю нашу продукцию предоставляются паспорта качества и сертификаты соответствия от производителей. 
                  Документы передаются вместе с товаром.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg flex items-start gap-3">
                  <Icon name="HelpCircle" className="h-5 w-5 text-accent mt-1" />
                  Можно ли забрать товар самовывозом?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Конечно! У нас есть склад площадью 5000 м² в Москве. 
                  Вы можете забрать заказ самостоятельно в удобное для вас время после согласования с менеджером.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg flex items-start gap-3">
                  <Icon name="HelpCircle" className="h-5 w-5 text-accent mt-1" />
                  Есть ли у вас минимальная партия заказа?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Мы работаем как с крупными, так и с мелкими заказами. 
                  Минимальной партии нет — продаем от 1 единицы товара. Цена зависит от объема заказа.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="gallery" className={`py-16 bg-muted/30 transition-all duration-700 ${visibleSections.has('gallery') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="container px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Наш склад и продукция</h2>
            <p className="text-muted-foreground">Современный складской комплекс площадью 5000 м²</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 max-w-7xl mx-auto">
            <div className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
              <img 
                src="https://cdn.poehali.dev/files/f06d658a-0f0f-452b-8933-89e0a117f0c9.jpeg" 
                alt="Складской комплекс" 
                className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                <p className="text-white font-semibold">Складской комплекс</p>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
              <img 
                src="https://cdn.poehali.dev/projects/e197f910-0d69-4ea7-89c6-078a665bf1e2/files/f1fea013-122b-4693-9207-8ae56f9ac613.jpg" 
                alt="Металлопрокат на складе" 
                className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                <p className="text-white font-semibold">Металлопрокат</p>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
              <img 
                src="https://cdn.poehali.dev/projects/e197f910-0d69-4ea7-89c6-078a665bf1e2/files/8d06b4ba-5bba-436d-9e24-bf3222595e73.jpg" 
                alt="Погрузка и доставка" 
                className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                <p className="text-white font-semibold">Погрузка и доставка</p>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
              <img 
                src="https://cdn.poehali.dev/projects/e197f910-0d69-4ea7-89c6-078a665bf1e2/files/b8b85f09-3cbd-48eb-8180-5eb3dd72dd66.jpg" 
                alt="Трубы и профили" 
                className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                <p className="text-white font-semibold">Трубы и профили</p>
              </div>
            </div>
          </div>

          <div className="mt-12 max-w-3xl mx-auto">
            <Card>
              <CardContent className="p-8">
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <Icon name="Warehouse" className="h-6 w-6 text-accent" />
                    </div>
                    <div>
                      <p className="font-semibold mb-1">Современный склад</p>
                      <p className="text-sm text-muted-foreground">
                        5000 м² складских помещений с системой климат-контроля
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <Icon name="Package" className="h-6 w-6 text-accent" />
                    </div>
                    <div>
                      <p className="font-semibold mb-1">Всегда в наличии</p>
                      <p className="text-sm text-muted-foreground">
                        Широкий ассортимент металлопроката на складе
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <Icon name="TruckIcon" className="h-6 w-6 text-accent" />
                    </div>
                    <div>
                      <p className="font-semibold mb-1">Собственный транспорт</p>
                      <p className="text-sm text-muted-foreground">
                        Быстрая доставка своими силами по Москве и области
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <Icon name="Shield" className="h-6 w-6 text-accent" />
                    </div>
                    <div>
                      <p className="font-semibold mb-1">Качество гарантировано</p>
                      <p className="text-sm text-muted-foreground">
                        Вся продукция с сертификатами и паспортами качества
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="contacts" className={`py-16 transition-all duration-700 ${visibleSections.has('contacts') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="container px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Оставить заявку</h2>
            <p className="text-muted-foreground">Заполните форму и мы свяжемся с вами в ближайшее время</p>
          </div>

          <div className="max-w-4xl mx-auto grid gap-8 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Форма заявки</CardTitle>
                <CardDescription>Укажите ваши контактные данные</CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Имя *</Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Ваше имя"
                      value={formData.name}
                      onChange={handleFormChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Телефон *</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="+7 (___) ___-__-__"
                      value={formData.phone}
                      onChange={handleFormChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={handleFormChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Сообщение</Label>
                    <Input
                      id="message"
                      name="message"
                      placeholder="Ваш вопрос или комментарий"
                      value={formData.message}
                      onChange={handleFormChange}
                    />
                  </div>

                  {submitSuccess && (
                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg animate-fade-in">
                      <p className="text-green-800 text-sm font-medium">✓ Заявка успешно отправлена!</p>
                    </div>
                  )}

                  <div className="flex gap-3">
                    <Button
                      type="button"
                      className="flex-1 bg-green-600 hover:bg-green-700"
                      size="lg"
                      onClick={(e) => handleSubmit(e, 'whatsapp')}
                      disabled={isSubmitting || !formData.name || !formData.phone}
                    >
                      <Icon name="MessageCircle" className="mr-2 h-5 w-5" />
                      WhatsApp
                    </Button>

                    <Button
                      type="button"
                      variant="outline"
                      className="flex-1"
                      size="lg"
                      onClick={(e) => handleSubmit(e, 'email')}
                      disabled={isSubmitting || !formData.name || !formData.phone}
                    >
                      <Icon name="Mail" className="mr-2 h-5 w-5" />
                      Email
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Контактная информация</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Icon name="Phone" className="h-6 w-6 text-accent mt-1" />
                    <div>
                      <p className="font-semibold mb-1">Телефон</p>
                      <a href="tel:+79185086059" className="text-sm text-muted-foreground hover:text-accent transition-colors block">
                        +7 (918) 508-60-59
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Icon name="Mail" className="h-6 w-6 text-accent mt-1" />
                    <div>
                      <p className="font-semibold mb-1">Email</p>
                      <a href="mailto:KraevK.working@yandex.com" className="text-sm text-muted-foreground hover:text-accent transition-colors block">
                        KraevK.working@yandex.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Icon name="MapPin" className="h-6 w-6 text-accent mt-1" />
                    <div>
                      <p className="font-semibold mb-1">Адрес</p>
                      <p className="text-sm text-muted-foreground">г. Москва</p>
                      <p className="text-sm text-muted-foreground">ул. Промышленная, 15</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Icon name="Clock" className="h-6 w-6 text-accent mt-1" />
                    <div>
                      <p className="font-semibold mb-1">Режим работы</p>
                      <p className="text-sm text-muted-foreground">Пн-Пт: 9:00 - 18:00</p>
                      <p className="text-sm text-muted-foreground">Сб-Вс: Выходной</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-accent/5 border-accent">
                <CardContent className="p-6">
                  <div className="flex items-start gap-3">
                    <Icon name="MessageCircle" className="h-8 w-8 text-green-600" />
                    <div>
                      <p className="font-semibold mb-2">Быстрый контакт в WhatsApp</p>
                      <p className="text-sm text-muted-foreground mb-3">
                        Отправьте заявку в WhatsApp и получите ответ в течение 5 минут
                      </p>
                      <Button
                        variant="outline"
                        className="border-green-600 text-green-600 hover:bg-green-50"
                        onClick={() => window.open('https://wa.me/79185086059', '_blank')}
                      >
                        <Icon name="MessageCircle" className="mr-2 h-4 w-4" />
                        Написать в WhatsApp
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="grid gap-8 md:grid-cols-3 max-w-4xl mx-auto mt-16 hidden">
            <div className="text-center">
              <Icon name="Phone" className="h-12 w-12 mx-auto mb-4 text-accent" />
              <h3 className="font-semibold mb-2">Телефон</h3>
              <p className="text-muted-foreground">+7 (495) 123-45-67</p>
              <p className="text-muted-foreground">+7 (495) 123-45-68</p>
            </div>

            <div className="text-center">
              <Icon name="Mail" className="h-12 w-12 mx-auto mb-4 text-accent" />
              <h3 className="font-semibold mb-2">Email</h3>
              <p className="text-muted-foreground">info@metallprom.ru</p>
              <p className="text-muted-foreground">sales@metallprom.ru</p>
            </div>

            <div className="text-center">
              <Icon name="MapPin" className="h-12 w-12 mx-auto mb-4 text-accent" />
              <h3 className="font-semibold mb-2">Адрес</h3>
              <p className="text-muted-foreground">г. Москва</p>
              <p className="text-muted-foreground">ул. Промышленная, 15</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-8 bg-primary/90 text-primary-foreground/80 border-t border-primary-foreground/10">
        <div className="container px-4 text-center">
          <p>&copy; 2024 Краев Металл Компани. Все права защищены.</p>
        </div>
      </footer>

      {showScrollTop && (
        <Button
          size="icon"
          className="fixed bottom-6 right-6 z-40 h-12 w-12 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in"
          onClick={scrollToTop}
          title="Наверх"
        >
          <Icon name="ArrowUp" className="h-5 w-5" />
        </Button>
      )}
    </div>
  );
};

export default Index;