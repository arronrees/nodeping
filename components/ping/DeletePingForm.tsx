import { Tables } from '@/database.types';
import { useToast } from '@/hooks/use-toast';
import { deletePing } from '@/lib/actions/ping';
import { useActionState, useEffect } from 'react';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';

const initialFormState: { error: string | null; success: boolean } = {
  error: null,
  success: false,
};

export default function DeletePingForm({ ping }: { ping: Tables<'pings'> }) {
  const [state, formAction, pending] = useActionState(
    deletePing,
    initialFormState
  );

  const { toast } = useToast();

  const router = useRouter();

  useEffect(() => {
    if (state.success) {
      toast({
        title: 'Success',
        description: 'Ping deleted successfully!',
      });

      router.push('/pings');
    }
  }, [state.success, toast, router]);

  return (
    <form action={formAction}>
      <input type='hidden' name='id' value={ping.id} />
      <Button
        type='submit'
        size='sm'
        variant='destructive'
        disabled={pending}
        aria-disabled={pending}
      >
        Delete Ping
      </Button>
    </form>
  );
}
