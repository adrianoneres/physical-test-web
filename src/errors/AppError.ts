import React from 'react';

export interface AppError {
  response: {
    status: number;
    data: {
      message: string;
    };
  };
}

export function handleError(
  error: any,
  dispatch: React.Dispatch<React.SetStateAction<string>>,
  message?: string,
) {
  const appError = error as AppError;

  console.error(appError.response.data);

  if (message) {
    dispatch(message);
    return;
  }

  if (appError.response.status === 500) {
    dispatch('Erro interno do servidor');
  }

  if (appError.response.status === 401) {
    dispatch('Usuário não autorizado');
  }

  if (appError.response.status === 400) {
    dispatch('Dados inválidos');
  }
}
