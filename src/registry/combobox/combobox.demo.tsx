import { Fragment } from 'react';
import { definePlayground } from '@/lib/playground';
import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxValue,
  useComboboxAnchor,
} from './combobox';

const FRAMEWORKS = ['Next.js', 'SvelteKit', 'Nuxt.js', 'Remix', 'Astro'];

type Side = 'top' | 'right' | 'bottom' | 'left';
type Align = 'start' | 'center' | 'end';

/* 항목 목록 (단일 / 다중 공통) */
const ComboboxOptions = () => (
  <>
    <ComboboxEmpty>No items found.</ComboboxEmpty>
    <ComboboxList>
      {(item: string) => (
        <ComboboxItem key={item} value={item}>
          {item}
        </ComboboxItem>
      )}
    </ComboboxList>
  </>
);

type MultipleComboboxProps = {
  placeholder: string;
  showRemove: boolean;
  disabled: boolean;
  invalid: boolean;
  side: Side;
  align: Align;
};

/* 다중 선택: 선택한 값을 칩으로 표시하고, 칩 영역을 기준(anchor)으로 목록을 띄움 */
const MultipleCombobox = ({ placeholder, showRemove, disabled, invalid, side, align }: MultipleComboboxProps) => {
  const anchor = useComboboxAnchor();

  return (
    <Combobox multiple autoHighlight items={FRAMEWORKS} defaultValue={[FRAMEWORKS[0]]} disabled={disabled}>
      <ComboboxChips ref={anchor} className="w-full max-w-xs">
        <ComboboxValue>
          {(values: string[]) => (
            <Fragment>
              {values.map((value) => (
                <ComboboxChip key={value} showRemove={showRemove}>
                  {value}
                </ComboboxChip>
              ))}
              <ComboboxChipsInput
                placeholder={values.length > 0 ? undefined : placeholder}
                aria-invalid={invalid || undefined}
              />
            </Fragment>
          )}
        </ComboboxValue>
      </ComboboxChips>
      <ComboboxContent anchor={anchor} side={side} align={align}>
        <ComboboxOptions />
      </ComboboxContent>
    </Combobox>
  );
};

/* 사이트 플레이그라운드 전용 파일 (registry.json에 등록하지 않으므로 배포되지 않음) */
export default definePlayground({
  component: 'Combobox',
  importPath: '@/components/ui/combobox',
  controls: {
    /* 여러 개 선택 (선택한 값을 칩으로 표시) */
    multiple: { type: 'boolean', defaultValue: false },
    placeholder: { type: 'text', defaultValue: 'Select a framework' },
    /* 입력란 우측 목록 열기(▼) 버튼 표시 (단일 선택일 때만 적용) */
    showTrigger: { type: 'boolean', defaultValue: true },
    /* 입력란 우측에 선택 값 지우기(X) 버튼 표시 (단일 선택일 때만 적용) */
    showClear: { type: 'boolean', defaultValue: false },
    /* 칩 우측 삭제(X) 버튼 표시 (ComboboxChip의 showRemove, 다중 선택일 때만 적용) */
    showRemove: { type: 'boolean', defaultValue: true },
    /* 입력란 기준으로 목록이 표시될 방향 (공간이 부족하면 반대쪽으로 자동 전환) */
    side: { type: 'select', options: ['top', 'right', 'bottom', 'left'], defaultValue: 'bottom' },
    /* side 방향에 수직인 축 기준 정렬 */
    align: { type: 'select', options: ['start', 'center', 'end'], defaultValue: 'start' },
    disabled: { type: 'boolean', defaultValue: false },
    /* 폼 검증 실패 등 오류 상태 표시 */
    'aria-invalid': { type: 'boolean', defaultValue: false },
  },

  render: ({ multiple, placeholder, showTrigger, showClear, showRemove, side, align, disabled, ...rest }) => {
    const invalid = rest['aria-invalid'];

    return multiple ? (
      <MultipleCombobox
        key="multiple"
        placeholder={placeholder}
        showRemove={showRemove}
        disabled={disabled}
        invalid={invalid}
        side={side}
        align={align}
      />
    ) : (
      <Combobox key="single" items={FRAMEWORKS}>
        <ComboboxInput
          placeholder={placeholder}
          showTrigger={showTrigger}
          showClear={showClear}
          disabled={disabled}
          aria-invalid={invalid || undefined}
        />
        <ComboboxContent side={side} align={align}>
          <ComboboxOptions />
        </ComboboxContent>
      </Combobox>
    );
  },

  code: ({ multiple, placeholder, showTrigger, showClear, disabled }, formatProps) => {
    const data = `const frameworks = [${FRAMEWORKS.map((name) => `'${name}'`).join(', ')}];`;
    const invalid = formatProps(['aria-invalid']);
    const position = formatProps(['side', 'align']);
    const options = [
      '    <ComboboxEmpty>No items found.</ComboboxEmpty>',
      '    <ComboboxList>',
      '      {(item) => (',
      '        <ComboboxItem key={item} value={item}>',
      '          {item}',
      '        </ComboboxItem>',
      '      )}',
      '    </ComboboxList>',
    ];

    if (multiple) {
      return [
        `import { Fragment } from 'react';`,
        'import {',
        '  Combobox,',
        '  ComboboxChip,',
        '  ComboboxChips,',
        '  ComboboxChipsInput,',
        '  ComboboxContent,',
        '  ComboboxEmpty,',
        '  ComboboxItem,',
        '  ComboboxList,',
        '  ComboboxValue,',
        '  useComboboxAnchor,',
        `} from '@/components/ui/combobox';`,
        '',
        data,
        '',
        'const anchor = useComboboxAnchor();',
        '',
        `<Combobox multiple autoHighlight items={frameworks} defaultValue={[frameworks[0]]}${disabled ? ' disabled' : ''}>`,
        '  <ComboboxChips ref={anchor} className="w-full max-w-xs">',
        '    <ComboboxValue>',
        '      {(values) => (',
        '        <Fragment>',
        '          {values.map((value) => (',
        `            <ComboboxChip key={value}${formatProps(['showRemove'])}>{value}</ComboboxChip>`,
        '          ))}',
        `          <ComboboxChipsInput placeholder={values.length > 0 ? undefined : '${placeholder}'}${invalid} />`,
        '        </Fragment>',
        '      )}',
        '    </ComboboxValue>',
        '  </ComboboxChips>',
        `  <ComboboxContent anchor={anchor}${position}>`,
        ...options,
        '  </ComboboxContent>',
        '</Combobox>',
      ].join('\n');
    }

    return [
      'import {',
      '  Combobox,',
      '  ComboboxContent,',
      '  ComboboxEmpty,',
      '  ComboboxInput,',
      '  ComboboxItem,',
      '  ComboboxList,',
      `} from '@/components/ui/combobox';`,
      '',
      data,
      '',
      '<Combobox items={frameworks}>',
      `  <ComboboxInput placeholder="${placeholder}"${showTrigger ? '' : ' showTrigger={false}'}${showClear ? ' showClear' : ''}${disabled ? ' disabled' : ''}${invalid} />`,
      `  <ComboboxContent${position}>`,
      ...options,
      '  </ComboboxContent>',
      '</Combobox>',
    ].join('\n');
  },
});
