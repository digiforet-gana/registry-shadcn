import { BadgeCheckIcon, EllipsisVerticalIcon } from 'lucide-react';
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
    /* 왼쪽 미디어 (ItemMedia, icon: 아이콘 / image: 이미지) */
    media: { type: 'select', options: ['none', 'icon', 'image'], defaultValue: 'none' },
    title: { type: 'text', defaultValue: 'Basic Item' },
    description: { type: 'text', defaultValue: 'A simple item with title and description.' },
    /* 오른쪽 동작 버튼 (ItemActions) */
    action: { type: 'boolean', defaultValue: true },
  },

  render: ({ variant, size, media, title, description, action }) => (
    <Item variant={variant} size={size} className="max-w-md">
      {media === 'icon' && (
        <ItemMedia variant="icon">
          <BadgeCheckIcon />
        </ItemMedia>
      )}
      {media === 'image' && (
        <ItemMedia variant="image">
          <img src={IMAGE} alt="shadcn" />
        </ItemMedia>
      )}
      <ItemContent>
        <ItemTitle>{title}</ItemTitle>
        {description && <ItemDescription>{description}</ItemDescription>}
      </ItemContent>
      {action && (
        <ItemActions>
          <Button variant="ghost" size="icon-sm" aria-label="More">
            <EllipsisVerticalIcon />
          </Button>
        </ItemActions>
      )}
    </Item>
  ),

  /* variant는 공식 예제처럼 outline을 기본으로 보여 주므로, 컴포넌트 기본값(default)과 비교해 직접 출력 */
  code: ({ variant, size, media, title, description, action }) => {
    const attrs = `${variant === 'default' ? '' : ` variant="${variant}"`}${size === 'default' ? '' : ` size="${size}"`}`;
    const components = [
      'Item',
      ...(action ? ['ItemActions'] : []),
      'ItemContent',
      ...(description ? ['ItemDescription'] : []),
      ...(media !== 'none' ? ['ItemMedia'] : []),
      'ItemTitle',
    ];
    const mediaLines = {
      none: [],
      icon: ['  <ItemMedia variant="icon">', '    <BadgeCheckIcon />', '  </ItemMedia>'],
      image: ['  <ItemMedia variant="image">', `    <img src="${IMAGE}" alt="shadcn" />`, '  </ItemMedia>'],
    }[media];

    const icons = [...(media === 'icon' ? ['BadgeCheckIcon'] : []), ...(action ? ['EllipsisVerticalIcon'] : [])];

    return [
      ...(icons.length > 0 ? [`import { ${icons.join(', ')} } from 'lucide-react';`] : []),
      ...(action ? [`import { Button } from '@/components/ui/button';`] : []),
      `import { ${components.join(', ')} } from '@/components/ui/item';`,
      '',
      `<Item${attrs}>`,
      ...mediaLines,
      '  <ItemContent>',
      `    <ItemTitle>${title}</ItemTitle>`,
      ...(description ? [`    <ItemDescription>${description}</ItemDescription>`] : []),
      '  </ItemContent>',
      ...(action
        ? [
            '  <ItemActions>',
            '    <Button variant="ghost" size="icon-sm" aria-label="More">',
            '      <EllipsisVerticalIcon />',
            '    </Button>',
            '  </ItemActions>',
          ]
        : []),
      '</Item>',
    ].join('\n');
  },
});
