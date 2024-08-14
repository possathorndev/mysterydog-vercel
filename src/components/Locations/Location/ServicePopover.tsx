'use client';

import { isMobile } from 'react-device-detect';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Service } from '@/lib/api/services';
import { ServiceDisplayBadge } from '@/components/SearchBar/FilterWidget/ServiceBadge';

const ServicePopover = ({ services }: { services?: Service[] }) => {
  const Trigger = (
    <div className='h-4 w-4 cursor-pointer rounded-full border border-primary text-center text-xs text-primary'>?</div>
  );

  const Content = (
    <div className='w-full'>
      <div className='flex flex-wrap gap-1'>
        {services?.map((service, index) => <ServiceDisplayBadge key={index} item={service} isSelected small />)}
      </div>
      <div className='mt-2 flex flex-col gap-1'>
        {services?.map((service, index) => (
          <div key={index} className='font-gaegu text-xs text-font-description'>
            <span style={{ color: service?.color }}>{service?.name}: </span>
            <span>{service?.description}</span>
          </div>
        ))}
      </div>
    </div>
  );

  if (isMobile) {
    return (
      <Popover>
        <PopoverTrigger asChild>{Trigger}</PopoverTrigger>
        <PopoverContent className='w-64'>{Content}</PopoverContent>
      </Popover>
    );
  }

  return (
    <HoverCard>
      <HoverCardTrigger asChild>{Trigger}</HoverCardTrigger>
      <HoverCardContent className='w-64'>{Content}</HoverCardContent>
    </HoverCard>
  );
};

export default ServicePopover;
