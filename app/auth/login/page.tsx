import {
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
  Card,
  CardFooter,
} from '@/components/ui/card';
import { login } from '../actions';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export default async function LoginPage() {
  const supabase = await createClient();

  const { data } = await supabase.auth.getUser();

  if (data.user) {
    redirect('/');
  }

  return (
    <div className='flex justify-center items-center min-h-screen'>
      <Card className='max-w-md min-w-64 sm:min-w-[450px]'>
        <CardHeader>
          <CardTitle>Sign In</CardTitle>
          <CardDescription>
            Enter your credentials below to login to your account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className='space-y-4'>
            <div>
              <Label htmlFor='email'>Email address</Label>
              <div className='mt-2'>
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
              <div className='mt-2'>
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
              <Button type='submit' className='w-full' formAction={login}>
                Login
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <p className='text-xs'>
            Don&apos;t have an account?{' '}
            <Link href='/auth/signup' className='font-semibold'>
              Sign Up Here
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
