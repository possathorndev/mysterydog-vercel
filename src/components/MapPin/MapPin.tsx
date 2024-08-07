import { MAPS_PATH } from '@/constants/config';
import Image from 'next/image';
import Link from 'next/link';

const MapPin = () => {
  return (
    <div className='fixed bottom-5 right-5'>
      <Link href={MAPS_PATH} shallow>
        <Image src={'/icons/map-pin.png'} alt='Map Pin' width={52} height={52} className='animate-bounce' />
      </Link>
    </div>
  );
};

export default MapPin;
