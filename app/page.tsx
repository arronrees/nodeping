import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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
      <div className='pt-32'>
        <Card className='min-w-64 sm:min-w-[450px]'>
          <CardHeader>
            <CardTitle>Add New Ping</CardTitle>
            <CardDescription>Enter the website url below</CardDescription>
          </CardHeader>
          <CardContent>
            <form className='space-y-4'>
              <div>
                <Label htmlFor='new_url'>URL</Label>
                <div className='mt-2'>
                  <Input
                    id='new_url'
                    name='new_url'
                    type='text'
                    required
                    autoComplete='new_url'
                    placeholder='e.g. https://google.com'
                  />
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
      <div>
        <Card className='min-w-64 sm:min-w-[450px]'>
          <CardHeader>
            <CardTitle>Current Pings</CardTitle>
            <CardDescription>Manage your current pings below</CardDescription>
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
