import { Outlet } from 'react-router';

export const PageLayout = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="m-8 flex flex-1 items-center justify-center">
        <Outlet />
      </div>
    </div>
  );
};
