import { z, ZodError } from "zod";

export function formatZodErrors<T extends z.ZodType>(
  error: ZodError,
): Partial<Record<keyof z.infer<T>, string>> {
  const errors: Partial<Record<keyof z.infer<T>, string>> = {};

  error.issues.forEach((issue) => {
    const field = issue.path[0] as keyof z.infer<T>;
    // Mantém apenas o primeiro erro de cada campo
    if (field && !errors[field]) {
      errors[field] = issue.message;
    }
  });

  return errors;
}
