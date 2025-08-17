import React, { useState } from 'react';
import { ChevronRight, ChevronDown } from 'lucide-react';
import CampCard from './CampCard';

interface Camp {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  days: Array<{
    day: number;
    subtitle: string;
    lessons: Array<{
      title: string;
      sections: Array<{
        title: string;
        time: string;
        content: string;
      }>;
    }>;
  }>;
}

interface CategorySectionProps {
  category: string;
  camps: Camp[];
  onLessonPlan: (day: any, campId: string) => void;
  contentType?: 'camps' | 'courses' | 'workshops' | 'events';
}

const CategorySection: React.FC<CategorySectionProps> = ({ 
  category, 
  camps, 
  onLessonPlan, 
  contentType = 'camps' 
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const getContentTypeLabel = () => {
    switch (contentType) {
      case 'courses':
        return 'Курсове';
      case 'workshops':
        return 'Работилници';
      case 'events':
        return 'Събития';
      default:
        return 'Лагери';
    }
  };

  const getCategoryTitle = () => {
    return `${category} ${getContentTypeLabel()}`;
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-6 text-left hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors duration-200"
      >
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            {getCategoryTitle()}
          </h2>
          <div className="flex-shrink-0">
            {isOpen ? (
              <ChevronDown className="h-6 w-6 text-gray-500 dark:text-gray-400 transition-transform duration-200" />
            ) : (
              <ChevronRight className="h-6 w-6 text-gray-500 dark:text-gray-400 transition-transform duration-200" />
            )}
          </div>
        </div>
      </button>
      
      {isOpen && (
        <div className="border-t border-gray-200 dark:border-gray-700 p-6 space-y-4">
          {camps.map((camp) => (
            <CampCard key={camp.id} camp={camp} onLessonPlan={onLessonPlan} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CategorySection;