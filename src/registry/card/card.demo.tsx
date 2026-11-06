import { EllipsisVerticalIcon } from 'lucide-react';
import { definePlayground } from '@/lib/playground';
import { Button } from '../button/button';
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './card';

/* 사이트 플레이그라운드 전용 파일 (registry.json에 등록하지 않으므로 배포되지 않음) */
export default definePlayground({
  component: 'Card',
  importPath: '@/components/ui/card',
  controls: {
    size: { type: 'select', options: ['default', 'sm'], defaultValue: 'default' },
    title: { type: 'text', defaultValue: 'Card Title' },
    description: { type: 'text', defaultValue: 'Card Description' },
    content: { type: 'text', defaultValue: 'Card Content' },
    action: { type: 'boolean', defaultValue: false },
    footer: { type: 'boolean', defaultValue: true },
  },

  render: ({ size, title, description, content, action, footer }) => (
    <Card size={size} className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
        {action && (
          <CardAction>
            <Button variant="ghost" size="icon-sm" aria-label="More">
              <EllipsisVerticalIcon />
            </Button>
          </CardAction>
        )}
      </CardHeader>
      <CardContent>
        <p>{content}</p>
      </CardContent>
      {footer && (
        <CardFooter>
          <p>Card Footer</p>
        </CardFooter>
      )}
    </Card>
  ),

  code: ({ title, description, content, action, footer }, formatProps) => {
    const components = ['Card', 'CardContent', 'CardDescription', 'CardHeader', 'CardTitle'];
    if (action) components.push('CardAction');
    if (footer) components.push('CardFooter');

    const lines = [
      `<Card${formatProps(['size'])}>`,
      '  <CardHeader>',
      `    <CardTitle>${title}</CardTitle>`,
      `    <CardDescription>${description}</CardDescription>`,
      ...(action
        ? [
            '    <CardAction>',
            '      <Button variant="ghost" size="icon-sm" aria-label="More">',
            '        <EllipsisVerticalIcon />',
            '      </Button>',
            '    </CardAction>',
          ]
        : []),
      '  </CardHeader>',
      '  <CardContent>',
      `    <p>${content}</p>`,
      '  </CardContent>',
      ...(footer ? ['  <CardFooter>', '    <p>Card Footer</p>', '  </CardFooter>'] : []),
      '</Card>',
    ];

    const imports = [
      ...(action
        ? [`import { EllipsisVerticalIcon } from 'lucide-react';`, `import { Button } from '@/components/ui/button';`]
        : []),
      `import { ${components.sort().join(', ')} } from '@/components/ui/card';`,
    ];

    return `${imports.join('\n')}\n\n${lines.join('\n')}`;
  },
});
