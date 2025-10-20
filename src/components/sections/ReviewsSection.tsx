import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import ShareButtons from '@/components/ui/share-buttons';

interface ReviewsSectionProps {
  visibleSections: Set<string>;
}

const ReviewsSection: React.FC<ReviewsSectionProps> = ({ visibleSections }) => {
  const reviews = [
    {
      name: 'Иван Петров',
      company: 'ООО "СтройКомплект"',
      text: 'Работаем с Краев Металл Компани уже 3 года. Всегда качественная продукция, быстрая доставка и адекватные цены. Рекомендую!'
    },
    {
      name: 'Мария Соколова',
      company: 'ИП Соколова М.А.',
      text: 'Отличная компания! Помогли подобрать нужный металлопрокат, оформили все документы. Особенно порадовала оперативность менеджеров.'
    },
    {
      name: 'Алексей Краснов',
      company: 'АО "МеталлСтрой"',
      text: 'Большой ассортимент, все позиции в наличии на складе. Цены конкурентные, доставка точно в срок. Очень довольны сотрудничеством!'
    }
  ];

  return (
    <section id="reviews" className={`py-16 transition-all duration-700 ${visibleSections.has('reviews') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
      <div className="container px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Отзывы клиентов</h2>
          <p className="text-muted-foreground">Что говорят о нас наши партнеры</p>
          <div className="flex justify-center mt-6">
            <ShareButtons />
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3 max-w-6xl mx-auto">
          {reviews.map((review, idx) => (
            <Card key={idx} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center">
                    <Icon name="User" className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <p className="font-semibold">{review.name}</p>
                    <p className="text-sm text-muted-foreground">{review.company}</p>
                  </div>
                </div>
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Icon key={i} name="Star" className="h-4 w-4 fill-accent text-accent" />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">
                  {review.text}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
