import { useState, useEffect } from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';

  const ThemeToggleButton = () => {
  const [theme, setTheme] = useState(null);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.add(savedTheme);  // Add the saved theme class to HTML
    } else {
      setTheme('light');
    }
  }, []);

  function toggleTheme() {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.classList.remove(theme);  // Remove the old theme
    document.documentElement.classList.add(newTheme);  // Add the new theme
    localStorage.setItem('theme', newTheme);  // Save the user's theme preference
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-md bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
    >
      {theme === 'dark' ? (
        <>
          <FaSun className="text-yellow-500 w-6 h-6" />
        </>
      ) : (
        <>
          <FaMoon className="text-blue-500 w-6 h-6" />
        </>
      )}
    </button>
  );
};

export default ThemeToggleButton;