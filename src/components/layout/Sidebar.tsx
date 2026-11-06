import { NavLink } from 'react-router';
import { registryItems } from '@/lib/registry';
import { cn } from '@/lib/utils';

export const Sidebar = () => {
  return (
    <aside className="hidden w-60 shrink-0 border-r md:block">
      <nav className="sticky top-14 flex flex-col gap-1 px-4 py-8">
        <p className="mb-2 px-2 text-sm font-semibold">Components</p>

        {registryItems.map((item) => (
          <NavLink
            key={item.name}
            to={`/components/${item.name}`}
            className={({ isActive }) =>
              cn(
                'rounded-md px-2 py-1.5 text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground',
                isActive && 'bg-accent font-medium text-accent-foreground',
              )
            }
          >
            {item.title ?? item.name}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};
