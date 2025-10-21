export interface MetalProduct {
  name: string;
  price: number;
  unit: string;
  description: string;
}

export interface MetalCategory {
  category: string;
  image: string;
  items: MetalProduct[];
}

export const metalProducts: MetalCategory[] = [
  {
    category: 'Листовой металл',
    image: 'https://cdn.poehali.dev/projects/e197f910-0d69-4ea7-89c6-078a665bf1e2/files/e463a543-fa2f-4ae7-921f-695d713f5091.jpg',
    items: [
      { name: 'Лист г/к 3мм', price: 58500, unit: 'тонна', description: '1500x6000мм' },
      { name: 'Лист г/к 5мм', price: 59200, unit: 'тонна', description: '1500x6000мм' },
      { name: 'Лист х/к 1мм', price: 67800, unit: 'тонна', description: '1250x2500мм' },
      { name: 'Лист оцинк. 0.5мм', price: 89500, unit: 'тонна', description: '1250x2500мм' },
    ]
  },
  {
    category: 'Сортовой прокат',
    image: 'https://cdn.poehali.dev/projects/e197f910-0d69-4ea7-89c6-078a665bf1e2/files/045ce0aa-ab69-4ea4-a051-0e2134b61a5e.jpg',
    items: [
      { name: 'Уголок 50x50x5', price: 62300, unit: 'тонна', description: 'Длина 6м' },
      { name: 'Швеллер 10П', price: 64100, unit: 'тонна', description: 'Длина 12м' },
      { name: 'Балка 20Б1', price: 68900, unit: 'тонна', description: 'Длина 12м' },
      { name: 'Труба профильная 40x40x2', price: 71200, unit: 'тонна', description: 'Длина 6м' },
    ]
  },
  {
    category: 'Арматура и круг',
    image: 'https://cdn.poehali.dev/projects/e197f910-0d69-4ea7-89c6-078a665bf1e2/files/0eb3b802-9c43-43c9-9093-b1eb2211cdc2.jpg',
    items: [
      { name: 'Арматура А500С 12мм', price: 57800, unit: 'тонна', description: 'Длина 11.7м' },
      { name: 'Арматура А500С 16мм', price: 57500, unit: 'тонна', description: 'Длина 11.7м' },
      { name: 'Круг 20мм', price: 61200, unit: 'тонна', description: 'Сталь 45' },
      { name: 'Круг 40мм', price: 62800, unit: 'тонна', description: 'Сталь 45' },
    ]
  },
  {
    category: 'Трубы',
    image: 'https://cdn.poehali.dev/projects/e197f910-0d69-4ea7-89c6-078a665bf1e2/files/e077375b-229f-4388-ad10-938dd3d93412.jpg',
    items: [
      { name: 'Труба э/с 57x3', price: 69500, unit: 'тонна', description: 'Длина 6м' },
      { name: 'Труба э/с 76x3.5', price: 68900, unit: 'тонна', description: 'Длина 6м' },
      { name: 'Труба б/ш 108x4', price: 98500, unit: 'тонна', description: 'ГОСТ 8732' },
      { name: 'Труба нерж. 25x2', price: 385000, unit: 'тонна', description: 'AISI 304' },
    ]
  },
];