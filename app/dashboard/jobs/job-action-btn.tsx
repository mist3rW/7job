'use client';
import FormError from '@/components/auth/form-error';
import { Button } from '@/components/ui/button';
import { daysAgo } from '@/lib/utils';
import { approveJobs, deleteJobs } from '@/server/actions/job-action';
import { CircleCheck, CircleX } from 'lucide-react';
import { useFormState } from 'react-dom';

type JobActionBtnProps = {
  jobId: string;
  isApproved: boolean;
  updatedAt: Date;
};

export default function JobActionBtn({
  jobId,
  isApproved,
  updatedAt,
}: JobActionBtnProps) {
  return (
    <div className="flex gap-2 items-center justify-between w-full">
      {isApproved ? (
        <p className="text-center text-sm font-semibold text-green-500">
          Published {daysAgo(updatedAt)}
        </p>
      ) : (
        <ApprovedJobsButton jobId={jobId} />
      )}
      <DeleteJobsButton jobId={jobId} />
    </div>
  );
}

function ApprovedJobsButton({ jobId }: { jobId: string }) {
  const [formState, formAction] = useFormState(approveJobs, undefined);
  return (
    <form action={formAction} className="">
      <input type="hidden" name="jobId" value={jobId} />
      <Button className="bg-teal-600">
        <CircleCheck className="mr-2" />
        Approve
      </Button>
      {formState?.error && <FormError message={formState.error} />}
    </form>
  );
}

function DeleteJobsButton({ jobId }: { jobId: string }) {
  const [formState, formAction] = useFormState(deleteJobs, undefined);
  return (
    <form action={formAction}>
      <input type="hidden" name="jobId" value={jobId} />
      <Button className="bg-red-600">
        <CircleX className="mr-2" />
        Delete
      </Button>
      {formState?.error && <FormError message={formState.error} />}
    </form>
  );
}
