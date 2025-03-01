'use client';

import { ALLOWED_INTERVAL_SECONDS } from '@/constants';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Label } from '../ui/label';
import { Tables } from '@/database.types';
import { useActionState, useEffect, useState } from 'react';
import { InfoIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { updatePing } from '@/lib/actions/ping';
import { Button } from '../ui/button';

const initialFormState: { error: string | null; success: boolean } = {
  error: null,
  success: false,
};

export default function EditPingForm({ ping }: { ping: Tables<'pings'> }) {
  const [state, formAction, pending] = useActionState(
    updatePing,
    initialFormState
  );

  const [checkIntervalValue, setCheckIntervalValue] = useState<
    number | string | null
  >(null);
  const [isActive, setIsActive] = useState<boolean>(false);

  function handleActiveChange(value: string) {
    if (value === 'true') {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }

  const { toast } = useToast();

  useEffect(() => {
    if (state.success) {
      toast({
        title: 'Success',
        description: 'Ping updated successfully!',
      });
    }
  }, [state.success, toast]);

  useEffect(() => {
    setCheckIntervalValue(ping.check_interval_seconds);
    setIsActive(ping.is_active);
  }, [ping]);

  return (
    <form className='space-y-4' action={formAction}>
      <input type='hidden' name='id' value={ping.id} />
      <div>
        <Label className='block'>Check Interval</Label>
        {checkIntervalValue && (
          <input
            type='hidden'
            name='check_interval_seconds'
            value={checkIntervalValue}
          />
        )}
        <div className='mt-1'>
          <Select
            defaultValue={ping.check_interval_seconds.toString()}
            onValueChange={setCheckIntervalValue}
          >
            <SelectTrigger>
              <SelectValue placeholder='Select Interval' />
            </SelectTrigger>
            <SelectContent>
              {ALLOWED_INTERVAL_SECONDS.map((option) => (
                <SelectItem value={option.value.toString()} key={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div>
        <Label className='block'>Is Active</Label>
        {isActive && (
          <input
            type='hidden'
            name='is_active'
            value={isActive ? 'true' : undefined}
          />
        )}
        <div className='mt-1'>
          <Select
            defaultValue={ping.is_active ? 'true' : 'false'}
            onValueChange={handleActiveChange}
          >
            <SelectTrigger>
              <SelectValue placeholder='Select Interval' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={'true'}>Yes</SelectItem>
              <SelectItem value={'false'}>No</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div>
        <SubmitButton pending={pending} />
      </div>
      {state.error && (
        <div className='mt-2 px-2 py-1 font-medium rounded bg-red-50 border border-red-100 text-red-700 flex gap-2 items-center'>
          <InfoIcon className='w-3 h-3' />
          {state.error}
        </div>
      )}
    </form>
  );
}

function SubmitButton({ pending }: { pending: boolean }) {
  return (
    <Button type='submit' disabled={pending} aria-disabled={pending}>
      Update
    </Button>
  );
}
