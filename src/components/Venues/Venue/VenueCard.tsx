// Components
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

// Types
import { VenueAttribute } from '@/lib/api/venues';
import { Link } from '@/utils/navigation';

const VenueCard = ({ data }: { data: VenueAttribute }) => {
  return (
    <Link href={`/venue/${data?.attributes?.slug}`}>
      <Card>
        <CardHeader>
          <CardTitle>{data?.attributes?.name}</CardTitle>
          <CardDescription>Venue Description</CardDescription>
        </CardHeader>
        <CardContent>
          <p>{data?.attributes?.categories}</p>
        </CardContent>
        <CardFooter>
          <p>Venue Footer</p>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default VenueCard;
