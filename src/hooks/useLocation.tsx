import { useQuery } from '@tanstack/react-query';

// API
import { findLocations, findLocationBySlug } from '@/lib/api/locations';

// Find Location
const useLocations = () => {
  return useQuery({
    queryKey: ['locations'],
    queryFn: findLocations,
  });
};

// Find Location from slug
export const useLocationBySlug = (slug: string) => {
  return useQuery({
    queryKey: ['location', slug],
    queryFn: () => findLocationBySlug(slug),
    enabled: !!slug,
  });
};

export default useLocations;
