import { useState } from 'react';
import type { DateRange } from 'react-day-picker';
import { enUS, ko } from 'react-day-picker/locale';
import { definePlayground } from '@/lib/playground';
import { Calendar } from './calendar';

const LOCALES = { en: enUS, ko };

type PreviewProps = {
  mode: 'single' | 'multiple' | 'range';
  captionLayout: 'label' | 'dropdown' | 'dropdown-months' | 'dropdown-years';
  numberOfMonths: number;
  showOutsideDays: boolean;
  fixedWeeks: boolean;
  showWeekNumber: boolean;
  locale: keyof typeof LOCALES;
};

/* 선택 상태를 관리하기 위한 미리보기 컴포넌트 (mode마다 값 형태가 다름) */
const CalendarPreview = ({ mode, ...props }: PreviewProps) => {
  const [single, setSingle] = useState<Date | undefined>(new Date());
  const [multiple, setMultiple] = useState<Date[] | undefined>([]);
  const [range, setRange] = useState<DateRange | undefined>();

  const common = {
    ...props,
    locale: LOCALES[props.locale],
    className: 'rounded-lg border',
  };

  if (mode === 'multiple') return <Calendar mode="multiple" selected={multiple} onSelect={setMultiple} {...common} />;
  if (mode === 'range') return <Calendar mode="range" selected={range} onSelect={setRange} {...common} />;
  return <Calendar mode="single" selected={single} onSelect={setSingle} {...common} />;
};

/* 사이트 플레이그라운드 전용 파일 (registry.json에 등록하지 않으므로 배포되지 않음) */
export default definePlayground({
  component: 'Calendar',
  importPath: '@/components/ui/calendar',
  controls: {
    /* single: 날짜 하나, multiple: 여러 날짜, range: 기간(시작 ~ 종료) */
    mode: { type: 'select', options: ['single', 'multiple', 'range'], defaultValue: 'single' },
    /* 상단 연 / 월 표시 방식 (dropdown이면 선택 상자로 바로 이동) */
    captionLayout: {
      type: 'select',
      options: ['label', 'dropdown', 'dropdown-months', 'dropdown-years'],
      defaultValue: 'label',
    },
    /* 한 번에 표시할 달 수 */
    numberOfMonths: { type: 'select', options: ['1', '2'], defaultValue: '1' },
    /* 앞뒤 달의 날짜를 흐리게 표시 */
    showOutsideDays: { type: 'boolean', defaultValue: true },
    /* 달마다 5주 / 6주로 바뀌지 않고 항상 6주 표시 (달을 넘겨도 높이 고정) */
    fixedWeeks: { type: 'boolean', defaultValue: false },
    /* 왼쪽에 주차 번호 표시 */
    showWeekNumber: { type: 'boolean', defaultValue: false },
    /* 요일, 월 이름 등의 표시 언어 */
    locale: { type: 'select', options: ['en', 'ko'], defaultValue: 'en' },
  },

  render: ({ mode, captionLayout, numberOfMonths, showOutsideDays, fixedWeeks, showWeekNumber, locale }) => (
    <CalendarPreview
      key={mode}
      mode={mode}
      captionLayout={captionLayout}
      numberOfMonths={Number(numberOfMonths)}
      showOutsideDays={showOutsideDays}
      fixedWeeks={fixedWeeks}
      showWeekNumber={showWeekNumber}
      locale={locale}
    />
  ),

  code: ({ mode, numberOfMonths, locale }, formatProps) => {
    const state = {
      single: 'const [date, setDate] = useState<Date | undefined>(new Date());',
      multiple: 'const [dates, setDates] = useState<Date[] | undefined>([]);',
      range: 'const [range, setRange] = useState<DateRange | undefined>();',
    }[mode];
    const [value, setter] = {
      single: ['date', 'setDate'],
      multiple: ['dates', 'setDates'],
      range: ['range', 'setRange'],
    }[mode];

    return [
      `import { useState } from 'react';`,
      ...(mode === 'range' ? [`import type { DateRange } from 'react-day-picker';`] : []),
      ...(locale === 'ko' ? [`import { ko } from 'react-day-picker/locale';`] : []),
      `import { Calendar } from '@/components/ui/calendar';`,
      '',
      state,
      '',
      '<Calendar',
      `  mode="${mode}"`,
      `  selected={${value}}`,
      `  onSelect={${setter}}`,
      /* 기본값과 다른 prop만 한 줄씩 표시 */
      ...(['captionLayout', 'showOutsideDays', 'fixedWeeks', 'showWeekNumber'] as const)
        .map((key) => formatProps([key]).trim())
        .filter(Boolean)
        .map((prop) => `  ${prop}`),
      ...(numberOfMonths === '1' ? [] : [`  numberOfMonths={${numberOfMonths}}`]),
      ...(locale === 'ko' ? ['  locale={ko}'] : []),
      '  className="rounded-lg border"',
      '/>',
    ].join('\n');
  },
});
