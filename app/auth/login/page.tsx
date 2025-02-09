import {
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
  Card,
} from '@/components/ui/card';
import { login, signup } from '../actions';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

export default function LoginPage() {
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
              <Button type='submit' className='w-full' formAction={signup}>
                Sign Up
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
