import { BoldIcon, ItalicIcon, UnderlineIcon } from 'lucide-react';
import { definePlayground } from '@/lib/playground';
import { ToggleGroup, ToggleGroupItem } from './toggle-group';

const ITEMS = [
  { value: 'bold', label: 'Toggle bold', icon: BoldIcon, iconName: 'BoldIcon' },
  { value: 'italic', label: 'Toggle italic', icon: ItalicIcon, iconName: 'ItalicIcon' },
  { value: 'underline', label: 'Toggle underline', icon: UnderlineIcon, iconName: 'UnderlineIcon' },
];

/* 사이트 플레이그라운드 전용 파일 (registry.json에 등록하지 않으므로 배포되지 않음) */
export default definePlayground({
  component: 'ToggleGroup',
  importPath: '@/components/ui/toggle-group',
  controls: {
    /* single: 하나만 켜짐, multiple: 여러 개 동시에 켜짐 */
    type: { type: 'select', options: ['single', 'multiple'], defaultValue: 'multiple' },
    variant: { type: 'select', options: ['default', 'outline'], defaultValue: 'default' },
    size: { type: 'select', options: ['default', 'sm', 'lg'], defaultValue: 'default' },
    /* 항목 사이 간격 (0이면 항목이 붙어서 하나의 버튼 묶음처럼 표시) */
    spacing: { type: 'select', options: ['0', '1', '2', '4'], defaultValue: '2' },
    orientation: { type: 'select', options: ['horizontal', 'vertical'], defaultValue: 'horizontal' },
    disabled: { type: 'boolean', defaultValue: false },
  },

  render: ({ type, variant, size, spacing, orientation, disabled }) => {
    const items = ITEMS.map(({ value, label, icon: Icon }) => (
      <ToggleGroupItem key={value} value={value} aria-label={label}>
        <Icon />
      </ToggleGroupItem>
    ));
    const props = { variant, size, spacing: Number(spacing), orientation, disabled };

    /* type에 따라 값 형태(string / string[])가 달라지므로 key로 다시 마운트 */
    return type === 'single' ? (
      <ToggleGroup key="single" type="single" {...props}>
        {items}
      </ToggleGroup>
    ) : (
      <ToggleGroup key="multiple" type="multiple" {...props}>
        {items}
      </ToggleGroup>
    );
  },

  code: ({ type, spacing }, formatProps) => {
    const icons = ITEMS.map((item) => item.iconName).join(', ');
    const items = ITEMS.flatMap((item) => [
      `  <ToggleGroupItem value="${item.value}" aria-label="${item.label}">`,
      `    <${item.iconName} />`,
      '  </ToggleGroupItem>',
    ]);
    /* spacing은 숫자 prop이므로 직접 출력 (기본값 2) */
    const spacingAttr = spacing === '2' ? '' : ` spacing={${spacing}}`;

    return [
      `import { ${icons} } from 'lucide-react';`,
      `import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';`,
      '',
      `<ToggleGroup type="${type}"${formatProps(['variant', 'size'])}${spacingAttr}${formatProps(['orientation', 'disabled'])}>`,
      ...items,
      '</ToggleGroup>',
    ].join('\n');
  },
});
