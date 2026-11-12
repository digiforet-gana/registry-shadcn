import { BadgeCheckIcon, ChevronRightIcon, EllipsisVerticalIcon } from 'lucide-react';
import { definePlayground } from '@/lib/playground';
import { Button } from '../button/button';
import { Item, ItemActions, ItemContent, ItemDescription, ItemMedia, ItemTitle } from './item';

const IMAGE = 'https://github.com/shadcn.png';

/* 사이트 플레이그라운드 전용 파일 (registry.json에 등록하지 않으므로 배포되지 않음) */
export default definePlayground({
  component: 'Item',
  importPath: '@/components/ui/item',
  controls: {
    /* default: 테두리 없음, outline: 테두리, muted: 연한 배경 */
    variant: { type: 'select', options: ['default', 'outline', 'muted'], defaultValue: 'outline' },
    size: { type: 'select', options: ['default', 'sm', 'xs'], defaultValue: 'default' },
    /* 왼쪽 미디어 영역 (ItemMedia) */
    media: { type: 'boolean', defaultValue: false },
    /* ItemMedia의 variant (default: 아이콘만, icon: 아이콘 크기 고정, image: 이미지용 정사각 영역) */
    mediaVariant: { type: 'select', options: ['default', 'icon', 'image'], defaultValue: 'icon' },
    title: { type: 'text', defaultValue: 'Basic Item' },
    description: { type: 'text', defaultValue: 'A simple item with title and description.' },
    /* 오른쪽 동작 버튼 (ItemActions, 링크일 때는 버튼 대신 화살표 아이콘) */
    action: { type: 'boolean', defaultValue: true },
    /* 항목 전체를 링크로 표시 (asChild + <a>, 마우스를 올리면 배경 강조) */
    link: { type: 'boolean', defaultValue: false },
  },

  render: ({ variant, size, media, mediaVariant, title, description, action, link }) => {
    const content = (
      <>
        {/* image variant는 이미지, 나머지는 아이콘을 넣어 표시 */}
        {media && (
          <ItemMedia variant={mediaVariant}>
            {mediaVariant === 'image' ? <img src={IMAGE} alt="shadcn" /> : <BadgeCheckIcon />}
          </ItemMedia>
        )}
        <ItemContent>
          <ItemTitle>{title}</ItemTitle>
          {description && <ItemDescription>{description}</ItemDescription>}
        </ItemContent>
        {action && (
          <ItemActions>
            {/* 링크 안에는 버튼을 넣을 수 없으므로 화살표 아이콘만 표시 */}
            {link ? (
              <ChevronRightIcon className="size-4" />
            ) : (
              <Button variant="ghost" size="icon-sm" aria-label="More" onClick={() => {}}>
                <EllipsisVerticalIcon />
              </Button>
            )}
          </ItemActions>
        )}
      </>
    );

    if (!link) {
      return (
        <Item variant={variant} size={size} className="max-w-md">
          {content}
        </Item>
      );
    }

    return (
      <Item variant={variant} size={size} className="max-w-md" asChild>
        <a href="#" onClick={(event) => event.preventDefault()}>
          {content}
        </a>
      </Item>
    );
  },

  /* variant는 공식 예제처럼 outline을 기본으로 보여 주므로, 컴포넌트 기본값(default)과 비교해 직접 출력 */
  code: ({ variant, size, media, mediaVariant, title, description, action, link }) => {
    const attrs = `${variant === 'default' ? '' : ` variant="${variant}"`}${size === 'default' ? '' : ` size="${size}"`}${link ? ' asChild' : ''}`;
    const components = [
      'Item',
      ...(action ? ['ItemActions'] : []),
      'ItemContent',
      ...(description ? ['ItemDescription'] : []),
      ...(media ? ['ItemMedia'] : []),
      'ItemTitle',
    ];
    const isImage = mediaVariant === 'image';
    /* ItemMedia의 variant 기본값은 default */
    const mediaLines = media
      ? [
          `<ItemMedia${mediaVariant === 'default' ? '' : ` variant="${mediaVariant}"`}>`,
          isImage ? `  <img src="${IMAGE}" alt="shadcn" />` : '  <BadgeCheckIcon />',
          '</ItemMedia>',
        ]
      : [];
    const actionLines = link
      ? ['<ItemActions>', '  <ChevronRightIcon className="size-4" />', '</ItemActions>']
      : [
          '<ItemActions>',
          '  <Button variant="ghost" size="icon-sm" aria-label="More" onClick={() => {}}>',
          '    <EllipsisVerticalIcon />',
          '  </Button>',
          '</ItemActions>',
        ];
    const body = [
      ...mediaLines,
      '<ItemContent>',
      `  <ItemTitle>${title}</ItemTitle>`,
      ...(description ? [`  <ItemDescription>${description}</ItemDescription>`] : []),
      '</ItemContent>',
      ...(action ? actionLines : []),
    ];

    const icons = [
      ...(media && !isImage ? ['BadgeCheckIcon'] : []),
      ...(action && link ? ['ChevronRightIcon'] : []),
      ...(action && !link ? ['EllipsisVerticalIcon'] : []),
    ];

    return [
      ...(icons.length > 0 ? [`import { ${icons.join(', ')} } from 'lucide-react';`] : []),
      ...(action && !link ? [`import { Button } from '@/components/ui/button';`] : []),
      `import { ${components.join(', ')} } from '@/components/ui/item';`,
      '',
      `<Item${attrs}>`,
      ...(link ? ['  <a href="#">', ...body.map((line) => `    ${line}`), '  </a>'] : body.map((line) => `  ${line}`)),
      '</Item>',
    ].join('\n');
  },
});
