import { definePlayground } from '@/lib/playground';
import { Badge } from '../badge/badge';
import { Button } from '../button/button';
import { Spinner } from './spinner';

/* 사이트 플레이그라운드 전용 파일 (registry.json에 등록하지 않으므로 배포되지 않음) */
export default definePlayground({
  component: 'Spinner',
  importPath: '@/components/ui/spinner',
  controls: {
    /* 단독 / 버튼 안 / 배지 안 */
    example: { type: 'select', options: ['standalone', 'button', 'badge'], defaultValue: 'standalone' },
    text: { type: 'text', defaultValue: 'Loading...' },
  },

  render: ({ example, text }) => {
    if (example === 'button') {
      return (
        <Button disabled size="sm">
          <Spinner data-icon="inline-start" />
          {text}
        </Button>
      );
    }
    if (example === 'badge') {
      return (
        <Badge>
          <Spinner data-icon="inline-start" />
          {text}
        </Badge>
      );
    }
    return <Spinner />;
  },

  code: ({ example, text }) => {
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
      ? [parent.open, '  <Spinner data-icon="inline-start" />', `  ${text}`, parent.close]
      : ['<Spinner />'];

    return [...imports, '', ...element].join('\n');
  },
});
