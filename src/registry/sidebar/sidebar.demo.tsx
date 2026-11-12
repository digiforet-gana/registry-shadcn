import { CalendarIcon, ChevronRightIcon, HomeIcon, InboxIcon, SearchIcon, SettingsIcon } from 'lucide-react';
import { definePlayground } from '@/lib/playground';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../collapsible/collapsible';
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
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarTrigger,
} from './sidebar';

/* items가 있는 메뉴는 하위메뉴를 가짐 */
const ITEMS: { title: string; icon: typeof HomeIcon; iconName: string; items?: string[] }[] = [
  { title: 'Home', icon: HomeIcon, iconName: 'HomeIcon' },
  { title: 'Inbox', icon: InboxIcon, iconName: 'InboxIcon' },
  { title: 'Calendar', icon: CalendarIcon, iconName: 'CalendarIcon' },
  { title: 'Search', icon: SearchIcon, iconName: 'SearchIcon' },
  { title: 'Settings', icon: SettingsIcon, iconName: 'SettingsIcon', items: ['General', 'Team', 'Billing'] },
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
    /* SidebarProvider의 초기 열림 상태 (false면 접힌 상태로 시작) */
    defaultOpen: { type: 'boolean', defaultValue: true },
    /* 메뉴 버튼(SidebarMenuButton) 스타일 */
    menuVariant: { type: 'select', options: ['default', 'outline'], defaultValue: 'default' },
    /* 메뉴 버튼(SidebarMenuButton) 크기 */
    menuSize: { type: 'select', options: ['default', 'sm', 'lg'], defaultValue: 'default' },
  },

  render: ({ side, variant, collapsible, defaultOpen, menuVariant, menuSize }) => (
    /*
     * Sidebar는 화면 기준(position: fixed, 높이 100svh)으로 배치되므로,
     * 데모에서는 transform으로 기준을 이 박스로 바꾸고 높이를 박스에 맞춤
     */
    <div className="h-96 w-full overflow-hidden rounded-lg border" style={{ transform: 'translateZ(0)' }}>
      <TooltipProvider>
        <SidebarProvider
          key={`${side}-${variant}-${collapsible}-${defaultOpen}`}
          defaultOpen={defaultOpen}
          className="h-full min-h-0"
        >
          <Sidebar side={side} variant={variant} collapsible={collapsible} className="h-full">
            <SidebarHeader>
              <span className="px-2 text-sm font-semibold group-data-[collapsible=icon]:hidden">Acme Inc.</span>
            </SidebarHeader>
            <SidebarContent>
              <SidebarGroup>
                <SidebarGroupLabel>Application</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {ITEMS.map((item, index) =>
                      item.items ? (
                        /*
                         * 하위메뉴: Collapsible로 감싸 메뉴 버튼 클릭 시 접고 펼침
                         * (icon 모드로 접히면 하위메뉴는 자동으로 숨겨짐)
                         */
                        <Collapsible key={item.title} defaultOpen className="group/collapsible" asChild>
                          <SidebarMenuItem>
                            <CollapsibleTrigger asChild>
                              <SidebarMenuButton variant={menuVariant} size={menuSize} tooltip={item.title}>
                                <item.icon />
                                <span>{item.title}</span>
                                <ChevronRightIcon className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
                              </SidebarMenuButton>
                            </CollapsibleTrigger>
                            <CollapsibleContent>
                              <SidebarMenuSub>
                                {item.items.map((subItem, subIndex) => (
                                  <SidebarMenuSubItem key={subItem}>
                                    <SidebarMenuSubButton
                                      href="#"
                                      isActive={subIndex === 0}
                                      onClick={(event) => event.preventDefault()}
                                    >
                                      <span>{subItem}</span>
                                    </SidebarMenuSubButton>
                                  </SidebarMenuSubItem>
                                ))}
                              </SidebarMenuSub>
                            </CollapsibleContent>
                          </SidebarMenuItem>
                        </Collapsible>
                      ) : (
                        <SidebarMenuItem key={item.title}>
                          {/*
                           * isActive: 현재 선택된 메뉴 표시
                           * tooltip: icon 모드로 접혔을 때 마우스를 올리면 메뉴 이름 표시
                           */}
                          <SidebarMenuButton
                            variant={menuVariant}
                            size={menuSize}
                            isActive={index === 0}
                            tooltip={item.title}
                            onClick={() => {}}
                          >
                            <item.icon />
                            <span>{item.title}</span>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ),
                    )}
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

  code: ({ menuVariant, menuSize }, formatProps) => {
    /* SidebarMenuButton의 variant, size는 컨트롤 이름이 다르므로 직접 표시 (기본값이면 생략) */
    const menuProps = [
      menuVariant === 'default' ? '' : ` variant="${menuVariant}"`,
      menuSize === 'default' ? '' : ` size="${menuSize}"`,
    ].join('');

    return [
      `import { ${[...ITEMS.map((item) => item.iconName), 'ChevronRightIcon']
        .sort()
        .join(', ')} } from 'lucide-react';`,
      `import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';`,
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
      '  SidebarMenuSub,',
      '  SidebarMenuSubButton,',
      '  SidebarMenuSubItem,',
      '  SidebarProvider,',
      '  SidebarTrigger,',
      `} from '@/components/ui/sidebar';`,
      `import { TooltipProvider } from '@/components/ui/tooltip';`,
      '',
      'const items = [',
      ...ITEMS.map((item) =>
        item.items
          ? `  { title: '${item.title}', icon: ${item.iconName}, items: [${item.items.map((sub) => `'${sub}'`).join(', ')}] },`
          : `  { title: '${item.title}', icon: ${item.iconName} },`,
      ),
      '];',
      '',
      '{/* 앱 최상단 레이아웃 (SidebarMenuButton의 tooltip을 쓰려면 TooltipProvider 필요) */}',
      '<TooltipProvider>',
      `  <SidebarProvider${formatProps(['defaultOpen'])}>`,
      `    <Sidebar${formatProps(['side', 'variant', 'collapsible'])}>`,
      '      <SidebarHeader>Acme Inc.</SidebarHeader>',
      '      <SidebarContent>',
      '        <SidebarGroup>',
      '          <SidebarGroupLabel>Application</SidebarGroupLabel>',
      '          <SidebarGroupContent>',
      '            <SidebarMenu>',
      '              {items.map((item, index) =>',
      '                item.items ? (',
      '                  // 하위메뉴가 있으면 Collapsible로 접고 펼침',
      '                  <Collapsible key={item.title} defaultOpen className="group/collapsible" asChild>',
      '                    <SidebarMenuItem>',
      '                      <CollapsibleTrigger asChild>',
      `                        <SidebarMenuButton${menuProps} tooltip={item.title}>`,
      '                          <item.icon />',
      '                          <span>{item.title}</span>',
      '                          <ChevronRightIcon className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />',
      '                        </SidebarMenuButton>',
      '                      </CollapsibleTrigger>',
      '                      <CollapsibleContent>',
      '                        <SidebarMenuSub>',
      '                          {item.items.map((subItem, subIndex) => (',
      '                            <SidebarMenuSubItem key={subItem}>',
      '                              <SidebarMenuSubButton href="#" isActive={subIndex === 0}>',
      '                                <span>{subItem}</span>',
      '                              </SidebarMenuSubButton>',
      '                            </SidebarMenuSubItem>',
      '                          ))}',
      '                        </SidebarMenuSub>',
      '                      </CollapsibleContent>',
      '                    </SidebarMenuItem>',
      '                  </Collapsible>',
      '                ) : (',
      '                  <SidebarMenuItem key={item.title}>',
      `                    <SidebarMenuButton${menuProps} isActive={index === 0} tooltip={item.title} onClick={() => {}}>`,
      '                      <item.icon />',
      '                      <span>{item.title}</span>',
      '                    </SidebarMenuButton>',
      '                  </SidebarMenuItem>',
      '                ),',
      '              )}',
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
    ].join('\n');
  },
});
