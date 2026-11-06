import { definePlayground } from '@/lib/playground';
import { Label } from '../label/label';
import { Switch } from './switch';

/* 사이트 플레이그라운드 전용 파일 (registry.json에 등록하지 않으므로 배포되지 않음) */
export default definePlayground({
  component: 'Switch',
  importPath: '@/components/ui/switch',
  controls: {
    size: { type: 'select', options: ['default', 'sm'], defaultValue: 'default' },
    disabled: { type: 'boolean', defaultValue: false },
    /* 폼 검증 실패 등 오류 상태 표시 */
    'aria-invalid': { type: 'boolean', defaultValue: false },
    label: { type: 'text', defaultValue: 'Airplane Mode' },
  },

  render: ({ label, ...props }) => (
    <div className="flex items-center gap-2">
      <Switch id="switch-demo" {...props} />
      <Label htmlFor="switch-demo">{label}</Label>
    </div>
  ),

  code: ({ label }, formatProps) => {
    const props = formatProps(['size', 'disabled', 'aria-invalid']);

    return [
      `import { Label } from '@/components/ui/label';`,
      `import { Switch } from '@/components/ui/switch';`,
      '',
      '<div className="flex items-center gap-2">',
      `  <Switch id="airplane-mode"${props} />`,
      `  <Label htmlFor="airplane-mode">${label}</Label>`,
      '</div>',
    ].join('\n');
  },
});
