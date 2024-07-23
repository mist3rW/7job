'use server';
import { actionClient } from '@/lib/safe-action';
import { createJobSchema, jobFilterSchema } from '@/types/job-schema';
import prisma from '../db';
import { createSlug } from '@/lib/utils';
import { redirect } from 'next/navigation';

export const jobFilterAction = actionClient
  .schema(jobFilterSchema)
  .action(async ({ parsedInput: values }) => {
    const { query, type, location } = values;

    const searchQuery = new URLSearchParams({
      ...(query && { query: query.trim() }),
      ...(type && { type }),
      ...(location && { location }),
    });

    redirect(`/?${searchQuery.toString()}`);
  });

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

export const distinctLocations = async (): Promise<string[]> => {
  return prisma.job
    .findMany({
      where: {
        approved: true,
      },
      select: {
        location: true,
      },
      distinct: ['location'],
    })
    .then((locations) =>
      locations.map(({ location }) => location).filter(Boolean)
    );
};
