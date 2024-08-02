import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormProvider, useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import useAuthentication from '@/hooks/useAuthentication';
import { LoginPayload } from '@/lib/api/authentication';
import { signIn } from 'next-auth/react';

export const loginFormSchema = z.object({
  username: z.string().min(3).max(32).trim(),
  password: z.string(),
});

const LoginForm = () => {
  const { login } = useAuthentication();

  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const {
    handleSubmit,
    formState: { isSubmitting, isValid },
  } = form;

  const onSubmit = (values: z.infer<typeof loginFormSchema>) => {
    signIn('credentials', {
      identifier: values.username,
      password: values.password,
    });
  };

  return (
    <FormProvider {...form}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
          <FormField
            control={form.control}
            name='username'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type='password' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button onClick={handleSubmit(onSubmit)}>Submit</Button>
        </form>
      </Form>
    </FormProvider>
  );
};

export default LoginForm;
