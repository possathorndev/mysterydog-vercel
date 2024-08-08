import Footer from '@/components/Footer/Footer';

export default async function Layout({ children }: { children: React.ReactNode }) {
  // return <div className='relative pt-[70px]'>{children}</div>;
  return <div className='relative'>{children}</div>;
}
