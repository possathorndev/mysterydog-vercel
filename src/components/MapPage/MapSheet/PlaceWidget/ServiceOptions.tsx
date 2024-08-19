import { Service } from '@/lib/api/services';
import { ListResponseData } from '@/lib/api/utils/common';
import Image from 'next/image';

interface ServiceOptions {
  data: ListResponseData<Service>;
}

const ServiceOptions = ({ data }: ServiceOptions) => {
  const services = data?.data?.flatMap((service) => service.attributes);

  return (
    <div className='my-5 rounded-lg bg-secondary/10 px-4 pt-4'>
      <p className='mb-4'>Pet Service options</p>

      {services?.map?.((item, index) => (
        <div key={index} className='flex gap-2 pb-4'>
          <div>
            <Image
              src={item?.icon?.data?.attributes?.url || ''}
              alt={item.slug}
              className='mr-2'
              width={24}
              height={24}
            />
          </div>
          <div>
            <p style={{ color: item.color }}>{item.name}</p>
            <p className='font-gaegu text-font-description'>{item.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ServiceOptions;
