import { definePlayground } from '@/lib/playground';
import { Avatar, AvatarFallback, AvatarImage } from '../avatar/avatar';
import { Button } from '../button/button';
import { HoverCard, HoverCardContent, HoverCardTrigger } from './hover-card';

/* 사이트 플레이그라운드 전용 파일 (registry.json에 등록하지 않으므로 배포되지 않음) */
export default definePlayground({
  component: 'HoverCard',
  importPath: '@/components/ui/hover-card',
  controls: {
    /* 카드가 나타나는 방향 / 정렬 */
    side: { type: 'select', options: ['top', 'right', 'bottom', 'left'], defaultValue: 'bottom' },
    align: { type: 'select', options: ['start', 'center', 'end'], defaultValue: 'center' },
    /* 마우스를 올린 뒤 열리기까지 / 벗어난 뒤 닫히기까지 대기 시간 (ms) */
    openDelay: { type: 'select', options: ['0', '300', '700'], defaultValue: '700' },
    closeDelay: { type: 'select', options: ['0', '300', '700'], defaultValue: '300' },
  },

  render: ({ side, align, openDelay, closeDelay }) => (
    <HoverCard openDelay={Number(openDelay)} closeDelay={Number(closeDelay)}>
      <HoverCardTrigger asChild>
        <Button variant="link">@nextjs</Button>
      </HoverCardTrigger>
      <HoverCardContent side={side} align={align} className="w-80">
        <div className="flex justify-between gap-4">
          <Avatar>
            <AvatarImage src="https://github.com/vercel.png" />
            <AvatarFallback>VC</AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-1">
            <h4 className="text-sm font-semibold">@nextjs</h4>
            <p className="text-sm">The React Framework – created and maintained by @vercel.</p>
            <div className="text-xs text-muted-foreground">Joined December 2021</div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  ),

  code: ({ openDelay, closeDelay }, formatProps) => {
    /* openDelay / closeDelay는 숫자 prop이므로 직접 출력 (기본값 700 / 300) */
    const delayAttrs = `${openDelay === '700' ? '' : ` openDelay={${openDelay}}`}${closeDelay === '300' ? '' : ` closeDelay={${closeDelay}}`}`;

    return [
      `import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';`,
      `import { Button } from '@/components/ui/button';`,
      `import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';`,
      '',
      `<HoverCard${delayAttrs}>`,
      '  <HoverCardTrigger asChild>',
      '    <Button variant="link">@nextjs</Button>',
      '  </HoverCardTrigger>',
      `  <HoverCardContent${formatProps(['side', 'align'])} className="w-80">`,
      '    <div className="flex justify-between gap-4">',
      '      <Avatar>',
      '        <AvatarImage src="https://github.com/vercel.png" />',
      '        <AvatarFallback>VC</AvatarFallback>',
      '      </Avatar>',
      '      <div className="flex flex-col gap-1">',
      '        <h4 className="text-sm font-semibold">@nextjs</h4>',
      '        <p className="text-sm">The React Framework – created and maintained by @vercel.</p>',
      '        <div className="text-xs text-muted-foreground">Joined December 2021</div>',
      '      </div>',
      '    </div>',
      '  </HoverCardContent>',
      '</HoverCard>',
    ].join('\n');
  },
});
