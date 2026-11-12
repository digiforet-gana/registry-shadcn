import { definePlayground } from '@/lib/playground';
import { Button } from '../button/button';
import { Input } from '../input/input';
import { Label } from '../label/label';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './sheet';

const FIELDS = [
  { id: 'name', label: 'Name', defaultValue: 'Pedro Duarte' },
  { id: 'username', label: 'Username', defaultValue: '@peduarte' },
];

/* 사이트 플레이그라운드 전용 파일 (registry.json에 등록하지 않으므로 배포되지 않음) */
export default definePlayground({
  component: 'Sheet',
  importPath: '@/components/ui/sheet',
  controls: {
    /* 패널이 나타나는 화면 가장자리 */
    side: { type: 'select', options: ['top', 'right', 'bottom', 'left'], defaultValue: 'right' },
    title: { type: 'text', defaultValue: 'Edit Profile' },
    description: { type: 'text', defaultValue: "Make changes to your profile here. Click save when you're done." },
    /* SheetContent 우측 상단 X 버튼 */
    showCloseButton: { type: 'boolean', defaultValue: true },
  },

  render: ({ side, title, description, showCloseButton }) => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Open Sheet</Button>
      </SheetTrigger>
      <SheetContent side={side} showCloseButton={showCloseButton}>
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
          <SheetDescription>{description}</SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 px-4">
          {FIELDS.map((field) => (
            <div key={field.id} className="grid gap-2">
              <Label htmlFor={`sheet-${field.id}`}>{field.label}</Label>
              <Input id={`sheet-${field.id}`} defaultValue={field.defaultValue} />
            </div>
          ))}
        </div>
        <SheetFooter>
          <Button onClick={() => {}}>Save Changes</Button>
          <SheetClose asChild>
            <Button variant="outline">Close</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),

  code: ({ title, description, showCloseButton }, formatProps) => {
    const fields = FIELDS.flatMap((field) => [
      '      <div className="grid gap-2">',
      `        <Label htmlFor="${field.id}">${field.label}</Label>`,
      `        <Input id="${field.id}" defaultValue="${field.defaultValue}" />`,
      '      </div>',
    ]);

    return [
      `import { Button } from '@/components/ui/button';`,
      `import { Input } from '@/components/ui/input';`,
      `import { Label } from '@/components/ui/label';`,
      `import {`,
      `  Sheet,`,
      `  SheetClose,`,
      `  SheetContent,`,
      `  SheetDescription,`,
      `  SheetFooter,`,
      `  SheetHeader,`,
      `  SheetTitle,`,
      `  SheetTrigger,`,
      `} from '@/components/ui/sheet';`,
      '',
      '<Sheet>',
      '  <SheetTrigger asChild>',
      '    <Button variant="outline">Open Sheet</Button>',
      '  </SheetTrigger>',
      /* showCloseButton은 기본값이 true이므로 끈 경우에만 표시 */
      `  <SheetContent${formatProps(['side'])}${showCloseButton ? '' : ' showCloseButton={false}'}>`,
      '    <SheetHeader>',
      `      <SheetTitle>${title}</SheetTitle>`,
      `      <SheetDescription>${description}</SheetDescription>`,
      '    </SheetHeader>',
      '    <div className="grid gap-4 px-4">',
      ...fields,
      '    </div>',
      '    <SheetFooter>',
      '      <Button onClick={() => {}}>Save Changes</Button>',
      '      <SheetClose asChild>',
      '        <Button variant="outline">Close</Button>',
      '      </SheetClose>',
      '    </SheetFooter>',
      '  </SheetContent>',
      '</Sheet>',
    ].join('\n');
  },
});
