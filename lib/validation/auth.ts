import { z } from 'zod';

const signUpData = z
  .object({
    email: z
      .string({
        required_error: 'Email is required',
        invalid_type_error: 'Email must be a string',
      })
      .email(),
    password: z
      .string({
        required_error: 'Password is required',
        invalid_type_error: 'Password must be a string',
      })
      .min(6, 'Password must be at least 6 characters'),
  })
  .strict();

type SignUpType = z.infer<typeof signUpData>;

export async function validateSignUpData(data: unknown): Promise<{
  success: boolean;
  error: string | null;
  data: SignUpType | null;
}> {
  try {
    const validatedData = signUpData.parse(data);

    return { success: true, error: null, data: validatedData };
  } catch (err) {
    if (err instanceof z.ZodError) {
      return { success: false, error: err.errors[0].message, data: null };
    } else {
      return { success: false, error: 'An unknown error occurred', data: null };
    }
  }
}

const loginData = z
  .object({
    email: z
      .string({
        required_error: 'Email is required',
        invalid_type_error: 'Email must be a string',
      })
      .email(),
    password: z.string({
      required_error: 'Password is required',
      invalid_type_error: 'Password must be a string',
    }),
  })
  .strict();

type LoginType = z.infer<typeof loginData>;

export async function validateLoginData(
  data: unknown
): Promise<{ success: boolean; error: string | null; data: LoginType | null }> {
  try {
    const validatedData = loginData.parse(data);

    return { success: true, error: null, data: validatedData };
  } catch (err) {
    if (err instanceof z.ZodError) {
      return { success: false, error: err.errors[0].message, data: null };
    } else {
      return { success: false, error: 'An unknown error occurred', data: null };
    }
  }
}
