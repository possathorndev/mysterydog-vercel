'use client';
import { findHome, Home } from '@/lib/api/home';
import { useQuery } from '@tanstack/react-query';

const useHome = ({ initialData }: { initialData?: Home }) => {
  const { data, isLoading } = useQuery({
    queryKey: ['home-cms'],
    queryFn: findHome,
    initialData,
  });

  return { data, isLoading };
};

export default useHome;
