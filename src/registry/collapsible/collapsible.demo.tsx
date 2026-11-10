import { ChevronsUpDownIcon } from 'lucide-react';
import { definePlayground } from '@/lib/playground';
import { Button } from '../button/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './collapsible';

const REPOS = ['@radix-ui/primitives', '@radix-ui/colors', '@stitches/react'];

/* 사이트 플레이그라운드 전용 파일 (registry.json에 등록하지 않으므로 배포되지 않음) */
export default definePlayground({
  component: 'Collapsible',
  importPath: '@/components/ui/collapsible',
  controls: {
    /* 처음부터 펼친 상태로 시작 */
    defaultOpen: { type: 'boolean', defaultValue: false },
    /* 펼치기 / 접기 비활성화 */
    disabled: { type: 'boolean', defaultValue: false },
  },

  render: ({ defaultOpen, disabled }) => (
    <Collapsible
      key={String(defaultOpen)}
      defaultOpen={defaultOpen}
      disabled={disabled}
      className="flex w-80 flex-col gap-2"
    >
      <div className="flex items-center justify-between gap-4 px-4">
        <h4 className="text-sm font-semibold">@peduarte starred 3 repositories</h4>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="icon-sm" aria-label="Toggle details">
            <ChevronsUpDownIcon />
          </Button>
        </CollapsibleTrigger>
      </div>
      <div className="rounded-md border px-4 py-2 font-mono text-sm">{REPOS[0]}</div>
      <CollapsibleContent className="flex flex-col gap-2">
        {REPOS.slice(1).map((repo) => (
          <div key={repo} className="rounded-md border px-4 py-2 font-mono text-sm">
            {repo}
          </div>
        ))}
      </CollapsibleContent>
    </Collapsible>
  ),

  code: (_, formatProps) =>
    [
      `import { ChevronsUpDownIcon } from 'lucide-react';`,
      `import { Button } from '@/components/ui/button';`,
      `import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';`,
      '',
      `<Collapsible${formatProps(['defaultOpen', 'disabled'])} className="flex w-80 flex-col gap-2">`,
      '  <div className="flex items-center justify-between gap-4 px-4">',
      '    <h4 className="text-sm font-semibold">@peduarte starred 3 repositories</h4>',
      '    <CollapsibleTrigger asChild>',
      '      <Button variant="ghost" size="icon-sm" aria-label="Toggle details">',
      '        <ChevronsUpDownIcon />',
      '      </Button>',
      '    </CollapsibleTrigger>',
      '  </div>',
      `  <div className="rounded-md border px-4 py-2 font-mono text-sm">${REPOS[0]}</div>`,
      '  <CollapsibleContent className="flex flex-col gap-2">',
      ...REPOS.slice(1).map(
        (repo) => `    <div className="rounded-md border px-4 py-2 font-mono text-sm">${repo}</div>`,
      ),
      '  </CollapsibleContent>',
      '</Collapsible>',
    ].join('\n'),
});
