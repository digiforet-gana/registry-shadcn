import { BrowserRouter } from 'react-router';
import { Router } from './router';

export const App = () => {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Router />
    </BrowserRouter>
  );
};
