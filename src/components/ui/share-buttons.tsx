import React from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface ShareButtonsProps {
  url?: string;
  title?: string;
  description?: string;
  className?: string;
}

const ShareButtons: React.FC<ShareButtonsProps> = ({ 
  url = window.location.href,
  title = 'Краев Металл Компани — Металлопрокат от производителя',
  description = 'Продажа металлопроката оптом и в розницу. Листовой металл, трубы, арматура. Доставка по Москве и России.',
  className = ''
}) => {
  const shareLinks = {
    vk: `https://vk.com/share.php?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}&description=${encodeURIComponent(description)}`,
    telegram: `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
    whatsapp: `https://wa.me/?text=${encodeURIComponent(title + ' ' + url)}`,
    ok: `https://connect.ok.ru/offer?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}&description=${encodeURIComponent(description)}`,
  };

  const handleShare = (platform: keyof typeof shareLinks) => {
    window.open(shareLinks[platform], '_blank', 'width=600,height=400');
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(url);
    alert('Ссылка скопирована!');
  };

  return (
    <div className={`flex items-center gap-2 flex-wrap ${className}`}>
      <span className="text-sm font-medium text-muted-foreground mr-2">Поделиться:</span>
      
      <Button
        variant="outline"
        size="sm"
        onClick={() => handleShare('vk')}
        className="gap-2"
      >
        <Icon name="Share2" size={16} />
        VK
      </Button>

      <Button
        variant="outline"
        size="sm"
        onClick={() => handleShare('telegram')}
        className="gap-2"
      >
        <Icon name="Send" size={16} />
        Telegram
      </Button>

      <Button
        variant="outline"
        size="sm"
        onClick={() => handleShare('whatsapp')}
        className="gap-2"
      >
        <Icon name="MessageCircle" size={16} />
        WhatsApp
      </Button>

      <Button
        variant="outline"
        size="sm"
        onClick={() => handleShare('ok')}
        className="gap-2"
      >
        <Icon name="Share2" size={16} />
        OK
      </Button>

      <Button
        variant="outline"
        size="sm"
        onClick={handleCopyLink}
        className="gap-2"
      >
        <Icon name="Link" size={16} />
        Копировать
      </Button>
    </div>
  );
};

export default ShareButtons;
