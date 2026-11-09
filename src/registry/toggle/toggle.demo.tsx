import { BookmarkIcon } from 'lucide-react';
import { definePlayground } from '@/lib/playground';
import { Toggle } from './toggle';

/* 사이트 플레이그라운드 전용 파일 (registry.json에 등록하지 않으므로 배포되지 않음) */
export default definePlayground({
  component: 'Toggle',
  importPath: '@/components/ui/toggle',
  controls: {
    variant: { type: 'select', options: ['default', 'outline'], defaultValue: 'default' },
    size: { type: 'select', options: ['default', 'sm', 'lg'], defaultValue: 'default' },
    disabled: { type: 'boolean', defaultValue: false },
    /* 왼쪽 아이콘 (켜지면 아이콘 내부가 채워짐) */
    icon: { type: 'boolean', defaultValue: true },
    children: { type: 'text', defaultValue: 'Bookmark' },
  },

  render: ({ variant, size, disabled, icon, children }) => (
    <Toggle variant={variant} size={size} disabled={disabled} aria-label="Toggle bookmark">
      {icon && <BookmarkIcon className="group-data-[state=on]/toggle:fill-foreground" />}
      {children}
    </Toggle>
  ),

  code: ({ icon, children }, formatProps) =>
    [
      ...(icon ? [`import { BookmarkIcon } from 'lucide-react';`] : []),
      `import { Toggle } from '@/components/ui/toggle';`,
      '',
      `<Toggle aria-label="Toggle bookmark"${formatProps(['variant', 'size', 'disabled'])}>`,
      ...(icon ? ['  <BookmarkIcon className="group-data-[state=on]/toggle:fill-foreground" />'] : []),
      ...(children ? [`  ${children}`] : []),
      '</Toggle>',
    ].join('\n'),
});
