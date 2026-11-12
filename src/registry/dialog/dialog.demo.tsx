import { definePlayground } from '@/lib/playground';
import { Button } from '../button/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './dialog';

/* 사이트 플레이그라운드 전용 파일 (registry.json에 등록하지 않으므로 배포되지 않음) */
export default definePlayground({
  component: 'Dialog',
  importPath: '@/components/ui/dialog',
  controls: {
    title: { type: 'text', defaultValue: 'Dialog Title' },
    description: { type: 'text', defaultValue: 'Dialog Description' },
    /* DialogContent 우측 상단 X 버튼 */
    showCloseButton: { type: 'boolean', defaultValue: true },
    /* DialogFooter의 Close 버튼 */
    showFooterCloseButton: { type: 'boolean', defaultValue: true },
  },

  render: ({ title, description, showCloseButton, showFooterCloseButton }) => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Open Dialog</Button>
      </DialogTrigger>
      <DialogContent showCloseButton={showCloseButton}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter showCloseButton={showFooterCloseButton}>
          <Button onClick={() => {}}>Confirm</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),

  code: ({ title, description, showCloseButton, showFooterCloseButton }) =>
    [
      `import { Button } from '@/components/ui/button';`,
      `import {`,
      `  Dialog,`,
      `  DialogContent,`,
      `  DialogDescription,`,
      `  DialogFooter,`,
      `  DialogHeader,`,
      `  DialogTitle,`,
      `  DialogTrigger,`,
      `} from '@/components/ui/dialog';`,
      '',
      '<Dialog>',
      '  <DialogTrigger asChild>',
      '    <Button variant="outline">Open Dialog</Button>',
      '  </DialogTrigger>',
      /* showCloseButton은 기본값이 true, DialogFooter의 showCloseButton은 기본값이 false */
      `  <DialogContent${showCloseButton ? '' : ' showCloseButton={false}'}>`,
      '    <DialogHeader>',
      `      <DialogTitle>${title}</DialogTitle>`,
      `      <DialogDescription>${description}</DialogDescription>`,
      '    </DialogHeader>',
      `    <DialogFooter${showFooterCloseButton ? ' showCloseButton' : ''}>`,
      '      <Button onClick={() => {}}>Confirm</Button>',
      '    </DialogFooter>',
      '  </DialogContent>',
      '</Dialog>',
    ].join('\n'),
});
