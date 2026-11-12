import { useState } from 'react';
import { definePlayground } from '@/lib/playground';
import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from './menubar';

const PROFILES = ['Andy', 'Benoit', 'Luis'];

type Side = 'top' | 'right' | 'bottom' | 'left';
type Align = 'start' | 'center' | 'end';

interface MenubarPreviewProps {
  shortcut: boolean;
  side: Side;
  align: Align;
}

/* 체크 / 라디오 항목의 선택 상태를 관리하기 위한 미리보기 컴포넌트 */
const MenubarPreview = ({ shortcut, side, align }: MenubarPreviewProps) => {
  const [showBookmarks, setShowBookmarks] = useState(false);
  const [showFullUrls, setShowFullUrls] = useState(true);
  const [profile, setProfile] = useState('Benoit');

  const keys = (value: string) => shortcut && <MenubarShortcut>{value}</MenubarShortcut>;

  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>File</MenubarTrigger>
        <MenubarContent side={side} align={align}>
          <MenubarItem onSelect={() => {}}>New Tab {keys('⌘T')}</MenubarItem>
          <MenubarItem onSelect={() => {}}>New Window {keys('⌘N')}</MenubarItem>
          <MenubarItem disabled>New Incognito Window</MenubarItem>
          <MenubarSeparator />
          <MenubarSub>
            <MenubarSubTrigger>Share</MenubarSubTrigger>
            <MenubarSubContent>
              <MenubarItem onSelect={() => {}}>Email link</MenubarItem>
              <MenubarItem onSelect={() => {}}>Messages</MenubarItem>
              <MenubarItem onSelect={() => {}}>Notes</MenubarItem>
            </MenubarSubContent>
          </MenubarSub>
          <MenubarSeparator />
          <MenubarItem onSelect={() => {}}>Print... {keys('⌘P')}</MenubarItem>
          <MenubarSeparator />
          <MenubarItem variant="destructive" onSelect={() => {}}>
            Close Window {keys('⇧⌘W')}
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Edit</MenubarTrigger>
        <MenubarContent side={side} align={align}>
          <MenubarItem onSelect={() => {}}>Undo {keys('⌘Z')}</MenubarItem>
          <MenubarItem onSelect={() => {}}>Redo {keys('⇧⌘Z')}</MenubarItem>
          <MenubarSeparator />
          <MenubarItem onSelect={() => {}}>Cut</MenubarItem>
          <MenubarItem onSelect={() => {}}>Copy</MenubarItem>
          <MenubarItem onSelect={() => {}}>Paste</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>View</MenubarTrigger>
        <MenubarContent side={side} align={align}>
          <MenubarCheckboxItem checked={showBookmarks} onCheckedChange={setShowBookmarks}>
            Always Show Bookmarks Bar
          </MenubarCheckboxItem>
          <MenubarCheckboxItem checked={showFullUrls} onCheckedChange={setShowFullUrls}>
            Always Show Full URLs
          </MenubarCheckboxItem>
          <MenubarSeparator />
          <MenubarItem inset onSelect={() => {}}>
            Reload {keys('⌘R')}
          </MenubarItem>
          <MenubarItem inset disabled>
            Force Reload {keys('⇧⌘R')}
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Profiles</MenubarTrigger>
        <MenubarContent side={side} align={align}>
          <MenubarRadioGroup value={profile} onValueChange={setProfile}>
            {PROFILES.map((name) => (
              <MenubarRadioItem key={name} value={name}>
                {name}
              </MenubarRadioItem>
            ))}
          </MenubarRadioGroup>
          <MenubarSeparator />
          <MenubarItem inset onSelect={() => {}}>
            Edit...
          </MenubarItem>
          <MenubarItem inset onSelect={() => {}}>
            Add Profile...
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
};

/* 사이트 플레이그라운드 전용 파일 (registry.json에 등록하지 않으므로 배포되지 않음) */
export default definePlayground({
  component: 'Menubar',
  importPath: '@/components/ui/menubar',
  controls: {
    /* 항목 우측 단축키 표시 (MenubarShortcut) */
    shortcut: { type: 'boolean', defaultValue: true },
    /* 메뉴가 나타나는 방향 / 정렬 (MenubarContent) */
    side: { type: 'select', options: ['top', 'right', 'bottom', 'left'], defaultValue: 'bottom' },
    align: { type: 'select', options: ['start', 'center', 'end'], defaultValue: 'start' },
  },

  render: ({ shortcut, side, align }) => <MenubarPreview shortcut={shortcut} side={side} align={align} />,

  /* 구조 확인용으로 File / View 메뉴만 표시 */
  code: ({ shortcut }, formatProps) => {
    const contentAttrs = formatProps(['side', 'align']);
    /* 일반 항목은 onSelect로 선택 동작을 연결 */
    const item = (label: string, keys: string, attrs = '') =>
      shortcut
        ? [
            `      <MenubarItem${attrs} onSelect={() => {}}>`,
            `        ${label} <MenubarShortcut>${keys}</MenubarShortcut>`,
            '      </MenubarItem>',
          ]
        : [`      <MenubarItem${attrs} onSelect={() => {}}>${label}</MenubarItem>`];

    return [
      'import {',
      '  Menubar,',
      '  MenubarCheckboxItem,',
      '  MenubarContent,',
      '  MenubarItem,',
      '  MenubarMenu,',
      '  MenubarSeparator,',
      ...(shortcut ? ['  MenubarShortcut,'] : []),
      '  MenubarSub,',
      '  MenubarSubContent,',
      '  MenubarSubTrigger,',
      '  MenubarTrigger,',
      `} from '@/components/ui/menubar';`,
      '',
      '<Menubar>',
      '  <MenubarMenu>',
      '    <MenubarTrigger>File</MenubarTrigger>',
      `    <MenubarContent${contentAttrs}>`,
      ...item('New Tab', '⌘T'),
      '      <MenubarItem disabled>New Incognito Window</MenubarItem>',
      '      <MenubarSeparator />',
      '      <MenubarSub>',
      '        <MenubarSubTrigger>Share</MenubarSubTrigger>',
      '        <MenubarSubContent>',
      '          <MenubarItem onSelect={() => {}}>Email link</MenubarItem>',
      '          <MenubarItem onSelect={() => {}}>Messages</MenubarItem>',
      '        </MenubarSubContent>',
      '      </MenubarSub>',
      '      <MenubarSeparator />',
      ...item('Close Window', '⇧⌘W', ' variant="destructive"'),
      '    </MenubarContent>',
      '  </MenubarMenu>',
      '  <MenubarMenu>',
      '    <MenubarTrigger>View</MenubarTrigger>',
      `    <MenubarContent${contentAttrs}>`,
      '      <MenubarCheckboxItem checked>Always Show Full URLs</MenubarCheckboxItem>',
      '      <MenubarSeparator />',
      ...item('Reload', '⌘R', ' inset'),
      '    </MenubarContent>',
      '  </MenubarMenu>',
      '</Menubar>',
    ].join('\n');
  },
});
