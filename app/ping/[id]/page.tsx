import PingDetails from '@/components/ping/PingDetails';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { createClient } from '@/utils/supabase/server';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export default async function Ping({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const supabase = await createClient();

  const { id } = await params;

  const { data, error } = await supabase.auth.getUser();

  if (!data.user || error) {
    redirect('/');
  }

  return (
    <div className='flex flex-col gap-4 justify-center items-center p-8'>
      <div>
        <Card className='min-w-64 sm:min-w-[450px]'>
          <CardHeader>
            <div className='flex gap-4 justify-between items-end'>
              <div>
                <CardTitle>Ping Details</CardTitle>
                <CardDescription>View the ping details below.</CardDescription>
              </div>
              <Button asChild size='sm' variant='secondary'>
                <Link href='/'>Back to all pings</Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {id && <PingDetails user={data.user} id={id} />}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
