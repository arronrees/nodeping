import {
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
  Card,
  CardFooter,
} from '@/components/ui/card';
import Link from 'next/link';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import LoginForm from '@/components/forms/LoginForm';

export default async function LoginPage() {
  const supabase = await createClient();

  const { data } = await supabase.auth.getUser();

  if (data.user) {
    redirect('/');
  }

  return (
    <div className='flex flex-col gap-4 justify-center items-center p-8'>
      <div className='flex justify-center items-center'>
        <Card className='max-w-md min-w-64 sm:min-w-[450px]'>
          <CardHeader>
            <CardTitle>Sign In</CardTitle>
            <CardDescription>
              Enter your credentials below to login to your account.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <LoginForm />
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
    </div>
  );
}
