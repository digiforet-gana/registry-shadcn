import { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router';
import { PageLayout } from './components/layout/PageLayout';

const HomePage = lazy(() => import('./pages/Home'));
const NotFoundPage = lazy(() => import('./pages/NotFound'));

export const Router = () => {
  return (
    <Suspense fallback={null}>
      <Routes>
        <Route element={<PageLayout />}>
          <Route path="/" element={<HomePage />} />

          {/* 등록되지 않은 경로 접속 시 NotFound 페이지로 이동 */}
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
};
