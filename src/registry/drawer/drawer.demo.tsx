import { MinusIcon, PlusIcon } from 'lucide-react';
import { definePlayground } from '@/lib/playground';
import { Button } from '../button/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from './drawer';

/* 사이트 플레이그라운드 전용 파일 (registry.json에 등록하지 않으므로 배포되지 않음) */
export default definePlayground({
  component: 'Drawer',
  importPath: '@/components/ui/drawer',
  controls: {
    /* 서랍이 나오는 화면 가장자리 (bottom이면 위쪽에 끌기 손잡이 표시) */
    direction: { type: 'select', options: ['bottom', 'top', 'right', 'left'], defaultValue: 'bottom' },
    title: { type: 'text', defaultValue: 'Move Goal' },
    description: { type: 'text', defaultValue: 'Set your daily activity goal.' },
  },

  render: ({ direction, title, description }) => (
    <Drawer key={direction} direction={direction}>
      <DrawerTrigger asChild>
        <Button variant="outline">Open Drawer</Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>{title}</DrawerTitle>
            <DrawerDescription>{description}</DrawerDescription>
          </DrawerHeader>
          <div className="flex items-center justify-center gap-2 p-4">
            <Button
              variant="outline"
              size="icon"
              className="size-8 shrink-0 rounded-full"
              onClick={() => {}}
              aria-label="Decrease"
            >
              <MinusIcon />
            </Button>
            <div className="flex-1 text-center">
              <div className="text-7xl font-bold tracking-tighter">350</div>
              <div className="text-[0.70rem] text-muted-foreground uppercase">Calories/day</div>
            </div>
            <Button
              variant="outline"
              size="icon"
              className="size-8 shrink-0 rounded-full"
              onClick={() => {}}
              aria-label="Increase"
            >
              <PlusIcon />
            </Button>
          </div>
          <DrawerFooter>
            <Button onClick={() => {}}>Submit</Button>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  ),

  code: ({ title, description }, formatProps) =>
    [
      `import { Button } from '@/components/ui/button';`,
      `import {`,
      `  Drawer,`,
      `  DrawerClose,`,
      `  DrawerContent,`,
      `  DrawerDescription,`,
      `  DrawerFooter,`,
      `  DrawerHeader,`,
      `  DrawerTitle,`,
      `  DrawerTrigger,`,
      `} from '@/components/ui/drawer';`,
      '',
      `<Drawer${formatProps(['direction'])}>`,
      '  <DrawerTrigger asChild>',
      '    <Button variant="outline">Open Drawer</Button>',
      '  </DrawerTrigger>',
      '  <DrawerContent>',
      '    <div className="mx-auto w-full max-w-sm">',
      '      <DrawerHeader>',
      `        <DrawerTitle>${title}</DrawerTitle>`,
      `        <DrawerDescription>${description}</DrawerDescription>`,
      '      </DrawerHeader>',
      '      {/* 콘텐츠 */}',
      '      <DrawerFooter>',
      '        <Button onClick={() => {}}>Submit</Button>',
      '        <DrawerClose asChild>',
      '          <Button variant="outline">Cancel</Button>',
      '        </DrawerClose>',
      '      </DrawerFooter>',
      '    </div>',
      '  </DrawerContent>',
      '</Drawer>',
    ].join('\n'),
});
