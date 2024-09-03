import { useMemo } from 'react';

// API
import { Service } from '@/lib/api/services';

// Hooks
import { useLocationServices } from '@/hooks/useLocation';

// Components
import { Label } from '@/components/ui/label';
import ServiceBadge from '@/components/MapPage/MapSheet/FilterWidget/ServiceBadge';
import ConnectForm from '@/components/FormConnect/FormConnect';
import { useMapParamsCtx } from '@/contexts/MapProvider/MapParamsProvider';
import { useTranslations } from 'next-intl';

interface ServiceFilter {
  onSubmit: () => void;
}

const ServiceFilter = ({ onSubmit }: ServiceFilter) => {
  const tGlobal = useTranslations('Global');
  const tFilterWidget = useTranslations('FilterWidget');

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
            {tFilterWidget('byService')}{' '}
            <span className='font-gaegu text-font-description/50'>({tFilterWidget('multipleSelect')})</span>
          </Label>
          {isServiceLoading ? (
            <span>{tGlobal('loading')}</span>
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
