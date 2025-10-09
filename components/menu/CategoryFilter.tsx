import { Category } from '@/types';

interface CategoryFilterProps {
  categories: Category[];
  selectedCategory: string;
  onCategoryChange: (categoryId: string) => void;
}

export default function CategoryFilter({ 
  categories, 
  selectedCategory, 
  onCategoryChange 
}: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap justify-center gap-3">
      {categories.map(category => (
        <button
          key={category.id}
          onClick={() => onCategoryChange(category.id)}
          suppressHydrationWarning
          className={`group flex items-center space-x-3 px-6 py-4 rounded-2xl transition-all duration-300 transform hover:scale-105 font-bold ${
            selectedCategory === category.id
              ? 'bg-gradient-to-r from-primary-red to-soft-red text-white shadow-2xl scale-105'
              : 'bg-white/80 backdrop-blur text-charcoal border-2 border-soft-red-light hover:border-soft-red hover:bg-soft-red-lighter shadow-lg'
          }`}
        >
          <span className={`text-2xl transition-transform duration-300 ${
            selectedCategory === category.id ? 'scale-110' : 'group-hover:scale-125'
          }`}>
            {category.icon}
          </span>
          <span className="text-base">{category.name}</span>
        </button>
      ))}
    </div>
  );
}