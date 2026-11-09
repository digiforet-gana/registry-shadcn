import { useSyncExternalStore } from 'react';

type Theme = 'light' | 'dark';

const STORAGE_KEY = 'theme';

/* 현재 테마는 <html>의 dark 클래스를 기준으로 판단 (초기값은 index.html의 스크립트가 적용) */
const getCurrentTheme = (): Theme => (document.documentElement.classList.contains('dark') ? 'dark' : 'light');

/* <html>의 class 변경을 구독해, 이 훅을 사용하는 모든 컴포넌트가 같은 테마 값을 갖도록 처리 */
const subscribe = (onChange: () => void) => {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
  return () => observer.disconnect();
};

export const useTheme = () => {
  const theme = useSyncExternalStore(subscribe, getCurrentTheme);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';

    document.documentElement.classList.toggle('dark', nextTheme === 'dark');

    /* 시크릿 모드 등 저장소를 사용할 수 없는 환경에서도 테마 전환은 동작하도록 처리 */
    try {
      localStorage.setItem(STORAGE_KEY, nextTheme);
    } catch {
      /* 저장 실패 시 현재 페이지에서만 적용 */
    }
  };

  return { theme, toggleTheme };
};
