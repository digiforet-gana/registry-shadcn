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

/* 체크 / 라디오 항목의 선택 상태를 관리하기 위한 미리보기 컴포넌트 */
const MenubarPreview = ({ shortcut }: { shortcut: boolean }) => {
  const [showBookmarks, setShowBookmarks] = useState(false);
  const [showFullUrls, setShowFullUrls] = useState(true);
  const [profile, setProfile] = useState('Benoit');

  const keys = (value: string) => shortcut && <MenubarShortcut>{value}</MenubarShortcut>;

  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>File</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>New Tab {keys('⌘T')}</MenubarItem>
          <MenubarItem>New Window {keys('⌘N')}</MenubarItem>
          <MenubarItem disabled>New Incognito Window</MenubarItem>
          <MenubarSeparator />
          <MenubarSub>
            <MenubarSubTrigger>Share</MenubarSubTrigger>
            <MenubarSubContent>
              <MenubarItem>Email link</MenubarItem>
              <MenubarItem>Messages</MenubarItem>
              <MenubarItem>Notes</MenubarItem>
            </MenubarSubContent>
          </MenubarSub>
          <MenubarSeparator />
          <MenubarItem>Print... {keys('⌘P')}</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Edit</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>Undo {keys('⌘Z')}</MenubarItem>
          <MenubarItem>Redo {keys('⇧⌘Z')}</MenubarItem>
          <MenubarSeparator />
          <MenubarItem>Cut</MenubarItem>
          <MenubarItem>Copy</MenubarItem>
          <MenubarItem>Paste</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>View</MenubarTrigger>
        <MenubarContent>
          <MenubarCheckboxItem checked={showBookmarks} onCheckedChange={setShowBookmarks}>
            Always Show Bookmarks Bar
          </MenubarCheckboxItem>
          <MenubarCheckboxItem checked={showFullUrls} onCheckedChange={setShowFullUrls}>
            Always Show Full URLs
          </MenubarCheckboxItem>
          <MenubarSeparator />
          <MenubarItem inset>Reload {keys('⌘R')}</MenubarItem>
          <MenubarItem inset disabled>
            Force Reload {keys('⇧⌘R')}
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Profiles</MenubarTrigger>
        <MenubarContent>
          <MenubarRadioGroup value={profile} onValueChange={setProfile}>
            {PROFILES.map((name) => (
              <MenubarRadioItem key={name} value={name}>
                {name}
              </MenubarRadioItem>
            ))}
          </MenubarRadioGroup>
          <MenubarSeparator />
          <MenubarItem inset>Edit...</MenubarItem>
          <MenubarItem inset>Add Profile...</MenubarItem>
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
  },

  render: ({ shortcut }) => <MenubarPreview shortcut={shortcut} />,

  /* 구조 확인용으로 File / View 메뉴만 표시 */
  code: ({ shortcut }) => {
    const item = (label: string, keys: string, attrs = '') =>
      shortcut
        ? [
            `      <MenubarItem${attrs}>`,
            `        ${label} <MenubarShortcut>${keys}</MenubarShortcut>`,
            '      </MenubarItem>',
          ]
        : [`      <MenubarItem${attrs}>${label}</MenubarItem>`];

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
      '    <MenubarContent>',
      ...item('New Tab', '⌘T'),
      '      <MenubarItem disabled>New Incognito Window</MenubarItem>',
      '      <MenubarSeparator />',
      '      <MenubarSub>',
      '        <MenubarSubTrigger>Share</MenubarSubTrigger>',
      '        <MenubarSubContent>',
      '          <MenubarItem>Email link</MenubarItem>',
      '          <MenubarItem>Messages</MenubarItem>',
      '        </MenubarSubContent>',
      '      </MenubarSub>',
      '    </MenubarContent>',
      '  </MenubarMenu>',
      '  <MenubarMenu>',
      '    <MenubarTrigger>View</MenubarTrigger>',
      '    <MenubarContent>',
      '      <MenubarCheckboxItem checked>Always Show Full URLs</MenubarCheckboxItem>',
      '      <MenubarSeparator />',
      ...item('Reload', '⌘R', ' inset'),
      '    </MenubarContent>',
      '  </MenubarMenu>',
      '</Menubar>',
    ].join('\n');
  },
});
