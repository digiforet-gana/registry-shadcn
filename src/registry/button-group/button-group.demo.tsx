import { Fragment } from 'react';
import { definePlayground } from '@/lib/playground';
import { Button } from '../button/button';
import { ButtonGroup, ButtonGroupSeparator, ButtonGroupText } from './button-group';

const LABELS = ['Archive', 'Report', 'Snooze'];

/* 사이트 플레이그라운드 전용 파일 (registry.json에 등록하지 않으므로 배포되지 않음) */
export default definePlayground({
  component: 'ButtonGroup',
  importPath: '@/components/ui/button-group',
  controls: {
    orientation: { type: 'select', options: ['horizontal', 'vertical'], defaultValue: 'horizontal' },
    /* 버튼 사이 구분선 (테두리가 없는 secondary / default 버튼에서 경계 표시용) */
    separator: { type: 'boolean', defaultValue: false },
    /* 맨 앞에 버튼이 아닌 텍스트 영역 (ButtonGroupText) */
    text: { type: 'boolean', defaultValue: false },
  },

  render: ({ orientation, separator, text }) => (
    <ButtonGroup orientation={orientation}>
      {text && <ButtonGroupText>Mail</ButtonGroupText>}
      {LABELS.map((label, index) => (
        <Fragment key={label}>
          {separator && index > 0 && (
            <ButtonGroupSeparator orientation={orientation === 'vertical' ? 'horizontal' : 'vertical'} />
          )}
          <Button variant="outline" onClick={() => {}}>
            {label}
          </Button>
        </Fragment>
      ))}
    </ButtonGroup>
  ),

  code: ({ orientation, separator, text }, formatProps) => {
    /* 세로 그룹이면 구분선은 가로 방향 */
    const separatorLine =
      orientation === 'vertical' ? '  <ButtonGroupSeparator orientation="horizontal" />' : '  <ButtonGroupSeparator />';
    const items = LABELS.flatMap((label, index) => [
      ...(separator && index > 0 ? [separatorLine] : []),
      `  <Button variant="outline" onClick={() => {}}>${label}</Button>`,
    ]);
    const components = [
      'ButtonGroup',
      ...(separator ? ['ButtonGroupSeparator'] : []),
      ...(text ? ['ButtonGroupText'] : []),
    ];

    return [
      `import { Button } from '@/components/ui/button';`,
      `import { ${components.join(', ')} } from '@/components/ui/button-group';`,
      '',
      `<ButtonGroup${formatProps(['orientation'])}>`,
      ...(text ? ['  <ButtonGroupText>Mail</ButtonGroupText>'] : []),
      ...items,
      '</ButtonGroup>',
    ].join('\n');
  },
});
