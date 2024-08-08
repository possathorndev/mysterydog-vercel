// Components
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { LOCATION_PATH } from '@/constants/config';

// Types
import { Location } from '@/lib/api/locations';
import { Link } from '@/utils/navigation';

const LocationCard = ({ data }: { data: Location }) => {
  return (
    <Link href={`${LOCATION_PATH}/${data?.slug}`}>
      <Card>
        <CardHeader>
          <CardTitle>{data?.name}</CardTitle>
          <CardDescription>Location Description</CardDescription>
        </CardHeader>
        <CardContent>
          <p>{data?.categories?.toString()}</p>
        </CardContent>
        <CardFooter>
          <p>Location Footer</p>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default LocationCard;
