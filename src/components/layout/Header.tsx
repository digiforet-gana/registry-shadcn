import { Link } from 'react-router';

export const Header = () => {
  return (
    <header className="sticky top-0 z-10 border-b bg-background/80 backdrop-blur">
      <div className="flex h-14 items-center px-4 md:px-8">
        <Link to="/" className="font-semibold">
          registry-shadcn
        </Link>
      </div>
    </header>
  );
};
