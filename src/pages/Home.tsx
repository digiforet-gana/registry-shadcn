import { Link } from 'react-router';
import { registryItems } from '@/lib/registry';

const HomePage = () => {
  return (
    <div className="flex flex-col gap-8">
      <section className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold">registry-shadcn</h1>
        <p className="text-muted-foreground">shadcn CLI로 설치할 수 있는 사내 컴포넌트 레지스트리입니다.</p>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold">Components</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {registryItems.map((item) => (
            <Link
              key={item.name}
              to={`/components/${item.name}`}
              className="flex flex-col gap-1 rounded-lg border p-4 transition-colors hover:bg-accent"
            >
              <p className="font-medium">{item.title ?? item.name}</p>
              {item.description && <p className="text-sm text-muted-foreground">{item.description}</p>}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
