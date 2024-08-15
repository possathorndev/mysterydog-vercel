import Footer from '@/components/Footer/Footer';
import Image from 'next/image';

const NotFound = () => {
  return (
    <>
      <div className='relative w-screen pt-[70px]'>
        <div className='flex h-[calc(100vh-160px)] max-h-[calc(100vh-160px)] w-full items-center justify-center'>
          <div className='flex flex-col items-center justify-center'>
            <Image
              src='/images/dogs-group.png'
              alt='Mystery Dog Logo'
              width={400}
              height={400}
              className='w-[200px] md:w-[400px]'
            />
            <div className='text-2xl font-bold text-font-header'>Oops! Page Not Found</div>
            <div className='font-gaegu text-lg font-bold text-secondary'>
              We can&apos;t find what you&apos;re looking for
            </div>
          </div>
        </div>
      </div>
      <div className='fixed bottom-0 w-full'>
        <Footer />
      </div>
    </>
  );
};

export default NotFound;
