'use client';

import { Category } from '@/types';
import { useState } from 'react';

interface CategoryTabsProps {
  categories: Category[];
  activeCategory: string;
  onCategoryChange: (categoryId: string) => void;
}

export default function CategoryTabs({ 
  categories, 
  activeCategory, 
  onCategoryChange 
}: CategoryTabsProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const activeCategoryName = categories.find(cat => cat.id === activeCategory)?.name || 'Todas';

  return (
    <div className="bg-white border-b">
      <div className="container mx-auto px-4">
        {/* Desktop Tabs */}
        <div className="hidden lg:flex overflow-x-auto">
          <button
            onClick={() => onCategoryChange('all')}
            className={`px-6 py-4 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
              activeCategory === 'all'
                ? 'border-red-600 text-red-600'
                : 'border-transparent text-gray-600 hover:text-red-600'
            }`}
          >
            Todas
          </button>
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => onCategoryChange(category.id)}
              className={`px-6 py-4 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                activeCategory === category.id
                  ? 'border-red-600 text-red-600'
                  : 'border-transparent text-gray-600 hover:text-red-600'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Mobile Dropdown */}
        <div className="lg:hidden relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="w-full px-4 py-4 text-left text-sm font-medium text-gray-900 bg-gray-50 border-b flex items-center justify-between"
          >
            <span>{activeCategoryName}</span>
            <svg
              className={`w-5 h-5 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {isDropdownOpen && (
            <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 shadow-lg z-10">
              <button
                onClick={() => {
                  onCategoryChange('all');
                  setIsDropdownOpen(false);
                }}
                className={`w-full px-4 py-3 text-left text-sm hover:bg-gray-50 ${
                  activeCategory === 'all' ? 'bg-red-50 text-red-600' : 'text-gray-700'
                }`}
              >
                Todas
              </button>
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => {
                    onCategoryChange(category.id);
                    setIsDropdownOpen(false);
                  }}
                  className={`w-full px-4 py-3 text-left text-sm hover:bg-gray-50 ${
                    activeCategory === category.id ? 'bg-red-50 text-red-600' : 'text-gray-700'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

