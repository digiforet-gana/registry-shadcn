import { SearchIcon } from 'lucide-react';
import { definePlayground } from '@/lib/playground';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from './input-group';

/* 사이트 플레이그라운드 전용 파일 (registry.json에 등록하지 않으므로 배포되지 않음) */
export default definePlayground({
  component: 'InputGroup',
  importPath: '@/components/ui/input-group',
  controls: {
    /* 입력 요소 (textarea면 앞뒤 요소가 위 / 아래에 배치) */
    control: { type: 'select', options: ['input', 'textarea'], defaultValue: 'input' },
    /* 앞쪽 요소 (InputGroupAddon align="inline-start" / "block-start") */
    start: { type: 'select', options: ['none', 'icon', 'text'], defaultValue: 'icon' },
    /* 뒤쪽 요소 (InputGroupAddon align="inline-end" / "block-end") */
    end: { type: 'select', options: ['none', 'text', 'button'], defaultValue: 'button' },
    placeholder: { type: 'text', defaultValue: 'Search...' },
    disabled: { type: 'boolean', defaultValue: false },
    /* 폼 검증 실패 등 오류 상태 표시 */
    'aria-invalid': { type: 'boolean', defaultValue: false },
  },

  render: ({ control, start, end, placeholder, disabled, 'aria-invalid': ariaInvalid }) => {
    const isTextarea = control === 'textarea';
    const Control = isTextarea ? InputGroupTextarea : InputGroupInput;

    return (
      <InputGroup className="max-w-sm">
        <Control placeholder={placeholder} disabled={disabled} aria-invalid={ariaInvalid || undefined} />
        {start !== 'none' && (
          <InputGroupAddon align={isTextarea ? 'block-start' : 'inline-start'}>
            {start === 'icon' ? <SearchIcon /> : <InputGroupText>https://</InputGroupText>}
          </InputGroupAddon>
        )}
        {end !== 'none' && (
          <InputGroupAddon align={isTextarea ? 'block-end' : 'inline-end'}>
            {end === 'text' && <InputGroupText>.com</InputGroupText>}
            {end === 'button' && (
              <InputGroupButton variant="secondary" onClick={() => {}}>
                Search
              </InputGroupButton>
            )}
          </InputGroupAddon>
        )}
      </InputGroup>
    );
  },

  code: ({ control, start, end, placeholder, disabled, 'aria-invalid': ariaInvalid }) => {
    const isTextarea = control === 'textarea';
    const controlName = isTextarea ? 'InputGroupTextarea' : 'InputGroupInput';
    const icons = start === 'icon' ? ['SearchIcon'] : [];
    const components = [
      'InputGroup',
      ...(start !== 'none' || end !== 'none' ? ['InputGroupAddon'] : []),
      ...(end === 'button' ? ['InputGroupButton'] : []),
      ...(isTextarea ? [] : ['InputGroupInput']),
      ...(start === 'text' || end === 'text' ? ['InputGroupText'] : []),
      ...(isTextarea ? ['InputGroupTextarea'] : []),
    ];
    const startContent = { none: [], icon: ['<SearchIcon />'], text: ['<InputGroupText>https://</InputGroupText>'] }[
      start
    ];
    /* 클릭 이벤트 연결 위치를 보여주기 위해 onClick은 항상 표시 */
    const endContent = {
      none: [],
      text: ['<InputGroupText>.com</InputGroupText>'],
      button: ['<InputGroupButton variant="secondary" onClick={() => {}}>Search</InputGroupButton>'],
    }[end];
    const addon = (align: string, content: string[]) =>
      content.length > 0
        ? [`  <InputGroupAddon align="${align}">`, ...content.map((line) => `    ${line}`), '  </InputGroupAddon>']
        : [];

    return [
      ...(icons.length > 0 ? [`import { ${icons.join(', ')} } from 'lucide-react';`] : []),
      `import { ${components.join(', ')} } from '@/components/ui/input-group';`,
      '',
      '<InputGroup>',
      `  <${controlName} placeholder="${placeholder}"${disabled ? ' disabled' : ''}${ariaInvalid ? ' aria-invalid' : ''} />`,
      ...addon(isTextarea ? 'block-start' : 'inline-start', startContent),
      ...addon(isTextarea ? 'block-end' : 'inline-end', endContent),
      '</InputGroup>',
    ].join('\n');
  },
});
