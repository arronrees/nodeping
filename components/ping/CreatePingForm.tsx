'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { createPing } from '@/lib/actions/ping';
import { InfoIcon } from 'lucide-react';
import { useActionState, useEffect } from 'react';
import { Button } from '../ui/button';

const initialFormState: { error: string | null; success: boolean } = {
  error: null,
  success: false,
};

export default function CreatePingForm() {
  const [state, formAction, pending] = useActionState(
    createPing,
    initialFormState
  );

  const { toast } = useToast();

  useEffect(() => {
    if (state.success) {
      toast({
        title: 'Success',
        description: 'Ping added successfully!',
      });
    }
  }, [state.success, toast]);

  return (
    <form className='space-y-4' action={formAction}>
      <div>
        <Label htmlFor='url'>URL</Label>
        <div className='mt-2 flex gap-1'>
          <Input
            id='url'
            name='url'
            type='text'
            required
            autoComplete='url'
            placeholder='e.g. https://google.com'
          />
          <SubmitButton pending={pending} />
        </div>

        {state.error && (
          <div className='mt-2 px-2 py-1 font-medium rounded bg-red-50 border border-red-100 text-red-700 flex gap-2 items-center'>
            <InfoIcon className='w-3 h-3' />
            {state.error}
          </div>
        )}
      </div>
    </form>
  );
}

function SubmitButton({ pending }: { pending: boolean }) {
  return (
    <Button type='submit' disabled={pending} aria-disabled={pending}>
      Add
    </Button>
  );
}
