import React, { useState, useEffect } from 'react';
import { FaSun, FaMoon } from 'react-icons/fa'; // Importing icons

const ThemeToggle = () => {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem('theme') === 'dark'
  );

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  return (
    <div className="flex items-center space-x-2">
      {/* Sun Icon */}
      <FaSun
        className={`text-yellow-500 ${darkMode ? 'opacity-50' : 'opacity-100'} transition-opacity duration-300`}
        aria-hidden="true"
      />
      
      {/* Toggle Switch */}
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          checked={darkMode}
          onChange={() => setDarkMode(prev => !prev)}
          className="sr-only"
        />
        <div className="w-12 h-6 bg-gray-300 dark:bg-gray-600 rounded-full shadow-inner"></div>
        <div
          className={`absolute w-6 h-6 bg-teal-400 dark:bg-teal-600 rounded-full shadow-md transform transition-transform ${
            darkMode ? 'translate-x-6' : 'translate-x-0'
          }`}
        ></div>
      </label>

      {/* Moon Icon */}
      <FaMoon
        className={`text-gray-300 ${darkMode ? 'opacity-100' : 'opacity-50'} transition-opacity duration-300`}
        aria-hidden="true"
      />
    </div>
  );
};

export default ThemeToggle;
