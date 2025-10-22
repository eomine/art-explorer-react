import { useEffect, useState } from 'react';

export default function DarkModeToggle() {
  const [isDark, setDark] = useState<boolean>(() => {
    const storedValue = localStorage.getItem('darkMode');
    if (storedValue) {
      return storedValue === '1';
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    if (isDark) {
      document.body.classList.add('dark');
      localStorage.setItem('darkMode', '1');
    } else {
      document.body.classList.remove('dark');
      localStorage.setItem('darkMode', '0');
    }
  }, [isDark]);

  const onClickToggle = () => setDark(!isDark);

  return (
    <button className="cursor-pointer ml-auto text-xs" onClick={onClickToggle}>
      Dark Mode: {isDark ? 'On' : 'Off'}
    </button>
  );
}
