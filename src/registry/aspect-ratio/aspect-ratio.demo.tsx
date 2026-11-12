import { definePlayground } from '@/lib/playground';
import { AspectRatio } from './aspect-ratio';

/* 표시 이름 → [가로, 세로] */
const RATIOS = {
  '16:9': [16, 9],
  '4:3': [4, 3],
  '1:1': [1, 1],
  '3:4': [3, 4],
  '9:16': [9, 16],
} as const;

/* 사이트 플레이그라운드 전용 파일 (registry.json에 등록하지 않으므로 배포되지 않음) */
export default definePlayground({
  component: 'AspectRatio',
  importPath: '@/components/ui/aspect-ratio',
  controls: {
    /* 가로 : 세로 비율 (너비에 맞춰 높이가 자동으로 정해짐) */
    ratio: { type: 'select', options: ['16:9', '4:3', '1:1', '3:4', '9:16'], defaultValue: '16:9' },
  },

  /* AspectRatio는 감싸는 영역의 너비를 기준으로 높이를 정함 */
  render: ({ ratio }) => {
    const [x, y] = RATIOS[ratio];

    return (
      <div className="w-64">
        <AspectRatio ratio={x / y} className="flex items-center justify-center rounded-lg bg-muted">
          <span className="text-sm font-medium text-muted-foreground">{ratio}</span>
        </AspectRatio>
      </div>
    );
  },

  code: ({ ratio }) => {
    const [x, y] = RATIOS[ratio];

    return [
      `import { AspectRatio } from '@/components/ui/aspect-ratio';`,
      '',
      '<div className="w-64">',
      `  <AspectRatio ratio={${x} / ${y}} className="rounded-lg bg-muted">`,
      '    <img src="..." alt="Photo" className="size-full rounded-lg object-cover" />',
      '  </AspectRatio>',
      '</div>',
    ].join('\n');
  },
});
