import { useMemo } from 'react';

// API
import { Service } from '@/lib/api/services';

// Hooks
import { useLocationServices } from '@/hooks/useLocation';

// Components
import { Label } from '@/components/ui/label';
import ServiceBadge from '@/components/SearchBar/FilterWidget/ServiceBadge';
import ConnectForm from '@/components/FormConnect/FormConnect';
import { useMapParamsCtx } from '@/contexts/MapParamsProvider';

interface ServiceFilter {
  onSubmit: () => void;
}

const ServiceFilter = ({ onSubmit }: ServiceFilter) => {
  const { servicesParams } = useMapParamsCtx();
  const { isServiceLoading, services } = useLocationServices({ query: {} });

  const servicesData = useMemo(() => {
    return services?.data?.flatMap((service) => service.attributes);
  }, [services]);

  return (
    <ConnectForm>
      {({ control }) => (
        <>
          <Label htmlFor='name' className='text-left font-bold text-primary'>
            By Service <span className='font-gaegu text-font-description/50'>(multiple select)</span>
          </Label>
          {isServiceLoading ? (
            <span>Loading ...</span>
          ) : (
            <div className='flex flex-wrap gap-2'>
              {servicesData?.map((data: Service, index: number) => (
                <ServiceBadge
                  key={index}
                  item={data}
                  formController={control}
                  selectAll={!servicesParams}
                  handleSubmit={onSubmit}
                />
              ))}
            </div>
          )}
        </>
      )}
    </ConnectForm>
  );
};

export default ServiceFilter;
