import { definePlayground } from '@/lib/playground';
import { Badge } from '../badge/badge';
import { Button } from '../button/button';
import { Spinner } from './spinner';

/* 사이트 플레이그라운드 전용 파일 (registry.json에 등록하지 않으므로 배포되지 않음) */
export default definePlayground({
  component: 'Spinner',
  importPath: '@/components/ui/spinner',
  controls: {
    /* Spinner 자체에는 size prop이 없으므로 className으로 크기 지정 (기본 size-4) */
    size: { type: 'select', options: ['size-3', 'size-4', 'size-6', 'size-8'], defaultValue: 'size-4' },
    /* 단독 / 버튼 안 / 배지 안 */
    example: { type: 'select', options: ['standalone', 'button', 'badge'], defaultValue: 'standalone' },
    text: { type: 'text', defaultValue: 'Loading...' },
  },

  render: ({ size, example, text }) => {
    const className = size === 'size-4' ? undefined : size;

    if (example === 'button') {
      return (
        <Button disabled size="sm">
          <Spinner data-icon="inline-start" className={className} />
          {text}
        </Button>
      );
    }
    if (example === 'badge') {
      return (
        <Badge>
          <Spinner data-icon="inline-start" className={className} />
          {text}
        </Badge>
      );
    }
    return <Spinner className={className} />;
  },

  code: ({ size, example, text }) => {
    const classAttr = size === 'size-4' ? '' : ` className="${size}"`;
    const imports = [
      ...(example === 'badge' ? [`import { Badge } from '@/components/ui/badge';`] : []),
      ...(example === 'button' ? [`import { Button } from '@/components/ui/button';`] : []),
      `import { Spinner } from '@/components/ui/spinner';`,
    ];
    /* 버튼, 배지 예시는 감싸는 요소의 여는 / 닫는 태그 */
    const parent = {
      standalone: null,
      button: { open: '<Button disabled size="sm">', close: '</Button>' },
      badge: { open: '<Badge>', close: '</Badge>' },
    }[example];

    const element = parent
      ? [parent.open, `  <Spinner data-icon="inline-start"${classAttr} />`, `  ${text}`, parent.close]
      : [`<Spinner${classAttr} />`];

    return [...imports, '', ...element].join('\n');
  },
});
