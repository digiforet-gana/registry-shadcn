import type { MouseEvent } from 'react';
import { SlashIcon } from 'lucide-react';
import { definePlayground } from '@/lib/playground';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../dropdown-menu/dropdown-menu';
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from './breadcrumb';

/* 생략 기호(…)를 눌렀을 때 표시할 숨겨진 경로 */
const HIDDEN_ITEMS = ['Documentation', 'Themes', 'GitHub'];

/* 데모에서는 링크 이동 방지 */
const preventNavigation = (event: MouseEvent) => event.preventDefault();

/* 사이트 플레이그라운드 전용 파일 (registry.json에 등록하지 않으므로 배포되지 않음) */
export default definePlayground({
  component: 'Breadcrumb',
  importPath: '@/components/ui/breadcrumb',
  controls: {
    /* 구분 기호를 children으로 직접 지정 (끄면 기본 화살표, 켜면 사선 아이콘 예시) */
    customSeparator: { type: 'boolean', defaultValue: false },
    /* 중간 경로를 생략 기호로 줄이고, 누르면 드롭다운으로 표시 */
    ellipsis: { type: 'boolean', defaultValue: true },
  },

  render: ({ customSeparator, ellipsis }) => {
    const sep = <BreadcrumbSeparator>{customSeparator ? <SlashIcon /> : undefined}</BreadcrumbSeparator>;

    return (
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="#" onClick={preventNavigation}>
              Home
            </BreadcrumbLink>
          </BreadcrumbItem>
          {sep}
          {ellipsis && (
            <>
              <BreadcrumbItem>
                <DropdownMenu>
                  <DropdownMenuTrigger className="flex items-center gap-1" aria-label="Toggle menu">
                    <BreadcrumbEllipsis />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start">
                    {HIDDEN_ITEMS.map((item) => (
                      <DropdownMenuItem key={item} onSelect={() => {}}>
                        {item}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </BreadcrumbItem>
              {sep}
            </>
          )}
          <BreadcrumbItem>
            <BreadcrumbLink href="#" onClick={preventNavigation}>
              Components
            </BreadcrumbLink>
          </BreadcrumbItem>
          {sep}
          <BreadcrumbItem>
            <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    );
  },

  code: ({ customSeparator, ellipsis }) => {
    const sep = customSeparator
      ? ['    <BreadcrumbSeparator>', '      <SlashIcon />', '    </BreadcrumbSeparator>']
      : ['    <BreadcrumbSeparator />'];
    const components = [
      'Breadcrumb',
      ...(ellipsis ? ['BreadcrumbEllipsis'] : []),
      'BreadcrumbItem',
      'BreadcrumbLink',
      'BreadcrumbList',
      'BreadcrumbPage',
      'BreadcrumbSeparator',
    ];

    return [
      ...(customSeparator ? [`import { SlashIcon } from 'lucide-react';`] : []),
      `import {`,
      ...components.map((name) => `  ${name},`),
      `} from '@/components/ui/breadcrumb';`,
      ...(ellipsis
        ? [
            `import {`,
            `  DropdownMenu,`,
            `  DropdownMenuContent,`,
            `  DropdownMenuItem,`,
            `  DropdownMenuTrigger,`,
            `} from '@/components/ui/dropdown-menu';`,
          ]
        : []),
      '',
      '<Breadcrumb>',
      '  <BreadcrumbList>',
      '    <BreadcrumbItem>',
      '      <BreadcrumbLink href="/">Home</BreadcrumbLink>',
      '    </BreadcrumbItem>',
      ...sep,
      ...(ellipsis
        ? [
            '    <BreadcrumbItem>',
            '      <DropdownMenu>',
            '        <DropdownMenuTrigger className="flex items-center gap-1" aria-label="Toggle menu">',
            '          <BreadcrumbEllipsis />',
            '        </DropdownMenuTrigger>',
            '        <DropdownMenuContent align="start">',
            ...HIDDEN_ITEMS.map((item) => `          <DropdownMenuItem onSelect={() => {}}>${item}</DropdownMenuItem>`),
            '        </DropdownMenuContent>',
            '      </DropdownMenu>',
            '    </BreadcrumbItem>',
            ...sep,
          ]
        : []),
      '    <BreadcrumbItem>',
      '      <BreadcrumbLink href="/components">Components</BreadcrumbLink>',
      '    </BreadcrumbItem>',
      ...sep,
      '    <BreadcrumbItem>',
      '      <BreadcrumbPage>Breadcrumb</BreadcrumbPage>',
      '    </BreadcrumbItem>',
      '  </BreadcrumbList>',
      '</Breadcrumb>',
    ].join('\n');
  },
});
