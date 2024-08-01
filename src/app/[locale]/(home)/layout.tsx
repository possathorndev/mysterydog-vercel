import Navbar from '@/components/Navbar/navbar';

export default async function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className='fixed top-0 z-50 w-full bg-[#0D0D0D]'>
        <Navbar />
      </div>
      <div className='relative pb-9 pt-24'>{children}</div>
      {/* <Footer /> */}
      {/*<ComingSoonFooter />*/}
    </>
  );
}
