import NewJobForm from '@/components/job/new-job-form';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Post a new job',
  description: 'Post a new job to the job board',
};

export default function Page() {
  return <NewJobForm />;
}
