import { useCallback, useEffect, useMemo } from 'react';
import { toast } from '@/components/ui/use-toast';
import { signIn, signOut, useSession } from 'next-auth/react';
import { loginAPI, LoginPayload, registerAPI, RegisterPayload } from '@/lib/api/authentication';

const useAuthentication = () => {
  const { status, data: session } = useSession();

  const logout = useCallback(() => {
    signOut({ redirect: false });
  }, []);

  const login = useCallback(
    async (payload: LoginPayload) => {
      try {
        await signIn();

        toast({ title: 'Success', description: 'You are now logged in!' });
      } catch (error) {
        toast({
          title: 'Failed to login',
          description: 'Please check your wallet and try again.',
          variant: 'destructive',
        });
        logout();
      }
    },
    [logout],
  );

  const register = useCallback(async (payload: RegisterPayload, callback?: () => void) => {
    try {
      const result = await registerAPI(payload);
      toast({ title: 'Success', description: 'Thank you for register!' });
      callback?.();
    } catch (error) {
      toast({
        title: 'Failed to register',
        description: 'Please try again',
        variant: 'destructive',
      });
    }
  }, []);

  return { register, login, logout };
};

export default useAuthentication;
