'use client';

import { OpeningHour } from '@/lib/api/locations';
import moment from 'moment';
import { useMemo, useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp } from 'lucide-react';

const OpeningHourLabel = ({ data, showAllButton }: { data: OpeningHour[]; showAllButton?: boolean }) => {
  const [open, setOpen] = useState(false);

  const todayOpeningHour = useMemo(() => {
    const today = moment().format('dddd');
    return data?.find((day) => day.title.toLowerCase() === today.toLowerCase());
  }, [data]);

  if (!todayOpeningHour) return null;

  return (
    <div className='flex items-center gap-2'>
      <div className='pt-1 align-middle text-xs font-bold text-primary'>Today</div>
      <div className='pt-1 align-middle text-xs font-bold text-secondary'>{todayOpeningHour?.displayValue}</div>
      {showAllButton && (
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant='ghost'
              className='h-2 rounded-[6px] bg-secondary/10 px-1 text-secondary hover:bg-secondary/20 hover:text-secondary'
            >
              {open ? (
                <ChevronUp className='h-2 w-2' strokeWidth='4px' />
              ) : (
                <ChevronDown className='h-2 w-2' strokeWidth='4px' />
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className='w-50'>
            <div className='flex flex-col gap-2'>
              {data?.map((day, index) => (
                <div key={index} className='flex justify-between gap-2'>
                  <span className='text-xs font-bold text-primary'>{day.title}</span>
                  <span className='text-xs font-bold text-secondary'>{day.displayValue}</span>
                </div>
              ))}
            </div>
          </PopoverContent>
        </Popover>
      )}
    </div>
  );
};

export default OpeningHourLabel;
