'use client';

import { useAreaBySlug } from '@/hooks/useArea';

const AreaDetailPage = ({ slug }: { slug: string }) => {
  const { data, isLoading } = useAreaBySlug(slug);

  return (
    <div className='mx-auto max-w-screen-2xl px-2 md:px-6'>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default AreaDetailPage;
