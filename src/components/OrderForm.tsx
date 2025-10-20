import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

interface OrderFormProps {
  productName?: string;
  weight?: string;
  calculatedPrice?: number | null;
  onSuccess?: () => void;
}

const OrderForm: React.FC<OrderFormProps> = ({ 
  productName = '', 
  weight = '', 
  calculatedPrice = null,
  onSuccess 
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const validatePhone = (phone: string): boolean => {
    const phoneRegex = /^(\+7|8)?[\s-]?\(?[0-9]{3}\)?[\s-]?[0-9]{3}[\s-]?[0-9]{2}[\s-]?[0-9]{2}$/;
    return phoneRegex.test(phone);
  };

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      toast({
        title: "Ошибка",
        description: "Пожалуйста, укажите ваше имя",
        variant: "destructive"
      });
      return;
    }

    if (!phone.trim() || !validatePhone(phone)) {
      toast({
        title: "Ошибка",
        description: "Пожалуйста, укажите корректный номер телефона",
        variant: "destructive"
      });
      return;
    }

    if (email.trim() && !validateEmail(email)) {
      toast({
        title: "Ошибка",
        description: "Пожалуйста, укажите корректный email",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const orderData = {
        name: name.trim(),
        phone: phone.trim(),
        email: email.trim(),
        product: productName,
        weight: weight,
        price: calculatedPrice,
        comment: comment.trim(),
        timestamp: new Date().toISOString()
      };

      console.log('Заказ отправлен:', orderData);

      toast({
        title: "Заказ принят!",
        description: "Мы свяжемся с вами в ближайшее время",
      });

      setName('');
      setPhone('');
      setEmail('');
      setComment('');
      
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось отправить заказ. Попробуйте позже.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Имя *</Label>
          <Input
            id="name"
            placeholder="Ваше имя"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Телефон *</Label>
          <Input
            id="phone"
            type="tel"
            placeholder="+7 (___) ___-__-__"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="your@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      {productName && (
        <div className="p-4 bg-accent/10 rounded-lg border border-accent/20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm">
            <div>
              <span className="text-muted-foreground">Продукция:</span>
              <p className="font-semibold">{productName}</p>
            </div>
            {weight && (
              <div>
                <span className="text-muted-foreground">Вес:</span>
                <p className="font-semibold">{weight} кг</p>
              </div>
            )}
            {calculatedPrice !== null && (
              <div>
                <span className="text-muted-foreground">Стоимость:</span>
                <p className="font-semibold text-accent">
                  {calculatedPrice.toLocaleString('ru-RU', { maximumFractionDigits: 2 })} ₽
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="comment">Комментарий</Label>
        <Textarea
          id="comment"
          placeholder="Дополнительная информация к заказу"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={3}
        />
      </div>

      <Button 
        type="submit" 
        className="w-full" 
        size="lg"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <Icon name="Loader2" className="mr-2 h-5 w-5 animate-spin" />
            Отправка...
          </>
        ) : (
          <>
            <Icon name="Send" className="mr-2 h-5 w-5" />
            Отправить заказ
          </>
        )}
      </Button>

      <p className="text-xs text-muted-foreground text-center">
        Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
      </p>
    </form>
  );
};

export default OrderForm;
