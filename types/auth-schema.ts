import * as z from 'zod';

export const signinSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
  code: z.string().min(6, 'Code must contain 6 numbers').optional(),
});

export type TSigninSchema = z.infer<typeof signinSchema>;

export const signupSchema = z
  .object({
    email: z.string().email(),
    password: z
      .string()
      .min(6, 'Password must be at least 6 characters long')
      .max(40, 'Password must be at most 40 characters long'),
    confirmPassword: z.string(),
    accept: z.literal(true, {
      errorMap: () => ({
        message: 'Please accept the terms and conditions before continuing',
      }),
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export type TSignupSchema = z.infer<typeof signupSchema>;

export const forgotPasswordSchema = z.object({
  email: z.string().email('Invalid email address'),
});

export type TForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>;

export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(6, 'Password must be at least 6 characters long')
      .max(40, 'Password must be at most 40 characters long'),
    confirmPassword: z.string(),
    token: z.string().nullable().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export type TResetPasswordSchema = z.infer<typeof resetPasswordSchema>;

export const userSettingsNewPasswordSchema = z
  .object({
    password: z
      .string()
      .min(6, 'Password must be at least 6 characters long')
      .max(40, 'Password must be at most 40 characters long')
      .optional(),
    newPassword: z
      .string()
      .min(6, 'Password must be at least 6 characters long')
      .max(40, 'Password must be at most 40 characters long')
      .optional(),
    confirmNewPassword: z.string().optional(),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: 'New passwords do not match',
    path: ['confirmNewPassword'],
  });

export type TUserSettingsNewPasswordSchema = z.infer<
  typeof userSettingsNewPasswordSchema
>;

export const twoFactorSchema = z.object({
  isTwoFactorEnabled: z.boolean(),
});

export type TTwoFactorSchema = z.infer<typeof twoFactorSchema>;
