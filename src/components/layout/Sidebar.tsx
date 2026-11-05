export const Sidebar = () => {
  return (
    <aside className="hidden w-60 shrink-0 border-r md:block">
      <nav className="sticky top-14 flex flex-col gap-1 px-4 py-8">
        <p className="mb-2 px-2 text-sm font-semibold">Components</p>
        <p className="px-2 text-sm text-muted-foreground">컴포넌트 목록 영역</p>
      </nav>
    </aside>
  );
};
