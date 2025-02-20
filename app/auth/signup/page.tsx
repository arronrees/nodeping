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
import SignupForm from '@/components/auth/SignupForm';

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
            <CardTitle>Sign Up</CardTitle>
            <CardDescription>
              Enter your details below to create your account.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <SignupForm />
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
    </div>
  );
}
