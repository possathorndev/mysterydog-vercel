import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormProvider, useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import useAuthentication from '@/hooks/useAuthentication';
import { useEffect } from 'react';

export const registerFormSchema = z
  .object({
    email: z.string().email().nonempty('Email is required'),
    username: z.string().min(3).max(32).trim().optional(),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters long')
      .max(20, 'Password must be no more than 20 characters long')
      .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
      .regex(/[0-9]/, 'Password must contain at least one number')
      .regex(/[@$!%*?&]/, 'Password must contain at least one special character (@, $, !, %, *, ?, &)')
      .nonempty('Password is required'),
    confirmPassword: z.string(),
    firstname: z.string().min(3).max(32).trim(),
    lastname: z.string().min(3).max(32).trim(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords do not match',
  });

const RegisterForm = ({ close }: { close: () => void }) => {
  const { register } = useAuthentication();

  const form = useForm<z.infer<typeof registerFormSchema>>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {},
  });

  const {
    handleSubmit,
    formState: { isSubmitting, isValid, errors },
  } = form;

  const onSubmit = async (values: z.infer<typeof registerFormSchema>) => {
    const res = await register(
      {
        email: values.email,
        username: values.email,
        password: values.password,
      },
      close,
    );
  };

  return (
    <FormProvider {...form}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
          <FormField
            control={form.control}
            name='email'
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
          <FormField
            control={form.control}
            name='confirmPassword'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input type='password' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='firstname'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Firstname</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='lastname'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Lastname</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button onClick={handleSubmit(onSubmit)} disabled={isSubmitting || !isValid}>
            Submit
          </Button>
        </form>
      </Form>
    </FormProvider>
  );
};

export default RegisterForm;
