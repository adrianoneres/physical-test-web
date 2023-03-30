import { useCallback, useEffect, useState } from 'react';
import {
  Binoculars,
  Hash,
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

interface Professional {
  id: string;
  name: string;
  registration: string;
}

const formValidationSchema = zod.object({
  name: zod.string(),
  registration: zod.string(),
});

type FormProps = zod.infer<typeof formValidationSchema>;

export function ProfessionalsList() {
  const location = useLocation();
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [professionals, setProfessionals] = useState<Professional[]>([]);
  const [pagination, setPagination] = useState({} as PaginatorProps);
  const { control, formState, handleSubmit, reset, getValues } =
    useForm<FormProps>({
      resolver: zodResolver(formValidationSchema),
      defaultValues: {
        name: '',
        registration: '',
      },
    });

  const loadProfessionals = useCallback(
    async ({ name = '', registration = '', page = 1 }) => {
      const response = await api.get(
        `/professionals?page=${page}&name=${name}&registration=${registration}`,
      );

      const responseData = response.data.data.map((item: any) => ({
        id: item.id,
        name: item.name,
        registration: item.registration,
      }));

      const paginationData = response.data.pagination;

      setProfessionals(responseData);
      setPagination(paginationData);
    },
    [setProfessionals, setPagination],
  );

  useEffect(() => {
    setMessage(location.state?.message || '');
    loadProfessionals({});
  }, [location.state, loadProfessionals]);

  const navigateToForm = () => {
    navigate('/app/professionals/form');
  };

  const handleSearch = (form: FormProps) => {
    const { name, registration } = form;

    reset({ name, registration });
    loadProfessionals({ name, registration, page: 1 });
  };

  const hadleCleanSearch = () => {
    reset({ name: '', registration: '' });
    loadProfessionals({});
  };

  const handleEdit = (id: string) => {
    navigate('/app/professionals/form', {
      state: { id },
    });
  };

  const handleDelete = async (id: string) => {
    await api.delete(`/professionals/${id}`);

    setMessage('Registro excluído com sucesso');
    loadProfessionals({});
  };

  return (
    <UserTemplate>
      <Heading asChild size="md">
        <h2>Avaliadores</h2>
      </Heading>
      <Alert type="info" message={message} />
      <section>
        <div className="mt-8 flex justify-end">
          <Link
            value="Cadastrar novo avaliador"
            icon={PlusCircle}
            action={navigateToForm}
          />
        </div>
        <form onSubmit={handleSubmit(handleSearch)}>
          <div className="w-full mt-8 flex gap-3">
            <TextInput.Root error={formState.errors.name?.message}>
              <TextInput.Icon>
                <UserCircle size={24} />
              </TextInput.Icon>
              <TextInput.Input
                control={control}
                name="name"
                placeholder="Nome do avaliador"
              />
            </TextInput.Root>
            <TextInput.Root error={formState.errors.registration?.message}>
              <TextInput.Icon>
                <Hash size={24} />
              </TextInput.Icon>
              <TextInput.Input
                control={control}
                name="registration"
                placeholder="Nº de registro"
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
        {professionals && professionals.length > 0 && (
          <>
            <table className="w-full">
              <thead className="bg-white h-12">
                <tr>
                  <th className="text-start py-4 px-3">Nome</th>
                  <th className="text-start py-4 px-3">Nº de registro</th>
                  <th className="w-32"></th>
                </tr>
              </thead>
              <tbody>
                {professionals.map(professional => (
                  <tr
                    key={professional.id}
                    className="border-t-[1px] border-slate-300 even:bg-white hover:bg-slate-200 hover:cursor-default"
                  >
                    <td className="text-start py-4 px-3">
                      {professional.name}
                    </td>
                    <td className="text-start py-4 px-3">
                      {professional.registration}
                    </td>
                    <td className="text-center py-4 px-3 flex flex-1 gap-4 items-center justify-center">
                      <DeleteButton
                        action={() => handleDelete(professional.id)}
                      />
                      <EditButton action={() => handleEdit(professional.id)} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Paginator
              page={pagination.page ?? 1}
              pages={pagination.pages}
              filter={{
                name: getValues('name'),
                registration: getValues('registration'),
              }}
              pageSelect={loadProfessionals}
            />
          </>
        )}
        {!professionals ||
          (professionals.length === 0 && (
            <div className="flex items-center justify-center gap-2">
              <Binoculars size={24} />
              <span>Nenhum resultado encontrado</span>
            </div>
          ))}
      </section>
    </UserTemplate>
  );
}
