'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

const formSchema = z.object({
  search: z.string(),
});

const SearchForm = ({ handleSubmit }: { handleSubmit?: (search: string) => Promise<void> }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      search: '',
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    await handleSubmit?.(data.search);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className='flex items-center gap-2 p-4'>
          <div className='bg-secondary/10 rounded-sm p-2'>
            <Search className='h-6 w-6 text-secondary' />
          </div>
          <FormField
            control={form.control}
            name='search'
            render={({ field }) => (
              <>
                <FormControl>
                  <Input
                    placeholder='Search Area, Location Category...'
                    className='focus-visible:ring-secondary/10 h-8 border-none text-secondary placeholder:text-secondary'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </>
            )}
          />
          <Button type='submit' variant='secondary' size='sm'>
            Search
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default SearchForm;
