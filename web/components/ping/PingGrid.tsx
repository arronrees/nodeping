'use client';

import Link from 'next/link';
import React, { useCallback, useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { Tables } from '@/database.types';
import { createClient } from '@/utils/supabase/client';
import { User } from '@supabase/supabase-js';
import { Skeleton } from '../ui/skeleton';
import { getFavicon } from '@/lib/utils';

export default function PingGrid({
  user,
  viewAll,
}: {
  user: User;
  viewAll?: boolean;
}) {
  const supabase = createClient();

  const [pings, setPings] = useState<Tables<'pings'>[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getPings = useCallback(async () => {
    try {
      setIsLoading(true);

      const { data, error } = await supabase
        .from('pings')
        .select('*')
        .eq('user_id', user.id)
        .limit(viewAll ? Infinity : 5)
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      if (data) {
        setPings(data);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }, [user, supabase, viewAll]);

  useEffect(() => {
    getPings();
  }, [user, getPings]);

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  return (
    <div className='flex flex-col gap-2'>
      {pings && pings.map((ping) => <Ping key={ping.id} ping={ping} />)}
    </div>
  );
}

function Ping({ ping }: { ping: Tables<'pings'> }) {
  return (
    <div className='flex gap-2 items-center'>
      <div
        className={`flex items-center justify-center ${
          !ping.is_active ? 'opacity-40' : ''
        }`}
      >
        <Img src={getFavicon(ping.url) ?? undefined} />
      </div>
      <Link
        href={ping.url}
        target='_blank'
        rel='noreferrer noopener'
        className={`text-sm font-medium ${!ping.is_active ? 'opacity-40' : ''}`}
      >
        <p>{ping.url.replace('https://', '')}</p>
      </Link>
      <Button asChild variant='outline' size='sm' className='ml-auto'>
        <Link href={`/pings/${ping.id}`}>View</Link>
      </Button>
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
