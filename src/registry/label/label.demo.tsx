import { definePlayground } from '@/lib/playground';
import { Checkbox } from '../checkbox/checkbox';
import { Label } from './label';

/* 사이트 플레이그라운드 전용 파일 (registry.json에 등록하지 않으므로 배포되지 않음) */
export default definePlayground({
  component: 'Label',
  importPath: '@/components/ui/label',
  controls: {
    children: { type: 'text', defaultValue: 'Accept terms and conditions' },
    /* 연결된 요소(peer)가 비활성화되면 Label도 흐리게 표시되는지 확인 */
    disabled: { type: 'boolean', defaultValue: false },
  },

  render: ({ children, disabled }) => (
    <div className="flex items-center gap-2">
      <Checkbox id="label-demo" disabled={disabled} />
      <Label htmlFor="label-demo">{children}</Label>
    </div>
  ),

  code: ({ children }, formatProps) => {
    const props = formatProps(['disabled']);

    return [
      `import { Checkbox } from '@/components/ui/checkbox';`,
      `import { Label } from '@/components/ui/label';`,
      '',
      '<div className="flex items-center gap-2">',
      `  <Checkbox id="terms"${props} />`,
      `  <Label htmlFor="terms">${children}</Label>`,
      '</div>',
    ].join('\n');
  },
});
