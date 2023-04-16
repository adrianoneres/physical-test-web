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
import { format } from '@/helpers/date.helper';

interface PhysicalTestsData {
  data: [
    {
      id: string;
      name: string;
      date: string;
    },
  ];
  pagination: {
    page: number;
    pages: number;
    size: number;
    total: number;
  };
}

export default function PhysicalTests() {
  const router = useRouter();
  const { signOut } = useAuth();
  const [alert, setAlert] = useState<AlertProps | null>(null);
  const [physicalTests, setPhysicalTests] = useState({} as PhysicalTestsData);

  const loadPhysicalTests = useCallback(
    async ({ page = 1, name = '', date = '' }) => {
      try {
        const response = await getApiClient().get(
          `/physical-tests?page=${page}&name=${name}&date=${date}`,
        );

        const data = {
          pagination: response.data.pagination,
          data: response.data.data.map((item: any) => ({
            ...item,
            date: format(item.date),
            institution: item.institution.name,
          })),
        };

        setPhysicalTests(data);
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
    loadPhysicalTests({});
    loadAlert();
  }, [loadPhysicalTests, loadAlert]);

  const handleDelete = useCallback(
    async (id: string) => {
      const deletedItem = physicalTests?.data.find(
        item => item.id === id,
      )?.name;
      try {
        await getApiClient().delete(`/physical-tests/${id}`);
        setAlert({
          message: `Avaliação física ${deletedItem} excluída com sucesso`,
        });
        loadPhysicalTests({});
      } catch (error) {
        handleError({
          error,
          action: setAlert,
          unauthorizedAction: signOut,
          message: `Erro ao excluir avaliação física ${deletedItem}`,
        });
      }
    },
    [loadPhysicalTests, physicalTests.data, signOut],
  );

  return (
    <PrivateLayout title="Avaliações Físicas">
      <Alert message={alert?.message} type={alert?.type} />
      <Button onClick={() => router.push('/physical-tests/new')}>
        <Icon name={PlusIcon} className="h-4 w-4" />
        Adicionar
      </Button>
      <TableList
        route="/physical-tests"
        itemLabel="avaliação física"
        items={physicalTests}
        columns={[
          {
            field: 'name',
            label: 'Avaliado',
            className: 'w-2/5',
          },
          {
            field: 'date',
            label: 'Data',
          },
          {
            field: 'institution',
            label: 'Polo',
          },
        ]}
        actionLoad={loadPhysicalTests}
        actionDelete={handleDelete}
      />
    </PrivateLayout>
  );
}
