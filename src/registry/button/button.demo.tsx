import { type ComponentProps, useState } from 'react';
import { PlusIcon } from 'lucide-react';
import { definePlayground } from '@/lib/playground';
import { Button } from './button';

type ButtonPreviewProps = Omit<ComponentProps<typeof Button>, 'children'> & { icon: string; children: string };

/* 클릭 이벤트 동작을 확인할 수 있도록 클릭 횟수를 함께 표시 */
const ButtonPreview = ({ icon, children, ...props }: ButtonPreviewProps) => {
  const [count, setCount] = useState(0);
  const handleClick = () => setCount((prev) => prev + 1);

  return (
    <div className="flex flex-col items-center gap-3">
      {/* icon 계열 size는 아이콘만 표시하고, 텍스트는 접근성을 위한 aria-label로 사용 */}
      {props.size?.startsWith('icon') ? (
        <Button {...props} aria-label={children} onClick={handleClick}>
          <PlusIcon />
        </Button>
      ) : (
        <Button {...props} onClick={handleClick}>
          {icon === 'inline-start' && <PlusIcon data-icon="inline-start" />}
          {children}
          {icon === 'inline-end' && <PlusIcon data-icon="inline-end" />}
        </Button>
      )}

      <p className="text-sm text-muted-foreground">{count === 0 ? '클릭해보세요!' : `클릭 ${count}회`}</p>
    </div>
  );
};

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

  render: (props) => <ButtonPreview {...props} />,

  code: ({ icon, children, size }, formatProps) => {
    /* 클릭 이벤트 연결 위치를 보여주기 위해 onClick은 항상 표시 */
    const props = `${formatProps(['variant', 'size', 'disabled'])} onClick={() => {}}`;
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
