import clsx from 'clsx';
import { useEffect, useState } from 'react';

export interface AlertProps {
  message: string;
  type?: 'info' | 'error';
}

export function Alert({ message, type = 'error' }: AlertProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    setTimeout(() => setVisible(false), 10000);
  }, [setVisible]);

  return visible && message ? (
    <div
      className={clsx(
        'w-full flex items-center py-4 px-3 h-12 border-2 my-4 rounded',
        {
          'bg-blue-100': type === 'info',
          'border-blue-500': type === 'info',
          'text-blue-500': type === 'info',
          'bg-red-100': type === 'error',
          'border-red-500': type === 'error',
          'text-red-500': type === 'error',
        },
      )}
    >
      {message}
    </div>
  ) : (
    <span />
  );
}
