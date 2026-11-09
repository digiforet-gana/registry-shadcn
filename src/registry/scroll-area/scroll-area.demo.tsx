import { Fragment } from 'react';
import { definePlayground } from '@/lib/playground';
import { Separator } from '../separator/separator';
import { ScrollArea, ScrollBar } from './scroll-area';

/* 세로 예시: 버전 태그 목록 */
const TAGS = Array.from({ length: 50 }).map((_, i, a) => `v1.2.0-beta.${a.length - i}`);
/* 가로 예시: 카드 목록 */
const CARDS = Array.from({ length: 10 }).map((_, i) => `Item ${i + 1}`);

/* 사이트 플레이그라운드 전용 파일 (registry.json에 등록하지 않으므로 배포되지 않음) */
export default definePlayground({
  component: 'ScrollArea',
  importPath: '@/components/ui/scroll-area',
  controls: {
    /* 스크롤 방향 (horizontal이면 ScrollBar orientation="horizontal" 추가) */
    orientation: { type: 'select', options: ['vertical', 'horizontal'], defaultValue: 'vertical' },
    /*
     * 스크롤바 표시 방식
     * hover: 마우스를 올렸을 때 / scroll: 스크롤하는 동안 / auto: 넘칠 때 항상 / always: 항상
     */
    type: { type: 'select', options: ['hover', 'scroll', 'auto', 'always'], defaultValue: 'hover' },
  },

  render: ({ orientation, type }) =>
    orientation === 'horizontal' ? (
      <ScrollArea type={type} className="w-96 rounded-md border whitespace-nowrap">
        <div className="flex w-max gap-4 p-4">
          {CARDS.map((card) => (
            <div
              key={card}
              className="flex size-32 items-center justify-center rounded-md bg-muted text-sm font-medium"
            >
              {card}
            </div>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    ) : (
      <ScrollArea type={type} className="h-72 w-48 rounded-md border">
        <div className="p-4">
          <h4 className="mb-4 text-sm leading-none font-medium">Tags</h4>
          {TAGS.map((tag) => (
            <Fragment key={tag}>
              <div className="text-sm">{tag}</div>
              <Separator className="my-2" />
            </Fragment>
          ))}
        </div>
      </ScrollArea>
    ),

  code: ({ orientation }, formatProps) => {
    const typeAttr = formatProps(['type']);

    if (orientation === 'horizontal') {
      return [
        `import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';`,
        '',
        `const cards = Array.from({ length: ${CARDS.length} }).map((_, i) => \`Item \${i + 1}\`);`,
        '',
        `<ScrollArea${typeAttr} className="w-96 rounded-md border whitespace-nowrap">`,
        '  <div className="flex w-max gap-4 p-4">',
        '    {cards.map((card) => (',
        '      <div key={card} className="flex size-32 items-center justify-center rounded-md bg-muted text-sm font-medium">',
        '        {card}',
        '      </div>',
        '    ))}',
        '  </div>',
        '  <ScrollBar orientation="horizontal" />',
        '</ScrollArea>',
      ].join('\n');
    }

    return [
      `import { Fragment } from 'react';`,
      `import { ScrollArea } from '@/components/ui/scroll-area';`,
      `import { Separator } from '@/components/ui/separator';`,
      '',
      `const tags = Array.from({ length: ${TAGS.length} }).map((_, i, a) => \`v1.2.0-beta.\${a.length - i}\`);`,
      '',
      `<ScrollArea${typeAttr} className="h-72 w-48 rounded-md border">`,
      '  <div className="p-4">',
      '    <h4 className="mb-4 text-sm leading-none font-medium">Tags</h4>',
      '    {tags.map((tag) => (',
      '      <Fragment key={tag}>',
      '        <div className="text-sm">{tag}</div>',
      '        <Separator className="my-2" />',
      '      </Fragment>',
      '    ))}',
      '  </div>',
      '</ScrollArea>',
    ].join('\n');
  },
});
