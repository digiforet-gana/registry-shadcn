import { definePlayground } from '@/lib/playground';
import { Button } from '../button/button';
import { Popover, PopoverContent, PopoverDescription, PopoverHeader, PopoverTitle, PopoverTrigger } from './popover';

/* 사이트 플레이그라운드 전용 파일 (registry.json에 등록하지 않으므로 배포되지 않음) */
export default definePlayground({
  component: 'Popover',
  importPath: '@/components/ui/popover',
  controls: {
    /* 트리거 기준으로 팝오버가 표시될 방향 (공간이 부족하면 반대쪽으로 자동 전환) */
    side: { type: 'select', options: ['top', 'right', 'bottom', 'left'], defaultValue: 'bottom' },
    /* side 방향에 수직인 축 기준 정렬 (예: side가 bottom이면 좌측, 가운데, 우측 정렬) */
    align: { type: 'select', options: ['start', 'center', 'end'], defaultValue: 'center' },
    /* 트리거와 팝오버 사이 간격 (px, 기본값 4) */
    sideOffset: { type: 'select', options: ['0', '4', '8', '16'], defaultValue: '4' },
    title: { type: 'text', defaultValue: 'Popover Title' },
    description: { type: 'text', defaultValue: 'Popover Description' },
  },

  render: ({ side, align, sideOffset, title, description }) => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Open Popover</Button>
      </PopoverTrigger>
      <PopoverContent side={side} align={align} sideOffset={Number(sideOffset)}>
        <PopoverHeader>
          <PopoverTitle>{title}</PopoverTitle>
          <PopoverDescription>{description}</PopoverDescription>
        </PopoverHeader>
      </PopoverContent>
    </Popover>
  ),

  code: ({ sideOffset, title, description }, formatProps) => {
    /* sideOffset은 숫자이므로 중괄호로 표시 (기본값이면 생략) */
    const sideOffsetAttr = sideOffset === '4' ? '' : ` sideOffset={${sideOffset}}`;

    return [
      `import { Button } from '@/components/ui/button';`,
      `import {`,
      `  Popover,`,
      `  PopoverContent,`,
      `  PopoverDescription,`,
      `  PopoverHeader,`,
      `  PopoverTitle,`,
      `  PopoverTrigger,`,
      `} from '@/components/ui/popover';`,
      '',
      '<Popover>',
      '  <PopoverTrigger asChild>',
      '    <Button variant="outline">Open Popover</Button>',
      '  </PopoverTrigger>',
      `  <PopoverContent${formatProps(['side', 'align'])}${sideOffsetAttr}>`,
      '    <PopoverHeader>',
      `      <PopoverTitle>${title}</PopoverTitle>`,
      `      <PopoverDescription>${description}</PopoverDescription>`,
      '    </PopoverHeader>',
      '  </PopoverContent>',
      '</Popover>',
    ].join('\n');
  },
});
