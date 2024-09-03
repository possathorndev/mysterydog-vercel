import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

const MenuBreadcrumb = ({ data }: { data: { title: string; href?: string }[] }) => {
  return (
    <Breadcrumb className='flex h-14 items-center border-b-2 px-2 py-2 md:px-6'>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href='/'>Home</BreadcrumbLink>
        </BreadcrumbItem>
        {data.map((item, index) => (
          <BreadcrumbItem key={index}>
            <BreadcrumbSeparator />
            <BreadcrumbLink href={item.href} className={cn(index === data.length - 1 && 'text-primary')}>
              {item.title}
            </BreadcrumbLink>
          </BreadcrumbItem>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default MenuBreadcrumb;
