import { z } from 'zod';

const createPingData = z
  .object({
    url: z
      .string({
        required_error: 'Email is required',
        invalid_type_error: 'Email must be a string',
      })
      .url(),
  })
  .strict();

type CreatePingType = z.infer<typeof createPingData>;

export async function validateCreatePingData(data: unknown): Promise<{
  success: boolean;
  error: string | null;
  data: CreatePingType | null;
}> {
  try {
    const validatedData = createPingData.parse(data);

    return { success: true, error: null, data: validatedData };
  } catch (err) {
    if (err instanceof z.ZodError) {
      return { success: false, error: err.errors[0].message, data: null };
    } else {
      return { success: false, error: 'An unknown error occurred', data: null };
    }
  }
}
