import { useState } from 'react';
import { definePlayground } from '@/lib/playground';
import { Slider } from './slider';

type PreviewProps = {
  range: boolean;
  step: number;
  orientation: 'horizontal' | 'vertical';
  disabled: boolean;
};

/* 현재 값을 함께 표시하기 위한 미리보기 컴포넌트 */
const SliderPreview = ({ range, step, orientation, disabled }: PreviewProps) => {
  const [value, setValue] = useState(range ? [25, 75] : [50]);

  return (
    <div className={orientation === 'vertical' ? 'flex h-40 items-center gap-4' : 'grid w-full max-w-xs gap-3'}>
      <Slider value={value} onValueChange={setValue} step={step} orientation={orientation} disabled={disabled} />
      <p className="text-sm text-muted-foreground tabular-nums">{value.join(' ~ ')}</p>
    </div>
  );
};

/* 사이트 플레이그라운드 전용 파일 (registry.json에 등록하지 않으므로 배포되지 않음) */
export default definePlayground({
  component: 'Slider',
  importPath: '@/components/ui/slider',
  controls: {
    /* 범위 선택 (값 2개를 전달하면 손잡이가 2개 표시) */
    range: { type: 'boolean', defaultValue: false },
    /* 값이 바뀌는 단위 */
    step: { type: 'select', options: ['1', '5', '10', '25'], defaultValue: '1' },
    orientation: { type: 'select', options: ['horizontal', 'vertical'], defaultValue: 'horizontal' },
    disabled: { type: 'boolean', defaultValue: false },
  },

  render: ({ range, step, orientation, disabled }) => (
    <SliderPreview
      key={String(range)}
      range={range}
      step={Number(step)}
      orientation={orientation}
      disabled={disabled}
    />
  ),

  code: ({ range, step }, formatProps) => {
    const defaultValue = range ? '[25, 75]' : '[50]';
    const stepAttr = step === '1' ? '' : ` step={${step}}`;

    return [
      `import { Slider } from '@/components/ui/slider';`,
      '',
      `<Slider defaultValue={${defaultValue}} max={100}${stepAttr}${formatProps(['orientation', 'disabled'])} />`,
    ].join('\n');
  },
});
