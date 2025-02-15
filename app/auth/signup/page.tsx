import {
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
  Card,
  CardFooter,
} from '@/components/ui/card';
import { signup } from '../actions';
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
          <CardTitle>Sign Up</CardTitle>
          <CardDescription>
            Enter your details below to create your account.
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
              <Button type='submit' className='w-full' formAction={signup}>
                Sign Up
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <p className='text-xs'>
            Already have an account?{' '}
            <Link href='/auth/login' className='font-semibold'>
              Login Here
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
