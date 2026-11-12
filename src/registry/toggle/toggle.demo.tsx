import { BookmarkIcon } from 'lucide-react';
import { definePlayground } from '@/lib/playground';
import { Toggle } from './toggle';

const ICON_CLASS = 'group-data-[state=on]/toggle:fill-foreground';

/* 사이트 플레이그라운드 전용 파일 (registry.json에 등록하지 않으므로 배포되지 않음) */
export default definePlayground({
  component: 'Toggle',
  importPath: '@/components/ui/toggle',
  controls: {
    variant: { type: 'select', options: ['default', 'outline'], defaultValue: 'default' },
    size: { type: 'select', options: ['default', 'sm', 'lg'], defaultValue: 'default' },
    /* 아이콘 위치 (data-icon 값에 따라 해당 쪽 여백이 줄어듦, 켜지면 아이콘 내부가 채워짐) */
    icon: { type: 'select', options: ['none', 'inline-start', 'inline-end'], defaultValue: 'inline-start' },
    disabled: { type: 'boolean', defaultValue: false },
    /* 폼 검증 실패 등 오류 상태 표시 */
    'aria-invalid': { type: 'boolean', defaultValue: false },
    children: { type: 'text', defaultValue: 'Bookmark' },
  },

  render: ({ icon, children, ...props }) => (
    <Toggle aria-label="Toggle bookmark" {...props}>
      {icon === 'inline-start' && <BookmarkIcon data-icon="inline-start" className={ICON_CLASS} />}
      {children}
      {icon === 'inline-end' && <BookmarkIcon data-icon="inline-end" className={ICON_CLASS} />}
    </Toggle>
  ),

  code: ({ icon, children }, formatProps) => {
    const iconCode = `<BookmarkIcon data-icon="${icon}" className="${ICON_CLASS}" />`;

    return [
      ...(icon !== 'none' ? [`import { BookmarkIcon } from 'lucide-react';`] : []),
      `import { Toggle } from '@/components/ui/toggle';`,
      '',
      `<Toggle aria-label="Toggle bookmark"${formatProps(['variant', 'size', 'disabled', 'aria-invalid'])}>`,
      ...(icon === 'inline-start' ? [`  ${iconCode}`] : []),
      ...(children ? [`  ${children}`] : []),
      ...(icon === 'inline-end' ? [`  ${iconCode}`] : []),
      '</Toggle>',
    ].join('\n');
  },
});
