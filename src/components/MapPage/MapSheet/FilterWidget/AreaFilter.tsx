import { useMemo } from 'react';

// API
import { Area } from '@/lib/api/areas';

// Hooks
import { useLocationAreas } from '@/hooks/useLocation';
import { useMapParamsCtx } from '@/contexts/MapProvider/MapParamsProvider';

// Components
import { Label } from '@/components/ui/label';
import AreaBadge from '@/components/MapPage/MapSheet/FilterWidget/AreaBadge';
import ConnectForm from '@/components/FormConnect/FormConnect';
import { useTranslations } from 'next-intl';

interface AreaFilter {
  onSubmit: () => void;
}

const AreaFilter = ({ onSubmit }: AreaFilter) => {
  const tGlobal = useTranslations('Global');
  const tFilterWidget = useTranslations('FilterWidget');

  const { areasParams } = useMapParamsCtx();
  const { isAreaLoading, areas } = useLocationAreas({ query: { sort: ['name:asc'] } });

  const areasData = useMemo(() => {
    return areas?.data?.flatMap((area) => area.attributes);
  }, [areas]);

  const rowsHeight = useMemo(() => {
    if (areasData) {
      return Math.ceil(areasData?.length / 2);
    }
  }, [areasData]);

  let recentAlphabet;

  return (
    <ConnectForm>
      {({ control }) => (
        <>
          <Label htmlFor='name' className='text-left font-bold text-primary'>
            {tFilterWidget('byArea')}{' '}
            <span className='font-gaegu text-font-description/50'>({tFilterWidget('multipleSelect')})</span>
          </Label>
          {isAreaLoading ? (
            <span>{tGlobal('loading')}</span>
          ) : (
            <div className={`grid grid-flow-col gap-1`} style={{ gridTemplateRows: `repeat(${rowsHeight}, auto)` }}>
              {areasData?.map((item: Area, index) => {
                recentAlphabet = index > 0 ? areasData?.[index - 1].name.charAt(0).toLowerCase() : 0;

                const showAlphabet = recentAlphabet !== item.name.charAt(0).toLowerCase();

                return (
                  <div key={index}>
                    {showAlphabet && (
                      <p className='my-1.5 text-sm text-font-description'>{item.name.charAt(0).toUpperCase()}</p>
                    )}
                    <AreaBadge formController={control} item={item} selectAll={!areasParams} handleSubmit={onSubmit} />
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}
    </ConnectForm>
  );
};

export default AreaFilter;
