export interface MetalProduct {
  name: string;
  price: number;
  unit: string;
  description: string;
}

export interface MetalCategory {
  category: string;
  items: MetalProduct[];
}

export const metalProducts: MetalCategory[] = [
  {
    category: 'Листовой металл',
    items: [
      { name: 'Лист г/к 3мм', price: 58500, unit: 'тонна', description: '1500x6000мм' },
      { name: 'Лист г/к 5мм', price: 59200, unit: 'тонна', description: '1500x6000мм' },
      { name: 'Лист х/к 1мм', price: 67800, unit: 'тонна', description: '1250x2500мм' },
      { name: 'Лист оцинк. 0.5мм', price: 89500, unit: 'тонна', description: '1250x2500мм' },
    ]
  },
  {
    category: 'Сортовой прокат',
    items: [
      { name: 'Уголок 50x50x5', price: 62300, unit: 'тонна', description: 'Длина 6м' },
      { name: 'Швеллер 10П', price: 64100, unit: 'тонна', description: 'Длина 12м' },
      { name: 'Балка 20Б1', price: 68900, unit: 'тонна', description: 'Длина 12м' },
      { name: 'Труба профильная 40x40x2', price: 71200, unit: 'тонна', description: 'Длина 6м' },
    ]
  },
  {
    category: 'Арматура и круг',
    items: [
      { name: 'Арматура А500С 12мм', price: 57800, unit: 'тонна', description: 'Длина 11.7м' },
      { name: 'Арматура А500С 16мм', price: 57500, unit: 'тонна', description: 'Длина 11.7м' },
      { name: 'Круг 20мм', price: 61200, unit: 'тонна', description: 'Сталь 45' },
      { name: 'Круг 40мм', price: 62800, unit: 'тонна', description: 'Сталь 45' },
    ]
  },
  {
    category: 'Трубы',
    items: [
      { name: 'Труба э/с 57x3', price: 69500, unit: 'тонна', description: 'Длина 6м' },
      { name: 'Труба э/с 76x3.5', price: 68900, unit: 'тонна', description: 'Длина 6м' },
      { name: 'Труба б/ш 108x4', price: 98500, unit: 'тонна', description: 'ГОСТ 8732' },
      { name: 'Труба нерж. 25x2', price: 385000, unit: 'тонна', description: 'AISI 304' },
    ]
  },
];
