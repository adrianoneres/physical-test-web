import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { CheckIcon } from '@heroicons/react/24/outline';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { useAuth, User } from '@/contexts/AuthContext';
import { getApiClient } from '@/services/api';
import { PrivateLayout } from '@/layouts/PrivateLayout';
import { Alert, AlertProps } from '@/components/Alert';
import { Button } from '@/components/Button';
import { Icon } from '@/components/Icon';
import { Input } from '@/components/Input';
import { handleError } from '@/errors/AppError';
import { Title } from '@/components/Title';

const formSchema = z.object({
  password: z.string().nonempty('Senha é obrigatória'),
  new_password: z.string().nonempty('Nova senha é obrigatória'),
  new_password_confirmation: z
    .string()
    .nonempty('Confirmação de senha é obrigatória'),
});

type FormProps = z.infer<typeof formSchema>;

const formDefaultValues: FormProps = {
  password: '',
  new_password: '',
  new_password_confirmation: '',
};

export default function Profile() {
  const { getUser, signOut } = useAuth();
  const [user, setUser] = useState<User | null>(null);
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

  useEffect(() => {
    const storedUser = getUser();
    setUser(storedUser);
  }, [getUser, setUser]);

  const handleChangePassword = useCallback(
    async (formData: FormProps) => {
      try {
        setLoading(true);

        if (formData.new_password !== formData.new_password_confirmation) {
          setAlert({
            type: 'danger',
            message: 'Nova senha e confirmação não coincidem',
          });
          setLoading(false);
          return;
        }

        await getApiClient().patch('/users/change-password', formData);
        reset(formDefaultValues);
        setAlert({ message: 'Senha alterada com sucesso' });
        setLoading(false);
      } catch (error) {
        handleError({
          error,
          action: setAlert,
          unauthorizedAction: signOut,
        });
        setLoading(false);
      }
    },
    [reset, signOut],
  );

  return (
    <PrivateLayout title="Perfil">
      <Alert message={alert?.message} type={alert?.type} />
      <div>
        <span className="mr-2 font-bold">Nome:</span>
        {user?.name}
      </div>
      <div>
        <span className="mr-2 font-bold">E-mail:</span>
        {user?.email}
      </div>
      <Title>Alteração de senha</Title>
      <form onSubmit={handleSubmit(handleChangePassword)}>
        <Input
          control={control}
          type="password"
          label="Senha atual"
          name="password"
          placeholder="Sua senha atual"
          error={errors.password?.message}
        />
        <Input
          control={control}
          type="password"
          label="Nova senha"
          name="new_password"
          placeholder="Sua nova senha"
          error={errors.new_password?.message}
        />
        <Input
          control={control}
          type="password"
          label="Confirmação de senha"
          name="new_password_confirmation"
          placeholder="Confirmação da nova senha"
          error={errors.new_password_confirmation?.message}
        />
        <Button type="submit" loading={loading}>
          <Icon name={CheckIcon} className="w-4 h-4" />
          Salvar
        </Button>
      </form>
    </PrivateLayout>
  );
}
