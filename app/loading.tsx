import { LoadingSpinner } from '@/components/spinner';

export default function Loading() {
  return (
    <div className="my-10 flex justify-center items-center">
      <LoadingSpinner size={60} />
    </div>
  );
}
