'use server';

import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';
import { validateCreatePingData } from '../validation/ping';

export async function createPing(
  prevState: {
    error: string | null;
    success: boolean;
  },
  formData: FormData
) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: 'No User', success: false };
  }

  const data = {
    url: formData.get('url') as string,
  };

  data.url = data.url.replace('http://', 'https://');

  if (!data.url.startsWith('http')) {
    data.url = `https://${data.url}`;
  }

  const { error: validationError, data: validatedData } =
    await validateCreatePingData(data);

  if (validationError) {
    console.error('Create Ping Validation Error: ', validationError);

    return { error: validationError, success: false };
  }

  if (!validatedData) {
    console.error('Create Ping Validation Error: No validated data returned');

    return { error: 'Invalid data provided', success: false };
  }

  const { error: createError } = await supabase.from('pings').insert({
    url: validatedData.url,
    notification_email: (user.email as string) ?? '',
    user_id: user.id,
  });

  if (createError) {
    console.log('Create ping error: ', createError);

    return {
      error: 'An unkown error occured, please try again later.',
      success: false,
    };
  }

  revalidatePath('/', 'layout');
  return { error: null, success: true };
}
