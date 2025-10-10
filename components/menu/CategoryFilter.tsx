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
    <div className="flex flex-wrap justify-center gap-4">
      {categories.map(category => (
        <button
          key={category.id}
          onClick={() => onCategoryChange(category.id)}
          suppressHydrationWarning
          className={`group relative flex items-center space-x-3 px-8 py-4 rounded-2xl transition-all duration-300 transform hover:scale-105 font-bold text-base overflow-hidden cursor-pointer ${
            selectedCategory === category.id
              ? 'bg-gradient-to-r from-primary-red to-primary-yellow text-white shadow-xl scale-105'
              : 'bg-white text-charcoal border-2 border-gray-200 hover:border-primary-red hover:shadow-xl shadow-md'
          }`}
        >
          {/* Hover gradient overlay for inactive buttons */}
          {selectedCategory !== category.id && (
            <div className="absolute inset-0 bg-gradient-to-r from-primary-red/5 to-primary-yellow/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          )}

          {/* Icon */}
          <span className={`text-2xl transition-all duration-300 relative z-10 ${
            selectedCategory === category.id
              ? 'scale-110 drop-shadow-lg'
              : 'group-hover:scale-125 group-hover:drop-shadow-md'
          }`}>
            {category.icon}
          </span>

          {/* Label */}
          <span className="relative z-10 tracking-wide">{category.name}</span>

          {/* Active indicator dot */}
          {selectedCategory === category.id && (
            <span className="absolute top-2 right-2 w-2 h-2 bg-white rounded-full shadow-lg animate-pulse"></span>
          )}
        </button>
      ))}
    </div>
  );
}