import { PlusIcon } from 'lucide-react';
import { definePlayground } from '@/lib/playground';
import { Button } from '../button/button';
import { Kbd } from '../kbd/kbd';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './tooltip';

/* 사이트 플레이그라운드 전용 파일 (registry.json에 등록하지 않으므로 배포되지 않음) */
export default definePlayground({
  component: 'Tooltip',
  importPath: '@/components/ui/tooltip',
  controls: {
    /* 트리거 기준으로 툴팁이 표시될 방향 (공간이 부족하면 반대쪽으로 자동 전환) */
    side: { type: 'select', options: ['top', 'right', 'bottom', 'left'], defaultValue: 'top' },
    /* side 방향 안에서 트리거 기준 정렬 위치 */
    align: { type: 'select', options: ['start', 'center', 'end'], defaultValue: 'center' },
    /* 단축키 표시 (TooltipContent 안의 Kbd는 툴팁 색에 맞춰 스타일 적용) */
    kbd: { type: 'boolean', defaultValue: false },
    content: { type: 'text', defaultValue: 'Add to library' },
  },

  /* 툴팁은 글자가 없는 아이콘 버튼의 기능을 설명할 때 주로 사용 */
  render: ({ side, align, kbd, content }) => (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline" size="icon" aria-label={content}>
            <PlusIcon />
          </Button>
        </TooltipTrigger>
        <TooltipContent side={side} align={align}>
          <p>{content}</p>
          {kbd && <Kbd>A</Kbd>}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ),

  code: ({ kbd, content }, formatProps) =>
    [
      `import { PlusIcon } from 'lucide-react';`,
      `import { Button } from '@/components/ui/button';`,
      ...(kbd ? [`import { Kbd } from '@/components/ui/kbd';`] : []),
      `import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';`,
      '',
      '{/* TooltipProvider는 보통 앱 최상단에 한 번만 감싸서 사용 */}',
      '<TooltipProvider>',
      '  <Tooltip>',
      '    <TooltipTrigger asChild>',
      `      <Button variant="outline" size="icon" aria-label="${content}">`,
      '        <PlusIcon />',
      '      </Button>',
      '    </TooltipTrigger>',
      `    <TooltipContent${formatProps(['side', 'align'])}>`,
      `      <p>${content}</p>`,
      ...(kbd ? ['      <Kbd>A</Kbd>'] : []),
      '    </TooltipContent>',
      '  </Tooltip>',
      '</TooltipProvider>',
    ].join('\n'),
});
