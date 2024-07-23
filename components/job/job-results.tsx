import JobItemContent from './job-item-content';
import JobListItem from './job-list-item';

export default function JobResults() {
  return (
    <section className="flex flex-col md:flex-row gap-4">
      <div className="w-full md:w-1/3 space-y-4">
        {Array.from({ length: 10 }).map((_, i) => (
          <JobListItem key={i} />
        ))}
      </div>
      <div className="w-2/3">
        <JobItemContent />
      </div>
    </section>
  );
}
