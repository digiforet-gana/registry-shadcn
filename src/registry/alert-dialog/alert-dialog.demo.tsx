import { Trash2Icon } from 'lucide-react';
import { definePlayground } from '@/lib/playground';
import { Button } from '../button/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from './alert-dialog';

/* 사이트 플레이그라운드 전용 파일 (registry.json에 등록하지 않으므로 배포되지 않음) */
export default definePlayground({
  component: 'AlertDialog',
  importPath: '@/components/ui/alert-dialog',
  controls: {
    /* sm: 폭이 좁고 내용이 가운데 정렬되며, 하단 버튼이 2열로 배치 */
    size: { type: 'select', options: ['default', 'sm'], defaultValue: 'default' },
    title: { type: 'text', defaultValue: 'Delete this project?' },
    description: {
      type: 'text',
      defaultValue: 'This action cannot be undone. This will permanently delete your project.',
    },
    /* 제목 옆 아이콘 영역 (AlertDialogMedia) */
    media: { type: 'boolean', defaultValue: true },
    /* 확인 버튼을 위험 동작 스타일로 표시 */
    destructive: { type: 'boolean', defaultValue: true },
  },

  render: ({ size, title, description, media, destructive }) => (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline">Delete Project</Button>
      </AlertDialogTrigger>
      <AlertDialogContent size={size}>
        <AlertDialogHeader>
          {media && (
            <AlertDialogMedia>
              <Trash2Icon />
            </AlertDialogMedia>
          )}
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction variant={destructive ? 'destructive' : 'default'}>Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ),

  code: ({ title, description, media, destructive }, formatProps) =>
    [
      ...(media ? [`import { Trash2Icon } from 'lucide-react';`] : []),
      `import {`,
      `  AlertDialog,`,
      `  AlertDialogAction,`,
      `  AlertDialogCancel,`,
      `  AlertDialogContent,`,
      `  AlertDialogDescription,`,
      `  AlertDialogFooter,`,
      `  AlertDialogHeader,`,
      ...(media ? [`  AlertDialogMedia,`] : []),
      `  AlertDialogTitle,`,
      `  AlertDialogTrigger,`,
      `} from '@/components/ui/alert-dialog';`,
      `import { Button } from '@/components/ui/button';`,
      '',
      '<AlertDialog>',
      '  <AlertDialogTrigger asChild>',
      '    <Button variant="outline">Delete Project</Button>',
      '  </AlertDialogTrigger>',
      `  <AlertDialogContent${formatProps(['size'])}>`,
      '    <AlertDialogHeader>',
      ...(media ? ['      <AlertDialogMedia>', '        <Trash2Icon />', '      </AlertDialogMedia>'] : []),
      `      <AlertDialogTitle>${title}</AlertDialogTitle>`,
      `      <AlertDialogDescription>${description}</AlertDialogDescription>`,
      '    </AlertDialogHeader>',
      '    <AlertDialogFooter>',
      '      <AlertDialogCancel>Cancel</AlertDialogCancel>',
      `      <AlertDialogAction${destructive ? ' variant="destructive"' : ''}>Delete</AlertDialogAction>`,
      '    </AlertDialogFooter>',
      '  </AlertDialogContent>',
      '</AlertDialog>',
    ].join('\n'),
});
