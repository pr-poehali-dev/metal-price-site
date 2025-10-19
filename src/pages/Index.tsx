import React, { useState } from 'react';
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
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const sendToWhatsApp = () => {
    const message = `Новая заявка с сайта МеталлПром\n\nИмя: ${formData.name}\nТелефон: ${formData.phone}\nEmail: ${formData.email}\nСообщение: ${formData.message}`;
    const whatsappUrl = `https://wa.me/79951234567?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const sendToEmail = () => {
    const subject = 'Новая заявка с сайта МеталлПром';
    const body = `Имя: ${formData.name}\nТелефон: ${formData.phone}\nEmail: ${formData.email}\n\nСообщение:\n${formData.message}`;
    const mailtoUrl = `mailto:info@metallprom.ru?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
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
            <span className="text-xl font-bold">МеталлПром</span>
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

          <Button className="hidden md:flex">
            <Icon name="Phone" className="mr-2 h-4 w-4" />
            +7 (495) 123-45-67
          </Button>
        </div>
      </nav>

      <section id="hero" className="relative py-20 md:py-32 bg-gradient-to-br from-primary to-primary/80">
        <div className="container px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold text-primary-foreground mb-6 animate-fade-in">
              Металлопрокат от производителя
            </h1>
            <p className="text-xl text-primary-foreground/90 mb-8 animate-fade-in">
              Широкий ассортимент металлопродукции по актуальным ценам. Доставка по всей России.
            </p>
            <div className="flex flex-wrap gap-4 animate-fade-in">
              <Button size="lg" variant="secondary" onClick={() => scrollToSection('catalog')}>
                <Icon name="Package" className="mr-2 h-5 w-5" />
                Смотреть каталог
              </Button>
              <Button size="lg" variant="outline" className="bg-transparent text-primary-foreground border-primary-foreground hover:bg-primary-foreground hover:text-primary" onClick={() => scrollToSection('calculator')}>
                <Icon name="Calculator" className="mr-2 h-5 w-5" />
                Рассчитать стоимость
              </Button>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background to-transparent"></div>
      </section>

      <section id="catalog" className="py-16 bg-background">
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
                    <Card key={idx} className="hover:shadow-lg transition-shadow">
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

      <section id="price" className="py-16 bg-muted/30">
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

      <section id="calculator" className="py-16 bg-background">
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

      <section id="delivery" className="py-16 bg-muted/30">
        <div className="container px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Доставка</h2>
            <p className="text-muted-foreground">Быстрая и надежная доставка по всей России</p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <Card>
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

            <Card>
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

            <Card>
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

      <section id="about" className="py-16 bg-background">
        <div className="container px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">О компании</h2>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card>
              <CardContent className="p-8">
                <div className="grid gap-8 md:grid-cols-2">
                  <div>
                    <h3 className="text-xl font-semibold mb-4">МеталлПром</h3>
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
                      <Icon name="CheckCircle" className="h-6 w-6 text-accent mt-1" />
                      <div>
                        <p className="font-semibold">Более 13 лет на рынке</p>
                        <p className="text-sm text-muted-foreground">Опыт и надежность</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <Icon name="CheckCircle" className="h-6 w-6 text-accent mt-1" />
                      <div>
                        <p className="font-semibold">Собственный склад 5000 м²</p>
                        <p className="text-sm text-muted-foreground">Всегда в наличии</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <Icon name="CheckCircle" className="h-6 w-6 text-accent mt-1" />
                      <div>
                        <p className="font-semibold">Более 1000 клиентов</p>
                        <p className="text-sm text-muted-foreground">Доверяют нам</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="contacts" className="py-16 bg-muted/30">
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
                      <p className="text-sm text-muted-foreground">+7 (495) 123-45-67</p>
                      <p className="text-sm text-muted-foreground">+7 (495) 123-45-68</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Icon name="Mail" className="h-6 w-6 text-accent mt-1" />
                    <div>
                      <p className="font-semibold mb-1">Email</p>
                      <p className="text-sm text-muted-foreground">info@metallprom.ru</p>
                      <p className="text-sm text-muted-foreground">sales@metallprom.ru</p>
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
                        onClick={() => window.open('https://wa.me/79951234567', '_blank')}
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
          <p>&copy; 2024 МеталлПром. Все права защищены.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;