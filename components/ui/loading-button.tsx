import { Loader2 } from 'lucide-react';
import { Button } from './button';

type LoadingButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  loading: boolean;
};

export default function LoadingButton({
  children,
  loading,
  ...props
}: LoadingButtonProps) {
  return (
    <Button {...props} type="submit" disabled={props.disabled || loading}>
      <span className="flex items-center justify-center gap-1">
        {loading && <Loader2 size={16} className="animate-spin" />}
        {children}
      </span>
    </Button>
  );
}
