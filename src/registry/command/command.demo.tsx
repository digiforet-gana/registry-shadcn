import { Fragment, useState } from 'react';
import {
  CalculatorIcon,
  CalendarIcon,
  CreditCardIcon,
  type LucideIcon,
  SettingsIcon,
  SmileIcon,
  UserIcon,
} from 'lucide-react';
import { definePlayground } from '@/lib/playground';
import { Button } from '../button/button';
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from './command';

type Item = { label: string; icon: LucideIcon; iconName: string; disabled?: boolean; shortcut?: string };

const GROUPS: { heading: string; items: Item[] }[] = [
  {
    heading: 'Suggestions',
    items: [
      { label: 'Calendar', icon: CalendarIcon, iconName: 'CalendarIcon' },
      { label: 'Search Emoji', icon: SmileIcon, iconName: 'SmileIcon' },
      { label: 'Calculator', icon: CalculatorIcon, iconName: 'CalculatorIcon', disabled: true },
    ],
  },
  {
    heading: 'Settings',
    items: [
      { label: 'Profile', icon: UserIcon, iconName: 'UserIcon', shortcut: '⌘P' },
      { label: 'Billing', icon: CreditCardIcon, iconName: 'CreditCardIcon', shortcut: '⌘B' },
      { label: 'Settings', icon: SettingsIcon, iconName: 'SettingsIcon', shortcut: '⌘S' },
    ],
  },
];

/* 검색 입력 + 항목 목록 (inline / dialog 공통) */
const CommandContent = ({ placeholder, shortcut }: { placeholder: string; shortcut: boolean }) => (
  <>
    <CommandInput placeholder={placeholder} />
    <CommandList>
      <CommandEmpty>No results found.</CommandEmpty>
      {GROUPS.map((group, index) => (
        <Fragment key={group.heading}>
          {index > 0 && <CommandSeparator />}
          <CommandGroup heading={group.heading}>
            {group.items.map(({ label, icon: Icon, disabled, shortcut: keys }) => (
              <CommandItem key={label} disabled={disabled}>
                <Icon />
                <span>{label}</span>
                {shortcut && keys && <CommandShortcut>{keys}</CommandShortcut>}
              </CommandItem>
            ))}
          </CommandGroup>
        </Fragment>
      ))}
    </CommandList>
  </>
);

/* dialog 모드에서 열림 상태를 관리하기 위한 미리보기 컴포넌트 */
const CommandDialogPreview = ({ placeholder, shortcut }: { placeholder: string; shortcut: boolean }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button variant="outline" onClick={() => setOpen(true)}>
        Open Command
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <Command>
          <CommandContent placeholder={placeholder} shortcut={shortcut} />
        </Command>
      </CommandDialog>
    </>
  );
};

/* 사이트 플레이그라운드 전용 파일 (registry.json에 등록하지 않으므로 배포되지 않음) */
export default definePlayground({
  component: 'Command',
  importPath: '@/components/ui/command',
  controls: {
    /* inline: 화면에 바로 표시, dialog: 버튼을 눌러 팝업으로 표시 (CommandDialog) */
    mode: { type: 'select', options: ['inline', 'dialog'], defaultValue: 'inline' },
    placeholder: { type: 'text', defaultValue: 'Type a command or search...' },
    /* 항목 우측 단축키 표시 (CommandShortcut) */
    shortcut: { type: 'boolean', defaultValue: true },
  },

  render: ({ mode, placeholder, shortcut }) =>
    mode === 'dialog' ? (
      <CommandDialogPreview placeholder={placeholder} shortcut={shortcut} />
    ) : (
      <Command className="max-w-sm rounded-lg border">
        <CommandContent placeholder={placeholder} shortcut={shortcut} />
      </Command>
    ),

  code: ({ mode, placeholder, shortcut }) => {
    const isDialog = mode === 'dialog';
    const indent = isDialog ? '    ' : '';
    const icons = GROUPS.flatMap((group) => group.items.map((item) => item.iconName)).sort();
    const components = [
      'Command',
      ...(isDialog ? ['CommandDialog'] : []),
      'CommandEmpty',
      'CommandGroup',
      'CommandInput',
      'CommandItem',
      'CommandList',
      'CommandSeparator',
      ...(shortcut ? ['CommandShortcut'] : []),
    ];
    const groups = GROUPS.flatMap((group, index) => [
      ...(index > 0 ? ['    <CommandSeparator />'] : []),
      `    <CommandGroup heading="${group.heading}">`,
      ...group.items.flatMap((item) => [
        `      <CommandItem${item.disabled ? ' disabled' : ''}>`,
        `        <${item.iconName} />`,
        `        <span>${item.label}</span>`,
        ...(shortcut && item.shortcut ? [`        <CommandShortcut>${item.shortcut}</CommandShortcut>`] : []),
        '      </CommandItem>',
      ]),
      '    </CommandGroup>',
    ]);
    const command = [
      isDialog ? '<Command>' : '<Command className="rounded-lg border">',
      `  <CommandInput placeholder="${placeholder}" />`,
      '  <CommandList>',
      '    <CommandEmpty>No results found.</CommandEmpty>',
      ...groups,
      '  </CommandList>',
      '</Command>',
    ].map((line) => indent + line);

    return [
      ...(isDialog ? [`import { useState } from 'react';`] : []),
      `import { ${icons.join(', ')} } from 'lucide-react';`,
      ...(isDialog ? [`import { Button } from '@/components/ui/button';`] : []),
      `import {`,
      ...components.map((name) => `  ${name},`),
      `} from '@/components/ui/command';`,
      '',
      ...(isDialog
        ? [
            'const [open, setOpen] = useState(false);',
            '',
            '<>',
            '  <Button variant="outline" onClick={() => setOpen(true)}>',
            '    Open Command',
            '  </Button>',
            '  <CommandDialog open={open} onOpenChange={setOpen}>',
            ...command,
            '  </CommandDialog>',
            '</>',
          ]
        : command),
    ].join('\n');
  },
});
