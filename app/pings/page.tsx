import PingGrid from '@/components/ping/PingGrid';
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

export default async function Pings() {
  const supabase = await createClient();

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
                <CardTitle>All Pings</CardTitle>
                <CardDescription>
                  Manage your current pings below
                </CardDescription>
              </div>
              <Button asChild size='sm'>
                <Link href='/'>Add New Ping</Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <PingGrid user={data.user} viewAll />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
