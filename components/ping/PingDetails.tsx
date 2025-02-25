'use client';

import { getFavicon } from '@/lib/utils';
import { useCallback, useEffect, useState } from 'react';
import { Skeleton } from '../ui/skeleton';
import { createClient } from '@/utils/supabase/client';
import { User } from '@supabase/supabase-js';
import { Tables } from '@/database.types';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import EditPingForm from './EditPingForm';
import DeletePingForm from './DeletePingForm';

export default function PingDetails({ user, id }: { user: User; id: string }) {
  const supabase = createClient();

  const [ping, setPing] = useState<Tables<'pings'> | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getPing = useCallback(async () => {
    try {
      setIsLoading(true);

      const { data, error } = await supabase
        .from('pings')
        .select('*')
        .eq('id', id)
        .eq('user_id', user.id)
        .single();

      if (error) {
        throw error;
      }

      if (data) {
        setPing(data);
      }
    } catch (err) {
      console.log(err);
      redirect('/');
    } finally {
      setIsLoading(false);
    }
  }, [user, supabase, id]);

  useEffect(() => {
    getPing();
  }, [user, getPing]);

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  if (!ping) {
    return null;
  }

  return (
    <div>
      <div className='flex gap-2 justify-between items-center'>
        <div className='flex gap-2 items-center'>
          <div className='flex items-center justify-center'>
            <Img src={getFavicon(ping.url) ?? undefined} />
          </div>
          <p className='font-bold'>
            <Link href={ping.url} target='_blank' rel='noreferrer noopener'>
              {ping.url}
            </Link>
          </p>
        </div>
        <div>
          <DeletePingForm ping={ping} />
        </div>
      </div>
      <div className='py-4'>
        <hr />
      </div>
      <div className='grid grid-cols-2 gap-4'>
        <div>
          <p className='font-bold uppercase text-xs'>Last Checked</p>
          <p className='text-lg'>{ping.last_checked ?? 'n/a'}</p>
        </div>
        <div>
          <p className='font-bold uppercase text-xs'>
            Status When Last Checked
          </p>
          <p className='text-lg'>{ping.status_last_checked ?? 'n/a'}</p>
        </div>
      </div>
      <div className='py-4'>
        <hr />
      </div>
      <div>
        <EditPingForm ping={ping} />
      </div>
    </div>
  );
}

function Img({ src }: { src?: string }) {
  const [isBroken, setIsBroken] = useState(false);

  function handleError() {
    setIsBroken(true);
  }

  if (isBroken) {
    return <span className='w-5 block'></span>;
  }

  return (
    <picture>
      <img
        src={src}
        onError={handleError}
        width={20}
        height={20}
        className='w-5 h-5'
        alt='faviocon'
      />
    </picture>
  );
}

function LoadingSkeleton() {
  return (
    <div className='flex flex-col gap-2'>
      {[...Array(3)].map((_, i) => (
        <div key={i} className='grid gap-2 grid-cols-[0.5fr,4fr,1fr]'>
          <Skeleton className='rounded h-8 w-full' />
          <Skeleton className='rounded h-8 w-full' />
          <Skeleton className='rounded h-8 w-full' />
        </div>
      ))}
    </div>
  );
}
