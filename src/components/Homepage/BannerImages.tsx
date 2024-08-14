import { Image as ImageType, ListResponseData } from '@/lib/api/utils/common';
import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import Image from 'next/image';
import Autoplay from 'embla-carousel-autoplay';
import { useRef } from 'react';
import { AspectRatio } from '@/components/ui/aspect-ratio';

const BannerImages = ({ images }: { images?: ListResponseData<ImageType> }) => {
  const plugin = useRef(Autoplay({ delay: 5000, stopOnInteraction: true }));

  if (!images?.data.length) return null;

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
          <CarouselItem
            key={index}
            className='h-[100px] sm:h-[150px] md:h-[200px] lg:h-[250px] xl:h-[300px] 2xl:h-[350px]'
          >
            <AspectRatio ratio={1536 / 350} className='bg-muted'>
              <Image src={item.attributes.url} alt='Banner Image' fill className='object-cover' />
            </AspectRatio>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

export default BannerImages;
