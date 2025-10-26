import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { useNavigate } from 'react-router-dom';

const Privacy: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Политика конфиденциальности — Краев Металл Компани';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Политика конфиденциальности и обработки персональных данных ООО «Краев Металл Компани». Защита информации согласно ФЗ-152.');
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
            <CardTitle className="text-3xl">Политика конфиденциальности</CardTitle>
            <p className="text-muted-foreground">Последнее обновление: {new Date().toLocaleDateString('ru-RU')}</p>
          </CardHeader>
          <CardContent className="space-y-6 text-sm">
            <section>
              <h2 className="text-xl font-semibold mb-3">1. Общие положения</h2>
              <p className="text-muted-foreground">
                Настоящая Политика конфиденциальности определяет порядок обработки и защиты персональных данных 
                пользователей сайта «Краев Металл Компани» (далее — Сайт). Оператором персональных данных является 
                ООО «Краев Металл Компани» (ОГРН: не указан, ИНН: не указан).
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">2. Сбор персональных данных</h2>
              <p className="text-muted-foreground mb-2">
                Мы собираем следующие категории персональных данных:
              </p>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                <li>ФИО (при заполнении форм обратной связи)</li>
                <li>Номер телефона (для связи по заявкам)</li>
                <li>Адрес электронной почты (для ответов на обращения)</li>
                <li>IP-адрес и данные браузера (для статистики посещений)</li>
                <li>Информация о просмотренных страницах (для аналитики)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">3. Цели обработки данных</h2>
              <p className="text-muted-foreground mb-2">
                Персональные данные обрабатываются для:
              </p>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                <li>Обработки заявок и обращений клиентов</li>
                <li>Предоставления информации о продукции и услугах</li>
                <li>Улучшения качества обслуживания клиентов</li>
                <li>Анализа посещаемости и поведения пользователей на Сайте</li>
                <li>Исполнения договорных обязательств</li>
                <li>Соблюдения требований законодательства РФ</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">4. Правовые основания обработки</h2>
              <p className="text-muted-foreground">
                Обработка персональных данных осуществляется на основании:
              </p>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                <li>Согласия субъекта персональных данных (ст. 6, 9 Федерального закона № 152-ФЗ)</li>
                <li>Необходимости исполнения договора, стороной которого является субъект данных</li>
                <li>Осуществления прав и законных интересов оператора</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">5. Срок хранения данных</h2>
              <p className="text-muted-foreground">
                Персональные данные хранятся не дольше, чем этого требуют цели их обработки, но не менее 
                3 лет с момента последнего взаимодействия с клиентом. После достижения целей обработки или 
                при отзыве согласия данные удаляются или обезличиваются.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">6. Передача данных третьим лицам</h2>
              <p className="text-muted-foreground">
                Мы не передаем персональные данные третьим лицам, за исключением случаев:
              </p>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                <li>Получения согласия субъекта персональных данных</li>
                <li>Требования законодательства РФ</li>
                <li>Передачи партнерам для исполнения договорных обязательств (доставка, платежи)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">7. Меры защиты данных</h2>
              <p className="text-muted-foreground">
                Мы применяем организационные и технические меры для защиты персональных данных от 
                неправомерного доступа, изменения, раскрытия или уничтожения:
              </p>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                <li>Шифрование данных при передаче (SSL/TLS)</li>
                <li>Ограничение доступа к персональным данным сотрудников</li>
                <li>Регулярное резервное копирование</li>
                <li>Использование антивирусного ПО и межсетевых экранов</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">8. Права субъектов данных</h2>
              <p className="text-muted-foreground mb-2">
                Вы имеете право:
              </p>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                <li>Получать информацию о обработке ваших персональных данных</li>
                <li>Требовать уточнения, блокирования или удаления данных</li>
                <li>Отозвать согласие на обработку данных</li>
                <li>Обжаловать действия оператора в Роскомнадзоре или судебном порядке</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">9. Использование cookie</h2>
              <p className="text-muted-foreground">
                Сайт использует файлы cookie для аналитики, улучшения функциональности и персонализации. 
                Вы можете отключить cookie в настройках браузера, однако это может ограничить 
                функциональность Сайта.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">10. Контактная информация</h2>
              <p className="text-muted-foreground">
                По вопросам обработки персональных данных обращайтесь:
              </p>
              <ul className="list-none space-y-1 text-muted-foreground ml-4 mt-2">
                <li>Email: metall-kmk@yandex.ru</li>
                <li>Телефон: +7 (918) 508-60-59</li>
                <li>Адрес: г. Краснодар (точный адрес уточняйте у оператора)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">11. Изменения в Политике</h2>
              <p className="text-muted-foreground">
                Оператор оставляет за собой право вносить изменения в настоящую Политику. 
                Новая редакция вступает в силу с момента размещения на Сайте. 
                Рекомендуем периодически проверять актуальность документа.
              </p>
            </section>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Privacy;