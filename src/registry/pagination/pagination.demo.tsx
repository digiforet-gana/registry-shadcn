import { type MouseEvent, useState } from 'react';
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

type PreviewProps = { totalPages: number; ellipsis: boolean; previousText: string; nextText: string };

/* 현재 페이지 상태를 관리하기 위한 미리보기 컴포넌트 */
const PaginationPreview = ({ totalPages, ellipsis, previousText, nextText }: PreviewProps) => {
  const [current, setCurrent] = useState(1);

  /* 데모에서는 링크 이동 대신 현재 페이지만 변경 */
  const goTo = (page: number) => (event: MouseEvent) => {
    event.preventDefault();
    setCurrent(Math.min(totalPages, Math.max(1, page)));
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            text={previousText}
            onClick={goTo(current - 1)}
            aria-disabled={current === 1}
            className={current === 1 ? 'pointer-events-none opacity-50' : undefined}
          />
        </PaginationItem>
        {getPages(current, totalPages, ellipsis).map((page, index) =>
          page === 'ellipsis' ? (
            <PaginationItem key={`ellipsis-${index}`}>
              <PaginationEllipsis />
            </PaginationItem>
          ) : (
            <PaginationItem key={page}>
              <PaginationLink href="#" isActive={page === current} onClick={goTo(page)}>
                {page}
              </PaginationLink>
            </PaginationItem>
          ),
        )}
        <PaginationItem>
          <PaginationNext
            href="#"
            text={nextText}
            onClick={goTo(current + 1)}
            aria-disabled={current === totalPages}
            className={current === totalPages ? 'pointer-events-none opacity-50' : undefined}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

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
    <PaginationPreview
      key={totalPages}
      totalPages={Number(totalPages)}
      ellipsis={ellipsis}
      previousText={previousText}
      nextText={nextText}
    />
  ),

  /* 공식 예제처럼 2페이지가 선택된 정적 구조로 표시 */
  code: ({ ellipsis, previousText, nextText }) => {
    const previousAttr = previousText === 'Previous' ? '' : ` text="${previousText}"`;
    const nextAttr = nextText === 'Next' ? '' : ` text="${nextText}"`;

    return [
      'import {',
      '  Pagination,',
      '  PaginationContent,',
      ...(ellipsis ? ['  PaginationEllipsis,'] : []),
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
      '    <PaginationItem>',
      '      <PaginationLink href="#">1</PaginationLink>',
      '    </PaginationItem>',
      '    <PaginationItem>',
      '      <PaginationLink href="#" isActive>',
      '        2',
      '      </PaginationLink>',
      '    </PaginationItem>',
      '    <PaginationItem>',
      '      <PaginationLink href="#">3</PaginationLink>',
      '    </PaginationItem>',
      ...(ellipsis ? ['    <PaginationItem>', '      <PaginationEllipsis />', '    </PaginationItem>'] : []),
      '    <PaginationItem>',
      `      <PaginationNext href="#"${nextAttr} />`,
      '    </PaginationItem>',
      '  </PaginationContent>',
      '</Pagination>',
    ].join('\n');
  },
});
