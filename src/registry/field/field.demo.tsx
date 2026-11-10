import { definePlayground } from '@/lib/playground';
import { Input } from '../input/input';
import { Field, FieldContent, FieldDescription, FieldError, FieldGroup, FieldLabel } from './field';

const DESCRIPTION = 'Choose a unique username for your account.';
const ERROR = 'This username is already taken.';

/* 사이트 플레이그라운드 전용 파일 (registry.json에 등록하지 않으므로 배포되지 않음) */
export default definePlayground({
  component: 'Field',
  importPath: '@/components/ui/field',
  controls: {
    /*
     * 레이블과 입력 요소 배치
     * vertical: 위아래, horizontal: 좌우, responsive: FieldGroup 폭이 넓으면 좌우 / 좁으면 위아래
     */
    orientation: { type: 'select', options: ['vertical', 'horizontal', 'responsive'], defaultValue: 'vertical' },
    label: { type: 'text', defaultValue: 'Username' },
    /* 입력 요소 아래 도움말 (FieldDescription) */
    description: { type: 'boolean', defaultValue: true },
    /* 오류 상태 (Field data-invalid + 입력 aria-invalid + FieldError) */
    invalid: { type: 'boolean', defaultValue: false },
    /* 비활성화 상태 (Field data-disabled + 입력 disabled) */
    disabled: { type: 'boolean', defaultValue: false },
  },

  render: ({ orientation, label, description, invalid, disabled }) => {
    const fieldLabel = <FieldLabel htmlFor="field-username">{label}</FieldLabel>;
    const input = <Input id="field-username" placeholder="shadcn" aria-invalid={invalid} disabled={disabled} />;
    const extras = (
      <>
        {description && <FieldDescription>{DESCRIPTION}</FieldDescription>}
        {invalid && <FieldError>{ERROR}</FieldError>}
      </>
    );

    return (
      <FieldGroup className="max-w-lg">
        <Field orientation={orientation} data-invalid={invalid || undefined} data-disabled={disabled || undefined}>
          {/* 세로 배치는 레이블 → 입력 → 설명 순서, 가로 배치는 레이블 + 설명(FieldContent)을 입력 왼쪽에 배치 */}
          {orientation === 'vertical' ? (
            <>
              {fieldLabel}
              {input}
              {extras}
            </>
          ) : (
            <>
              <FieldContent>
                {fieldLabel}
                {extras}
              </FieldContent>
              {input}
            </>
          )}
        </Field>
      </FieldGroup>
    );
  },

  code: ({ orientation, label, description, invalid, disabled }, formatProps) => {
    const isVertical = orientation === 'vertical';
    const components = [
      'Field',
      ...(isVertical ? [] : ['FieldContent']),
      ...(description ? ['FieldDescription'] : []),
      ...(invalid ? ['FieldError'] : []),
      'FieldGroup',
      'FieldLabel',
    ];
    const fieldAttrs = `${formatProps(['orientation'])}${invalid ? ' data-invalid' : ''}${disabled ? ' data-disabled' : ''}`;
    const labelLine = `<FieldLabel htmlFor="username">${label}</FieldLabel>`;
    const inputLine = `<Input id="username" placeholder="shadcn"${invalid ? ' aria-invalid' : ''}${disabled ? ' disabled' : ''} />`;
    const extras = [
      ...(description ? [`<FieldDescription>${DESCRIPTION}</FieldDescription>`] : []),
      ...(invalid ? [`<FieldError>${ERROR}</FieldError>`] : []),
    ];
    const body = isVertical
      ? [labelLine, inputLine, ...extras].map((line) => `    ${line}`)
      : [
          '    <FieldContent>',
          ...[labelLine, ...extras].map((line) => `      ${line}`),
          '    </FieldContent>',
          `    ${inputLine}`,
        ];

    return [
      `import { ${components.join(', ')} } from '@/components/ui/field';`,
      `import { Input } from '@/components/ui/input';`,
      '',
      '<FieldGroup>',
      `  <Field${fieldAttrs}>`,
      ...body,
      '  </Field>',
      '</FieldGroup>',
    ].join('\n');
  },
});
