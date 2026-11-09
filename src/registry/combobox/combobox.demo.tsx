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

/* 다중 선택: 선택한 값을 칩으로 표시하고, 칩 영역을 기준(anchor)으로 목록을 띄움 */
const MultipleCombobox = ({ placeholder, disabled }: { placeholder: string; disabled: boolean }) => {
  const anchor = useComboboxAnchor();

  return (
    <Combobox multiple autoHighlight items={FRAMEWORKS} defaultValue={[FRAMEWORKS[0]]} disabled={disabled}>
      <ComboboxChips ref={anchor} className="w-full max-w-xs">
        <ComboboxValue>
          {(values: string[]) => (
            <Fragment>
              {values.map((value) => (
                <ComboboxChip key={value}>{value}</ComboboxChip>
              ))}
              <ComboboxChipsInput placeholder={values.length > 0 ? undefined : placeholder} />
            </Fragment>
          )}
        </ComboboxValue>
      </ComboboxChips>
      <ComboboxContent anchor={anchor}>
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
    /* 입력란 우측에 선택 값 지우기(X) 버튼 표시 (단일 선택일 때만 적용) */
    showClear: { type: 'boolean', defaultValue: false },
    disabled: { type: 'boolean', defaultValue: false },
  },

  render: ({ multiple, placeholder, showClear, disabled }) =>
    multiple ? (
      <MultipleCombobox key="multiple" placeholder={placeholder} disabled={disabled} />
    ) : (
      <Combobox key="single" items={FRAMEWORKS}>
        <ComboboxInput placeholder={placeholder} showClear={showClear} disabled={disabled} />
        <ComboboxContent>
          <ComboboxOptions />
        </ComboboxContent>
      </Combobox>
    ),

  code: ({ multiple, placeholder, showClear, disabled }) => {
    const data = `const frameworks = [${FRAMEWORKS.map((name) => `'${name}'`).join(', ')}];`;
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
        '            <ComboboxChip key={value}>{value}</ComboboxChip>',
        '          ))}',
        `          <ComboboxChipsInput placeholder={values.length > 0 ? undefined : '${placeholder}'} />`,
        '        </Fragment>',
        '      )}',
        '    </ComboboxValue>',
        '  </ComboboxChips>',
        '  <ComboboxContent anchor={anchor}>',
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
      `  <ComboboxInput placeholder="${placeholder}"${showClear ? ' showClear' : ''}${disabled ? ' disabled' : ''} />`,
      '  <ComboboxContent>',
      ...options,
      '  </ComboboxContent>',
      '</Combobox>',
    ].join('\n');
  },
});
