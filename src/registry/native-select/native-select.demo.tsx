import { definePlayground } from '@/lib/playground';
import { NativeSelect, NativeSelectOptGroup, NativeSelectOption } from './native-select';

const STATUSES = [
  { value: 'todo', label: 'Todo' },
  { value: 'in-progress', label: 'In Progress' },
  { value: 'done', label: 'Done' },
  { value: 'cancelled', label: 'Cancelled' },
];

/* 그룹 예시 (optgroup) */
const GROUPS = [
  { label: 'Fruits', options: ['Apple', 'Banana', 'Orange'] },
  { label: 'Vegetables', options: ['Carrot', 'Broccoli', 'Spinach'] },
];

const toValue = (label: string) => label.toLowerCase();

/* 사이트 플레이그라운드 전용 파일 (registry.json에 등록하지 않으므로 배포되지 않음) */
export default definePlayground({
  component: 'NativeSelect',
  importPath: '@/components/ui/native-select',
  controls: {
    size: { type: 'select', options: ['default', 'sm'], defaultValue: 'default' },
    /* 옵션을 그룹으로 묶어 표시 (NativeSelectOptGroup) */
    group: { type: 'boolean', defaultValue: false },
    disabled: { type: 'boolean', defaultValue: false },
    /* 폼 검증 실패 등 오류 상태 표시 */
    'aria-invalid': { type: 'boolean', defaultValue: false },
  },

  render: ({ size, group, disabled, 'aria-invalid': ariaInvalid }) => (
    <NativeSelect key={String(group)} size={size} disabled={disabled} aria-invalid={ariaInvalid || undefined}>
      <NativeSelectOption value="">{group ? 'Select a food' : 'Select status'}</NativeSelectOption>
      {group
        ? GROUPS.map((item) => (
            <NativeSelectOptGroup key={item.label} label={item.label}>
              {item.options.map((option) => (
                <NativeSelectOption key={option} value={toValue(option)}>
                  {option}
                </NativeSelectOption>
              ))}
            </NativeSelectOptGroup>
          ))
        : STATUSES.map((status) => (
            <NativeSelectOption key={status.value} value={status.value}>
              {status.label}
            </NativeSelectOption>
          ))}
    </NativeSelect>
  ),

  code: ({ group, 'aria-invalid': ariaInvalid }, formatProps) => {
    const options = group
      ? GROUPS.flatMap((item) => [
          `  <NativeSelectOptGroup label="${item.label}">`,
          ...item.options.map(
            (option) => `    <NativeSelectOption value="${toValue(option)}">${option}</NativeSelectOption>`,
          ),
          '  </NativeSelectOptGroup>',
        ])
      : STATUSES.map((status) => `  <NativeSelectOption value="${status.value}">${status.label}</NativeSelectOption>`);
    const components = ['NativeSelect', ...(group ? ['NativeSelectOptGroup'] : []), 'NativeSelectOption'];

    return [
      `import { ${components.join(', ')} } from '@/components/ui/native-select';`,
      '',
      `<NativeSelect${formatProps(['size', 'disabled'])}${ariaInvalid ? ' aria-invalid' : ''}>`,
      `  <NativeSelectOption value="">${group ? 'Select a food' : 'Select status'}</NativeSelectOption>`,
      ...options,
      '</NativeSelect>',
    ].join('\n');
  },
});
