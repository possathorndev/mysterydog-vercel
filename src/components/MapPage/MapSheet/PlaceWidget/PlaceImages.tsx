import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';

// Hooks
import { useMediaQuery } from '@/hooks/useMediaQuery';

// Components
import { Carousel, CarouselContent, CarouselItem, CarouselApi } from '@/components/ui/carousel';
import { AspectRatio } from '@/components/ui/aspect-ratio';

// Type
import { Image as ImageType, ListResponseData } from '@/lib/api/utils/common';
import { EmblaCarouselType } from 'embla-carousel';

const PlaceImages = ({ images }: { images?: ListResponseData<ImageType> }) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  const isMediumScreen = useMediaQuery('(min-width: 640px)');

  const logSlidesInView = useCallback((emblaApi: EmblaCarouselType) => {
    if (emblaApi.slidesInView()?.[0]) setCurrent(emblaApi.slidesInView()[0]);
  }, []);

  useEffect(() => {
    if (api) api.on('slidesInView', logSlidesInView);
  }, [api, logSlidesInView]);

  useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);
  }, [api]);

  if (!images?.data?.length) return null;

  return (
    <Carousel className='mx-auto w-full max-w-screen-2xl' opts={{ align: 'start', loop: true }} setApi={setApi}>
      <CarouselContent>
        {images.data.map((item, index) => (
          <CarouselItem key={index}>
            <AspectRatio ratio={isMediumScreen ? 418 / 244 : 360 / 244} className='bg-muted'>
              <Image src={item.attributes.url} alt='Place Image' fill className='object-cover' />
            </AspectRatio>
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className='absolute bottom-2 right-2 rounded bg-black/10 px-2'>
        <p className='font-gaegu'>
          {current + 1}/{count}
        </p>
      </div>
    </Carousel>
  );
};

export default PlaceImages;
