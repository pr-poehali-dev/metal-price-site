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
      text: 'Работаем с Краев Металл Компани уже 3 года. Всегда качественная продукция, быстрая доставка и адекватные цены. Рекомендую!',
      rating: 5,
      date: '2024-09-15',
      avatar: 'https://cdn.poehali.dev/projects/e197f910-0d69-4ea7-89c6-078a665bf1e2/files/c4353eca-bc63-4d72-984c-e25fc8838b54.jpg'
    },
    {
      name: 'Мария Соколова',
      company: 'ИП Соколова М.А.',
      text: 'Отличная компания! Помогли подобрать нужный металлопрокат, оформили все документы. Особенно порадовала оперативность менеджеров.',
      rating: 5,
      date: '2024-08-22',
      avatar: 'https://cdn.poehali.dev/projects/e197f910-0d69-4ea7-89c6-078a665bf1e2/files/a7db5ced-99c5-400f-b0bd-7134539d30f4.jpg'
    },
    {
      name: 'Алексей Краснов',
      company: 'АО "МеталлСтрой"',
      text: 'Большой ассортимент, все позиции в наличии на складе. Цены конкурентные, доставка точно в срок. Очень довольны сотрудничеством!',
      rating: 5,
      date: '2024-10-01',
      avatar: 'https://cdn.poehali.dev/projects/e197f910-0d69-4ea7-89c6-078a665bf1e2/files/074ecbf7-d483-4252-afbe-e4f43ad80f73.jpg'
    }
  ];

  const reviewSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": reviews.map((review, index) => ({
      "@type": "Review",
      "position": index + 1,
      "author": {
        "@type": "Person",
        "name": review.name
      },
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": review.rating,
        "bestRating": 5
      },
      "datePublished": review.date,
      "reviewBody": review.text,
      "itemReviewed": {
        "@type": "Organization",
        "name": "Краев Металл Компани"
      }
    }))
  };

  return (
    <section id="reviews" className={`py-16 ${visibleSections.has('reviews') ? 'animate-slide-up' : 'opacity-0'}`}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }} />
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
            <Card key={idx} className="card-3d-hover relative overflow-hidden border-0 bg-white shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <img 
                    src={review.avatar} 
                    alt={review.name}
                    className="h-12 w-12 rounded-full object-cover border-2 border-accent/20"
                  />
                  <div>
                    <p className="font-semibold">{review.name}</p>
                    <p className="text-sm text-muted-foreground">{review.company}</p>
                  </div>
                </div>
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Icon 
                      key={i} 
                      name="Star" 
                      className={`h-5 w-5 fill-yellow-400 text-yellow-400 ${visibleSections.has('reviews') ? 'star-pop' : 'opacity-0'}`}
                      style={{ animationDelay: `${idx * 150 + i * 100}ms` }}
                    />
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