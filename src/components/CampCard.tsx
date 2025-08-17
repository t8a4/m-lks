import React, { useState } from 'react';
import { ChevronRight, ChevronDown } from 'lucide-react';
import DayCard from './DayCard';

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

interface CampCardProps {
  camp: Camp;
  onLessonPlan?: (day: any, campId: string) => void;
}

const CampCard: React.FC<CampCardProps> = ({ camp, onLessonPlan }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden transition-all duration-300 hover:shadow-lg">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-6 text-left hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors duration-200"
      >
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              {camp.title}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {camp.subtitle}
            </p>
          </div>
          <div className="ml-4 flex-shrink-0">
            {isOpen ? (
              <ChevronDown className="h-5 w-5 text-gray-500 dark:text-gray-400 transition-transform duration-200" />
            ) : (
              <ChevronRight className="h-5 w-5 text-gray-500 dark:text-gray-400 transition-transform duration-200" />
            )}
          </div>
        </div>
      </button>
      
      {isOpen && (
        <div className="border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-750 p-4 space-y-3">
          {camp.days.map((day) => (
            <DayCard 
              key={day.day} 
              day={day} 
              campId={camp.id} 
              onLessonPlan={onLessonPlan}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CampCard;