// Components
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

// Types
import { Venue } from '@/lib/api/venues';
import { Link } from '@/utils/navigation';

const VenueCard = ({ data }: { data: Venue }) => {
  return (
    <Link href={`/venue/${data?.slug}`}>
      <Card>
        <CardHeader>
          <CardTitle>{data?.name}</CardTitle>
          <CardDescription>Venue Description</CardDescription>
        </CardHeader>
        <CardContent>
          <p>{data?.categories}</p>
        </CardContent>
        <CardFooter>
          <p>Venue Footer</p>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default VenueCard;
