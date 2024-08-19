import { Location } from '@/lib/api/locations';
import { formatAddressToString } from '@/utils/helpers';
import { ServiceDisplayBadge } from '@/components/MapPage/MapSheet/FilterWidget/ServiceBadge';
import OpeningHourLabel from '@/components/Locations/Location/OpeningHourLabel';
import { Separator } from '@/components/ui/separator';
import ServiceOptions from '@/components/MapPage/MapSheet/PlaceWidget/ServiceOptions';

interface PlaceContent {
  data: Location;
}

const PlaceContent = ({ data }: PlaceContent) => {
  const categories = data?.categories?.data?.flatMap((category) => category.attributes);

  return (
    <div className='h-full rounded-b-[13.8px] p-2 px-4'>
      <div className='flex items-center justify-between'>
        {categories?.map((category, index) => (
          <div key={index} style={{ color: category?.color }} className='font-gaegu'>
            {category?.name}
          </div>
        ))}
      </div>
      <div className='text-lg font-bold text-font-header'>{data.name}</div>
      <div className='font-gaegu text-sm text-font-description'>{formatAddressToString(data.address)}</div>
      <div className='mt-2 flex flex-wrap gap-1'>
        {data.services?.data?.map((service) => (
          <ServiceDisplayBadge key={service.id} item={service.attributes} showIcon />
        ))}
      </div>

      <Separator className='my-6' />

      <div>
        <OpeningHourLabel data={data.openingHours} showAllButton />
        <ServiceOptions data={data.services} />
        <div
          dangerouslySetInnerHTML={{ __html: data.description }}
          className='prose font-gaegu text-font-description lg:prose-xl'
        />
      </div>
    </div>
  );
};

export default PlaceContent;
