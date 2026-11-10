import { definePlayground } from '@/lib/playground';
import { Card, CardContent } from '../card/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './carousel';

const SLIDES = Array.from({ length: 5 }, (_, i) => i + 1);

/* 한 번에 보이는 개수 → CarouselItem basis 클래스 */
const BASIS = { '1': '', '2': 'basis-1/2', '3': 'basis-1/3' };

/* 사이트 플레이그라운드 전용 파일 (registry.json에 등록하지 않으므로 배포되지 않음) */
export default definePlayground({
  component: 'Carousel',
  importPath: '@/components/ui/carousel',
  controls: {
    /* 넘기는 방향 (vertical이면 CarouselContent에 높이 지정 필요) */
    orientation: { type: 'select', options: ['horizontal', 'vertical'], defaultValue: 'horizontal' },
    /* 한 번에 보이는 슬라이드 수 (CarouselItem의 basis 클래스로 조절) */
    perView: { type: 'select', options: ['1', '2', '3'], defaultValue: '1' },
    /* 마지막 다음에 처음으로 이어지는 무한 반복 (opts.loop) */
    loop: { type: 'boolean', defaultValue: false },
  },

  render: ({ orientation, perView, loop }) => {
    const isVertical = orientation === 'vertical';

    return (
      <div className={isVertical ? 'py-14' : 'px-14'}>
        <Carousel key={`${orientation}-${loop}`} orientation={orientation} opts={{ loop }} className="w-full max-w-xs">
          <CarouselContent className={isVertical ? 'h-72' : undefined}>
            {SLIDES.map((slide) => (
              <CarouselItem key={slide} className={BASIS[perView]}>
                <Card className="h-full">
                  <CardContent className="flex aspect-square items-center justify-center p-6">
                    <span className="text-4xl font-semibold">{slide}</span>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    );
  },

  code: ({ orientation, perView, loop }, formatProps) => {
    const isVertical = orientation === 'vertical';
    const basis = BASIS[perView];

    return [
      `import { Card, CardContent } from '@/components/ui/card';`,
      `import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';`,
      '',
      `<Carousel${formatProps(['orientation'])}${loop ? ' opts={{ loop: true }}' : ''} className="w-full max-w-xs">`,
      `  <CarouselContent${isVertical ? ' className="h-72"' : ''}>`,
      '    {Array.from({ length: 5 }).map((_, index) => (',
      `      <CarouselItem key={index}${basis ? ` className="${basis}"` : ''}>`,
      '        <Card>',
      '          <CardContent className="flex aspect-square items-center justify-center p-6">',
      '            <span className="text-4xl font-semibold">{index + 1}</span>',
      '          </CardContent>',
      '        </Card>',
      '      </CarouselItem>',
      '    ))}',
      '  </CarouselContent>',
      '  <CarouselPrevious />',
      '  <CarouselNext />',
      '</Carousel>',
    ].join('\n');
  },
});
