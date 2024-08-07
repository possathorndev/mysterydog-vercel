import Footer from '@/components/Footer/Footer';

export default async function Layout({ children }: { children: React.ReactNode }) {
  return <div className='relative pb-9 pt-24'>{children}</div>;
}
