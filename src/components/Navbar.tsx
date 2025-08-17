import React, { useState, useEffect } from 'react';
import { Sun, Moon, Menu, X, LogOut, Clock, AlertTriangle } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';

interface NavbarProps {
  currentView?: 'camps' | 'lesson';
  campTitle?: string;
  onNavigate?: (section: string) => void;
  currentSection?: 'camps' | 'courses' | 'workshops' | 'events' | 'search';
}

const Navbar: React.FC<NavbarProps> = ({ 
  currentView = 'camps', 
  campTitle, 
  onNavigate,
  currentSection = 'camps'
}) => {
  const { isDark, toggleTheme } = useTheme();
  const { logout, currentUser, sessionTimeRemaining } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showSessionWarning, setShowSessionWarning] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const WARNING_TIME = 10 * 60 * 1000; // 10 minutes

  useEffect(() => {
    // Check if device is mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    // Show session warning when 10 minutes remaining
    if (sessionTimeRemaining <= WARNING_TIME && sessionTimeRemaining > 0) {
      setShowSessionWarning(true);
    } else {
      setShowSessionWarning(false);
    }
  }, [sessionTimeRemaining]);

  const getSectionTitle = (section: string) => {
    switch (section) {
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

  const getBreadcrumb = () => {
    if (currentView === 'lesson' && campTitle) {
      // On mobile, show only the section title when viewing a lesson
      if (isMobile) {
        return getSectionTitle(currentSection);
      }
      // On desktop, show full breadcrumb
      return campTitle;
    }
    return getSectionTitle(currentSection);
  };

  const getLogoSrc = () => {
    if (isMobile) {
      // Mobile: Use full logo with text
      return isDark 
        ? "/Logikids-logo-white.svg" 
        : "/Logikids-logo.svg";
    } else {
      // Desktop: Use full horizontal logo
      return isDark 
        ? "/logikids-logo-horizontal-white.svg" 
        : "/logikids-logo.svg";
    }
  };

  const handleMenuItemClick = (section: string) => {
    setIsMenuOpen(false);
    if (onNavigate) {
      onNavigate(section);
    }
  };

  const handleLogout = () => {
    if (confirm('Сигурни ли сте, че искате да излезете от системата?')) {
      logout();
    }
  };

  const formatSessionTime = (milliseconds: number) => {
    const totalMinutes = Math.floor(milliseconds / (1000 * 60));
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    
    if (hours > 0) {
      return `${hours}ч ${minutes}м`;
    }
    return `${minutes}м`;
  };

  const getDisplayName = (username: string) => {
    const parts = username.split('.');
    return parts[0].charAt(0).toUpperCase() + parts[0].slice(1);
  };

  const menuItems = [
    { id: 'camps', label: 'Лагери' },
    { id: 'courses', label: 'Курсове' },
    { id: 'workshops', label: 'Работилници' },
    { id: 'events', label: 'Събития' },
    { id: 'search', label: 'Търсене' }
  ];

  return (
    <nav className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm shadow-lg border-b border-gray-200 dark:border-gray-700 transition-colors duration-300 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="h-5 w-5 text-gray-700 dark:text-gray-300" />
              ) : (
                <Menu className="h-5 w-5 text-gray-700 dark:text-gray-300" />
              )}
            </button>
            <img 
              src={getLogoSrc()} 
              alt="LogiKids" 
              className="h-8 w-auto transition-opacity duration-300"
            />
          </div>
          
          <div className="flex-1 flex justify-center">
            <h1 className="text-lg font-semibold text-gray-900 dark:text-white text-center px-4">
              {getBreadcrumb()}
            </h1>
          </div>
          
          <div className="flex items-center space-x-3">
            {/* Session Timer */}
            {sessionTimeRemaining > 0 && (
              <div className={`hidden sm:flex items-center space-x-2 px-3 py-1 rounded-lg text-sm transition-colors duration-200 ${
                showSessionWarning 
                  ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400' 
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300'
              }`}>
                {showSessionWarning ? (
                  <AlertTriangle className="h-4 w-4" />
                ) : (
                  <Clock className="h-4 w-4" />
                )}
                <span>{formatSessionTime(sessionTimeRemaining)}</span>
              </div>
            )}

            {/* User Info */}
            <div className="hidden sm:flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
              <span>Здравей, {currentUser ? getDisplayName(currentUser) : 'Потребител'}</span>
            </div>
            
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
              aria-label="Toggle theme"
            >
              {isDark ? (
                <Sun className="h-5 w-5 text-yellow-500" />
              ) : (
                <Moon className="h-5 w-5 text-gray-700" />
              )}
            </button>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="p-2 rounded-lg bg-red-100 dark:bg-red-900/30 hover:bg-red-200 dark:hover:bg-red-800/50 text-red-600 dark:text-red-400 transition-colors duration-200"
              aria-label="Logout"
              title="Изход от системата"
            >
              <LogOut className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute top-16 left-0 right-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 shadow-lg z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="space-y-2">
              {/* Mobile User Info */}
              <div className="sm:hidden px-4 py-2 text-sm text-gray-600 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700 mb-2 space-y-1">
                <div>Здравей, {currentUser ? getDisplayName(currentUser) : 'Потребител'}</div>
                {sessionTimeRemaining > 0 && (
                  <div className={`flex items-center space-x-2 ${
                    showSessionWarning ? 'text-red-600 dark:text-red-400' : ''
                  }`}>
                    {showSessionWarning ? (
                      <AlertTriangle className="h-4 w-4" />
                    ) : (
                      <Clock className="h-4 w-4" />
                    )}
                    <span>Сесия: {formatSessionTime(sessionTimeRemaining)}</span>
                  </div>
                )}
              </div>
              
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleMenuItemClick(item.id)}
                  className="block w-full text-left px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors duration-200 font-medium"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Session Warning Banner */}
      {showSessionWarning && (
        <div className="bg-red-50 dark:bg-red-900/30 border-b border-red-200 dark:border-red-800/50 px-4 py-2">
          <div className="max-w-7xl mx-auto flex items-center justify-center space-x-2 text-sm text-red-600 dark:text-red-400">
            <AlertTriangle className="h-4 w-4" />
            <span>
              Вашата сесия ще изтече след {formatSessionTime(sessionTimeRemaining)}. 
              Моля, запазете работата си.
            </span>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
