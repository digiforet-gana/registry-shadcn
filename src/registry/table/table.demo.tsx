import { useState } from 'react';
import { definePlayground } from '@/lib/playground';
import { Checkbox } from '../checkbox/checkbox';
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from './table';

const INVOICES = [
  { invoice: 'INV001', status: 'Paid', method: 'Credit Card', amount: '$250.00' },
  { invoice: 'INV002', status: 'Pending', method: 'PayPal', amount: '$150.00' },
  { invoice: 'INV003', status: 'Unpaid', method: 'Bank Transfer', amount: '$350.00' },
  { invoice: 'INV004', status: 'Paid', method: 'Credit Card', amount: '$450.00' },
  { invoice: 'INV005', status: 'Paid', method: 'PayPal', amount: '$550.00' },
  { invoice: 'INV006', status: 'Pending', method: 'Bank Transfer', amount: '$200.00' },
  { invoice: 'INV007', status: 'Unpaid', method: 'Credit Card', amount: '$300.00' },
];

/* 행 선택 상태를 관리하기 위한 미리보기 컴포넌트 */
const TablePreview = ({ caption, footer, selectable }: { caption: boolean; footer: boolean; selectable: boolean }) => {
  const [selected, setSelected] = useState<string[]>([]);

  const toggleRow = (invoice: string, checked: boolean) =>
    setSelected((prev) => (checked ? [...prev, invoice] : prev.filter((id) => id !== invoice)));

  return (
    <Table className="min-w-md">
      {caption && <TableCaption>A list of your recent invoices.</TableCaption>}
      <TableHeader>
        <TableRow>
          {selectable && <TableHead className="w-8" />}
          <TableHead className="w-25">Invoice</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Method</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {INVOICES.map((invoice) => {
          const isSelected = selectable && selected.includes(invoice.invoice);

          return (
            <TableRow key={invoice.invoice} data-state={isSelected ? 'selected' : undefined}>
              {selectable && (
                <TableCell>
                  <Checkbox
                    checked={isSelected}
                    onCheckedChange={(checked) => toggleRow(invoice.invoice, checked === true)}
                    aria-label={`Select ${invoice.invoice}`}
                  />
                </TableCell>
              )}
              <TableCell className="font-medium">{invoice.invoice}</TableCell>
              <TableCell>{invoice.status}</TableCell>
              <TableCell>{invoice.method}</TableCell>
              <TableCell className="text-right">{invoice.amount}</TableCell>
            </TableRow>
          );
        })}
      </TableBody>
      {footer && (
        <TableFooter>
          <TableRow>
            <TableCell colSpan={selectable ? 4 : 3}>Total</TableCell>
            <TableCell className="text-right">$2,500.00</TableCell>
          </TableRow>
        </TableFooter>
      )}
    </Table>
  );
};

/* 사이트 플레이그라운드 전용 파일 (registry.json에 등록하지 않으므로 배포되지 않음) */
export default definePlayground({
  component: 'Table',
  importPath: '@/components/ui/table',
  controls: {
    /* 표 아래 설명 (TableCaption) */
    caption: { type: 'boolean', defaultValue: true },
    /* 합계 행 (TableFooter) */
    footer: { type: 'boolean', defaultValue: true },
    /* 체크박스로 행 선택 (선택된 행은 data-state="selected"로 강조) */
    selectable: { type: 'boolean', defaultValue: false },
  },

  render: ({ caption, footer, selectable }) => (
    <TablePreview caption={caption} footer={footer} selectable={selectable} />
  ),

  code: ({ caption, footer, selectable }) => {
    const components = [
      'Table',
      'TableBody',
      ...(caption ? ['TableCaption'] : []),
      'TableCell',
      ...(footer ? ['TableFooter'] : []),
      'TableHead',
      'TableHeader',
      'TableRow',
    ];
    const data = INVOICES.map(
      (row) =>
        `  { invoice: '${row.invoice}', status: '${row.status}', method: '${row.method}', amount: '${row.amount}' },`,
    );

    return [
      ...(selectable
        ? [`import { useState } from 'react';`, `import { Checkbox } from '@/components/ui/checkbox';`]
        : []),
      `import {`,
      ...components.map((name) => `  ${name},`),
      `} from '@/components/ui/table';`,
      '',
      'const invoices = [',
      ...data,
      '];',
      '',
      ...(selectable ? ['const [selected, setSelected] = useState<string[]>([]);', ''] : []),
      '<Table>',
      ...(caption ? ['  <TableCaption>A list of your recent invoices.</TableCaption>'] : []),
      '  <TableHeader>',
      '    <TableRow>',
      ...(selectable ? ['      <TableHead className="w-8" />'] : []),
      '      <TableHead className="w-25">Invoice</TableHead>',
      '      <TableHead>Status</TableHead>',
      '      <TableHead>Method</TableHead>',
      '      <TableHead className="text-right">Amount</TableHead>',
      '    </TableRow>',
      '  </TableHeader>',
      '  <TableBody>',
      '    {invoices.map((invoice) => (',
      ...(selectable
        ? [
            '      <TableRow',
            '        key={invoice.invoice}',
            "        data-state={selected.includes(invoice.invoice) ? 'selected' : undefined}",
            '      >',
            '        <TableCell>',
            '          <Checkbox',
            '            checked={selected.includes(invoice.invoice)}',
            '            onCheckedChange={(checked) =>',
            '              setSelected((prev) =>',
            '                checked ? [...prev, invoice.invoice] : prev.filter((id) => id !== invoice.invoice),',
            '              )',
            '            }',
            '            aria-label={`Select ${invoice.invoice}`}',
            '          />',
            '        </TableCell>',
          ]
        : ['      <TableRow key={invoice.invoice}>']),
      '        <TableCell className="font-medium">{invoice.invoice}</TableCell>',
      '        <TableCell>{invoice.status}</TableCell>',
      '        <TableCell>{invoice.method}</TableCell>',
      '        <TableCell className="text-right">{invoice.amount}</TableCell>',
      '      </TableRow>',
      '    ))}',
      '  </TableBody>',
      ...(footer
        ? [
            '  <TableFooter>',
            '    <TableRow>',
            `      <TableCell colSpan={${selectable ? 4 : 3}}>Total</TableCell>`,
            '      <TableCell className="text-right">$2,500.00</TableCell>',
            '    </TableRow>',
            '  </TableFooter>',
          ]
        : []),
      '</Table>',
    ].join('\n');
  },
});
