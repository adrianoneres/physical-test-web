import { useCallback, useEffect, useState } from 'react';
import {
  Binoculars,
  MagnifyingGlass,
  PlusCircle,
  UserCircle,
} from 'phosphor-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as zod from 'zod';

import { api } from '../../services/api';
import { Heading } from '../../components/Heading';
import { Link } from '../../components/Link';
import { TextInput } from '../../components/TextInput';
import { UserTemplate } from '../templates/UserTemplate';
import { Button } from '../../components/Button';
import { Paginator, PaginatorProps } from '../../components/Paginator';
import { Alert } from '../../components/Alert';
import { DeleteButton } from '../../components/DeleteButton';
import { EditButton } from '../../components/EditButton';

interface Institution {
  id: string;
  name: string;
}

const formValidationSchema = zod.object({
  name: zod.string(),
});

type FormProps = zod.infer<typeof formValidationSchema>;

export function InstitutionsList() {
  const location = useLocation();
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [institutions, setInstitutions] = useState<Institution[]>([]);
  const [pagination, setPagination] = useState({} as PaginatorProps);
  const { control, formState, handleSubmit, reset, getValues } =
    useForm<FormProps>({
      resolver: zodResolver(formValidationSchema),
      defaultValues: {
        name: '',
      },
    });

  const loadInstitutions = useCallback(
    async ({ name = '', page = 1 }) => {
      const response = await api.get(`/institutions?page=${page}&name=${name}`);

      const responseData = response.data.data.map((item: any) => ({
        id: item.id,
        name: item.name,
      }));

      const paginationData = response.data.pagination;

      setInstitutions(responseData);
      setPagination(paginationData);
    },
    [setInstitutions, setPagination],
  );

  useEffect(() => {
    setMessage(location.state?.message || '');
    loadInstitutions({});
  }, [location.state, loadInstitutions]);

  const navigateToForm = () => {
    navigate('/app/institutions/form');
  };

  const handleSearch = (form: FormProps) => {
    const { name } = form;

    reset({ name });
    loadInstitutions({ name, page: 1 });
  };

  const hadleCleanSearch = () => {
    reset({ name: '' });
    loadInstitutions({});
  };

  const handleEdit = (id: string) => {
    navigate('/app/institutions/form', {
      state: { id },
    });
  };

  const handleDelete = async (id: string) => {
    await api.delete(`/institutions/${id}`);

    setMessage('Registro excluído com sucesso');
    loadInstitutions({});
  };

  return (
    <UserTemplate>
      <Heading asChild size="md">
        <h2>Polos</h2>
      </Heading>
      <Alert type="info" message={message} />
      <section>
        <div className="mt-8 flex justify-end">
          <Link
            value="Cadastrar novo polo"
            icon={PlusCircle}
            action={navigateToForm}
          />
        </div>
        <form onSubmit={handleSubmit(handleSearch)}>
          <div className="w-full mt-8 flex">
            <TextInput.Root error={formState.errors.name?.message}>
              <TextInput.Icon>
                <UserCircle size={24} />
              </TextInput.Icon>
              <TextInput.Input
                control={control}
                name="name"
                placeholder="Nome do polo"
              />
            </TextInput.Root>
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
        {institutions && institutions.length > 0 && (
          <>
            <table className="w-full">
              <thead className="bg-white h-12">
                <tr>
                  <th className="text-start py-4 px-3">Nome</th>
                  <th className="w-32"></th>
                </tr>
              </thead>
              <tbody>
                {institutions.map(institution => (
                  <tr
                    key={institution.id}
                    className="border-t-[1px] border-slate-300 even:bg-white hover:bg-slate-200 hover:cursor-default"
                  >
                    <td className="text-start py-4 px-3">{institution.name}</td>
                    <td className="text-center py-4 px-3 flex flex-1 gap-4 items-center justify-center">
                      <DeleteButton
                        action={() => handleDelete(institution.id)}
                      />
                      <EditButton action={() => handleEdit(institution.id)} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Paginator
              page={pagination.page ?? 1}
              pages={pagination.pages}
              filter={{ name: getValues('name') }}
              pageSelect={loadInstitutions}
            />
          </>
        )}
        {!institutions ||
          (institutions.length === 0 && (
            <div className="flex items-center justify-center gap-2">
              <Binoculars size={24} />
              <span>Nenhum resultado encontrado</span>
            </div>
          ))}
      </section>
    </UserTemplate>
  );
}
