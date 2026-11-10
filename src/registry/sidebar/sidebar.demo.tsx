import { CalendarIcon, HomeIcon, InboxIcon, SearchIcon, SettingsIcon } from 'lucide-react';
import { definePlayground } from '@/lib/playground';
import { TooltipProvider } from '../tooltip/tooltip';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from './sidebar';

const ITEMS = [
  { title: 'Home', icon: HomeIcon, iconName: 'HomeIcon' },
  { title: 'Inbox', icon: InboxIcon, iconName: 'InboxIcon' },
  { title: 'Calendar', icon: CalendarIcon, iconName: 'CalendarIcon' },
  { title: 'Search', icon: SearchIcon, iconName: 'SearchIcon' },
  { title: 'Settings', icon: SettingsIcon, iconName: 'SettingsIcon' },
];

/* 사이트 플레이그라운드 전용 파일 (registry.json에 등록하지 않으므로 배포되지 않음) */
export default definePlayground({
  component: 'Sidebar',
  importPath: '@/components/ui/sidebar',
  controls: {
    /* 사이드바 위치 */
    side: { type: 'select', options: ['left', 'right'], defaultValue: 'left' },
    /* sidebar: 기본, floating: 떠 있는 카드 형태, inset: 본문(SidebarInset)이 안쪽 카드 형태 */
    variant: { type: 'select', options: ['sidebar', 'floating', 'inset'], defaultValue: 'sidebar' },
    /* 접기 방식 (offcanvas: 완전히 숨김, icon: 아이콘만 남김, none: 접기 없음) */
    collapsible: { type: 'select', options: ['offcanvas', 'icon', 'none'], defaultValue: 'offcanvas' },
  },

  render: ({ side, variant, collapsible }) => (
    /*
     * Sidebar는 화면 기준(position: fixed, 높이 100svh)으로 배치되므로,
     * 데모에서는 transform으로 기준을 이 박스로 바꾸고 높이를 박스에 맞춤
     */
    <div className="h-96 w-full overflow-hidden rounded-lg border" style={{ transform: 'translateZ(0)' }}>
      <TooltipProvider>
        <SidebarProvider key={`${side}-${variant}-${collapsible}`} className="h-full min-h-0">
          <Sidebar side={side} variant={variant} collapsible={collapsible} className="h-full">
            <SidebarHeader>
              <span className="px-2 text-sm font-semibold group-data-[collapsible=icon]:hidden">Acme Inc.</span>
            </SidebarHeader>
            <SidebarContent>
              <SidebarGroup>
                <SidebarGroupLabel>Application</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {ITEMS.map((item, index) => (
                      <SidebarMenuItem key={item.title}>
                        {/* tooltip: icon 모드로 접혔을 때 마우스를 올리면 메뉴 이름 표시 */}
                        <SidebarMenuButton isActive={index === 0} tooltip={item.title}>
                          <item.icon />
                          <span>{item.title}</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>
          </Sidebar>
          <SidebarInset className="min-h-0">
            <header className="flex h-12 items-center gap-2 border-b px-4">
              <SidebarTrigger />
              <span className="text-sm font-medium">Home</span>
            </header>
            <div className="p-4 text-sm text-muted-foreground">
              왼쪽 위 버튼 또는 Ctrl(⌘) + B로 사이드바를 열고 닫을 수 있습니다.
            </div>
          </SidebarInset>
        </SidebarProvider>
      </TooltipProvider>
    </div>
  ),

  code: (_, formatProps) =>
    [
      `import { ${ITEMS.map((item) => item.iconName)
        .sort()
        .join(', ')} } from 'lucide-react';`,
      'import {',
      '  Sidebar,',
      '  SidebarContent,',
      '  SidebarGroup,',
      '  SidebarGroupContent,',
      '  SidebarGroupLabel,',
      '  SidebarHeader,',
      '  SidebarInset,',
      '  SidebarMenu,',
      '  SidebarMenuButton,',
      '  SidebarMenuItem,',
      '  SidebarProvider,',
      '  SidebarTrigger,',
      `} from '@/components/ui/sidebar';`,
      `import { TooltipProvider } from '@/components/ui/tooltip';`,
      '',
      'const items = [',
      ...ITEMS.map((item) => `  { title: '${item.title}', url: '#', icon: ${item.iconName} },`),
      '];',
      '',
      '{/* 앱 최상단 레이아웃 (SidebarMenuButton의 tooltip을 쓰려면 TooltipProvider 필요) */}',
      '<TooltipProvider>',
      '  <SidebarProvider>',
      `    <Sidebar${formatProps(['side', 'variant', 'collapsible'])}>`,
      '      <SidebarHeader>Acme Inc.</SidebarHeader>',
      '      <SidebarContent>',
      '        <SidebarGroup>',
      '          <SidebarGroupLabel>Application</SidebarGroupLabel>',
      '          <SidebarGroupContent>',
      '            <SidebarMenu>',
      '              {items.map((item) => (',
      '                <SidebarMenuItem key={item.title}>',
      '                  <SidebarMenuButton asChild tooltip={item.title}>',
      '                    <a href={item.url}>',
      '                      <item.icon />',
      '                      <span>{item.title}</span>',
      '                    </a>',
      '                  </SidebarMenuButton>',
      '                </SidebarMenuItem>',
      '              ))}',
      '            </SidebarMenu>',
      '          </SidebarGroupContent>',
      '        </SidebarGroup>',
      '      </SidebarContent>',
      '    </Sidebar>',
      '    <SidebarInset>',
      '      <header>',
      '        <SidebarTrigger />',
      '      </header>',
      '      {children}',
      '    </SidebarInset>',
      '  </SidebarProvider>',
      '</TooltipProvider>',
    ].join('\n'),
});
