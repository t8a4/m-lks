import React from 'react';
import { PlayCircle } from 'lucide-react';

interface Day {
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
}

interface DayCardProps {
  day: Day;
  campId: string;
  onLessonPlan?: (day: Day, campId: string) => void;
}

const DayCard: React.FC<DayCardProps> = ({ day, campId, onLessonPlan }) => {
  const handleLessonPlan = () => {
    if (onLessonPlan) {
      onLessonPlan(day, campId);
    }
  };

  const dayTitle = day.day === 0 ? "Ден 0" : `Ден ${day.day}`;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-600 p-4">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <h4 className="text-base font-medium text-gray-900 dark:text-white mb-1">
            {dayTitle}
          </h4>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {day.subtitle}
          </p>
        </div>
        <button
          onClick={handleLessonPlan}
          className="ml-4 flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 text-sm font-medium min-w-0"
          title="План на урока"
        >
          <PlayCircle className="h-4 w-4 flex-shrink-0" />
          <span className="hidden sm:inline whitespace-nowrap">ПЛАН НА УРОКА</span>
        </button>
      </div>
    </div>
  );
};

export default DayCard;