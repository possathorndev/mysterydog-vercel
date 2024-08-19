import { Image as ImageType, ListResponseData } from '@/lib/api/utils/common';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import Image from 'next/image';
import Autoplay from 'embla-carousel-autoplay';
import { useRef } from 'react';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { useMediaQuery } from '@/hooks/useMediaQuery';

const PlaceImages = ({ images }: { images?: ListResponseData<ImageType> }) => {
  const plugin = useRef(Autoplay({ delay: 5000, stopOnInteraction: true }));
  const isLargeScreen = useMediaQuery('(min-width: 1024px)');
  const isMediumScreen = useMediaQuery('(min-width: 640px)');

  if (!images?.data?.length) return null;

  return (
    <Carousel
      className='mx-auto w-full max-w-screen-2xl'
      opts={{ align: 'start', loop: true }}
      plugins={[plugin.current]}
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent>
        {images.data.map((item, index) => (
          <CarouselItem key={index}>
            <AspectRatio
              ratio={isLargeScreen ? 418 / 244 : isMediumScreen ? 418 / 244 : 360 / 244}
              className='bg-muted'
            >
              <Image src={item.attributes.url} alt='Banner Image' fill className='object-cover' />
            </AspectRatio>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

export default PlaceImages;
