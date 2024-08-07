import DesktopNavbar from '@/components/Navbar/desktop';
import MobileNavbar from '@/components/Navbar/mobile';

const Navbar = () => {
  return (
    <div className='z-50 mx-auto h-[70px] border-b-[1px] border-[#03071214] bg-white'>
      <div className='mx-auto flex h-full max-w-screen-2xl px-6'>
        <div className='hidden w-full md:flex'>
          <DesktopNavbar />
        </div>
        <div className='flex w-full md:hidden'>
          <MobileNavbar />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
