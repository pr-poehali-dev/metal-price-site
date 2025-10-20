import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface GallerySectionProps {
  visibleSections: Set<string>;
}

const GallerySection: React.FC<GallerySectionProps> = ({ visibleSections }) => {
  const galleryImages = [
    {
      src: 'https://cdn.poehali.dev/files/f06d658a-0f0f-452b-8933-89e0a117f0c9.jpeg',
      alt: 'Складской комплекс',
      title: 'Складской комплекс'
    },
    {
      src: 'https://cdn.poehali.dev/files/cfa89f3b-ab3f-41bd-9f1d-465591820884.jpeg',
      alt: 'Металлопрокат на складе',
      title: 'Металлопрокат'
    },
    {
      src: 'https://cdn.poehali.dev/files/de7a9ac8-4117-4c62-9b59-b1f7c9e4be99.jpeg',
      alt: 'Погрузка и доставка',
      title: 'Погрузка и доставка'
    },
    {
      src: 'https://cdn.poehali.dev/files/f1cb1ca3-9841-4e6e-a38a-aea09f174bcb.jpeg',
      alt: 'Трубы и профили',
      title: 'Трубы и профили'
    }
  ];

  const features = [
    {
      icon: 'Warehouse',
      title: 'Современный склад',
      description: '5000 м² складских помещений с системой климат-контроля'
    },
    {
      icon: 'Package',
      title: 'Всегда в наличии',
      description: 'Широкий ассортимент металлопроката на складе'
    },
    {
      icon: 'TruckIcon',
      title: 'Собственный транспорт',
      description: 'Быстрая доставка своими силами по Москве и области'
    },
    {
      icon: 'Shield',
      title: 'Качество гарантировано',
      description: 'Вся продукция с сертификатами и паспортами качества'
    }
  ];

  return (
    <section id="gallery" className={`py-16 bg-muted/30 ${visibleSections.has('gallery') ? 'animate-slide-up' : 'opacity-0'}`}>
      <div className="container px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Наш склад и продукция</h2>
          <p className="text-muted-foreground">Современный складской комплекс площадью 5000 м²</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 max-w-7xl mx-auto">
          {galleryImages.map((image, idx) => (
            <div key={idx} className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
              <img 
                src={image.src} 
                alt={image.alt} 
                className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                <p className="text-white font-semibold">{image.title}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 max-w-3xl mx-auto">
          <Card>
            <CardContent className="p-8">
              <div className="grid gap-6 md:grid-cols-2">
                {features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-4">
                    <div className="h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <Icon name={feature.icon as any} className="h-6 w-6 text-accent" />
                    </div>
                    <div>
                      <p className="font-semibold mb-1">{feature.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default GallerySection;