import { Fragment } from 'react';
import { definePlayground } from '@/lib/playground';
import { Button } from '../button/button';
import { ButtonGroup, ButtonGroupSeparator } from './button-group';

const LABELS = ['Archive', 'Report', 'Snooze'];

/* 사이트 플레이그라운드 전용 파일 (registry.json에 등록하지 않으므로 배포되지 않음) */
export default definePlayground({
  component: 'ButtonGroup',
  importPath: '@/components/ui/button-group',
  controls: {
    orientation: { type: 'select', options: ['horizontal', 'vertical'], defaultValue: 'horizontal' },
    /* 묶인 Button들의 variant / size */
    variant: { type: 'select', options: ['outline', 'secondary', 'default'], defaultValue: 'outline' },
    size: { type: 'select', options: ['default', 'sm', 'lg'], defaultValue: 'default' },
    /* 버튼 사이 구분선 (테두리가 없는 secondary / default 버튼에서 경계 표시용) */
    separator: { type: 'boolean', defaultValue: false },
  },

  render: ({ orientation, variant, size, separator }) => (
    <ButtonGroup orientation={orientation}>
      {LABELS.map((label, index) => (
        <Fragment key={label}>
          {separator && index > 0 && (
            <ButtonGroupSeparator orientation={orientation === 'vertical' ? 'horizontal' : 'vertical'} />
          )}
          <Button variant={variant} size={size}>
            {label}
          </Button>
        </Fragment>
      ))}
    </ButtonGroup>
  ),

  code: ({ orientation, variant, size, separator }, formatProps) => {
    const buttonAttrs = ` variant="${variant}"${size === 'default' ? '' : ` size="${size}"`}`;
    /* 세로 그룹이면 구분선은 가로 방향 */
    const separatorLine =
      orientation === 'vertical' ? '  <ButtonGroupSeparator orientation="horizontal" />' : '  <ButtonGroupSeparator />';
    const items = LABELS.flatMap((label, index) => [
      ...(separator && index > 0 ? [separatorLine] : []),
      `  <Button${buttonAttrs}>${label}</Button>`,
    ]);

    return [
      `import { Button } from '@/components/ui/button';`,
      `import { ${separator ? 'ButtonGroup, ButtonGroupSeparator' : 'ButtonGroup'} } from '@/components/ui/button-group';`,
      '',
      `<ButtonGroup${formatProps(['orientation'])}>`,
      ...items,
      '</ButtonGroup>',
    ].join('\n');
  },
});
