import React from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface QuickMessagesProps {
  onSelectMessage: (message: string) => void;
}

const QuickMessages: React.FC<QuickMessagesProps> = ({ onSelectMessage }) => {
  const quickMessages = [
    {
      icon: 'ShoppingCart',
      text: 'Заказать услугу',
      message: 'Здравствуйте! Хочу заказать металлопрокат. Подскажите, пожалуйста, условия.'
    },
    {
      icon: 'DollarSign',
      text: 'Узнать цену',
      message: 'Добрый день! Интересует стоимость продукции. Можете рассчитать цену?'
    },
    {
      icon: 'Truck',
      text: 'Условия доставки',
      message: 'Здравствуйте! Хочу узнать про условия доставки в мой регион.'
    },
    {
      icon: 'FileText',
      text: 'Наличие на складе',
      message: 'Добрый день! Подскажите, есть ли продукция в наличии на складе?'
    }
  ];

  return (
    <div className="space-y-2">
      <p className="text-sm font-medium text-muted-foreground mb-3">Быстрые сообщения:</p>
      <div className="grid grid-cols-2 gap-2">
        {quickMessages.map((msg, idx) => (
          <Button
            key={idx}
            variant="outline"
            size="sm"
            className="justify-start text-xs h-auto py-2 px-3"
            onClick={() => onSelectMessage(msg.message)}
          >
            <Icon name={msg.icon as any} className="mr-2 h-3 w-3 flex-shrink-0" />
            <span className="truncate">{msg.text}</span>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default QuickMessages;
