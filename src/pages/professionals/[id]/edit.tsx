import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { CheckIcon } from '@heroicons/react/24/outline';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { useAuth } from '@/contexts/AuthContext';
import { getApiClient } from '@/services/api';
import { PrivateLayout } from '@/layouts/PrivateLayout';
import { Alert, AlertProps } from '@/components/Alert';
import { Button } from '@/components/Button';
import { Icon } from '@/components/Icon';
import { Input } from '@/components/Input';
import { handleError } from '@/errors/AppError';

const formSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  registration: z.string().min(1, 'Registro é obrigatório'),
});

type FormProps = z.infer<typeof formSchema>;

const formDefaultValues: FormProps = {
  name: '',
  registration: '',
};

export default function ProfessionalsEdit() {
  const router = useRouter();
  const { signOut } = useAuth();
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState<AlertProps | null>({} as AlertProps);
  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<FormProps>({
    resolver: zodResolver(formSchema),
    defaultValues: formDefaultValues,
  });

  const loadProfessional = useCallback(async () => {
    const { id } = router.query;

    const { data } = await getApiClient().get(`/professionals/${id}`);

    reset({
      name: data.name,
      registration: data.registration,
    });
  }, [router.query, reset]);

  useEffect(() => {
    loadProfessional();
  }, [loadProfessional]);

  const handleSave = useCallback(
    async (formData: FormProps) => {
      const { id } = router.query;

      try {
        setLoading(true);
        await getApiClient().put(`/professionals/${id}`, formData);
        router.push({
          pathname: '/professionals',
          query: { message: `Avaliador ${formData.name} editado com sucesso` },
        });
      } catch (error) {
        handleError({
          error,
          action: setAlert,
          unauthorizedAction: signOut,
        });
        setLoading(false);
      }
    },
    [router, signOut],
  );

  return (
    <PrivateLayout title="Edição de Avaliador">
      <Alert message={alert?.message} type={alert?.type} />
      <form onSubmit={handleSubmit(handleSave)}>
        <Input
          control={control}
          label="Nome"
          name="name"
          placeholder="Nome do avaliador"
          error={errors.name?.message}
        />
        <Input
          control={control}
          label="Registro"
          name="registration"
          placeholder="Número de registro"
          error={errors.registration?.message}
        />
        <Button type="submit" loading={loading}>
          <Icon name={CheckIcon} className="w-4 h-4" />
          Salvar
        </Button>
      </form>
    </PrivateLayout>
  );
}
