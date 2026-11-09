import { definePlayground } from '@/lib/playground';
import { Button } from '../button/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from './dropdown-menu';

const ITEMS = [
  { label: 'Profile', shortcut: '⇧⌘P' },
  { label: 'Billing', shortcut: '⌘B' },
  { label: 'Settings', shortcut: '⌘S' },
];

/* 사이트 플레이그라운드 전용 파일 (registry.json에 등록하지 않으므로 배포되지 않음) */
export default definePlayground({
  component: 'DropdownMenu',
  importPath: '@/components/ui/dropdown-menu',
  controls: {
    /* 트리거 기준으로 메뉴가 표시될 방향 (공간이 부족하면 반대쪽으로 자동 전환) */
    side: { type: 'select', options: ['top', 'right', 'bottom', 'left'], defaultValue: 'bottom' },
    /* side 방향에 수직인 축 기준 정렬 (Popover와 달리 기본값이 start) */
    align: { type: 'select', options: ['start', 'center', 'end'], defaultValue: 'start' },
    /* 항목 오른쪽 단축키 표시 */
    shortcut: { type: 'boolean', defaultValue: true },
  },

  render: ({ side, align, shortcut }) => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Open Menu</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent side={side} align={align} className="w-48">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuGroup>
          {ITEMS.map((item) => (
            <DropdownMenuItem key={item.label}>
              {item.label}
              {shortcut && <DropdownMenuShortcut>{item.shortcut}</DropdownMenuShortcut>}
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Invite Users</DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuItem>Email</DropdownMenuItem>
            <DropdownMenuItem>Message</DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive">Log Out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),

  code: ({ shortcut }, formatProps) => {
    const items = ITEMS.map((item) =>
      shortcut
        ? `      <DropdownMenuItem>\n        ${item.label}\n        <DropdownMenuShortcut>${item.shortcut}</DropdownMenuShortcut>\n      </DropdownMenuItem>`
        : `      <DropdownMenuItem>${item.label}</DropdownMenuItem>`,
    );

    return [
      `import { Button } from '@/components/ui/button';`,
      `import {`,
      `  DropdownMenu,`,
      `  DropdownMenuContent,`,
      `  DropdownMenuGroup,`,
      `  DropdownMenuItem,`,
      `  DropdownMenuLabel,`,
      `  DropdownMenuSeparator,`,
      ...(shortcut ? [`  DropdownMenuShortcut,`] : []),
      `  DropdownMenuSub,`,
      `  DropdownMenuSubContent,`,
      `  DropdownMenuSubTrigger,`,
      `  DropdownMenuTrigger,`,
      `} from '@/components/ui/dropdown-menu';`,
      '',
      '<DropdownMenu>',
      '  <DropdownMenuTrigger asChild>',
      '    <Button variant="outline">Open Menu</Button>',
      '  </DropdownMenuTrigger>',
      `  <DropdownMenuContent${formatProps(['side', 'align'])} className="w-48">`,
      '    <DropdownMenuLabel>My Account</DropdownMenuLabel>',
      '    <DropdownMenuGroup>',
      ...items,
      '    </DropdownMenuGroup>',
      '    <DropdownMenuSeparator />',
      '    <DropdownMenuSub>',
      '      <DropdownMenuSubTrigger>Invite Users</DropdownMenuSubTrigger>',
      '      <DropdownMenuSubContent>',
      '        <DropdownMenuItem>Email</DropdownMenuItem>',
      '        <DropdownMenuItem>Message</DropdownMenuItem>',
      '      </DropdownMenuSubContent>',
      '    </DropdownMenuSub>',
      '    <DropdownMenuSeparator />',
      '    <DropdownMenuItem variant="destructive">Log Out</DropdownMenuItem>',
      '  </DropdownMenuContent>',
      '</DropdownMenu>',
    ].join('\n');
  },
});
