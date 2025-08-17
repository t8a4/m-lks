import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, User, Lock, AlertCircle } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import users from '../users.js';

interface LoginFormProps {
  onLogin: (success: boolean, username?: string) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
  const { isDark } = useTheme();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [isBlocked, setIsBlocked] = useState(false);
  const [blockTimeRemaining, setBlockTimeRemaining] = useState(0);

  const MAX_LOGIN_ATTEMPTS = 3;
  const BLOCK_DURATION = 300; // 5 minutes in seconds

  useEffect(() => {
    // Check if user is blocked
    const blockData = localStorage.getItem('loginBlock');
    if (blockData) {
      const { timestamp, attempts } = JSON.parse(blockData);
      const timePassed = (Date.now() - timestamp) / 1000;
      
      if (timePassed < BLOCK_DURATION && attempts >= MAX_LOGIN_ATTEMPTS) {
        setIsBlocked(true);
        setBlockTimeRemaining(Math.ceil(BLOCK_DURATION - timePassed));
        
        // Start countdown timer
        const timer = setInterval(() => {
          setBlockTimeRemaining(prev => {
            if (prev <= 1) {
              setIsBlocked(false);
              localStorage.removeItem('loginBlock');
              setLoginAttempts(0);
              clearInterval(timer);
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
        
        return () => clearInterval(timer);
      } else {
        // Block expired, reset
        localStorage.removeItem('loginBlock');
        setLoginAttempts(0);
      }
    }

    // Load remembered username
    const rememberedUser = localStorage.getItem('rememberedUsername');
    if (rememberedUser) {
      setUsername(rememberedUser);
      setRememberMe(true);
    }
  }, []);

  const getLogoSrc = () => {
    return isDark 
      ? "/logikids logo-horizontal-white.svg" 
      : "/logikids-logo.svg";
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isBlocked) {
      setError(`Твърде много неуспешни опити. Опитайте отново след ${formatTime(blockTimeRemaining)}.`);
      return;
    }

    setError('');
    setIsLoading(true);

    // Input validation
    if (!username.trim()) {
      setError('Моля въведете потребителско име');
      setIsLoading(false);
      return;
    }

    if (!password.trim()) {
      setError('Моля въведете парола');
      setIsLoading(false);
      return;
    }

    try {
      // Simulate loading delay for better UX and security
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Check credentials
      const user = users.find(u => u.username === username.trim() && u.password === password);
      
      if (user) {
        // Successful login
        if (rememberMe) {
          localStorage.setItem('rememberedUsername', username);
        } else {
          localStorage.removeItem('rememberedUsername');
        }
        
        // Clear any login blocks
        localStorage.removeItem('loginBlock');
        setLoginAttempts(0);
        
        // Call onLogin with success
        onLogin(true, username);
      } else {
        // Failed login
        const newAttempts = loginAttempts + 1;
        setLoginAttempts(newAttempts);
        
        if (newAttempts >= MAX_LOGIN_ATTEMPTS) {
          // Block user
          setIsBlocked(true);
          setBlockTimeRemaining(BLOCK_DURATION);
          localStorage.setItem('loginBlock', JSON.stringify({
            timestamp: Date.now(),
            attempts: newAttempts
          }));
          
          setError(`Твърде много неуспешни опити. Достъпът е блокиран за ${formatTime(BLOCK_DURATION)}.`);
          
          // Start countdown timer
          const timer = setInterval(() => {
            setBlockTimeRemaining(prev => {
              if (prev <= 1) {
                setIsBlocked(false);
                localStorage.removeItem('loginBlock');
                setLoginAttempts(0);
                clearInterval(timer);
                return 0;
              }
              return prev - 1;
            });
          }, 1000);
        } else {
          const remainingAttempts = MAX_LOGIN_ATTEMPTS - newAttempts;
          setError(`Невалидни данни за вход. Остават ви ${remainingAttempts} опита.`);
        }
        
        // Call onLogin with failure
        onLogin(false);
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('Възникна грешка при влизане. Моля опитайте отново.');
      onLogin(false);
    } finally {
      setIsLoading(false);
      setPassword(''); // Clear password on any attempt
    }
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
    if (error) setError(''); // Clear error when user starts typing
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (error) setError(''); // Clear error when user starts typing
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center px-4 transition-all duration-500">
      <div className="max-w-md w-full space-y-8">
        <div className="bg-white/80 dark:bg-gray-800/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-gray-200/50 dark:border-gray-700/50 transform transition-all duration-300 hover:shadow-3xl">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="relative">
              <img 
                src={getLogoSrc()} 
                alt="LogiKids" 
                className="h-14 w-auto mx-auto mb-6 transition-all duration-300 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-xl -z-10"></div>
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Добре дошли
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mt-2 text-sm">
              Влезте в системата за достъп до учебните планове
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username Field */}
            <div className="space-y-2">
              <label htmlFor="username" className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                Потребителско име
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors duration-200" />
                </div>
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={handleUsernameChange}
                  required
                  disabled={isBlocked}
                  className="block w-full pl-10 pr-3 py-3.5 border border-gray-300 dark:border-gray-600 rounded-xl bg-white/50 dark:bg-gray-700/50 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed backdrop-blur-sm"
                  placeholder="Въведете потребителско име"
                  autoComplete="username"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                Парола
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors duration-200" />
                </div>
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={handlePasswordChange}
                  required
                  disabled={isBlocked}
                  className="block w-full pl-10 pr-12 py-3.5 border border-gray-300 dark:border-gray-600 rounded-xl bg-white/50 dark:bg-gray-700/50 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed backdrop-blur-sm"
                  placeholder="Въведете парола"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isBlocked}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center">
              <input
                id="remember-me"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                disabled={isBlocked}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded transition-colors duration-200 disabled:opacity-50"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                Запомни потребителското име
              </label>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800/50 rounded-xl p-4 backdrop-blur-sm">
                <div className="flex items-center space-x-2">
                  <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
                  <p className="text-sm text-red-600 dark:text-red-400">
                    {error}
                  </p>
                </div>
              </div>
            )}

            {/* Login Attempts Warning */}
            {loginAttempts > 0 && loginAttempts < MAX_LOGIN_ATTEMPTS && !isBlocked && (
              <div className="bg-yellow-50 dark:bg-yellow-900/30 border border-yellow-200 dark:border-yellow-800/50 rounded-xl p-4 backdrop-blur-sm">
                <div className="flex items-center space-x-2">
                  <AlertCircle className="h-5 w-5 text-yellow-500 flex-shrink-0" />
                  <p className="text-sm text-yellow-600 dark:text-yellow-400">
                    Внимание: {loginAttempts} от {MAX_LOGIN_ATTEMPTS} неуспешни опита
                  </p>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading || !username.trim() || !password.trim() || isBlocked}
              className={`w-full flex justify-center py-4 px-4 border border-transparent rounded-xl shadow-lg text-sm font-semibold text-white transition-all duration-300 transform ${
                isLoading || !username.trim() || !password.trim() || isBlocked
                  ? 'bg-gray-400 dark:bg-gray-600 cursor-not-allowed scale-100'
                  : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 hover:shadow-xl hover:scale-105 active:scale-95'
              }`}
            >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Влизане...</span>
                </div>
              ) : isBlocked ? (
                <div className="flex items-center space-x-2">
                  <AlertCircle className="h-5 w-5" />
                  <span>Блокиран ({formatTime(blockTimeRemaining)})</span>
                </div>
              ) : (
                'Влизане в системата'
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-8 text-center space-y-2">
            <div className="flex items-center justify-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
              <div className="h-1 w-1 bg-gray-400 rounded-full"></div>
              <span>Сигурен достъп</span>
              <div className="h-1 w-1 bg-gray-400 rounded-full"></div>
              <span>Защитени данни</span>
              <div className="h-1 w-1 bg-gray-400 rounded-full"></div>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              LogiKids Camp Lessons © 2024
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
