import { useMemo } from 'react';

// API
import { Area } from '@/lib/api/areas';

// Hooks
import { useLocationAreas, useLocationCategories } from '@/hooks/useLocation';

// Components
import { Label } from '@/components/ui/label';
import AreaBadge from '@/components/SearchBar/FilterWidget/AreaBadge';
import ConnectForm from '@/components/FormConnect/FormConnect';

const AreaFilter = () => {
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
            By Area <span className='font-gaegu text-font-description/50'>(multiple select)</span>
          </Label>
          {isAreaLoading ? (
            <span>Loading ...</span>
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
                    <AreaBadge formController={control} item={item} />
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
