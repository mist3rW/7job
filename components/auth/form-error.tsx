import { CircleMinus } from 'lucide-react';

export default function FormError({ message }: { message?: string }) {
  if (!message) return null;

  return (
    <div className="bg-destructive/25 flex items-center my-2 gap-2 text-sm text-secondary-foreground p-3 rounded-md">
      <CircleMinus className="w-4 h-4" />
      <p>{message}</p>
    </div>
  );
}
