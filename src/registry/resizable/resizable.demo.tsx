import { Fragment } from 'react';
import { definePlayground } from '@/lib/playground';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from './resizable';

const PANEL_NAMES = ['One', 'Two', 'Three'];

/* 사이트 플레이그라운드 전용 파일 (registry.json에 등록하지 않으므로 배포되지 않음) */
export default definePlayground({
  component: 'ResizablePanelGroup',
  importPath: '@/components/ui/resizable',
  controls: {
    /* 패널 배치 방향 (horizontal: 좌우, vertical: 위아래) */
    orientation: { type: 'select', options: ['horizontal', 'vertical'], defaultValue: 'horizontal' },
    /* 패널 개수 */
    panels: { type: 'select', options: ['2', '3'], defaultValue: '2' },
    /* 경계선 가운데에 잡기 손잡이 표시 */
    withHandle: { type: 'boolean', defaultValue: true },
  },

  render: ({ orientation, panels, withHandle }) => {
    const names = PANEL_NAMES.slice(0, Number(panels));
    /* 크기는 문자열로 전달해야 퍼센트로 해석됨 (숫자는 픽셀) */
    const size = `${Math.floor(100 / names.length)}%`;

    return (
      <ResizablePanelGroup
        key={`${orientation}-${panels}`}
        orientation={orientation}
        className="h-50 max-w-md rounded-lg border"
      >
        {names.map((name, index) => (
          <Fragment key={name}>
            {index > 0 && <ResizableHandle withHandle={withHandle} />}
            <ResizablePanel defaultSize={size} minSize="15%">
              <div className="flex h-full items-center justify-center p-6">
                <span className="font-semibold">{name}</span>
              </div>
            </ResizablePanel>
          </Fragment>
        ))}
      </ResizablePanelGroup>
    );
  },

  code: ({ panels, withHandle }, formatProps) => {
    const names = PANEL_NAMES.slice(0, Number(panels));
    const size = `${Math.floor(100 / names.length)}%`;
    const items = names.flatMap((name, index) => [
      ...(index > 0 ? [`  <ResizableHandle${withHandle ? ' withHandle' : ''} />`] : []),
      `  <ResizablePanel defaultSize="${size}" minSize="15%">`,
      '    <div className="flex h-full items-center justify-center p-6">',
      `      <span className="font-semibold">${name}</span>`,
      '    </div>',
      '  </ResizablePanel>',
    ]);

    return [
      `import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';`,
      '',
      `<ResizablePanelGroup${formatProps(['orientation'])} className="h-50 max-w-md rounded-lg border">`,
      ...items,
      '</ResizablePanelGroup>',
    ].join('\n');
  },
});
