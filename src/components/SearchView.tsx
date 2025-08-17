import React, { useState, useEffect } from 'react';
import { Search, ArrowLeft } from 'lucide-react';
import DayCard from './DayCard';

interface SearchItem {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  type: 'camps' | 'courses' | 'workshops' | 'events';
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

interface SearchResults {
  camps: SearchItem[];
  courses: SearchItem[];
  workshops: SearchItem[];
  events: SearchItem[];
}

interface SearchViewProps {
  allData: {
    camps: SearchItem[];
    courses: SearchItem[];
    workshops: SearchItem[];
    events: SearchItem[];
  };
  onBack: () => void;
  onLessonPlan: (day: any, itemId: string) => void;
}

const SearchView: React.FC<SearchViewProps> = ({ allData, onBack, onLessonPlan }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResults>({
    camps: [],
    courses: [],
    workshops: [],
    events: []
  });

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setSearchResults({
        camps: [],
        courses: [],
        workshops: [],
        events: []
      });
      return;
    }

    const query = searchQuery.toLowerCase();
    const results: SearchResults = {
      camps: [],
      courses: [],
      workshops: [],
      events: []
    };

    // Search in each data type
    Object.entries(allData).forEach(([type, items]) => {
      const filteredItems = items.filter(item => 
        item.title.toLowerCase().includes(query) || 
        item.subtitle.toLowerCase().includes(query)
      );
      results[type as keyof SearchResults] = filteredItems;
    });

    setSearchResults(results);
  }, [searchQuery, allData]);

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'camps': return 'Лагери';
      case 'courses': return 'Курсове';
      case 'workshops': return 'Работилници';
      case 'events': return 'Събития';
      default: return type;
    }
  };

  const getTotalResults = () => {
    return Object.values(searchResults).reduce((total, items) => total + items.length, 0);
  };

  const renderSearchGroup = (type: keyof SearchResults, items: SearchItem[]) => {
    if (items.length === 0) return null;

    return (
      <div key={type} className="mb-8">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">
          {getTypeLabel(type)} ({items.length})
        </h3>
        <div className="space-y-4">
          {items.map((item) => (
            <div key={item.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      {item.title}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                      {item.subtitle}
                    </p>
                    <span className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs font-medium rounded-full">
                      {item.category}
                    </span>
                  </div>
                </div>
              </div>
              <div className="p-4 bg-gray-50 dark:bg-gray-750 space-y-3">
                {item.days.map((day) => (
                  <DayCard 
                    key={day.day} 
                    day={day} 
                    campId={item.id} 
                    onLessonPlan={onLessonPlan}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors duration-200"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Обратно</span>
          </button>
        </div>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Търсене
          </h1>
          
          <div className="relative max-w-2xl">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Търсете лагери, курсове, работилници или събития..."
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
            />
          </div>
        </div>

        {searchQuery.trim() !== '' && (
          <div className="mb-6">
            <p className="text-gray-600 dark:text-gray-300">
              {getTotalResults() > 0 
                ? `Намерени са ${getTotalResults()} резултата за "${searchQuery}"`
                : `Няма намерени резултати за "${searchQuery}"`
              }
            </p>
          </div>
        )}

        <div className="space-y-8">
          {Object.entries(searchResults).map(([type, items]) => 
            renderSearchGroup(type as keyof SearchResults, items)
          )}
        </div>

        {searchQuery.trim() === '' && (
          <div className="text-center py-12">
            <Search className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              Започнете търсене
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Въведете ключова дума за да намерите лагери, курсове, работилници или събития
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchView;