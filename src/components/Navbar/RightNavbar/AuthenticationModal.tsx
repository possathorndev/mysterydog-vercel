import { Button } from '@/components/ui/button';
import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import LoginForm from '@/components/Authentication/LoginForm';
import RegisterForm from '@/components/Authentication/RegisterForm';
import { signOut, useSession } from 'next-auth/react';

const AuthenticationModal = () => {
  const session = useSession();

  const [open, setOpen] = useState(false);
  const [formState, setFormState] = useState(0);

  const handleLogout = (e) => {
    e.preventDefault();
    signOut();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        {session.status === 'authenticated' ? (
          <Button onClick={handleLogout}>Logout</Button>
        ) : session.status === 'unauthenticated' ? (
          <Button>Login</Button>
        ) : (
          <></>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Welcome to MysteryDog!</DialogTitle>
          <DialogDescription>You can login to find more places for your dog :)</DialogDescription>
        </DialogHeader>

        {/* Login */}
        {formState === 0 && (
          <>
            <LoginForm />
            <p>
              Not a user?{' '}
              <span className='cursor-pointer underline' onClick={() => setFormState(1)}>
                register
              </span>
            </p>
          </>
        )}

        {/* Register */}
        {formState === 1 && (
          <>
            <RegisterForm close={() => setOpen(false)} />
            <p>
              Have an account?{' '}
              <span className='cursor-pointer underline' onClick={() => setFormState(0)}>
                login
              </span>
            </p>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AuthenticationModal;
