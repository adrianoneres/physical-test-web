import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { parseISO } from 'date-fns';
import { MagnifyingGlassIcon, PlusIcon } from '@heroicons/react/24/solid';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { PrivateLayout } from '@/layouts/PrivateLayout';
import { getApiClient } from '@/services/api';
import { useAuth } from '@/contexts/AuthContext';
import { handleError } from '@/errors/AppError';
import { Alert, AlertProps } from '@/components/Alert';
import { TableList } from '@/components/TableList';
import { Button } from '@/components/Button';
import { DatePicker } from '@/components/DatePicker';
import { Icon } from '@/components/Icon';
import { Input } from '@/components/Input';
import { firstDayOfYear, format, lastDayOfYear } from '@/helpers/date.helper';
import { Row } from '@/components/Row';

const formSchema = z.object({
  name: z.string(),
  dateFrom: z.date(),
  dateTo: z.date(),
});

type FormProps = z.infer<typeof formSchema>;

const formDefaultValues: FormProps = {
  name: '',
  dateFrom: firstDayOfYear(),
  dateTo: lastDayOfYear(),
};

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
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState<AlertProps | null>(null);
  const [physicalTests, setPhysicalTests] = useState({} as PhysicalTestsData);
  const {
    control,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm<FormProps>({
    resolver: zodResolver(formSchema),
    defaultValues: formDefaultValues,
  });

  const loadPhysicalTests = useCallback(
    async ({ page = 1, name = '', dateFrom = '', dateTo = '' }) => {
      try {
        const dateFromRequest = dateFrom
          ? format(parseISO(dateFrom).toISOString(), 'yyyy-MM-dd')
          : format(firstDayOfYear().toISOString(), 'yyyy-MM-dd');
        const dateToRequest = dateTo
          ? format(parseISO(dateTo).toISOString(), 'yyyy-MM-dd')
          : format(lastDayOfYear().toISOString(), 'yyyy-MM-dd');

        const response = await getApiClient().get(
          `/physical-tests?page=${page}&name=${name}&dateFrom=${dateFromRequest}&dateTo=${dateToRequest}`,
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

  const handleSearch = useCallback(
    async (formData: FormProps) => {
      try {
        setLoading(true);
        const { name, dateFrom: formDateFrom, dateTo: formDateTo } = formData;
        const dateFrom = format(formDateFrom.toISOString(), 'yyyy-MM-dd');
        const dateTo = format(formDateTo.toISOString(), 'yyyy-MM-dd');
        const response = await getApiClient().get(
          `/physical-tests?name=${name}&dateFrom=${dateFrom}&dateTo=${dateTo}`,
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
      } finally {
        setLoading(false);
      }
    },
    [signOut],
  );

  const handleExport = useCallback(() => {
    const name = getValues('name');
    const dateFrom = format(getValues('dateFrom').toISOString(), 'yyyy-MM-dd');
    const dateTo = format(getValues('dateTo').toISOString(), 'yyyy-MM-dd');

    router.push({
      pathname: '/physical-tests/report',
      query: {
        name,
        dateFrom,
        dateTo,
      },
    });
  }, [getValues, router]);

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
      <form onSubmit={handleSubmit(handleSearch)}>
        <Row>
          <Button onClick={() => router.push('/physical-tests/new')}>
            <Icon name={PlusIcon} className="h-4 w-4" />
            Adicionar
          </Button>
          <Button type="button" onClick={handleExport} color="ghost">
            Exportar
          </Button>
        </Row>
        <Row>
          <Input
            control={control}
            label="Nome"
            name="name"
            placeholder="Nome do avaliado"
            error={errors.name?.message}
          />
          <DatePicker
            control={control}
            label="Data inicial"
            name="dateFrom"
            placeholder="Data inicial"
            error={errors.dateFrom?.message}
            className="w-40"
          />
          <DatePicker
            control={control}
            label="Data final"
            name="dateTo"
            placeholder="Data final"
            error={errors.dateTo?.message}
            className="w-40"
          />
          <Button type="submit" loading={loading} className="mt-4 w-32">
            <Icon name={MagnifyingGlassIcon} className="h-4 w-4" />
          </Button>
        </Row>
      </form>
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
