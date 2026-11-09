import { definePlayground } from '@/lib/playground';
import { Progress } from './progress';

/* 입력값을 0 ~ 100 사이 숫자로 변환 (숫자가 아니면 0) */
const toPercent = (value: string) => Math.min(100, Math.max(0, Number(value) || 0));

/* 사이트 플레이그라운드 전용 파일 (registry.json에 등록하지 않으므로 배포되지 않음) */
export default definePlayground({
  component: 'Progress',
  importPath: '@/components/ui/progress',
  controls: {
    /* 진행률 (0 ~ 100) */
    value: { type: 'text', defaultValue: '60' },
    /* 위쪽에 제목과 퍼센트 표시 */
    label: { type: 'boolean', defaultValue: false },
  },

  render: ({ value, label }) => {
    const percent = toPercent(value);

    return (
      <div className="grid w-full max-w-sm gap-2">
        {label && (
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium">Upload progress</span>
            <span className="text-muted-foreground">{percent}%</span>
          </div>
        )}
        <Progress value={percent} />
      </div>
    );
  },

  code: ({ value, label }) => {
    const percent = toPercent(value);
    const progress = `<Progress value={${percent}} />`;

    return [
      `import { Progress } from '@/components/ui/progress';`,
      '',
      ...(label
        ? [
            '<div className="grid w-full max-w-sm gap-2">',
            '  <div className="flex items-center justify-between text-sm">',
            '    <span className="font-medium">Upload progress</span>',
            `    <span className="text-muted-foreground">${percent}%</span>`,
            '  </div>',
            `  ${progress}`,
            '</div>',
          ]
        : [progress]),
    ].join('\n');
  },
});
