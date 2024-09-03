import { Category } from '@/lib/api/categories';
import Image from 'next/image';
import { Link } from '@/utils/navigation';
import { MAPS_PATH } from '@/constants/config';

const CategoryThumbnailCard = ({ data }: { data: Category }) => {
  return (
    <Link href={`${MAPS_PATH}?categories=${data.slug}`}>
      <div className='relative flex h-48 w-36 flex-col rounded-md' style={{ backgroundColor: data.color }}>
        <Image
          src='/images/background-grid.png'
          width={200}
          height={200}
          alt='Background Grid'
          className='absolute'
          style={{ opacity: 0.5 }}
        />
        <div className='text-wrap break-words px-4 pt-4 text-xl text-white'>{data.name}</div>
        <div className='relative mx-auto h-full w-[90%]'>
          {data?.thumbnailImage?.data?.attributes?.url && (
            <Image
              src={data?.thumbnailImage?.data?.attributes?.url}
              alt={data.name}
              fill
              className='object-cover'
              sizes='100%'
            />
          )}
        </div>
      </div>
    </Link>
  );
};

export default CategoryThumbnailCard;
