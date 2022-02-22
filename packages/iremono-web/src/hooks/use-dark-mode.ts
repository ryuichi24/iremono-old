import { useState } from 'react';
import { Theme } from '@mui/material/styles';
import { getTheme } from '@/styles/theme';

export const useDarkMode = () => {
  const darkMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  const isDarkMode = darkMediaQuery.matches;

  if (isDarkMode) {
    localStorage.setItem('theme', 'dark');
  }

  if (!isDarkMode) {
    localStorage.setItem('theme', 'light');
  }

  const currentMode = (localStorage.getItem('theme') || 'light') as 'dark' | 'light';

  const currentTheme = getTheme(currentMode);

  const [theme, setTheme] = useState(currentTheme);

  const toggleDarkMode = () => {
    const updatedTheme: Theme = {
      ...theme,
      palette: {
        ...theme.palette,
        mode: theme.palette.mode === 'light' ? 'dark' : 'light',
      },
    };

    setTheme(updatedTheme);
    localStorage.setItem('theme', updatedTheme.palette.mode);
  };

  return [theme, toggleDarkMode] as const;
};
