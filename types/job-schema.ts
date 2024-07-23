import { duration_types } from '@/lib/duration-types';
import * as z from 'zod';

const requiredString = z.string().min(1, 'Required');

export const createJobSchema = z
  .object({
    title: requiredString.max(100),
    type: requiredString.refine(
      (value) => duration_types.includes(value),
      'Invalid duration type'
    ),
    salary: requiredString.regex(/^\d+$/, 'must be a number').max(10),
    companyName: requiredString.max(100),
    description: requiredString.max(500).max(4000),
    applyUrl: z.string().url().max(150).optional().or(z.literal('')),
    applyEmail: z.string().email().max(100).optional().or(z.literal('')),
    location: requiredString.max(100),
    companyLogo: z.string().min(1, 'Logo Required'),
  })
  .refine((data) => data.applyUrl || data.applyEmail, {
    message: 'Either applyUrl or applyEmail is required',
    path: ['applyEmail'],
  });

export type TCreateJobSchema = z.infer<typeof createJobSchema>;
