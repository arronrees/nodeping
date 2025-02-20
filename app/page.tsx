import CreatePingForm from '@/components/ping/CreatePingForm';
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

export default async function Home() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();

  if (!data.user || error) {
    redirect('/');
  }

  return (
    <div className='flex flex-col gap-4 justify-center items-center p-8'>
      <div className=''>
        <Card className='min-w-64 sm:min-w-[450px]'>
          <CardHeader>
            <CardTitle>Add New Ping</CardTitle>
            <CardDescription>Enter the website url below</CardDescription>
          </CardHeader>
          <CardContent>
            <CreatePingForm />
          </CardContent>
        </Card>
      </div>
      <div>
        <Card className='min-w-64 sm:min-w-[450px]'>
          <CardHeader>
            <div className='flex gap-4 justify-between items-end'>
              <div>
                <CardTitle>Recently Added Pings</CardTitle>
                <CardDescription>
                  Manage your current pings below
                </CardDescription>
              </div>
              <Button asChild size='sm'>
                <Link href='/pings'>View All</Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className='flex flex-col gap-2'>
              <div className='flex gap-2 items-center'>
                <div className='flex items-center justify-center'>
                  <picture>
                    <img
                      src='https://google.com/favicon.ico'
                      width={20}
                      height={20}
                      className='w-5 h-5'
                      alt='faviocon'
                    />
                  </picture>
                </div>
                <Link
                  href='https://google.com'
                  target='_blank'
                  rel='noreferrer noopener'
                  className='text-sm font-medium'
                >
                  <p>https://google.com</p>
                </Link>
                <Button asChild variant='outline' className='ml-auto'>
                  <Link href='/'>Edit</Link>
                </Button>
              </div>
              <div className='flex gap-2 items-center'>
                <div className='flex items-center justify-center'>
                  <picture>
                    <img
                      src='https://facebook.com/favicon.ico'
                      width={20}
                      height={20}
                      className='w-5 h-5'
                      alt='faviocon'
                    />
                  </picture>
                </div>
                <Link
                  href='https://facebook.com'
                  target='_blank'
                  rel='noreferrer noopener'
                  className='text-sm font-medium'
                >
                  <p>https://facebook.com</p>
                </Link>
                <Button asChild variant='outline' className='ml-auto'>
                  <Link href='/'>Edit</Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
