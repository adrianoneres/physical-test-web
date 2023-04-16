import { Dispatch, SetStateAction } from 'react';

import { AlertProps } from '@/components/Alert';

export interface AppError {
  response: {
    status: number;
    data: {
      message: string;
    };
  };
}

interface HandleErrorProps {
  error: any;
  action?: Dispatch<SetStateAction<AlertProps | null>>;
  unauthorizedAction?: Function;
  message?: string;
}

export function handleError({
  error,
  message,
  action,
  unauthorizedAction,
}: HandleErrorProps) {
  const appError = error as AppError;
  const type = 'danger';

  console.error(appError.response.data);

  if (message) {
    action?.({ type, message });
    return;
  }

  if (appError.response.status === 400) {
    action?.({ type, message: 'Dados inválidos' });
  }

  if (appError.response.status === 401) {
    unauthorizedAction?.();
  }

  if (appError.response.status === 500) {
    action?.({ type, message: 'Erro interno do servidor' });
  }
}
