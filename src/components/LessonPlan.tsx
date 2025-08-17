import React, { useState, useEffect } from 'react';
import { ArrowLeft, ChevronDown, ChevronUp, Clock, ChevronLeft, ChevronRight } from 'lucide-react';

interface Section {
  title: string;
  time: string;
  content: string;
}

interface Lesson {
  title: string;
  sections: Section[];
}

interface Day {
  day: number;
  subtitle: string;
  lessons: Lesson[];
}

interface LessonPlanProps {
  day: Day;
  campId: string;
  onBack: () => void;
  onNavigateDay?: (day: Day) => void;
  allDays?: Day[];
  currentSection?: 'camps' | 'courses' | 'workshops' | 'events';
}

const LessonPlan: React.FC<LessonPlanProps> = ({ 
  day, 
  campId, 
  onBack, 
  onNavigateDay,
  allDays = [],
  currentSection = 'camps'
}) => {
  const [openSections, setOpenSections] = useState<Set<string>>(new Set());
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if device is mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const toggleSection = (sectionId: string) => {
    const newOpenSections = new Set(openSections);
    if (newOpenSections.has(sectionId)) {
      newOpenSections.delete(sectionId);
    } else {
      newOpenSections.add(sectionId);
    }
    setOpenSections(newOpenSections);
  };

  const dayTitle = day.day === 0 ? "Ден 0" : `Ден ${day.day}`;

  // Find current day index and determine navigation availability
  const currentDayIndex = allDays.findIndex(d => d.day === day.day);
  const hasPrevious = currentDayIndex > 0;
  const hasNext = currentDayIndex < allDays.length - 1;

  const handlePreviousDay = () => {
    if (hasPrevious && onNavigateDay) {
      onNavigateDay(allDays[currentDayIndex - 1]);
    }
  };

  const handleNextDay = () => {
    if (hasNext && onNavigateDay) {
      onNavigateDay(allDays[currentDayIndex + 1]);
    }
  };

  // Get the appropriate back button text based on current section and device
  const getBackButtonText = () => {
    if (isMobile) {
      return 'Назад';
    }
    
    switch (currentSection) {
      case 'courses':
        return 'Обратно към курсовете';
      case 'workshops':
        return 'Обратно към работилниците';
      case 'events':
        return 'Обратно към събитията';
      default:
        return 'Обратно към лагерите';
    }
  };

  // Function to render content with image and link support
  const renderContent = (content: string) => {
    // First handle images
    let parts = content.split(/!\[([^\]]*)\]\(([^)]+)\)/g);
    
    const processedParts = parts.map((part, index) => {
      // Every third element starting from index 2 is an image URL
      if (index % 3 === 2) {
        const altText = parts[index - 1] || 'Image';
        return (
          <div key={index} className="my-4">
            <img 
              src={part} 
              alt={altText}
              className="max-w-full h-auto rounded-lg shadow-md border border-gray-200 dark:border-gray-600"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
              }}
            />
          </div>
        );
      }
      // Skip alt text parts (index % 3 === 1)
      else if (index % 3 === 1) {
        return null;
      }
      // Regular text content - now process for links
      else {
        return processTextForLinks(part, `text-${index}`);
      }
    });

    return processedParts.filter(part => part !== null);
  };

  // Function to process text content for markdown-style links
  const processTextForLinks = (text: string, keyPrefix: string) => {
    // Split by markdown link pattern [text](url)
    const linkParts = text.split(/\[([^\]]+)\]\(([^)]+)\)/);
    
    return linkParts.map((part, index) => {
      // Every third element starting from index 2 is a URL
      if (index % 3 === 2) {
        const linkText = linkParts[index - 1] || 'Link';
        return (
          <a
            key={`${keyPrefix}-link-${index}`}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 underline transition-colors duration-200"
          >
            {linkText}
          </a>
        );
      }
      // Skip link text parts (index % 3 === 1)
      else if (index % 3 === 1) {
        return null;
      }
      // Regular text content
      else {
        return (
          <span key={`${keyPrefix}-text-${index}`} className="whitespace-pre-wrap">
            {part}
          </span>
        );
      }
    }).filter(part => part !== null);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors duration-200"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>{getBackButtonText()}</span>
          </button>

          {/* Navigation buttons */}
          <div className="flex items-center space-x-4">
            <button
              onClick={handlePreviousDay}
              disabled={!hasPrevious}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors duration-200 ${
                hasPrevious
                  ? 'bg-blue-600 hover:bg-blue-700 text-white'
                  : 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
              }`}
            >
              <ChevronLeft className="h-4 w-4" />
              {!isMobile && <span>Предишен урок</span>}
            </button>

            <button
              onClick={handleNextDay}
              disabled={!hasNext}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors duration-200 ${
                hasNext
                  ? 'bg-blue-600 hover:bg-blue-700 text-white'
                  : 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
              }`}
            >
              {!isMobile && <span>Следващ урок</span>}
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {dayTitle}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            {day.subtitle}
          </p>
        </div>

        <div className="space-y-6">
          {day.lessons.map((lesson, lessonIndex) => (
            <div
              key={lessonIndex}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700"
            >
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {lesson.title}
                </h2>
              </div>
              
              <div className="p-6 space-y-4">
                {lesson.sections.map((section, sectionIndex) => {
                  const sectionId = `${lessonIndex}-${sectionIndex}`;
                  const isOpen = openSections.has(sectionId);
                  
                  return (
                    <div
                      key={sectionIndex}
                      className="border border-gray-200 dark:border-gray-600 rounded-lg overflow-hidden"
                    >
                      <button
                        onClick={() => toggleSection(sectionId)}
                        className="w-full p-4 text-left hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors duration-200"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">
                              {section.title}
                            </h3>
                            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                              <Clock className="h-4 w-4 mr-1" />
                              <span>{section.time}</span>
                            </div>
                          </div>
                          <div className="ml-4 flex-shrink-0">
                            {isOpen ? (
                              <ChevronUp className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                            ) : (
                              <ChevronDown className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                            )}
                          </div>
                        </div>
                      </button>
                      
                      {isOpen && (
                        <div className="border-t border-gray-200 dark:border-gray-600 p-4 bg-gray-50 dark:bg-gray-750">
                          <div className="text-gray-700 dark:text-gray-300 leading-relaxed">
                            {renderContent(section.content)}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LessonPlan;