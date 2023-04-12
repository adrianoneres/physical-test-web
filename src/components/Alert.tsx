import CheckCircleIcon from '@heroicons/react/24/outline/CheckCircleIcon';
import ExclamationTriangleIcon from '@heroicons/react/24/outline/ExclamationTriangleIcon';
import XCircleIcon from '@heroicons/react/24/outline/XCircleIcon';
import clsx from 'clsx';

interface AlertProps {
  message: string;
  type?: 'danger' | 'warning' | 'success';
}

export function Alert({ message, type = 'success' }: AlertProps) {
  return message ? (
    <div
      className={clsx(
        'w-full h-12 mb-4 py-4 px-2 flex gap-2 items-center rounded-lg text-sm',
        {
          'bg-danger-100': type === 'danger',
          'text-danger-500': type === 'danger',
          'bg-warning-100': type === 'warning',
          'text-warning-500': type === 'warning',
          'bg-success-100': type === 'success',
          'text-success-500': type === 'success',
        },
      )}
    >
      {type === 'success' && <CheckCircleIcon width={24} height={24} />}
      {type === 'warning' && <ExclamationTriangleIcon width={24} height={24} />}
      {type === 'danger' && <XCircleIcon width={24} height={24} />}
      {message}
    </div>
  ) : (
    <span />
  );
}
