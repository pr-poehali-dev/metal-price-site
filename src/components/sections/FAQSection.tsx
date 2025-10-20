import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface FAQSectionProps {
  visibleSections: Set<string>;
}

const FAQSection: React.FC<FAQSectionProps> = ({ visibleSections }) => {
  const faqs = [
    {
      question: 'Какие способы оплаты вы принимаете?',
      answer: 'Мы принимаем безналичный расчет для юридических лиц и ИП, наличные и переводы для физических лиц. Возможна отсрочка платежа для постоянных клиентов.'
    },
    {
      question: 'Как быстро осуществляется доставка?',
      answer: 'По Москве и МО доставка осуществляется в течение 1-2 дней с момента заказа. В регионы России — от 3 до 7 дней в зависимости от удаленности.'
    },
    {
      question: 'Предоставляете ли вы сертификаты качества?',
      answer: 'Да, на всю нашу продукцию предоставляются паспорта качества и сертификаты соответствия от производителей. Документы передаются вместе с товаром.'
    },
    {
      question: 'Можно ли забрать товар самовывозом?',
      answer: 'Конечно! У нас есть склад площадью 5000 м² в Москве. Вы можете забрать заказ самостоятельно в удобное для вас время после согласования с менеджером.'
    },
    {
      question: 'Есть ли у вас минимальная партия заказа?',
      answer: 'Мы работаем как с крупными, так и с мелкими заказами. Минимальной партии нет — продаем от 1 единицы товара. Цена зависит от объема заказа.'
    }
  ];

  return (
    <section id="faq" className={`py-16 bg-muted/30 transition-all duration-700 ${visibleSections.has('faq') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
      <div className="container px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Часто задаваемые вопросы</h2>
          <p className="text-muted-foreground">Ответы на популярные вопросы о нашей работе</p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, idx) => (
            <Card key={idx} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg flex items-start gap-3">
                  <Icon name="HelpCircle" className="h-5 w-5 text-accent mt-1" />
                  {faq.question}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  {faq.answer}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
