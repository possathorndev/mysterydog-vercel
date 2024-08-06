import { useQuery } from '@tanstack/react-query';

// API
import { findVenues, findVenueBySlug } from '@/lib/api/venues';

// Find Venue
const useVenues = () => {
  return useQuery({
    queryKey: ['venues'],
    queryFn: findVenues,
  });
};

// Find Venue from slug
export const useVenueBySlug = (slug: string) => {
  return useQuery({
    queryKey: ['venue', slug],
    queryFn: () => findVenueBySlug(slug),
    enabled: !!slug,
  });
};

export default useVenues;
