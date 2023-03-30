import { useCallback, useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Check } from 'phosphor-react';
import { useLocation, useNavigate } from 'react-router-dom';
import * as zod from 'zod';

import { Heading } from '../../components/Heading';
import { Text } from '../../components/Text';
import { UserTemplate } from '../templates/UserTemplate';
import { Button } from '../../components/Button';
import { TextInput } from '../../components/TextInput';
import { handleError } from '../../errors/AppError';
import { Alert } from '../../components/Alert';
import { api } from '../../services/api';

const formValidationSchema = zod.object({
  name: zod.string().min(1, 'Nome é obrigatório'),
});

type FormProps = zod.infer<typeof formValidationSchema>;

export function InstitutionForm() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [institutionId, setInstitutionId] = useState('');
  const { control, handleSubmit, formState, reset } = useForm<FormProps>({
    resolver: zodResolver(formValidationSchema),
    defaultValues: {
      name: '',
    },
  });

  const loadInstitution = useCallback(async () => {
    const id = location.state?.id;

    if (id) {
      const response = await api.get<FormProps>(`/institutions/${id}`);
      const { name } = response.data;

      setInstitutionId(id);
      reset({ name });
    }

    setIsLoading(false);
  }, [location.state, reset, setInstitutionId, setIsLoading]);

  useEffect(() => {
    loadInstitution();
  }, [loadInstitution]);

  const handleSave = useCallback(
    async (form: Partial<FormProps>) => {
      try {
        const request = form;
        let message = '';

        if (institutionId) {
          await api.put(`/institutions/${institutionId}`, request);
          message = 'Polo alterado com sucesso';
        } else {
          await api.post('/institutions', request);
          message = 'Polo cadastrado com sucesso';
        }

        navigate('/app/institutions', { state: { message } });
      } catch (error) {
        handleError(error, setErrorMessage);
      }
    },
    [institutionId, navigate],
  );

  return (
    <UserTemplate>
      <Heading asChild size="md">
        <h2 className="text-black">Novo Polo</h2>
      </Heading>
      <Alert message={errorMessage} />
      {!isLoading && (
        <form onSubmit={handleSubmit(handleSave)}>
          <section className="my-8">
            <div className="w-full flex my-4">
              <div className="flex-1">
                <Text asChild>
                  <span className="font-semibold text-black mb-2">Nome</span>
                </Text>
                <TextInput.Root error={formState.errors.name?.message}>
                  <TextInput.Input
                    control={control}
                    name="name"
                    placeholder="Nome do polo"
                  />
                </TextInput.Root>
              </div>
            </div>
          </section>
          <section className="flex justify-center mt-12">
            <Button type="submit" value="Salvar" size="hug" icon={Check} />
          </section>
        </form>
      )}
    </UserTemplate>
  );
}
