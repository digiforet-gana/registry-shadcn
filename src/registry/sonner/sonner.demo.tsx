import { EllipsisVerticalIcon } from 'lucide-react';
import { type ToasterProps, toast } from 'sonner';
import { definePlayground } from '@/lib/playground';
import { Button } from '../button/button';
import { Toaster } from './sonner';

const MESSAGE = 'Event has been created';
const DESCRIPTION = 'Sunday, December 03, 2023 at 9:00 AM';

/* 토스트 미리보기 (버튼 + Toaster) */
const SonnerPreview = ({
  type,
  position,
  description,
  action,
  closeButton,
  richColors,
}: {
  type: 'default' | 'success' | 'info' | 'warning' | 'error' | 'loading';
  position: ToasterProps['position'];
  description: boolean;
  action: boolean;
  closeButton: boolean;
  richColors: boolean;
}) => {
  const showToast = () => {
    const options = {
      ...(description && { description: DESCRIPTION }),
      ...(action && {
        action: (
          <Button variant="ghost" size="icon-sm" aria-label="More" className="ml-auto" onClick={() => {}}>
            <EllipsisVerticalIcon />
          </Button>
        ),
      }),
    };
    if (type === 'default') toast(MESSAGE, options);
    else toast[type](MESSAGE, options);
  };

  return (
    <>
      <Button variant="outline" onClick={showToast}>
        Show Toast
      </Button>
      <Toaster position={position} closeButton={closeButton} richColors={richColors} />
    </>
  );
};

/* 사이트 플레이그라운드 전용 파일 (registry.json에 등록하지 않으므로 배포되지 않음) */
export default definePlayground({
  component: 'Toaster',
  importPath: '@/components/ui/sonner',
  controls: {
    /* 토스트 종류 (default 외에는 종류별 아이콘 표시) */
    type: {
      type: 'select',
      options: ['default', 'success', 'info', 'warning', 'error', 'loading'],
      defaultValue: 'default',
    },
    /* 토스트가 나타나는 화면 위치 (Toaster prop) */
    position: {
      type: 'select',
      options: ['top-left', 'top-center', 'top-right', 'bottom-left', 'bottom-center', 'bottom-right'],
      defaultValue: 'bottom-right',
    },
    /* 제목 아래 설명 */
    description: { type: 'boolean', defaultValue: true },
    /* 우측 동작 버튼 (action에는 { label, onClick } 대신 React 요소도 전달 가능) */
    action: { type: 'boolean', defaultValue: true },
    /* 토스트 좌측 상단에 닫기 버튼 표시 (Toaster prop) */
    closeButton: { type: 'boolean', defaultValue: false },
    /* success, info, warning, error 토스트를 종류별 배경색으로 강조 (Toaster prop) */
    richColors: { type: 'boolean', defaultValue: false },
  },

  render: (props) => <SonnerPreview {...props} />,

  code: ({ type, description, action }, formatProps) => {
    const call = type === 'default' ? 'toast' : `toast.${type}`;
    const options = [
      ...(description ? [`        description: '${DESCRIPTION}',`] : []),
      ...(action
        ? [
            '        action: (',
            '          <Button variant="ghost" size="icon-sm" aria-label="More" className="ml-auto" onClick={() => {}}>',
            '            <EllipsisVerticalIcon />',
            '          </Button>',
            '        ),',
          ]
        : []),
    ];
    const toastCall =
      options.length > 0 ? [`      ${call}('${MESSAGE}', {`, ...options, '      })'] : [`      ${call}('${MESSAGE}')`];

    return [
      ...(action ? [`import { EllipsisVerticalIcon } from 'lucide-react';`] : []),
      `import { toast } from 'sonner';`,
      `import { Button } from '@/components/ui/button';`,
      `import { Toaster } from '@/components/ui/sonner';`,
      '',
      '{/* 앱 최상단(레이아웃)에 한 번만 배치 */}',
      `<Toaster${formatProps(['position', 'closeButton', 'richColors'])} />`,
      '',
      '{/* 토스트를 띄우고 싶은 곳에서 toast() 호출 */}',
      '<Button',
      '  variant="outline"',
      '  onClick={() =>',
      ...toastCall,
      '  }',
      '>',
      '  Show Toast',
      '</Button>',
    ].join('\n');
  },
});
