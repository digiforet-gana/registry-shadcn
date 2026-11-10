import { Fragment } from 'react';
import { definePlayground } from '@/lib/playground';
import { Kbd, KbdGroup } from './kbd';

/* 공백으로 구분한 키 목록 */
const toKeys = (keys: string) => keys.split(/\s+/).filter(Boolean);

/* 사이트 플레이그라운드 전용 파일 (registry.json에 등록하지 않으므로 배포되지 않음) */
export default definePlayground({
  component: 'Kbd',
  importPath: '@/components/ui/kbd',
  controls: {
    /* 표시할 키 (공백으로 구분, 2개 이상이면 KbdGroup으로 묶음) */
    keys: { type: 'text', defaultValue: 'Ctrl B' },
    /* 키 사이에 + 기호 표시 */
    plus: { type: 'boolean', defaultValue: true },
  },

  render: ({ keys, plus }) => {
    const list = toKeys(keys);
    if (list.length === 1) return <Kbd>{list[0]}</Kbd>;

    return (
      <KbdGroup>
        {list.map((key, index) => (
          <Fragment key={index}>
            {plus && index > 0 && <span>+</span>}
            <Kbd>{key}</Kbd>
          </Fragment>
        ))}
      </KbdGroup>
    );
  },

  code: ({ keys, plus }) => {
    const list = toKeys(keys);
    const isGroup = list.length > 1;
    const items = list.flatMap((key, index) => [
      ...(plus && index > 0 ? ['  <span>+</span>'] : []),
      `  <Kbd>${key}</Kbd>`,
    ]);

    return [
      `import { ${isGroup ? 'Kbd, KbdGroup' : 'Kbd'} } from '@/components/ui/kbd';`,
      '',
      ...(isGroup ? ['<KbdGroup>', ...items, '</KbdGroup>'] : list.map((key) => `<Kbd>${key}</Kbd>`)),
    ].join('\n');
  },
});
