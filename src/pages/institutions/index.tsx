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

interface InstitutionsData {
  data: [
    {
      id: string;
      name: string;
    },
  ];
  pagination: {
    page: number;
    pages: number;
    size: number;
    total: number;
  };
}

export default function Institutions() {
  const router = useRouter();
  const { signOut } = useAuth();
  const [alert, setAlert] = useState<AlertProps | null>(null);
  const [institutions, setInstitutions] = useState({} as InstitutionsData);

  const loadInstitutions = useCallback(
    async ({ page = 1, name = '' }) => {
      try {
        const response = await getApiClient().get(
          `/institutions?page=${page}&name=${name}`,
        );

        setInstitutions(response.data);
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
    loadInstitutions({});
    loadAlert();
  }, [loadInstitutions, loadAlert]);

  const handleDelete = useCallback(
    async (id: string) => {
      const deletedItem = institutions?.data.find(item => item.id === id)?.name;
      try {
        await getApiClient().delete(`/institutions/${id}`);
        setAlert({ message: `Polo ${deletedItem} excluído com sucesso` });
        loadInstitutions({});
      } catch (error) {
        handleError({
          error,
          action: setAlert,
          unauthorizedAction: signOut,
          message: `Erro ao excluir polo ${deletedItem}`,
        });
      }
    },
    [loadInstitutions, institutions.data, signOut],
  );

  return (
    <PrivateLayout title="Polos">
      <Alert message={alert?.message} type={alert?.type} />
      <Button onClick={() => router.push('/institutions/new')}>
        <Icon name={PlusIcon} className="h-4 w-4" />
        Adicionar
      </Button>
      <TableList
        route="/institutions"
        itemLabel="polo"
        items={institutions}
        columns={[
          {
            field: 'name',
            label: 'Nome',
          },
        ]}
        actionLoad={loadInstitutions}
        actionDelete={handleDelete}
      />
    </PrivateLayout>
  );
}
