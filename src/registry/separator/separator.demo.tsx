import { definePlayground } from '@/lib/playground';
import { Separator } from './separator';

/* 사이트 플레이그라운드 전용 파일 (registry.json에 등록하지 않으므로 배포되지 않음) */
export default definePlayground({
  component: 'Separator',
  importPath: '@/components/ui/separator',
  controls: {
    orientation: { type: 'select', options: ['horizontal', 'vertical'], defaultValue: 'horizontal' },
  },

  /* 구분선만으로는 확인이 어려우므로 방향에 맞게 앞뒤 콘텐츠와 함께 표시 */
  render: ({ orientation }) => {
    if (orientation === 'vertical') {
      return (
        <div className="flex h-5 items-center gap-4 text-sm">
          <span>Blog</span>
          <Separator orientation="vertical" />
          <span>Docs</span>
          <Separator orientation="vertical" />
          <span>Source</span>
        </div>
      );
    }

    return (
      <div className="flex w-full max-w-sm flex-col gap-4 text-sm">
        <span>Content Above</span>
        <Separator />
        <span>Content Below</span>
      </div>
    );
  },

  code: ({ orientation }) => {
    const importCode = `import { Separator } from '@/components/ui/separator';`;

    if (orientation === 'vertical') {
      return [
        importCode,
        '',
        '<div className="flex h-5 items-center gap-4 text-sm">',
        '  <span>Blog</span>',
        '  <Separator orientation="vertical" />',
        '  <span>Docs</span>',
        '  <Separator orientation="vertical" />',
        '  <span>Source</span>',
        '</div>',
      ].join('\n');
    }

    return [
      importCode,
      '',
      '<div className="flex flex-col gap-4 text-sm">',
      '  <span>Content Above</span>',
      '  <Separator />',
      '  <span>Content Below</span>',
      '</div>',
    ].join('\n');
  },
});
