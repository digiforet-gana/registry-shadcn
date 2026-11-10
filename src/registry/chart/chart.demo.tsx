import { Area, AreaChart, Bar, BarChart, CartesianGrid, Line, LineChart, XAxis } from 'recharts';
import { definePlayground } from '@/lib/playground';
import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from './chart';

const DATA = [
  { month: 'January', desktop: 186, mobile: 80 },
  { month: 'February', desktop: 305, mobile: 200 },
  { month: 'March', desktop: 237, mobile: 120 },
  { month: 'April', desktop: 73, mobile: 190 },
  { month: 'May', desktop: 209, mobile: 130 },
  { month: 'June', desktop: 214, mobile: 140 },
];

/* 데이터 키별 표시 이름과 색상 (색상은 테마의 --chart-N 변수 사용) */
const CONFIG = {
  desktop: { label: 'Desktop', color: 'var(--chart-1)' },
  mobile: { label: 'Mobile', color: 'var(--chart-2)' },
} satisfies ChartConfig;

const KEYS = ['desktop', 'mobile'] as const;

/* 사이트 플레이그라운드 전용 파일 (registry.json에 등록하지 않으므로 배포되지 않음) */
export default definePlayground({
  component: 'ChartContainer',
  importPath: '@/components/ui/chart',
  controls: {
    /* 차트 종류 (recharts의 BarChart / LineChart / AreaChart) */
    type: { type: 'select', options: ['bar', 'line', 'area'], defaultValue: 'bar' },
    /* 마우스를 올리면 값 표시 (ChartTooltip) */
    tooltip: { type: 'boolean', defaultValue: true },
    /* 아래쪽 범례 (ChartLegend) */
    legend: { type: 'boolean', defaultValue: false },
    /* 가로 격자선 (CartesianGrid) */
    grid: { type: 'boolean', defaultValue: true },
  },

  render: ({ type, tooltip, legend, grid }) => {
    /* 차트 종류와 상관없이 공통으로 들어가는 축 / 격자 / 툴팁 / 범례 */
    const common = (
      <>
        {grid && <CartesianGrid vertical={false} />}
        <XAxis
          dataKey="month"
          tickLine={false}
          axisLine={false}
          tickMargin={10}
          tickFormatter={(value: string) => value.slice(0, 3)}
        />
        {tooltip && <ChartTooltip content={<ChartTooltipContent />} />}
        {legend && <ChartLegend content={<ChartLegendContent />} />}
      </>
    );

    return (
      <ChartContainer config={CONFIG} className="min-h-50 w-full max-w-lg">
        {type === 'line' ? (
          <LineChart accessibilityLayer data={DATA}>
            {common}
            {KEYS.map((key) => (
              <Line key={key} dataKey={key} type="natural" stroke={`var(--color-${key})`} strokeWidth={2} dot={false} />
            ))}
          </LineChart>
        ) : type === 'area' ? (
          <AreaChart accessibilityLayer data={DATA}>
            {common}
            {KEYS.map((key) => (
              <Area
                key={key}
                dataKey={key}
                type="natural"
                fill={`var(--color-${key})`}
                fillOpacity={0.4}
                stroke={`var(--color-${key})`}
                stackId="a"
              />
            ))}
          </AreaChart>
        ) : (
          <BarChart accessibilityLayer data={DATA}>
            {common}
            {KEYS.map((key) => (
              <Bar key={key} dataKey={key} fill={`var(--color-${key})`} radius={4} />
            ))}
          </BarChart>
        )}
      </ChartContainer>
    );
  },

  code: ({ type, tooltip, legend, grid }) => {
    const chartName = { bar: 'BarChart', line: 'LineChart', area: 'AreaChart' }[type];
    const seriesName = { bar: 'Bar', line: 'Line', area: 'Area' }[type];
    const series = KEYS.map(
      (key) =>
        ({
          bar: `    <Bar dataKey="${key}" fill="var(--color-${key})" radius={4} />`,
          line: `    <Line dataKey="${key}" type="natural" stroke="var(--color-${key})" strokeWidth={2} dot={false} />`,
          area: `    <Area dataKey="${key}" type="natural" fill="var(--color-${key})" fillOpacity={0.4} stroke="var(--color-${key})" stackId="a" />`,
        })[type],
    );
    const rechartsImports = [seriesName, chartName, ...(grid ? ['CartesianGrid'] : []), 'XAxis'];
    const chartImports = [
      'type ChartConfig',
      'ChartContainer',
      ...(legend ? ['ChartLegend', 'ChartLegendContent'] : []),
      ...(tooltip ? ['ChartTooltip', 'ChartTooltipContent'] : []),
    ];

    return [
      `import { ${rechartsImports.join(', ')} } from 'recharts';`,
      `import { ${chartImports.join(', ')} } from '@/components/ui/chart';`,
      '',
      'const chartData = [',
      ...DATA.map((row) => `  { month: '${row.month}', desktop: ${row.desktop}, mobile: ${row.mobile} },`),
      '];',
      '',
      'const chartConfig = {',
      `  desktop: { label: 'Desktop', color: 'var(--chart-1)' },`,
      `  mobile: { label: 'Mobile', color: 'var(--chart-2)' },`,
      '} satisfies ChartConfig;',
      '',
      '<ChartContainer config={chartConfig} className="min-h-50 w-full">',
      `  <${chartName} accessibilityLayer data={chartData}>`,
      ...(grid ? ['    <CartesianGrid vertical={false} />'] : []),
      '    <XAxis',
      '      dataKey="month"',
      '      tickLine={false}',
      '      axisLine={false}',
      '      tickMargin={10}',
      '      tickFormatter={(value) => value.slice(0, 3)}',
      '    />',
      ...(tooltip ? ['    <ChartTooltip content={<ChartTooltipContent />} />'] : []),
      ...(legend ? ['    <ChartLegend content={<ChartLegendContent />} />'] : []),
      ...series,
      `  </${chartName}>`,
      '</ChartContainer>',
    ].join('\n');
  },
});
