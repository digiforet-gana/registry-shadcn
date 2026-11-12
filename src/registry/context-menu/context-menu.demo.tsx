import { useState } from 'react';
import { definePlayground } from '@/lib/playground';
import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from './context-menu';

const ITEMS = [
  { label: 'Back', shortcut: '⌘[' },
  { label: 'Forward', shortcut: '⌘]', disabled: true },
  { label: 'Reload', shortcut: '⌘R' },
];
const SUB_ITEMS = ['Save Page...', 'Create Shortcut...', 'Name Window...'];
const PEOPLE = ['Pedro Duarte', 'Colm Tuite'];

type Sections = { inset: boolean; shortcut: boolean; submenu: boolean; checkbox: boolean; radio: boolean };

/* 체크 / 라디오 항목의 선택 상태를 관리하기 위한 미리보기 컴포넌트 */
const ContextMenuPreview = ({ inset, shortcut, submenu, checkbox, radio }: Sections) => {
  const [showBookmarks, setShowBookmarks] = useState(true);
  const [showFullUrls, setShowFullUrls] = useState(false);
  const [person, setPerson] = useState(PEOPLE[0]);

  return (
    <ContextMenu>
      <ContextMenuTrigger className="flex h-36 w-72 items-center justify-center rounded-lg border border-dashed text-sm">
        Right click here
      </ContextMenuTrigger>
      <ContextMenuContent className="w-52">
        {ITEMS.map((item) => (
          <ContextMenuItem key={item.label} inset={inset} disabled={item.disabled} onSelect={() => {}}>
            {item.label}
            {shortcut && <ContextMenuShortcut>{item.shortcut}</ContextMenuShortcut>}
          </ContextMenuItem>
        ))}
        {submenu && (
          <ContextMenuSub>
            <ContextMenuSubTrigger inset={inset}>More Tools</ContextMenuSubTrigger>
            <ContextMenuSubContent className="w-44">
              {SUB_ITEMS.map((item) => (
                <ContextMenuItem key={item} onSelect={() => {}}>
                  {item}
                </ContextMenuItem>
              ))}
              <ContextMenuSeparator />
              <ContextMenuItem variant="destructive" onSelect={() => {}}>
                Delete
              </ContextMenuItem>
            </ContextMenuSubContent>
          </ContextMenuSub>
        )}
        {checkbox && (
          <>
            <ContextMenuSeparator />
            <ContextMenuCheckboxItem checked={showBookmarks} onCheckedChange={setShowBookmarks}>
              Show Bookmarks
            </ContextMenuCheckboxItem>
            <ContextMenuCheckboxItem checked={showFullUrls} onCheckedChange={setShowFullUrls}>
              Show Full URLs
            </ContextMenuCheckboxItem>
          </>
        )}
        {radio && (
          <>
            <ContextMenuSeparator />
            <ContextMenuRadioGroup value={person} onValueChange={setPerson}>
              <ContextMenuLabel inset={inset}>People</ContextMenuLabel>
              {PEOPLE.map((name) => (
                <ContextMenuRadioItem key={name} value={name}>
                  {name}
                </ContextMenuRadioItem>
              ))}
            </ContextMenuRadioGroup>
          </>
        )}
      </ContextMenuContent>
    </ContextMenu>
  );
};

/* 사이트 플레이그라운드 전용 파일 (registry.json에 등록하지 않으므로 배포되지 않음) */
export default definePlayground({
  component: 'ContextMenu',
  importPath: '@/components/ui/context-menu',
  controls: {
    /* 항목 / 하위 메뉴 트리거 / 라벨의 왼쪽 들여쓰기 (inset prop) */
    inset: { type: 'boolean', defaultValue: true },
    /* 항목 우측 단축키 표시 (ContextMenuShortcut) */
    shortcut: { type: 'boolean', defaultValue: true },
    /* 하위 메뉴 (ContextMenuSub) */
    submenu: { type: 'boolean', defaultValue: true },
    /* 체크 항목 (ContextMenuCheckboxItem) */
    checkbox: { type: 'boolean', defaultValue: true },
    /* 라디오 항목 (ContextMenuRadioGroup / ContextMenuRadioItem) */
    radio: { type: 'boolean', defaultValue: true },
  },

  render: (sections) => <ContextMenuPreview {...sections} />,

  code: ({ inset, shortcut, submenu, checkbox, radio }) => {
    const insetProp = inset ? ' inset' : '';
    const components = [
      'ContextMenu',
      ...(checkbox ? ['ContextMenuCheckboxItem'] : []),
      'ContextMenuContent',
      'ContextMenuItem',
      ...(radio ? ['ContextMenuLabel', 'ContextMenuRadioGroup', 'ContextMenuRadioItem'] : []),
      ...(submenu || checkbox || radio ? ['ContextMenuSeparator'] : []),
      ...(shortcut ? ['ContextMenuShortcut'] : []),
      ...(submenu ? ['ContextMenuSub', 'ContextMenuSubContent', 'ContextMenuSubTrigger'] : []),
      'ContextMenuTrigger',
    ];
    const items = ITEMS.flatMap((item) => {
      const props = `${insetProp}${item.disabled ? ' disabled' : ''} onSelect={() => {}}`;

      return shortcut
        ? [
            `    <ContextMenuItem${props}>`,
            `      ${item.label}`,
            `      <ContextMenuShortcut>${item.shortcut}</ContextMenuShortcut>`,
            '    </ContextMenuItem>',
          ]
        : [`    <ContextMenuItem${props}>${item.label}</ContextMenuItem>`];
    });

    return [
      `import {`,
      ...components.map((name) => `  ${name},`),
      `} from '@/components/ui/context-menu';`,
      '',
      '<ContextMenu>',
      '  <ContextMenuTrigger className="flex h-36 w-72 items-center justify-center rounded-lg border border-dashed text-sm">',
      '    Right click here',
      '  </ContextMenuTrigger>',
      '  <ContextMenuContent className="w-52">',
      ...items,
      ...(submenu
        ? [
            '    <ContextMenuSub>',
            `      <ContextMenuSubTrigger${insetProp}>More Tools</ContextMenuSubTrigger>`,
            '      <ContextMenuSubContent className="w-44">',
            ...SUB_ITEMS.map((item) => `        <ContextMenuItem onSelect={() => {}}>${item}</ContextMenuItem>`),
            '        <ContextMenuSeparator />',
            '        <ContextMenuItem variant="destructive" onSelect={() => {}}>Delete</ContextMenuItem>',
            '      </ContextMenuSubContent>',
            '    </ContextMenuSub>',
          ]
        : []),
      ...(checkbox
        ? [
            '    <ContextMenuSeparator />',
            '    <ContextMenuCheckboxItem checked>Show Bookmarks</ContextMenuCheckboxItem>',
            '    <ContextMenuCheckboxItem>Show Full URLs</ContextMenuCheckboxItem>',
          ]
        : []),
      ...(radio
        ? [
            '    <ContextMenuSeparator />',
            `    <ContextMenuRadioGroup value="${PEOPLE[0]}">`,
            `      <ContextMenuLabel${insetProp}>People</ContextMenuLabel>`,
            ...PEOPLE.map((name) => `      <ContextMenuRadioItem value="${name}">${name}</ContextMenuRadioItem>`),
            '    </ContextMenuRadioGroup>',
          ]
        : []),
      '  </ContextMenuContent>',
      '</ContextMenu>',
    ].join('\n');
  },
});
