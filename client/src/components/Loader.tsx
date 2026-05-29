interface LoaderProps {
  message?: string;
  centered?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const sizeClasses = {
  sm: 'h-10 w-10 border-t-2 border-b-2',
  md: 'h-12 w-12 border-t-2 border-b-2',
  lg: 'h-16 w-16 border-t-4 border-b-4',
};

const Loader = ({ message = 'Loading...', centered = true, size = 'lg' }: LoaderProps) => {
  return (
    <div className={`${centered ? 'flex min-h-[60vh] flex-col items-center justify-center' : 'flex items-center'} gap-4`}>
      <div
        className={`animate-spin rounded-full ${sizeClasses[size]} border-slate-700 border-t-sky-500 border-b-slate-700`}
        role="status"
        aria-label="Loading"
      />
      <p className="text-base text-slate-300">{message}</p>
    </div>
  );
};

export default Loader;
