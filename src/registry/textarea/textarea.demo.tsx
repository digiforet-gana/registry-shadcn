import { definePlayground } from '@/lib/playground';
import { Textarea } from './textarea';

/* 사이트 플레이그라운드 전용 파일 (registry.json에 등록하지 않으므로 배포되지 않음) */
export default definePlayground({
  component: 'Textarea',
  importPath: '@/components/ui/textarea',
  controls: {
    placeholder: { type: 'text', defaultValue: 'Type your message here.' },
    disabled: { type: 'boolean', defaultValue: false },
    /* 폼 검증 실패 등 오류 상태 표시 */
    'aria-invalid': { type: 'boolean', defaultValue: false },
  },

  render: (props) => <Textarea className="max-w-sm" {...props} />,

  code: ({ placeholder }, formatProps) => {
    /* placeholder는 기본값이어도 사용 예시로 항상 표시 */
    const props = ` placeholder="${placeholder}"${formatProps(['disabled', 'aria-invalid'])}`;

    return `import { Textarea } from '@/components/ui/textarea';\n\n<Textarea${props} />`;
  },
});
