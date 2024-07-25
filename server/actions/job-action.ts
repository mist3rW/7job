'use server';
import { actionClient } from '@/lib/safe-action';
import {
  approveDeleteJobSchema,
  createJobSchema,
  jobFilterSchema,
} from '@/types/job-schema';
import prisma from '../db';
import { createSlug } from '@/lib/utils';
import { redirect } from 'next/navigation';
import { auth } from '../auth';
import { revalidatePath } from 'next/cache';
import { utapi } from '@/app/api/uploadthing/core';

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
      revalidatePath('/dashboard/jobs');
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

type FormState = { error?: string } | undefined;

export async function approveJobs(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  try {
    const jobId = formData.get('jobId') as string;

    const user = await auth();

    if (!user) {
      throw new Error('You are not authorized to perform this action');
    }
    if (user?.user.role !== 'ADMIN') {
      throw new Error('You are not authorized to perform this action');
    }

    await prisma.job.update({
      where: { id: jobId },
      data: { approved: true },
    });
    revalidatePath('/');
    revalidatePath('/dashboard/jobs');
  } catch (error) {
    let message = 'An error occurred. Please try again.';
    if (error instanceof Error) {
      message = error.message;
    }
    return { error: message };
  }
}

export async function deleteJobs(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  try {
    const jobId = formData.get('jobId') as string;

    const user = await auth();

    if (!user) {
      throw new Error('You are not authorized to perform this action');
    }
    if (user?.user.role !== 'ADMIN') {
      throw new Error('You are not authorized to perform this action');
    }

    const job = await prisma.job.findUnique({
      where: { id: jobId },
    });

    if (job?.companyLogo) {
      const fileKey = job.companyLogo.split('/');
      const imgToDelete = fileKey[fileKey.length - 1];
      await utapi.deleteFiles(imgToDelete);
    }

    await prisma.job.delete({
      where: { id: jobId },
    });

    revalidatePath('/dashboard/jobs');
  } catch (error) {
    let message = 'An error occurred. Please try again.';
    if (error instanceof Error) {
      message = error.message;
    }
    return { error: message };
  }
  redirect('/dashboard/jobs');
}
