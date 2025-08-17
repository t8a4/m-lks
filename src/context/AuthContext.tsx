import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  currentUser: string | null;
  login: (success: boolean, username?: string) => void;
  logout: () => void;
  sessionTimeRemaining: number;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const SESSION_DURATION = 8 * 60 * 60 * 1000; // 8 hours in milliseconds
const WARNING_TIME = 10 * 60 * 1000; // 10 minutes before expiry

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [sessionTimeRemaining, setSessionTimeRemaining] = useState(0);
  const [sessionTimer, setSessionTimer] = useState<NodeJS.Timeout | null>(null);

  const clearSessionTimer = useCallback(() => {
    if (sessionTimer) {
      clearInterval(sessionTimer);
      setSessionTimer(null);
    }
  }, [sessionTimer]);

  const logout = useCallback(() => {
    // Clear all authentication data
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('currentUser');
    localStorage.removeItem('loginTimestamp');
    
    // Clear session timer
    clearSessionTimer();
    
    // Update state immediately
    setIsAuthenticated(false);
    setCurrentUser(null);
    setSessionTimeRemaining(0);
  }, [clearSessionTimer]);

  const startSessionTimer = useCallback((remainingTime: number) => {
    // Clear any existing timer
    clearSessionTimer();
    
    const timer = setInterval(() => {
      setSessionTimeRemaining(prev => {
        const newTime = prev - 1000;
        
        if (newTime <= 0) {
          // Session expired
          clearInterval(timer);
          logout();
          return 0;
        }
        
        // Show warning when 10 minutes remaining
        if (newTime === WARNING_TIME) {
          showSessionWarning();
        }
        
        return newTime;
      });
    }, 1000);
    
    setSessionTimer(timer);
    return timer;
  }, [clearSessionTimer, logout]);

  const showSessionWarning = useCallback(() => {
    if (Notification.permission === 'granted') {
      new Notification('LogiKids - Сесията изтича', {
        body: 'Вашата сесия ще изтече след 10 минути. Моля, запазете работата си.',
        icon: '/logikids-logo.svg'
      });
    }
  }, []);

  useEffect(() => {
    // Check if user is already authenticated on app load
    const authStatus = localStorage.getItem('isAuthenticated');
    const user = localStorage.getItem('currentUser');
    const loginTimestamp = localStorage.getItem('loginTimestamp');
    
    if (authStatus === 'true' && user && loginTimestamp) {
      const loginTime = parseInt(loginTimestamp);
      const currentTime = Date.now();
      const timePassed = currentTime - loginTime;
      
      if (timePassed < SESSION_DURATION) {
        // Session is still valid
        const remaining = SESSION_DURATION - timePassed;
        setIsAuthenticated(true);
        setCurrentUser(user);
        setSessionTimeRemaining(remaining);
        
        // Start session timer
        startSessionTimer(remaining);
      } else {
        // Session expired
        logout();
      }
    }
    
    setIsLoading(false);
  }, [startSessionTimer, logout]);

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      clearSessionTimer();
    };
  }, [clearSessionTimer]);

  const login = useCallback((success: boolean, username?: string) => {
    if (success && username) {
      // Set authentication data in localStorage first
      const loginTime = Date.now();
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('currentUser', username);
      localStorage.setItem('loginTimestamp', loginTime.toString());
      
      // Update state immediately
      setIsAuthenticated(true);
      setCurrentUser(username);
      setSessionTimeRemaining(SESSION_DURATION);
      
      // Start session timer
      startSessionTimer(SESSION_DURATION);
      
      // Request notification permission
      if ('Notification' in window && Notification.permission === 'default') {
        Notification.requestPermission();
      }
    }
  }, [startSessionTimer]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="text-gray-600 dark:text-gray-400">Зареждане...</p>
        </div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ 
      isAuthenticated, 
      currentUser, 
      login, 
      logout, 
      sessionTimeRemaining 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};