import { useState } from 'react';

type Theme = 'light' | 'dark';

const STORAGE_KEY = 'theme';

/* 초기 테마는 index.html의 스크립트가 <html>에 적용한 dark 클래스를 기준으로 판단 */
const getCurrentTheme = (): Theme => (document.documentElement.classList.contains('dark') ? 'dark' : 'light');

export const useTheme = () => {
  const [theme, setTheme] = useState<Theme>(getCurrentTheme);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';

    document.documentElement.classList.toggle('dark', nextTheme === 'dark');

    /* 시크릿 모드 등 저장소를 사용할 수 없는 환경에서도 테마 전환은 동작하도록 처리 */
    try {
      localStorage.setItem(STORAGE_KEY, nextTheme);
    } catch {
      /* 저장 실패 시 현재 페이지에서만 적용 */
    }

    setTheme(nextTheme);
  };

  return { theme, toggleTheme };
};
