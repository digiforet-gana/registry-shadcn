import { definePlayground } from '@/lib/playground';
import { Input } from './input';

/* 사이트 플레이그라운드 전용 파일 (registry.json에 등록하지 않으므로 배포되지 않음) */
export default definePlayground({
  component: 'Input',
  importPath: '@/components/ui/input',
  controls: {
    type: {
      type: 'select',
      options: ['text', 'email', 'password', 'number', 'file'],
      defaultValue: 'text',
    },
    placeholder: { type: 'text', defaultValue: 'Placeholder' },
    disabled: { type: 'boolean', defaultValue: false },
    /* 폼 검증 실패 등 오류 상태 표시 */
    'aria-invalid': { type: 'boolean', defaultValue: false },
  },

  /* type이 바뀌면 입력값 형식이 달라지므로 key로 다시 생성하여 입력값 초기화 */
  render: (props) => <Input key={props.type} className="max-w-sm" {...props} />,

  code: ({ type, placeholder }, formatProps) => {
    /* placeholder는 기본값이어도 사용 예시로 항상 표시 (file 타입은 placeholder가 표시되지 않으므로 제외) */
    const placeholderProp = type === 'file' ? '' : ` placeholder="${placeholder}"`;
    const props = `${formatProps(['type'])}${placeholderProp}${formatProps(['disabled', 'aria-invalid'])}`;

    return `import { Input } from '@/components/ui/input';\n\n<Input${props} />`;
  },
});
