import { useState } from 'react';
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

type PreviewProps = {
  direction: 'top' | 'right' | 'bottom' | 'left';
  title: string;
  description: string;
};

/* 목표값 상태를 관리하기 위한 미리보기 컴포넌트 */
const DrawerPreview = ({ direction, title, description }: PreviewProps) => {
  const [goal, setGoal] = useState(350);
  const adjust = (amount: number) => setGoal((prev) => Math.max(200, Math.min(400, prev + amount)));

  return (
    <Drawer direction={direction}>
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
              onClick={() => adjust(-10)}
              disabled={goal <= 200}
              aria-label="Decrease"
            >
              <MinusIcon />
            </Button>
            <div className="flex-1 text-center">
              <div className="text-7xl font-bold tracking-tighter">{goal}</div>
              <div className="text-[0.70rem] text-muted-foreground uppercase">Calories/day</div>
            </div>
            <Button
              variant="outline"
              size="icon"
              className="size-8 shrink-0 rounded-full"
              onClick={() => adjust(10)}
              disabled={goal >= 400}
              aria-label="Increase"
            >
              <PlusIcon />
            </Button>
          </div>
          <DrawerFooter>
            <Button>Submit</Button>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

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
    <DrawerPreview key={direction} direction={direction} title={title} description={description} />
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
      '        <Button>Submit</Button>',
      '        <DrawerClose asChild>',
      '          <Button variant="outline">Cancel</Button>',
      '        </DrawerClose>',
      '      </DrawerFooter>',
      '    </div>',
      '  </DrawerContent>',
      '</Drawer>',
    ].join('\n'),
});
