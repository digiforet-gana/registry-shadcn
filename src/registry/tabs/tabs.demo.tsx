import { LockIcon, SettingsIcon, UserIcon } from 'lucide-react';
import { definePlayground } from '@/lib/playground';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './tabs';

const TABS = [
  {
    value: 'account',
    label: 'Account',
    content: 'Make changes to your account here.',
    icon: UserIcon,
    iconName: 'UserIcon',
  },
  { value: 'password', label: 'Password', content: 'Change your password here.', icon: LockIcon, iconName: 'LockIcon' },
  {
    value: 'settings',
    label: 'Settings',
    content: 'Manage your preferences here.',
    icon: SettingsIcon,
    iconName: 'SettingsIcon',
  },
];

/* 사이트 플레이그라운드 전용 파일 (registry.json에 등록하지 않으므로 배포되지 않음) */
export default definePlayground({
  component: 'Tabs',
  importPath: '@/components/ui/tabs',
  controls: {
    /* TabsList 스타일 (default: 배경형, line: 밑줄형) */
    variant: { type: 'select', options: ['default', 'line'], defaultValue: 'default' },
    orientation: { type: 'select', options: ['horizontal', 'vertical'], defaultValue: 'horizontal' },
    /* 탭 아이콘 위치 (data-icon 값에 따라 해당 쪽 여백이 줄어듦) */
    icon: { type: 'select', options: ['none', 'inline-start', 'inline-end'], defaultValue: 'none' },
    /* 마지막 탭 비활성화 */
    disabled: { type: 'boolean', defaultValue: false },
  },

  render: ({ variant, orientation, icon, disabled }) => (
    <Tabs defaultValue="account" orientation={orientation} className="w-full max-w-sm">
      <TabsList variant={variant}>
        {TABS.map(({ value, label, icon: Icon }, index) => (
          <TabsTrigger key={value} value={value} disabled={disabled && index === TABS.length - 1}>
            {icon === 'inline-start' && <Icon data-icon="inline-start" />}
            {label}
            {icon === 'inline-end' && <Icon data-icon="inline-end" />}
          </TabsTrigger>
        ))}
      </TabsList>
      {TABS.map((tab) => (
        <TabsContent key={tab.value} value={tab.value}>
          {tab.content}
        </TabsContent>
      ))}
    </Tabs>
  ),

  code: ({ icon, disabled }, formatProps) => {
    const triggers = TABS.flatMap((tab, index) => {
      const open = `    <TabsTrigger value="${tab.value}"${disabled && index === TABS.length - 1 ? ' disabled' : ''}>`;

      if (icon === 'none') return [`${open}${tab.label}</TabsTrigger>`];

      const iconCode = `<${tab.iconName} data-icon="${icon}" />`;
      const content = icon === 'inline-start' ? [iconCode, tab.label] : [tab.label, iconCode];

      return [open, ...content.map((line) => `      ${line}`), '    </TabsTrigger>'];
    });
    const contents = TABS.map((tab) => `  <TabsContent value="${tab.value}">${tab.content}</TabsContent>`);
    const icons = TABS.map((tab) => tab.iconName).join(', ');

    return [
      ...(icon !== 'none' ? [`import { ${icons} } from 'lucide-react';`] : []),
      `import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';`,
      '',
      `<Tabs defaultValue="account"${formatProps(['orientation'])}>`,
      `  <TabsList${formatProps(['variant'])}>`,
      ...triggers,
      '  </TabsList>',
      ...contents,
      '</Tabs>',
    ].join('\n');
  },
});
