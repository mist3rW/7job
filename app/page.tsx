import JobFilter from '@/components/job/job-filter';
import JobResults from '@/components/job/job-results';
import Nav from '@/components/navigation/nav';
import { redirect } from 'next/navigation';

export default async function Home() {
  return (
    <>
      <main>
        <div className="space-y-8">
          <JobFilter />
          <JobResults />
        </div>
      </main>
    </>
  );
}
