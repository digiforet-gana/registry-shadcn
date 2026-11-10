import { Fragment } from 'react';
import { REGEXP_ONLY_DIGITS, REGEXP_ONLY_DIGITS_AND_CHARS } from 'input-otp';
import { definePlayground } from '@/lib/playground';
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from './input-otp';

const PATTERNS = {
  digits: { value: REGEXP_ONLY_DIGITS, name: 'REGEXP_ONLY_DIGITS' },
  alphanumeric: { value: REGEXP_ONLY_DIGITS_AND_CHARS, name: 'REGEXP_ONLY_DIGITS_AND_CHARS' },
};

/* 칸 묶음 (separator가 켜져 있으면 절반씩 두 그룹, 아니면 한 그룹) */
const getGroups = (length: number, separator: boolean) => {
  const indexes = Array.from({ length }, (_, i) => i);
  return separator ? [indexes.slice(0, length / 2), indexes.slice(length / 2)] : [indexes];
};

/* 사이트 플레이그라운드 전용 파일 (registry.json에 등록하지 않으므로 배포되지 않음) */
export default definePlayground({
  component: 'InputOTP',
  importPath: '@/components/ui/input-otp',
  controls: {
    /* 자릿수 */
    maxLength: { type: 'select', options: ['4', '6'], defaultValue: '6' },
    /* 칸을 절반씩 나누고 사이에 구분선(InputOTPSeparator) 표시 */
    separator: { type: 'boolean', defaultValue: true },
    /* 입력 허용 문자 (digits: 숫자만, alphanumeric: 영문 + 숫자) */
    pattern: { type: 'select', options: ['digits', 'alphanumeric'], defaultValue: 'digits' },
    disabled: { type: 'boolean', defaultValue: false },
    /* 폼 검증 실패 등 오류 상태 표시 */
    'aria-invalid': { type: 'boolean', defaultValue: false },
  },

  render: ({ maxLength, separator, pattern, disabled, 'aria-invalid': ariaInvalid }) => {
    const length = Number(maxLength);

    return (
      <InputOTP key={maxLength} maxLength={length} pattern={PATTERNS[pattern].value} disabled={disabled}>
        {getGroups(length, separator).map((group, index) => (
          <Fragment key={index}>
            {index > 0 && <InputOTPSeparator />}
            <InputOTPGroup>
              {group.map((slot) => (
                <InputOTPSlot key={slot} index={slot} aria-invalid={ariaInvalid || undefined} />
              ))}
            </InputOTPGroup>
          </Fragment>
        ))}
      </InputOTP>
    );
  },

  code: ({ maxLength, separator, pattern, disabled, 'aria-invalid': ariaInvalid }) => {
    const length = Number(maxLength);
    const { name } = PATTERNS[pattern];
    const groups = getGroups(length, separator).flatMap((group, index) => [
      ...(index > 0 ? ['  <InputOTPSeparator />'] : []),
      '  <InputOTPGroup>',
      ...group.map((slot) => `    <InputOTPSlot index={${slot}}${ariaInvalid ? ' aria-invalid' : ''} />`),
      '  </InputOTPGroup>',
    ]);
    const components = ['InputOTP', 'InputOTPGroup', ...(separator ? ['InputOTPSeparator'] : []), 'InputOTPSlot'];

    return [
      `import { ${name} } from 'input-otp';`,
      `import { ${components.join(', ')} } from '@/components/ui/input-otp';`,
      '',
      `<InputOTP maxLength={${length}} pattern={${name}}${disabled ? ' disabled' : ''}>`,
      ...groups,
      '</InputOTP>',
    ].join('\n');
  },
});
