import { ArrowUpRightIcon, FolderCodeIcon } from 'lucide-react';
import { definePlayground } from '@/lib/playground';
import { Button } from '../button/button';
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from './empty';

/* 사이트 플레이그라운드 전용 파일 (registry.json에 등록하지 않으므로 배포되지 않음) */
export default definePlayground({
  component: 'Empty',
  importPath: '@/components/ui/empty',
  controls: {
    /* 위쪽 아이콘 영역 (EmptyMedia) */
    media: { type: 'boolean', defaultValue: true },
    /* EmptyMedia의 variant (default: 아이콘만, icon: 배경이 있는 아이콘) */
    mediaVariant: { type: 'select', options: ['default', 'icon'], defaultValue: 'icon' },
    title: { type: 'text', defaultValue: 'No Projects Yet' },
    description: {
      type: 'text',
      defaultValue: "You haven't created any projects yet. Get started by creating your first project.",
    },
    /* 아래쪽 동작 버튼 (EmptyContent) */
    actions: { type: 'boolean', defaultValue: true },
    /* 점선 테두리 (className="border") */
    border: { type: 'boolean', defaultValue: true },
  },

  render: ({ media, mediaVariant, title, description, actions, border }) => (
    <Empty className={border ? 'border' : undefined}>
      <EmptyHeader>
        {media && (
          <EmptyMedia variant={mediaVariant}>
            <FolderCodeIcon />
          </EmptyMedia>
        )}
        <EmptyTitle>{title}</EmptyTitle>
        <EmptyDescription>{description}</EmptyDescription>
      </EmptyHeader>
      {actions && (
        <EmptyContent>
          <div className="flex gap-2">
            <Button onClick={() => {}}>Create Project</Button>
            <Button variant="outline" onClick={() => {}}>
              Import Project
            </Button>
          </div>
        </EmptyContent>
      )}
      {actions && (
        <Button variant="link" asChild className="text-muted-foreground" size="sm">
          <a href="#" onClick={(event) => event.preventDefault()}>
            Learn More <ArrowUpRightIcon />
          </a>
        </Button>
      )}
    </Empty>
  ),

  code: ({ media, mediaVariant, title, description, actions, border }) => {
    const icons = [...(actions ? ['ArrowUpRightIcon'] : []), ...(media ? ['FolderCodeIcon'] : [])];
    const components = [
      'Empty',
      ...(actions ? ['EmptyContent'] : []),
      'EmptyDescription',
      'EmptyHeader',
      ...(media ? ['EmptyMedia'] : []),
      'EmptyTitle',
    ];

    return [
      ...(icons.length > 0 ? [`import { ${icons.join(', ')} } from 'lucide-react';`] : []),
      ...(actions ? [`import { Button } from '@/components/ui/button';`] : []),
      `import { ${components.join(', ')} } from '@/components/ui/empty';`,
      '',
      `<Empty${border ? ' className="border"' : ''}>`,
      '  <EmptyHeader>',
      /* EmptyMedia의 variant 기본값은 default */
      ...(media
        ? [
            `    <EmptyMedia${mediaVariant === 'default' ? '' : ` variant="${mediaVariant}"`}>`,
            '      <FolderCodeIcon />',
            '    </EmptyMedia>',
          ]
        : []),
      `    <EmptyTitle>${title}</EmptyTitle>`,
      `    <EmptyDescription>${description}</EmptyDescription>`,
      '  </EmptyHeader>',
      ...(actions
        ? [
            '  <EmptyContent>',
            '    <div className="flex gap-2">',
            '      <Button onClick={() => {}}>Create Project</Button>',
            '      <Button variant="outline" onClick={() => {}}>Import Project</Button>',
            '    </div>',
            '  </EmptyContent>',
            '  <Button variant="link" asChild className="text-muted-foreground" size="sm">',
            '    <a href="#">',
            '      Learn More <ArrowUpRightIcon />',
            '    </a>',
            '  </Button>',
          ]
        : []),
      '</Empty>',
    ].join('\n');
  },
});
