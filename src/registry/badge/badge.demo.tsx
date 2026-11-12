import type { MouseEvent } from 'react';
import { BadgeCheckIcon } from 'lucide-react';
import { definePlayground } from '@/lib/playground';
import { Badge } from './badge';

/* 데모에서는 링크 이동 방지 */
const preventNavigation = (event: MouseEvent) => event.preventDefault();

/* 사이트 플레이그라운드 전용 파일 (registry.json에 등록하지 않으므로 배포되지 않음) */
export default definePlayground({
  component: 'Badge',
  importPath: '@/components/ui/badge',
  controls: {
    variant: {
      type: 'select',
      options: ['default', 'secondary', 'destructive', 'outline', 'ghost', 'link'],
      defaultValue: 'default',
    },
    /* 아이콘 위치 (data-icon에 따라 해당 쪽 여백이 줄어듦) */
    icon: { type: 'select', options: ['none', 'inline-start', 'inline-end'], defaultValue: 'none' },
    /* asChild로 <a>를 감싸 링크로 사용 (마우스를 올리면 배경색 변화) */
    asLink: { type: 'boolean', defaultValue: false },
    /* 유효성 검사 실패 상태 (빨간 테두리 / 링 표시) */
    'aria-invalid': { type: 'boolean', defaultValue: false },
    children: { type: 'text', defaultValue: 'Badge' },
  },

  render: ({ variant, icon, asLink, 'aria-invalid': ariaInvalid, children }) => {
    const content = (
      <>
        {icon === 'inline-start' && <BadgeCheckIcon data-icon="inline-start" />}
        {children}
        {icon === 'inline-end' && <BadgeCheckIcon data-icon="inline-end" />}
      </>
    );

    return asLink ? (
      <Badge variant={variant} aria-invalid={ariaInvalid} asChild>
        <a href="#" onClick={preventNavigation}>
          {content}
        </a>
      </Badge>
    ) : (
      <Badge variant={variant} aria-invalid={ariaInvalid}>
        {content}
      </Badge>
    );
  },

  code: ({ icon, asLink, children }, formatProps) => {
    const props = `${formatProps(['variant', 'aria-invalid'])}${asLink ? ' asChild' : ''}`;
    const iconCode = `<BadgeCheckIcon data-icon="${icon}" />`;
    const content =
      icon === 'none' ? [children] : icon === 'inline-start' ? [iconCode, children] : [children, iconCode];
    const imports = [
      ...(icon === 'none' ? [] : [`import { BadgeCheckIcon } from 'lucide-react';`]),
      `import { Badge } from '@/components/ui/badge';`,
    ];

    let body: string[];
    if (asLink) {
      body = [`<Badge${props}>`, '  <a href="#">', ...content.map((line) => `    ${line}`), '  </a>', '</Badge>'];
    } else if (icon === 'none') {
      body = [`<Badge${props}>${children}</Badge>`];
    } else {
      body = [`<Badge${props}>`, ...content.map((line) => `  ${line}`), '</Badge>'];
    }

    return `${imports.join('\n')}\n\n${body.join('\n')}`;
  },
});
