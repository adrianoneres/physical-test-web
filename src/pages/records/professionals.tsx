import { useCallback, useEffect, useState } from 'react';

import { PrivateLayout } from '@/layouts/PrivateLayout';
import { getApiClient } from '@/services/api';
import { useAuth } from '@/contexts/AuthContext';
import { handleError } from '@/errors/AppError';
import { AlertProps } from '@/components/Alert';

interface Professional {
  id: string;
  name: string;
  registration: string;
}

export default function Professionals() {
  const { signOut } = useAuth();
  const [professionals, setProfessionals] = useState<Professional[]>([]);
  const [alert, setAlert] = useState<AlertProps | null>(null);

  const loadProfessionals = useCallback(
    async ({ page = 1, name = '', registration = '' }) => {
      try {
        const response = await getApiClient().get(
          `/professionals?page=${page}&name=${name}&registration=${registration}`,
        );

        const { data, pagination } = response.data;

        setProfessionals(data);
      } catch (error) {
        handleError({
          error,
          action: setAlert,
          unauthorizedAction: signOut,
        });
      }
    },
    [signOut],
  );

  useEffect(() => {
    loadProfessionals({});
  }, [loadProfessionals]);

  return (
    <PrivateLayout title="Listagem de Avaliadores">
      <div>{JSON.stringify(professionals)}</div>
    </PrivateLayout>
  );
}
