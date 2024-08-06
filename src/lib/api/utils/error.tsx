import { toast } from '@/components/ui/use-toast';
import { AxiosError } from 'axios';

export const handleAPIError = (error: any) => {
  let title = 'Opps! Something went wrong';
  let description = 'Please try again later';

  if (error instanceof AxiosError) {
    const errorData = error.response?.data?.error;

    if (errorData.message.includes('Username already taken')) {
      title = 'Username already taken';
      description = 'Please try another username';
    }
  }

  toast({ title, description, variant: 'destructive' });

  throw error;
};
