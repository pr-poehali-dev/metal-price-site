import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { useNavigate } from 'react-router-dom';

const Terms: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Пользовательское соглашение — Краев Металл Компани';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Пользовательское соглашение при использовании сайта Краев Металл Компани. Права и обязанности пользователей.');
    }
  }, []);

  return (
    <div className="min-h-screen bg-background py-16">
      <div className="container px-4 max-w-4xl">
        <Button 
          variant="outline" 
          onClick={() => navigate('/')} 
          className="mb-6"
        >
          <Icon name="ArrowLeft" className="mr-2 h-4 w-4" />
          Вернуться на главную
        </Button>

        <Card>
          <CardHeader>
            <CardTitle className="text-3xl">Пользовательское соглашение</CardTitle>
            <p className="text-muted-foreground">Последнее обновление: {new Date().toLocaleDateString('ru-RU')}</p>
          </CardHeader>
          <CardContent className="space-y-6 text-sm">
            <section>
              <h2 className="text-xl font-semibold mb-3">1. Общие положения</h2>
              <p className="text-muted-foreground">
                Настоящее Пользовательское соглашение (далее — Соглашение) регулирует отношения между 
                ООО «Краев Металл Компани» (далее — Компания) и пользователями сайта (далее — Пользователь). 
                Использование Сайта означает безоговорочное согласие с условиями настоящего Соглашения.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">2. Предмет Соглашения</h2>
              <p className="text-muted-foreground">
                Компания предоставляет Пользователю доступ к информационным ресурсам Сайта, включая:
              </p>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                <li>Каталог металлопродукции с актуальными ценами</li>
                <li>Калькулятор расчета стоимости заказа</li>
                <li>Формы обратной связи и заявок</li>
                <li>Информацию о компании и условиях доставки</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">3. Регистрация и учетные записи</h2>
              <p className="text-muted-foreground">
                Для использования базовых функций Сайта регистрация не требуется. При отправке заявок 
                Пользователь предоставляет достоверную контактную информацию (ФИО, телефон, email).
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">4. Права и обязанности Пользователя</h2>
              <p className="text-muted-foreground mb-2">Пользователь обязуется:</p>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                <li>Предоставлять достоверную информацию при заполнении форм</li>
                <li>Не использовать Сайт в противоправных целях</li>
                <li>Не нарушать работу Сайта и его систем безопасности</li>
                <li>Соблюдать законодательство РФ при использовании Сайта</li>
              </ul>
              <p className="text-muted-foreground mt-3 mb-2">Пользователь имеет право:</p>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                <li>Получать актуальную информацию о продукции и услугах</li>
                <li>Отправлять заявки и обращения через формы Сайта</li>
                <li>Запрашивать удаление своих персональных данных</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">5. Права и обязанности Компании</h2>
              <p className="text-muted-foreground mb-2">Компания обязуется:</p>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                <li>Обеспечивать работоспособность Сайта (кроме технических перерывов)</li>
                <li>Защищать персональные данные Пользователей</li>
                <li>Своевременно обрабатывать заявки и обращения</li>
                <li>Предоставлять актуальную информацию о товарах</li>
              </ul>
              <p className="text-muted-foreground mt-3 mb-2">Компания имеет право:</p>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                <li>Изменять условия Соглашения в одностороннем порядке</li>
                <li>Ограничивать доступ к Сайту при нарушении правил</li>
                <li>Изменять цены, наличие товаров и условия доставки</li>
                <li>Проводить технические работы с временным ограничением доступа</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">6. Интеллектуальная собственность</h2>
              <p className="text-muted-foreground">
                Все материалы Сайта (текст, графика, логотипы, изображения, программный код) являются 
                интеллектуальной собственностью Компании и защищены законодательством РФ. 
                Использование материалов без письменного согласия запрещено.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">7. Ограничение ответственности</h2>
              <p className="text-muted-foreground">
                Компания не несет ответственности за:
              </p>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                <li>Временную недоступность Сайта по техническим причинам</li>
                <li>Убытки, возникшие в результате использования или невозможности использования Сайта</li>
                <li>Действия третьих лиц, нарушающие работу Сайта</li>
                <li>Несоответствие ожиданий Пользователя фактическому результату</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">8. Порядок оформления заказов</h2>
              <p className="text-muted-foreground">
                Информация на Сайте не является публичной офертой (ст. 437 ГК РФ). 
                Окончательные условия сделки (цена, сроки, объемы) согласовываются индивидуально 
                после отправки заявки. Компания оставляет за собой право отказать в исполнении заказа 
                без объяснения причин.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">9. Конфиденциальность</h2>
              <p className="text-muted-foreground">
                Обработка персональных данных осуществляется в соответствии с{' '}
                <a href="/privacy" className="text-accent hover:underline">Политикой конфиденциальности</a> 
                {' '}и Федеральным законом № 152-ФЗ «О персональных данных».
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">10. Изменение условий Соглашения</h2>
              <p className="text-muted-foreground">
                Компания вправе в любое время изменять условия настоящего Соглашения без предварительного 
                уведомления Пользователя. Новая редакция вступает в силу с момента размещения на Сайте. 
                Продолжение использования Сайта после изменений означает согласие с новыми условиями.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">11. Разрешение споров</h2>
              <p className="text-muted-foreground">
                Все споры и разногласия решаются путем переговоров. При невозможности достижения 
                соглашения споры разрешаются в судебном порядке по месту нахождения Компании 
                в соответствии с законодательством РФ.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">12. Контактная информация</h2>
              <p className="text-muted-foreground">
                Для связи с Компанией используйте:
              </p>
              <ul className="list-none space-y-1 text-muted-foreground ml-4 mt-2">
                <li>Наименование: ООО «Краев Металл Компани»</li>
                <li>Email: metall-kmk@yandex.ru</li>
                <li>Телефон: +7 (989) 150-05-55</li>
                <li>Адрес: г. Краснодар (точный адрес уточняйте у оператора)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">13. Заключительные положения</h2>
              <p className="text-muted-foreground">
                Настоящее Соглашение составлено в соответствии с законодательством РФ. 
                Если какое-либо положение Соглашения будет признано недействительным, 
                остальные положения сохраняют свою силу.
              </p>
            </section>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Terms;