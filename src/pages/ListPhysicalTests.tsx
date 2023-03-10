import { useCallback, useEffect, useState } from 'react';
import {
  Binoculars,
  CalendarBlank,
  MagnifyingGlass,
  PlusCircle,
  UserCircle,
} from 'phosphor-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { parseISO } from 'date-fns';
import * as zod from 'zod';

import { api } from '../services/api';
import { DateHelper } from '../helpers/DateHelper';
import { Heading } from '../components/Heading';
import { Link } from '../components/Link';
import { TextInput } from '../components/TextInput';
import { UserTemplate } from './templates/UserTemplate';
import { DateInput } from '../components/DateInput';
import { Button } from '../components/Button';
import { Paginator, PaginatorProps } from '../components/Paginator';
import { Alert } from '../components/Alert';

interface PhysicalTest {
  id: string;
  name: string;
  date: string;
  birthdate: string;
}

const formValidationSchema = zod.object({
  name: zod.string(),
  date: zod.string(),
});

type FormProps = zod.infer<typeof formValidationSchema>;

export function ListPhysicalTests() {
  const location = useLocation();
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [searchName, setSearchName] = useState('');
  const [searchDate, setSearchDate] = useState('');
  const [physicalTests, setPhysicalTests] = useState<PhysicalTest[]>([]);
  const [pagination, setPagination] = useState({} as PaginatorProps);
  const { control, handleSubmit, formState, reset } = useForm<FormProps>({
    resolver: zodResolver(formValidationSchema),
    defaultValues: {
      name: '',
      date: '',
    },
  });

  const loadPhysicalTests = useCallback(
    async ({ name = '', date = '', page = 1 }) => {
      const response = await api.get(
        `/physical-tests?page=${page}&name=${name}&date=${date}`,
      );

      const responseData = response.data.data.map((item: any) => ({
        id: item.id,
        name: item.name,
        date: DateHelper.from(parseISO(item.date), 'dd/MM/yyyy'),
        birthdate: DateHelper.from(parseISO(item.birthdate), 'dd/MM/yyyy'),
      }));

      const paginationData = response.data.pagination;

      setPhysicalTests(responseData);
      setPagination(paginationData);
    },
    [],
  );

  useEffect(() => {
    setMessage(location.state?.message || '');
    loadPhysicalTests({});
  }, [loadPhysicalTests]);

  const navigateToNewPhysicalTest = () => {
    navigate('/app/physical-tests/new');
  };

  const handleSearch = (form: FormProps) => {
    const { name, date } = form;

    let formattedDate = '';

    if (date) {
      const formDate = DateHelper.to(date, 'dd/MM/yyyy');
      formattedDate = DateHelper.from(formDate, 'yyyy-MM-dd');
    }

    setSearchName(name);
    setSearchDate(formattedDate);

    loadPhysicalTests({ name, date: formattedDate, page: 1 });
  };

  const hadleCleanSearch = () => {
    reset();
    setSearchName('');
    setSearchDate('');
    loadPhysicalTests({});
  };

  return (
    <UserTemplate>
      <Heading asChild size="md">
        <h2>Avalia????es F??sicas</h2>
      </Heading>
      <Alert type="info" message={message} />
      <section>
        <div className="mt-8 flex justify-end">
          <Link
            value="Cadastrar nova avalia????o f??sica"
            icon={PlusCircle}
            action={navigateToNewPhysicalTest}
          />
        </div>
        <form onSubmit={handleSubmit(handleSearch)}>
          <div className="w-full mt-8 flex gap-3">
            <TextInput.Root error={formState.errors.name?.message}>
              <TextInput.Icon>
                <UserCircle />
              </TextInput.Icon>
              <TextInput.Input
                control={control}
                name="name"
                placeholder="Nome da pessoa"
              />
            </TextInput.Root>
            <DateInput.Root error={formState.errors.date?.message}>
              <DateInput.Icon>
                <CalendarBlank />
              </DateInput.Icon>
              <DateInput.Input
                control={control}
                name="date"
                format="dd/MM/yyyy"
                placeholder="dia/m??s/ano"
                invalidMessage="Data inv??lida"
              />
            </DateInput.Root>
          </div>
          <div className="flex justify-center mt-8">
            <Button
              type="submit"
              value="Buscar"
              size="hug"
              icon={MagnifyingGlass}
            />
          </div>
          <div className="w-full flex justify-center mt-4">
            <Link value="Limpar Busca" action={hadleCleanSearch} />
          </div>
        </form>
      </section>
      <section className="mt-16">
        {physicalTests && physicalTests.length > 0 && (
          <>
            <table className="w-full">
              <thead className="bg-white h-12">
                <tr>
                  <th className="text-start py-4 px-3">Nome</th>
                  <th className="text-start py-4 px-3">Data de Nascimento</th>
                  <th className="text-start py-4 px-3">Data da Avalia????o</th>
                </tr>
              </thead>
              <tbody>
                {physicalTests.map(physicalTest => (
                  <tr
                    key={physicalTest.id}
                    className="border-t-[1px] border-slate-300 even:bg-white hover:bg-slate-300 hover:cursor-pointer"
                  >
                    <td className="text-start py-4 px-3">
                      {physicalTest.name}
                    </td>
                    <td className="text-start py-4 px-3">
                      {physicalTest.birthdate}
                    </td>
                    <td className="text-start py-4 px-3">
                      {physicalTest.date}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Paginator
              page={pagination.page ?? 1}
              pages={pagination.pages}
              filter={{ name: searchName, date: searchDate }}
              pageSelect={loadPhysicalTests}
            />
          </>
        )}
        {!physicalTests ||
          (physicalTests.length === 0 && (
            <div className="flex items-center justify-center gap-2">
              <Binoculars size={24} />
              <span>Nenhum resultado encontrado</span>
            </div>
          ))}
      </section>
    </UserTemplate>
  );
}
