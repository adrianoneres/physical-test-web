import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { PlusIcon } from '@heroicons/react/24/solid';

import { PrivateLayout } from '@/layouts/PrivateLayout';
import { getApiClient } from '@/services/api';
import { useAuth } from '@/contexts/AuthContext';
import { handleError } from '@/errors/AppError';
import { Alert, AlertProps } from '@/components/Alert';
import { TableList } from '@/components/TableList';
import { Button } from '@/components/Button';
import { Icon } from '@/components/Icon';

interface ProfessionalsData {
  data: [
    {
      id: string;
      name: string;
      registration: string;
    },
  ];
  pagination: {
    page: number;
    pages: number;
    size: number;
    total: number;
  };
}

export default function Professionals() {
  const router = useRouter();
  const { signOut } = useAuth();
  const [alert, setAlert] = useState<AlertProps | null>(null);
  const [professionals, setProfessionals] = useState({} as ProfessionalsData);

  const loadProfessionals = useCallback(
    async ({ page = 1, name = '', registration = '' }) => {
      try {
        const response = await getApiClient().get(
          `/professionals?page=${page}&name=${name}&registration=${registration}`,
        );

        setProfessionals(response.data);
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

  const loadAlert = useCallback(() => {
    const { message, type }: AlertProps = router.query;
    setAlert({ message, type });
  }, [router.query]);

  useEffect(() => {
    loadProfessionals({});
    loadAlert();
  }, [loadProfessionals, loadAlert]);

  const handleDelete = useCallback(
    async (id: string) => {
      const deletedItem = professionals?.data.find(
        item => item.id === id,
      )?.name;
      try {
        await getApiClient().delete(`/professionals/${id}`);
        setAlert({ message: `Avaliador ${deletedItem} excluído com sucesso` });
        loadProfessionals({});
      } catch (error) {
        handleError({
          error,
          action: setAlert,
          unauthorizedAction: signOut,
          message: `Erro ao excluir avaliador ${deletedItem}`,
        });
      }
    },
    [loadProfessionals, professionals.data, signOut],
  );

  return (
    <PrivateLayout title="Avaliadores">
      <Alert message={alert?.message} type={alert?.type} />
      <Button onClick={() => router.push('/professionals/new')}>
        <Icon name={PlusIcon} className="h-4 w-4" />
        Adicionar
      </Button>
      <TableList
        route="/professionals"
        itemLabel="avaliador"
        items={professionals}
        columns={[
          {
            field: 'name',
            label: 'Nome',
            className: 'w-1/2',
          },
          {
            field: 'registration',
            label: 'Registro',
          },
        ]}
        actionLoad={loadProfessionals}
        actionDelete={handleDelete}
      />
    </PrivateLayout>
  );
}
