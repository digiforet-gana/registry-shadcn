import { CircleAlertIcon, EllipsisVerticalIcon, InfoIcon } from 'lucide-react';
import { definePlayground } from '@/lib/playground';
import { Button } from '../button/button';
import { Alert, AlertAction, AlertDescription, AlertTitle } from './alert';

/* 사이트 플레이그라운드 전용 파일 (registry.json에 등록하지 않으므로 배포되지 않음) */
export default definePlayground({
  component: 'Alert',
  importPath: '@/components/ui/alert',
  controls: {
    variant: { type: 'select', options: ['default', 'destructive'], defaultValue: 'default' },
    title: { type: 'text', defaultValue: 'Heads up!' },
    description: { type: 'text', defaultValue: 'You can add components to your app using the CLI.' },
    /* 왼쪽 아이콘 (variant에 따라 정보 / 경고 아이콘) */
    icon: { type: 'boolean', defaultValue: true },
    /* 우측 상단 동작 버튼 (AlertAction) */
    action: { type: 'boolean', defaultValue: false },
  },

  render: ({ variant, title, description, icon, action }) => {
    const Icon = variant === 'destructive' ? CircleAlertIcon : InfoIcon;

    return (
      <Alert variant={variant} className="max-w-md">
        {icon && <Icon />}
        <AlertTitle>{title}</AlertTitle>
        <AlertDescription>{description}</AlertDescription>
        {action && (
          <AlertAction>
            <Button variant="ghost" size="icon-sm" aria-label="More">
              <EllipsisVerticalIcon />
            </Button>
          </AlertAction>
        )}
      </Alert>
    );
  },

  code: ({ variant, title, description, icon, action }, formatProps) => {
    const iconName = variant === 'destructive' ? 'CircleAlertIcon' : 'InfoIcon';
    const components = ['Alert', ...(action ? ['AlertAction'] : []), 'AlertDescription', 'AlertTitle'];

    const icons = [...(icon ? [iconName] : []), ...(action ? ['EllipsisVerticalIcon'] : [])].sort();

    return [
      ...(icons.length > 0 ? [`import { ${icons.join(', ')} } from 'lucide-react';`] : []),
      `import { ${components.join(', ')} } from '@/components/ui/alert';`,
      ...(action ? [`import { Button } from '@/components/ui/button';`] : []),
      '',
      `<Alert${formatProps(['variant'])}>`,
      ...(icon ? [`  <${iconName} />`] : []),
      `  <AlertTitle>${title}</AlertTitle>`,
      `  <AlertDescription>${description}</AlertDescription>`,
      ...(action
        ? [
            '  <AlertAction>',
            '    <Button variant="ghost" size="icon-sm" aria-label="More">',
            '      <EllipsisVerticalIcon />',
            '    </Button>',
            '  </AlertAction>',
          ]
        : []),
      '</Alert>',
    ].join('\n');
  },
});
