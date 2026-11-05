const HomePage = () => {
  return (
    <div className="flex flex-col gap-8">
      <section className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold">registry-shadcn</h1>
        <p className="text-muted-foreground">shadcn CLI로 설치할 수 있는 사내 컴포넌트 레지스트리입니다.</p>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold">Components</h2>
        <p className="rounded-lg border border-dashed p-8 text-center text-sm text-muted-foreground">
          컴포넌트 목록 영역
        </p>
      </section>
    </div>
  );
};

export default HomePage;
