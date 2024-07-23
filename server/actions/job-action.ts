'use server';
import { actionClient } from '@/lib/safe-action';
import { createJobSchema } from '@/types/job-schema';
import prisma from '../db';
import { createSlug } from '@/lib/utils';

export const createJobAction = actionClient
  .schema(createJobSchema)
  .action(async ({ parsedInput: values }) => {
    console.log('Action Triggered');
    const {
      title,
      type,
      salary,
      companyName,
      description,
      applyUrl,
      applyEmail,
      location,
      companyLogo,
    } = values;

    const slug = createSlug(title, companyName);

    try {
      await prisma.job.create({
        data: {
          title,
          slug,
          type,
          salary: Number(salary),
          companyName,
          description,
          applyUrl,
          applyEmail,
          location,
          companyLogo,
        },
      });

      return { success: 'Job submitted successfully' };
    } catch (error) {
      console.error(error);
      throw new Error('Failed to create job');
    }
  });
