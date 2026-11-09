import { definePlayground } from '@/lib/playground';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './accordion';

const ITEMS = [
  {
    value: 'item-1',
    title: 'Is it accessible?',
    content: 'Yes. It adheres to the WAI-ARIA design pattern.',
  },
  {
    value: 'item-2',
    title: 'Is it styled?',
    content: "Yes. It comes with default styles that match the other components' aesthetic.",
  },
  {
    value: 'item-3',
    title: 'Is it animated?',
    content: "Yes. It's animated by default, but you can disable it if you prefer.",
  },
];

/* 사이트 플레이그라운드 전용 파일 (registry.json에 등록하지 않으므로 배포되지 않음) */
export default definePlayground({
  component: 'Accordion',
  importPath: '@/components/ui/accordion',
  controls: {
    /* single: 한 번에 하나만 펼침, multiple: 여러 개 동시에 펼침 */
    type: { type: 'select', options: ['single', 'multiple'], defaultValue: 'single' },
    /* 열린 항목을 다시 눌러 닫을 수 있는지 여부 (type="single"일 때만 적용) */
    collapsible: { type: 'boolean', defaultValue: true },
    /* 마지막 항목 비활성화 */
    disabled: { type: 'boolean', defaultValue: false },
  },

  render: ({ type, collapsible, disabled }) => {
    const items = ITEMS.map((item, index) => (
      <AccordionItem key={item.value} value={item.value} disabled={disabled && index === ITEMS.length - 1}>
        <AccordionTrigger>{item.title}</AccordionTrigger>
        <AccordionContent>{item.content}</AccordionContent>
      </AccordionItem>
    ));

    /* type에 따라 defaultValue 형태(string / string[])가 달라지므로 key로 다시 마운트 */
    return type === 'multiple' ? (
      <Accordion key="multiple" type="multiple" defaultValue={['item-1']} className="max-w-md">
        {items}
      </Accordion>
    ) : (
      <Accordion key="single" type="single" collapsible={collapsible} defaultValue="item-1" className="max-w-md">
        {items}
      </Accordion>
    );
  },

  code: ({ type, collapsible, disabled }) => {
    const isSingle = type === 'single';
    const items = ITEMS.flatMap((item, index) => [
      `  <AccordionItem value="${item.value}"${disabled && index === ITEMS.length - 1 ? ' disabled' : ''}>`,
      `    <AccordionTrigger>${item.title}</AccordionTrigger>`,
      `    <AccordionContent>${item.content}</AccordionContent>`,
      '  </AccordionItem>',
    ]);
    const rootProps = isSingle
      ? ` type="single"${collapsible ? ' collapsible' : ''} defaultValue="item-1"`
      : ` type="multiple" defaultValue={['item-1']}`;

    return [
      `import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';`,
      '',
      `<Accordion${rootProps}>`,
      ...items,
      '</Accordion>',
    ].join('\n');
  },
});
