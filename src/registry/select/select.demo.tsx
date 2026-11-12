import { definePlayground } from '@/lib/playground';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from './select';

const FRUITS = ['Apple', 'Banana', 'Blueberry', 'Grapes', 'Pineapple'];
/* disabledItem을 켰을 때 비활성화할 항목 */
const DISABLED_FRUIT = 'Grapes';

/* 사이트 플레이그라운드 전용 파일 (registry.json에 등록하지 않으므로 배포되지 않음) */
export default definePlayground({
  component: 'Select',
  importPath: '@/components/ui/select',
  controls: {
    size: { type: 'select', options: ['default', 'sm'], defaultValue: 'default' },
    /* item-aligned: 선택된 항목이 트리거 위치에 겹쳐서 열림, popper: 트리거 아래로 열림 */
    position: { type: 'select', options: ['item-aligned', 'popper'], defaultValue: 'item-aligned' },
    /* 트리거 기준으로 목록이 표시될 방향 (position이 popper일 때만 적용) */
    side: { type: 'select', options: ['top', 'right', 'bottom', 'left'], defaultValue: 'bottom' },
    /* side 방향에 수직인 축 기준 정렬 (position이 popper일 때만 적용) */
    align: { type: 'select', options: ['start', 'center', 'end'], defaultValue: 'center' },
    placeholder: { type: 'text', defaultValue: 'Select a fruit' },
    disabled: { type: 'boolean', defaultValue: false },
    /* 폼 검증 실패 등 오류 상태 표시 */
    'aria-invalid': { type: 'boolean', defaultValue: false },
    /* 일부 항목(SelectItem)만 비활성화 */
    disabledItem: { type: 'boolean', defaultValue: false },
  },

  render: ({ size, position, side, align, placeholder, disabled, 'aria-invalid': ariaInvalid, disabledItem }) => (
    <Select disabled={disabled}>
      <SelectTrigger size={size} aria-invalid={ariaInvalid} className="w-48">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent position={position} side={side} align={align}>
        <SelectGroup>
          <SelectLabel>Fruits</SelectLabel>
          {FRUITS.map((fruit) => (
            <SelectItem key={fruit} value={fruit.toLowerCase()} disabled={disabledItem && fruit === DISABLED_FRUIT}>
              {fruit}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  ),

  code: ({ placeholder, disabledItem }, formatProps) => {
    const items = FRUITS.map((fruit) => {
      const disabledAttr = disabledItem && fruit === DISABLED_FRUIT ? ' disabled' : '';
      return `      <SelectItem value="${fruit.toLowerCase()}"${disabledAttr}>${fruit}</SelectItem>`;
    });

    return [
      `import {`,
      `  Select,`,
      `  SelectContent,`,
      `  SelectGroup,`,
      `  SelectItem,`,
      `  SelectLabel,`,
      `  SelectTrigger,`,
      `  SelectValue,`,
      `} from '@/components/ui/select';`,
      '',
      `<Select${formatProps(['disabled'])}>`,
      `  <SelectTrigger${formatProps(['size', 'aria-invalid'])} className="w-48">`,
      `    <SelectValue placeholder="${placeholder}" />`,
      '  </SelectTrigger>',
      `  <SelectContent${formatProps(['position', 'side', 'align'])}>`,
      '    <SelectGroup>',
      '      <SelectLabel>Fruits</SelectLabel>',
      ...items,
      '    </SelectGroup>',
      '  </SelectContent>',
      '</Select>',
    ].join('\n');
  },
});
