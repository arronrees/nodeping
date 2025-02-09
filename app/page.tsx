import { Card } from '@/components/ui/card';
import Link from 'next/link';

export default function Home() {
  return (
    <div className='flex gap-4'>
      <Card>
        <Link href='/auth/login' className='rounded bg-slate-400 px-4 py-2'>
          Login
        </Link>
        <Link href='/auth/signup' className='rounded bg-slate-400 px-4 py-2'>
          Sign Up
        </Link>
      </Card>
    </div>
  );
}
