import { definePlayground } from '@/lib/playground';
import { Badge } from './badge';

/* 사이트 플레이그라운드 전용 파일 (registry.json에 등록하지 않으므로 배포되지 않음) */
export default definePlayground({
  component: 'Badge',
  importPath: '@/components/ui/badge',
  controls: {
    variant: {
      type: 'select',
      options: ['default', 'secondary', 'destructive', 'outline', 'ghost', 'link'],
      defaultValue: 'default',
    },
    children: { type: 'text', defaultValue: 'Badge' },
  },
  render: (props) => <Badge {...props} />,
});
