import { PlusIcon } from 'lucide-react';
import { definePlayground } from '@/lib/playground';
import { Button } from './button';

/* 사이트 플레이그라운드 전용 파일 (registry.json에 등록하지 않으므로 배포되지 않음) */
export default definePlayground({
  component: 'Button',
  importPath: '@/components/ui/button',
  controls: {
    variant: {
      type: 'select',
      options: ['default', 'outline', 'secondary', 'ghost', 'destructive', 'link'],
      defaultValue: 'default',
    },
    size: {
      type: 'select',
      options: ['default', 'xs', 'sm', 'lg', 'icon', 'icon-xs', 'icon-sm', 'icon-lg'],
      defaultValue: 'default',
    },
    icon: {
      type: 'select',
      options: ['none', 'inline-start', 'inline-end'],
      defaultValue: 'none',
    },
    disabled: { type: 'boolean', defaultValue: false },
    children: { type: 'text', defaultValue: 'Button' },
  },

  render: ({ icon, children, ...props }) => {
    /* icon 계열 size는 아이콘만 표시하고, 텍스트는 접근성을 위한 aria-label로 사용 */
    if (props.size.startsWith('icon')) {
      return (
        <Button {...props} aria-label={children}>
          <PlusIcon />
        </Button>
      );
    }

    return (
      <Button {...props}>
        {icon === 'inline-start' && <PlusIcon data-icon="inline-start" />}
        {children}
        {icon === 'inline-end' && <PlusIcon data-icon="inline-end" />}
      </Button>
    );
  },

  code: ({ icon, children, size }, formatProps) => {
    const props = formatProps(['variant', 'size', 'disabled']);
    const importCode = `import { Button } from '@/components/ui/button';`;
    const importIconCode = `import { PlusIcon } from 'lucide-react';\n${importCode}`;

    if (size.startsWith('icon')) {
      return `${importIconCode}\n\n<Button${props} aria-label="${children}">\n  <PlusIcon />\n</Button>`;
    }

    if (icon === 'none') return `${importCode}\n\n<Button${props}>${children}</Button>`;

    const iconCode = `<PlusIcon data-icon="${icon}" />`;
    const content = icon === 'inline-start' ? [iconCode, children] : [children, iconCode];

    return `${importIconCode}\n\n<Button${props}>\n  ${content.join('\n  ')}\n</Button>`;
  },
});
