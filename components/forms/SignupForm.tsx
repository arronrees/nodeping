'use client';

import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useActionState, useEffect } from 'react';
import { signup } from '@/lib/actions/auth';
import { useToast } from '@/hooks/use-toast';
import { InfoIcon } from 'lucide-react';

const initialFormState: { error: string | null; success: boolean } = {
  error: null,
  success: false,
};

export default function SignupForm() {
  const [state, formAction, pending] = useActionState(signup, initialFormState);

  const { toast } = useToast();

  useEffect(() => {
    if (state.success) {
      toast({
        title: 'Sign Up Success',
        description: 'Thanks for signing up!',
      });
    }
  }, [state.success, toast]);

  return (
    <form className='space-y-4' action={formAction}>
      <div>
        <Label htmlFor='email'>Email address</Label>
        <div className='mt-1'>
          <Input
            id='email'
            name='email'
            type='email'
            required
            autoComplete='email'
          />
        </div>
      </div>

      <div>
        <div className='flex items-center justify-between'>
          <Label htmlFor='password'>Password</Label>
          <div>
            <a
              href='/forgot-password'
              className='font-medium text-xs text-muted-foreground'
              tabIndex={-1}
            >
              Forgot password?
            </a>
          </div>
        </div>
        <div className='mt-1'>
          <Input
            id='password'
            name='password'
            type='password'
            required
            autoComplete='current-password'
          />
        </div>
      </div>

      <div className='flex gap-2'>
        {state.error && (
          <div className='px-2 py-1 font-medium rounded bg-red-50 border border-red-100 text-red-700 flex gap-2 items-center'>
            <InfoIcon className='w-3 h-3' />
            {state.error}
          </div>
        )}
        <SubmitButton pending={pending} />
      </div>
    </form>
  );
}

function SubmitButton({ pending }: { pending: boolean }) {
  return (
    <Button
      type='submit'
      className='w-full'
      disabled={pending}
      aria-disabled={pending}
    >
      Sign Up
    </Button>
  );
}
