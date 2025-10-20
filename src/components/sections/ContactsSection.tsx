import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';

interface ContactsSectionProps {
  visibleSections: Set<string>;
  formData: { name: string; phone: string; email: string; message: string };
  handleFormChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  isSubmitting: boolean;
  submitSuccess: boolean;
  handleSubmit: (e: React.FormEvent, method: 'whatsapp' | 'email') => void;
}

const ContactsSection: React.FC<ContactsSectionProps> = ({
  visibleSections,
  formData,
  handleFormChange,
  isSubmitting,
  submitSuccess,
  handleSubmit
}) => {
  return (
    <section id="contacts" className={`py-16 ${visibleSections.has('contacts') ? 'animate-slide-up' : 'opacity-0'}`}>
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

                <div className="text-xs text-muted-foreground space-y-1 bg-muted/30 p-3 rounded-lg">
                  <p>* Обязательные поля для заполнения</p>
                  <p>Отправляя форму, вы соглашаетесь с <a href="/privacy" className="text-accent hover:underline">Политикой конфиденциальности</a> и <a href="/terms" className="text-accent hover:underline">Пользовательским соглашением</a></p>
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
      </div>
    </section>
  );
};

export default ContactsSection;