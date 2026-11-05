import { useParams } from 'react-router';

const ComponentPage = () => {
  const { name } = useParams();

  return (
    <div className="flex flex-col gap-10">
      <section className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold">{name}</h1>
        <p className="text-muted-foreground">컴포넌트 설명 영역</p>
      </section>

      {/* 미리보기 + Props 컨트롤 (플레이그라운드) */}
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold">Playground</h2>

        <div className="grid overflow-hidden rounded-lg border lg:grid-cols-[1fr_16rem]">
          <div className="flex min-h-80 items-center justify-center p-8">
            <p className="text-sm text-muted-foreground">미리보기 영역</p>
          </div>
          <div className="border-t p-4 lg:border-t-0 lg:border-l">
            <p className="text-sm font-semibold">Props</p>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold">Installation</h2>
        <p className="text-sm text-muted-foreground">설치 명령어 영역</p>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold">Usage</h2>
        <p className="text-sm text-muted-foreground">사용 예시 영역</p>
      </section>
    </div>
  );
};

export default ComponentPage;
