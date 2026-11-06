import { definePlayground } from '@/lib/playground';
import { Label } from '../label/label';
import { Checkbox } from './checkbox';

/* 사이트 플레이그라운드 전용 파일 (registry.json에 등록하지 않으므로 배포되지 않음) */
export default definePlayground({
  component: 'Checkbox',
  importPath: '@/components/ui/checkbox',
  controls: {
    disabled: { type: 'boolean', defaultValue: false },
    /* 폼 검증 실패 등 오류 상태 표시 */
    'aria-invalid': { type: 'boolean', defaultValue: false },
    label: { type: 'text', defaultValue: 'Accept terms and conditions' },
  },

  render: ({ label, ...props }) => (
    <div className="flex items-center gap-2">
      <Checkbox id="checkbox-demo" {...props} />
      <Label htmlFor="checkbox-demo">{label}</Label>
    </div>
  ),

  code: ({ label }, formatProps) => {
    const props = formatProps(['disabled', 'aria-invalid']);

    return [
      `import { Checkbox } from '@/components/ui/checkbox';`,
      `import { Label } from '@/components/ui/label';`,
      '',
      '<div className="flex items-center gap-2">',
      `  <Checkbox id="terms"${props} />`,
      `  <Label htmlFor="terms">${label}</Label>`,
      '</div>',
    ].join('\n');
  },
});
