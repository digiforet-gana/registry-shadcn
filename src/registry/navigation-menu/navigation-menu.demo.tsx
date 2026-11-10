import type { MouseEvent } from 'react';
import { definePlayground } from '@/lib/playground';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from './navigation-menu';

const GETTING_STARTED = [
  { title: 'Introduction', description: 'Re-usable components built using Radix UI and Tailwind CSS.' },
  { title: 'Installation', description: 'How to install dependencies and structure your app.' },
  { title: 'Typography', description: 'Styles for headings, paragraphs, lists...etc' },
];

const COMPONENTS = [
  { title: 'Alert Dialog', description: 'A modal dialog that interrupts the user with important content.' },
  { title: 'Hover Card', description: 'For sighted users to preview content available behind a link.' },
  { title: 'Progress', description: 'Displays an indicator showing the completion progress of a task.' },
  { title: 'Tooltip', description: 'A popup that displays information related to an element on hover.' },
];

/* 데모에서는 링크 이동 방지 */
const preventNavigation = (event: MouseEvent) => event.preventDefault();

/* 제목 + 설명으로 구성된 메뉴 링크 */
const ListItem = ({ title, description }: { title: string; description: string }) => (
  <li>
    <NavigationMenuLink asChild>
      <a href="#" onClick={preventNavigation} className="flex-col items-start gap-1">
        <div className="text-sm leading-none font-medium">{title}</div>
        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{description}</p>
      </a>
    </NavigationMenuLink>
  </li>
);

/* 사이트 플레이그라운드 전용 파일 (registry.json에 등록하지 않으므로 배포되지 않음) */
export default definePlayground({
  component: 'NavigationMenu',
  importPath: '@/components/ui/navigation-menu',
  controls: {
    /*
     * true: 하위 메뉴가 메뉴바 아래 공용 영역(viewport)에 열리고, 메뉴를 옮겨 다니면 크기가 자연스럽게 바뀜
     * false: 하위 메뉴가 각 트리거 바로 아래에 따로 열림
     */
    viewport: { type: 'boolean', defaultValue: true },
  },

  render: ({ viewport }) => (
    <div className="flex h-80 items-start justify-center">
      <NavigationMenu key={String(viewport)} viewport={viewport}>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Getting Started</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-72 gap-1">
                {GETTING_STARTED.map((item) => (
                  <ListItem key={item.title} {...item} />
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Components</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-96 gap-1 md:w-lg md:grid-cols-2">
                {COMPONENTS.map((item) => (
                  <ListItem key={item.title} {...item} />
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
              <a href="#" onClick={preventNavigation}>
                Docs
              </a>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  ),

  code: (_, formatProps) =>
    [
      'import {',
      '  NavigationMenu,',
      '  NavigationMenuContent,',
      '  NavigationMenuItem,',
      '  NavigationMenuLink,',
      '  NavigationMenuList,',
      '  NavigationMenuTrigger,',
      '  navigationMenuTriggerStyle,',
      `} from '@/components/ui/navigation-menu';`,
      '',
      `<NavigationMenu${formatProps(['viewport'])}>`,
      '  <NavigationMenuList>',
      '    <NavigationMenuItem>',
      '      <NavigationMenuTrigger>Getting Started</NavigationMenuTrigger>',
      '      <NavigationMenuContent>',
      '        <ul className="grid w-72 gap-1">',
      '          <li>',
      '            <NavigationMenuLink asChild>',
      '              <a href="/docs" className="flex-col items-start gap-1">',
      '                <div className="text-sm leading-none font-medium">Introduction</div>',
      '                <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">',
      `                  ${GETTING_STARTED[0].description}`,
      '                </p>',
      '              </a>',
      '            </NavigationMenuLink>',
      '          </li>',
      '        </ul>',
      '      </NavigationMenuContent>',
      '    </NavigationMenuItem>',
      '    <NavigationMenuItem>',
      '      <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>',
      '        <a href="/docs">Docs</a>',
      '      </NavigationMenuLink>',
      '    </NavigationMenuItem>',
      '  </NavigationMenuList>',
      '</NavigationMenu>',
    ].join('\n'),
});
