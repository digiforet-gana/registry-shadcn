import { definePlayground } from '@/lib/playground';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './tabs';

const TABS = [
  { value: 'account', label: 'Account', content: 'Make changes to your account here.' },
  { value: 'password', label: 'Password', content: 'Change your password here.' },
  { value: 'settings', label: 'Settings', content: 'Manage your preferences here.' },
];

/* 사이트 플레이그라운드 전용 파일 (registry.json에 등록하지 않으므로 배포되지 않음) */
export default definePlayground({
  component: 'Tabs',
  importPath: '@/components/ui/tabs',
  controls: {
    /* TabsList 스타일 (default: 배경형, line: 밑줄형) */
    variant: { type: 'select', options: ['default', 'line'], defaultValue: 'default' },
    orientation: { type: 'select', options: ['horizontal', 'vertical'], defaultValue: 'horizontal' },
    /* 마지막 탭 비활성화 */
    disabled: { type: 'boolean', defaultValue: false },
  },

  render: ({ variant, orientation, disabled }) => (
    <Tabs defaultValue="account" orientation={orientation} className="w-full max-w-sm">
      <TabsList variant={variant}>
        {TABS.map((tab, index) => (
          <TabsTrigger key={tab.value} value={tab.value} disabled={disabled && index === TABS.length - 1}>
            {tab.label}
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

  code: ({ disabled }, formatProps) => {
    const triggers = TABS.map(
      (tab, index) =>
        `    <TabsTrigger value="${tab.value}"${disabled && index === TABS.length - 1 ? ' disabled' : ''}>${tab.label}</TabsTrigger>`,
    );
    const contents = TABS.map((tab) => `  <TabsContent value="${tab.value}">${tab.content}</TabsContent>`);

    return [
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
