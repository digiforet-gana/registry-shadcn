import { definePlayground } from '@/lib/playground';
import { Avatar, AvatarBadge, AvatarFallback, AvatarGroup, AvatarGroupCount, AvatarImage } from './avatar';

/* 그룹 예시에 사용할 사용자 목록 */
const USERS = [
  { src: 'https://github.com/shadcn.png', alt: '@shadcn', fallback: 'CN' },
  { src: 'https://github.com/maxleiter.png', alt: '@maxleiter', fallback: 'LR' },
  { src: 'https://github.com/evilrabbit.png', alt: '@evilrabbit', fallback: 'ER' },
];

/* 사이트 플레이그라운드 전용 파일 (registry.json에 등록하지 않으므로 배포되지 않음) */
export default definePlayground({
  component: 'Avatar',
  importPath: '@/components/ui/avatar',
  controls: {
    size: { type: 'select', options: ['default', 'sm', 'lg'], defaultValue: 'default' },
    /* 이미지 주소 (비우거나 잘못된 주소면 fallback 표시) */
    src: { type: 'text', defaultValue: 'https://github.com/shadcn.png' },
    /* 이미지를 불러오지 못했을 때 표시할 텍스트 */
    fallback: { type: 'text', defaultValue: 'CN' },
    /* 우측 하단 상태 표시 점 (AvatarBadge) */
    badge: { type: 'boolean', defaultValue: false },
    /* 여러 아바타를 겹쳐 표시 (AvatarGroup + AvatarGroupCount) */
    group: { type: 'boolean', defaultValue: false },
  },

  render: ({ size, src, fallback, badge, group }) => {
    const avatar = (
      <Avatar size={size}>
        <AvatarImage src={src} alt="@shadcn" />
        <AvatarFallback>{fallback}</AvatarFallback>
        {badge && <AvatarBadge className="bg-green-600 dark:bg-green-800" />}
      </Avatar>
    );

    if (!group) return avatar;

    return (
      <AvatarGroup>
        {avatar}
        {USERS.slice(1).map((user) => (
          <Avatar key={user.alt} size={size}>
            <AvatarImage src={user.src} alt={user.alt} />
            <AvatarFallback>{user.fallback}</AvatarFallback>
          </Avatar>
        ))}
        <AvatarGroupCount>+3</AvatarGroupCount>
      </AvatarGroup>
    );
  },

  code: ({ src, fallback, badge, group }, formatProps) => {
    const components = [
      'Avatar',
      ...(badge ? ['AvatarBadge'] : []),
      'AvatarFallback',
      ...(group ? ['AvatarGroup', 'AvatarGroupCount'] : []),
      'AvatarImage',
    ];
    const indent = group ? '  ' : '';
    const avatar = [
      `<Avatar${formatProps(['size'])}>`,
      `  <AvatarImage src="${src}" alt="@shadcn" />`,
      `  <AvatarFallback>${fallback}</AvatarFallback>`,
      ...(badge ? ['  <AvatarBadge className="bg-green-600 dark:bg-green-800" />'] : []),
      '</Avatar>',
    ].map((line) => indent + line);
    const others = USERS.slice(1).flatMap((user) =>
      [
        `<Avatar${formatProps(['size'])}>`,
        `  <AvatarImage src="${user.src}" alt="${user.alt}" />`,
        `  <AvatarFallback>${user.fallback}</AvatarFallback>`,
        '</Avatar>',
      ].map((line) => indent + line),
    );

    return [
      `import { ${components.join(', ')} } from '@/components/ui/avatar';`,
      '',
      ...(group
        ? ['<AvatarGroup>', ...avatar, ...others, '  <AvatarGroupCount>+3</AvatarGroupCount>', '</AvatarGroup>']
        : avatar),
    ].join('\n');
  },
});
