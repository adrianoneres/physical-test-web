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
  registration: zod.string().min(1, 'Nome é obrigatório'),
});

type FormProps = zod.infer<typeof formValidationSchema>;

export function ProfessionalForm() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [professionalId, setProfessionalId] = useState('');
  const { control, handleSubmit, formState, reset } = useForm<FormProps>({
    resolver: zodResolver(formValidationSchema),
    defaultValues: {
      name: '',
      registration: '',
    },
  });

  const loadProfessional = useCallback(async () => {
    const id = location.state?.id;

    if (id) {
      const response = await api.get<FormProps>(`/professionals/${id}`);
      const { name, registration } = response.data;

      setProfessionalId(id);
      reset({ name, registration });
    }

    setIsLoading(false);
  }, [location.state, reset, setProfessionalId, setIsLoading]);

  useEffect(() => {
    loadProfessional();
  }, [loadProfessional]);

  const handleSave = useCallback(
    async (form: Partial<FormProps>) => {
      try {
        const request = form;
        let message = '';

        if (professionalId) {
          await api.put(`/professionals/${professionalId}`, request);
          message = 'Polo alterado com sucesso';
        } else {
          await api.post('/professionals', request);
          message = 'Polo cadastrado com sucesso';
        }

        navigate('/app/professionals', { state: { message } });
      } catch (error) {
        handleError(error, setErrorMessage);
      }
    },
    [professionalId, navigate],
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
            <div className="w-full flex my-4">
              <div className="flex-1">
                <Text asChild>
                  <span className="font-semibold text-black mb-2">
                    Nº de registro
                  </span>
                </Text>
                <TextInput.Root error={formState.errors.registration?.message}>
                  <TextInput.Input
                    control={control}
                    name="registration"
                    placeholder="Número de registro"
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
