'use client';
import { findHome } from '@/lib/api/home';
import { useQuery } from '@tanstack/react-query';

const useHome = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['home-cms'],
    queryFn: findHome,
  });

  return { data, isLoading };
};

export default useHome;
