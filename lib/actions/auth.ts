'use server';

import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';
import { validateLoginData, validateSignUpData } from '../validation/auth';

export async function signup(
  prevState: {
    error: string | null;
    success: boolean;
  },
  formData: FormData
) {
  const supabase = await createClient();

  const data = {
    email: formData.get('email'),
    password: formData.get('password'),
  };

  const { error: validationError, data: validatedData } =
    await validateSignUpData(data);

  if (validationError) {
    console.error('Sign Up Validation Error: ', validationError);

    return { error: validationError, success: false };
  }

  if (!validatedData) {
    console.error('Sign Up Validation Error: No validated data returned');

    return { error: 'Invalid data provided', success: false };
  }

  const { error } = await supabase.auth.signUp(validatedData);

  if (error) {
    console.log('Sign Up Error: ', error);

    return { error: error.message, success: false };
  }

  revalidatePath('/', 'layout');
  return { error: null, success: true };
}

export async function login(
  prevState: {
    error: string | null;
    success: boolean;
  },
  formData: FormData
) {
  const supabase = await createClient();

  const data = {
    email: formData.get('email'),
    password: formData.get('password'),
  };

  const { error: validationError, data: validatedData } =
    await validateLoginData(data);

  if (validationError) {
    console.error('Login Validation Error: ', validationError);

    return { error: validationError, success: false };
  }

  if (!validatedData) {
    console.error('Login Validation Error: No validated data returned');

    return { error: 'Invalid data provided', success: false };
  }

  const { error } = await supabase.auth.signInWithPassword(validatedData);

  if (error) {
    console.log('Sign Up Error: ', error);

    return { error: error.message, success: false };
  }

  revalidatePath('/', 'layout');
  return { error: null, success: true };
}
