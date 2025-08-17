import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import LoginForm from './components/LoginForm';
import Navbar from './components/Navbar';
import CategorySection from './components/CategorySection';
import LessonPlan from './components/LessonPlan';
import SearchView from './components/SearchView';
import DayCard from './components/DayCard';
import camps from './campData.js';
import courses from './coursesData.js';
import workshops from './workshopData.js';
import events from './eventData.js';

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

function AppContent() {
  const { isAuthenticated, login } = useAuth();
  const [currentSection, setCurrentSection] = useState<'camps' | 'courses' | 'workshops' | 'events' | 'search'>('camps');
  const [currentView, setCurrentView] = useState<'list' | 'lesson' | 'search'>('list');
  const [selectedDay, setSelectedDay] = useState<Day | null>(null);
  const [selectedItemId, setSelectedItemId] = useState<string>('');
  const [itemsByCategory, setItemsByCategory] = useState<Record<string, Camp[]>>({});

  const getCurrentData = () => {
    switch (currentSection) {
      case 'courses':
        return courses;
      case 'workshops':
        return workshops;
      case 'events':
        return events;
      default:
        return camps;
    }
  };

  const getSectionTitle = () => {
    switch (currentSection) {
      case 'courses':
        return 'Курсове';
      case 'workshops':
        return 'Работилници';
      case 'events':
        return 'Събития';
      case 'search':
        return 'Търсене';
      default:
        return 'Лагери';
    }
  };

  const getSectionDescription = () => {
    switch (currentSection) {
      case 'courses':
        return 'Изберете курс и ден за преглед на учебните планове';
      case 'workshops':
        return 'Изберете работилница за преглед на програмата';
      case 'events':
        return 'Изберете събитие за преглед на програмата';
      case 'search':
        return 'Търсете в лагери, курсове, работилници и събития';
      default:
        return 'Изберете лагер и ден за преглед на учебните планове';
    }
  };

  useEffect(() => {
    if (currentSection === 'search') return;
    
    const currentData = getCurrentData();
    // Group items by category
    const grouped = currentData.reduce((acc: Record<string, Camp[]>, item: Camp) => {
      if (!acc[item.category]) {
        acc[item.category] = [];
      }
      acc[item.category].push(item);
      return acc;
    }, {});
    setItemsByCategory(grouped);
  }, [currentSection]);

  const handleLessonPlan = (day: Day, itemId: string) => {
    setSelectedDay(day);
    setSelectedItemId(itemId);
    setCurrentView('lesson');
  };

  const handleBack = () => {
    if (currentView === 'search') {
      setCurrentView('list');
      setCurrentSection('camps');
    } else {
      setCurrentView('list');
      setSelectedDay(null);
      setSelectedItemId('');
    }
  };

  const handleNavigate = (section: string) => {
    if (section === 'search') {
      setCurrentSection('search');
      setCurrentView('search');
    } else {
      setCurrentSection(section as 'camps' | 'courses' | 'workshops' | 'events');
      setCurrentView('list');
    }
    setSelectedDay(null);
    setSelectedItemId('');
  };

  const handleNavigateDay = (day: Day) => {
    setSelectedDay(day);
  };

  // Get the current item title for the navbar
  const getCurrentItemTitle = () => {
    if (selectedItemId) {
      const currentData = getCurrentData();
      const item = currentData.find(c => c.id === selectedItemId);
      return item?.title || '';
    }
    return '';
  };

  const getBreadcrumb = () => {
    if (currentView === 'lesson' && getCurrentItemTitle()) {
      return `${getSectionTitle()} - ${getCurrentItemTitle()}`;
    }
    return getSectionTitle();
  };

  // Get all days for the current selected item
  const getAllDaysForCurrentItem = () => {
    if (selectedItemId) {
      const currentData = getCurrentData();
      const item = currentData.find(c => c.id === selectedItemId);
      return item?.days || [];
    }
    return [];
  };

  // Prepare all data for search
  const getAllSearchData = () => {
    return {
      camps: camps,
      courses: courses,
      workshops: workshops,
      events: events
    };
  };

  // Show login form if not authenticated
  if (!isAuthenticated) {
    return <LoginForm onLogin={login} />;
  }

  // Show main application if authenticated
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <Navbar 
        currentView={currentView === 'search' ? 'camps' : currentView} 
        campTitle={getBreadcrumb()}
        onNavigate={handleNavigate}
        currentSection={currentSection}
      />
      
      {currentView === 'search' ? (
        <SearchView
          allData={getAllSearchData()}
          onBack={handleBack}
          onLessonPlan={handleLessonPlan}
        />
      ) : currentView === 'list' ? (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <p className="text-lg text-gray-600 dark:text-gray-300">
              {getSectionDescription()}
            </p>
          </div>
          
          <div className="space-y-6">
            {Object.entries(itemsByCategory).map(([category, categoryItems]) => (
              <CategorySection
                key={category}
                category={category}
                camps={categoryItems}
                onLessonPlan={handleLessonPlan}
                contentType={currentSection}
              />
            ))}
          </div>
        </main>
      ) : (
        selectedDay && (
          <LessonPlan
            day={selectedDay}
            campId={selectedItemId}
            onBack={handleBack}
            onNavigateDay={handleNavigateDay}
            allDays={getAllDaysForCurrentItem()}
            currentSection={currentSection}
          />
        )
      )}
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;