import type { MouseEvent } from 'react';
import { definePlayground } from '@/lib/playground';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from './pagination';

/* 공식 예제처럼 2페이지가 선택된 상태로 표시 */
const CURRENT_PAGE = 2;

/*
 * 표시할 페이지 목록
 * - ellipsis: 처음 / 마지막 / 현재 ±1 페이지만 표시하고 나머지는 생략 기호
 * - ellipsis 아님: 모든 페이지 표시
 */
const getPages = (current: number, total: number, ellipsis: boolean): (number | 'ellipsis')[] => {
  if (!ellipsis) return Array.from({ length: total }, (_, i) => i + 1);

  const pages = new Set([1, total, current - 1, current, current + 1]);
  const sorted = [...pages].filter((page) => page >= 1 && page <= total).sort((a, b) => a - b);

  return sorted.flatMap((page, index) => (index > 0 && page - sorted[index - 1] > 1 ? ['ellipsis', page] : [page]));
};

/* 데모에서는 링크 이동 방지 */
const preventNavigation = (event: MouseEvent) => event.preventDefault();

/* 사이트 플레이그라운드 전용 파일 (registry.json에 등록하지 않으므로 배포되지 않음) */
export default definePlayground({
  component: 'Pagination',
  importPath: '@/components/ui/pagination',
  controls: {
    /* 전체 페이지 수 (페이지가 많으면 생략 기호로 줄여서 표시) */
    totalPages: { type: 'select', options: ['5', '10', '20'], defaultValue: '10' },
    /* 페이지가 많을 때 생략 기호(…)로 줄여서 표시 (끄면 모든 페이지 표시) */
    ellipsis: { type: 'boolean', defaultValue: true },
    /* 이전 / 다음 버튼 문구 (좁은 화면에서는 숨겨지고 화살표만 표시) */
    previousText: { type: 'text', defaultValue: 'Previous' },
    nextText: { type: 'text', defaultValue: 'Next' },
  },

  render: ({ totalPages, ellipsis, previousText, nextText }) => (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" text={previousText} onClick={preventNavigation} />
        </PaginationItem>
        {getPages(CURRENT_PAGE, Number(totalPages), ellipsis).map((page, index) =>
          page === 'ellipsis' ? (
            <PaginationItem key={`ellipsis-${index}`}>
              <PaginationEllipsis />
            </PaginationItem>
          ) : (
            <PaginationItem key={page}>
              {/* isActive: 현재 페이지 표시 */}
              <PaginationLink href="#" isActive={page === CURRENT_PAGE} onClick={preventNavigation}>
                {page}
              </PaginationLink>
            </PaginationItem>
          ),
        )}
        <PaginationItem>
          <PaginationNext href="#" text={nextText} onClick={preventNavigation} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  ),

  code: ({ totalPages, ellipsis, previousText, nextText }) => {
    const previousAttr = previousText === 'Previous' ? '' : ` text="${previousText}"`;
    const nextAttr = nextText === 'Next' ? '' : ` text="${nextText}"`;
    const pages = getPages(CURRENT_PAGE, Number(totalPages), ellipsis);
    const items = pages.flatMap((page) => {
      if (page === 'ellipsis') return ['    <PaginationItem>', '      <PaginationEllipsis />', '    </PaginationItem>'];

      const activeAttr = page === CURRENT_PAGE ? ' isActive' : '';
      return [
        '    <PaginationItem>',
        `      <PaginationLink href="#"${activeAttr}>${page}</PaginationLink>`,
        '    </PaginationItem>',
      ];
    });

    return [
      'import {',
      '  Pagination,',
      '  PaginationContent,',
      ...(pages.includes('ellipsis') ? ['  PaginationEllipsis,'] : []),
      '  PaginationItem,',
      '  PaginationLink,',
      '  PaginationNext,',
      '  PaginationPrevious,',
      `} from '@/components/ui/pagination';`,
      '',
      '<Pagination>',
      '  <PaginationContent>',
      '    <PaginationItem>',
      `      <PaginationPrevious href="#"${previousAttr} />`,
      '    </PaginationItem>',
      ...items,
      '    <PaginationItem>',
      `      <PaginationNext href="#"${nextAttr} />`,
      '    </PaginationItem>',
      '  </PaginationContent>',
      '</Pagination>',
    ].join('\n');
  },
});
