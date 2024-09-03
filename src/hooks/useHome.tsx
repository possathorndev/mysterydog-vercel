'use client';
import { findHome, Home } from '@/lib/api/home';
import { useQuery } from '@tanstack/react-query';
import { useLocale } from 'next-intl';

const useHome = ({ initialData }: { initialData?: Home }) => {
  const locale = useLocale();

  const { data, isLoading } = useQuery({
    queryKey: ['home-cms', locale],
    queryFn: () => findHome({ locale }),
    initialData,
  });

  return { data, isLoading };
};

export default useHome;
