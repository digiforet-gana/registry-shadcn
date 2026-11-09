import type { ReactNode } from 'react';
import { definePlayground } from '@/lib/playground';
import { Card, CardContent, CardHeader } from '../card/card';
import { Skeleton } from './skeleton';

const TABLE_ROWS = 5;

/* 공식 문서의 예시 (preview: 미리보기, code: Usage 코드, imports: 추가로 필요한 import) */
const EXAMPLES: Record<string, { preview: ReactNode; code: string[]; imports?: string[] }> = {
  /* 프로필 (공식 메인 데모) */
  profile: {
    preview: (
      <div className="flex items-center gap-4">
        <Skeleton className="size-12 shrink-0 rounded-full" />
        <div className="grid gap-2">
          <Skeleton className="h-4 w-62.5" />
          <Skeleton className="h-4 w-50" />
        </div>
      </div>
    ),
    code: [
      '<div className="flex items-center gap-4">',
      '  <Skeleton className="size-12 shrink-0 rounded-full" />',
      '  <div className="grid gap-2">',
      '    <Skeleton className="h-4 w-62.5" />',
      '    <Skeleton className="h-4 w-50" />',
      '  </div>',
      '</div>',
    ],
  },
  avatar: {
    preview: (
      <div className="flex w-fit items-center gap-4">
        <Skeleton className="size-10 shrink-0 rounded-full" />
        <div className="grid gap-2">
          <Skeleton className="h-4 w-37.5" />
          <Skeleton className="h-4 w-25" />
        </div>
      </div>
    ),
    code: [
      '<div className="flex w-fit items-center gap-4">',
      '  <Skeleton className="size-10 shrink-0 rounded-full" />',
      '  <div className="grid gap-2">',
      '    <Skeleton className="h-4 w-37.5" />',
      '    <Skeleton className="h-4 w-25" />',
      '  </div>',
      '</div>',
    ],
  },
  card: {
    preview: (
      <Card className="w-full max-w-xs">
        <CardHeader>
          <Skeleton className="h-4 w-2/3" />
          <Skeleton className="h-4 w-1/2" />
        </CardHeader>
        <CardContent>
          <Skeleton className="aspect-video w-full" />
        </CardContent>
      </Card>
    ),
    code: [
      '<Card className="w-full max-w-xs">',
      '  <CardHeader>',
      '    <Skeleton className="h-4 w-2/3" />',
      '    <Skeleton className="h-4 w-1/2" />',
      '  </CardHeader>',
      '  <CardContent>',
      '    <Skeleton className="aspect-video w-full" />',
      '  </CardContent>',
      '</Card>',
    ],
    imports: [`import { Card, CardContent, CardHeader } from '@/components/ui/card';`],
  },
  text: {
    preview: (
      <div className="flex w-full max-w-xs flex-col gap-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div>
    ),
    code: [
      '<div className="flex w-full max-w-xs flex-col gap-2">',
      '  <Skeleton className="h-4 w-full" />',
      '  <Skeleton className="h-4 w-full" />',
      '  <Skeleton className="h-4 w-3/4" />',
      '</div>',
    ],
  },
  form: {
    preview: (
      <div className="flex w-full max-w-xs flex-col gap-7">
        <div className="flex flex-col gap-3">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-8 w-full" />
        </div>
        <div className="flex flex-col gap-3">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-8 w-full" />
        </div>
        <Skeleton className="h-8 w-24" />
      </div>
    ),
    code: [
      '<div className="flex w-full max-w-xs flex-col gap-7">',
      '  <div className="flex flex-col gap-3">',
      '    <Skeleton className="h-4 w-20" />',
      '    <Skeleton className="h-8 w-full" />',
      '  </div>',
      '  <div className="flex flex-col gap-3">',
      '    <Skeleton className="h-4 w-24" />',
      '    <Skeleton className="h-8 w-full" />',
      '  </div>',
      '  <Skeleton className="h-8 w-24" />',
      '</div>',
    ],
  },
  table: {
    preview: (
      <div className="flex w-full max-w-sm flex-col gap-2">
        {Array.from({ length: TABLE_ROWS }).map((_, index) => (
          <div key={index} className="flex gap-4">
            <Skeleton className="h-4 flex-1" />
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-20" />
          </div>
        ))}
      </div>
    ),
    code: [
      '<div className="flex w-full max-w-sm flex-col gap-2">',
      `  {Array.from({ length: ${TABLE_ROWS} }).map((_, index) => (`,
      '    <div key={index} className="flex gap-4">',
      '      <Skeleton className="h-4 flex-1" />',
      '      <Skeleton className="h-4 w-24" />',
      '      <Skeleton className="h-4 w-20" />',
      '    </div>',
      '  ))}',
      '</div>',
    ],
  },
};

/* 사이트 플레이그라운드 전용 파일 (registry.json에 등록하지 않으므로 배포되지 않음) */
export default definePlayground({
  component: 'Skeleton',
  importPath: '@/components/ui/skeleton',
  controls: {
    /* Skeleton 자체에는 prop이 없으므로 className으로 모양을 만든 공식 예시를 선택 */
    example: {
      type: 'select',
      options: ['profile', 'avatar', 'card', 'text', 'form', 'table'],
      defaultValue: 'profile',
    },
  },

  render: ({ example }) => EXAMPLES[example].preview,

  code: ({ example }) => {
    const { code, imports = [] } = EXAMPLES[example];
    return [...imports, `import { Skeleton } from '@/components/ui/skeleton';`, '', ...code].join('\n');
  },
});
