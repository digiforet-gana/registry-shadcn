import { definePlayground } from '@/lib/playground';
import { Label } from '../label/label';
import { RadioGroup, RadioGroupItem } from './radio-group';

const OPTIONS = [
  { value: 'default', label: 'Default' },
  { value: 'comfortable', label: 'Comfortable' },
  { value: 'compact', label: 'Compact' },
];

/* 사이트 플레이그라운드 전용 파일 (registry.json에 등록하지 않으므로 배포되지 않음) */
export default definePlayground({
  component: 'RadioGroup',
  importPath: '@/components/ui/radio-group',
  controls: {
    /* 항목 배치 방향 (키보드 화살표 이동 방향도 함께 변경) */
    orientation: { type: 'select', options: ['vertical', 'horizontal'], defaultValue: 'vertical' },
    disabled: { type: 'boolean', defaultValue: false },
    /* 폼 검증 실패 등 오류 상태 표시 */
    'aria-invalid': { type: 'boolean', defaultValue: false },
  },

  render: ({ orientation, disabled, 'aria-invalid': ariaInvalid }) => (
    <RadioGroup
      defaultValue="comfortable"
      orientation={orientation}
      disabled={disabled}
      className={orientation === 'horizontal' ? 'flex w-fit gap-4' : 'w-fit'}
    >
      {OPTIONS.map((option) => (
        <div key={option.value} className="flex items-center gap-2">
          <RadioGroupItem id={`radio-${option.value}`} value={option.value} aria-invalid={ariaInvalid} />
          <Label htmlFor={`radio-${option.value}`}>{option.label}</Label>
        </div>
      ))}
    </RadioGroup>
  ),

  code: ({ orientation, 'aria-invalid': ariaInvalid }, formatProps) => {
    const isHorizontal = orientation === 'horizontal';
    const items = OPTIONS.flatMap((option) => [
      '  <div className="flex items-center gap-2">',
      `    <RadioGroupItem id="${option.value}" value="${option.value}"${ariaInvalid ? ' aria-invalid' : ''} />`,
      `    <Label htmlFor="${option.value}">${option.label}</Label>`,
      '  </div>',
    ]);

    return [
      `import { Label } from '@/components/ui/label';`,
      `import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';`,
      '',
      `<RadioGroup defaultValue="comfortable"${formatProps(['orientation', 'disabled'])}${isHorizontal ? ' className="flex gap-4"' : ''}>`,
      ...items,
      '</RadioGroup>',
    ].join('\n');
  },
});
