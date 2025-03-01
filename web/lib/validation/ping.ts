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

const updatePingData = z
  .object({
    id: z.string({
      required_error: 'ID is required',
      invalid_type_error: 'Must provide a valid ID',
    }),
    is_active: z.coerce.boolean({
      required_error: 'Is Active is required',
      invalid_type_error: 'Is Active must be true or false',
    }),
    check_interval_seconds: z.coerce.number({
      required_error: 'Check Interval is required',
      invalid_type_error: 'Check Interval must be a number',
    }),
  })
  .strict();

type UpdatePingType = z.infer<typeof updatePingData>;

export async function validateUpdatePingData(data: unknown): Promise<{
  success: boolean;
  error: string | null;
  data: UpdatePingType | null;
}> {
  try {
    const validatedData = updatePingData.parse(data);

    return { success: true, error: null, data: validatedData };
  } catch (err) {
    if (err instanceof z.ZodError) {
      return { success: false, error: err.errors[0].message, data: null };
    } else {
      return { success: false, error: 'An unknown error occurred', data: null };
    }
  }
}

const deletePingData = z
  .object({
    id: z.string({
      required_error: 'ID is required',
      invalid_type_error: 'Must provide a valid ID',
    }),
  })
  .strict();

type DeletePingType = z.infer<typeof deletePingData>;

export async function validateDeletePingData(data: unknown): Promise<{
  success: boolean;
  error: string | null;
  data: DeletePingType | null;
}> {
  try {
    const validatedData = deletePingData.parse(data);

    return { success: true, error: null, data: validatedData };
  } catch (err) {
    if (err instanceof z.ZodError) {
      return { success: false, error: err.errors[0].message, data: null };
    } else {
      return { success: false, error: 'An unknown error occurred', data: null };
    }
  }
}
