import { useCallback, useState } from 'react';
import { useRouter } from 'next/router';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { useAuth } from '@/contexts/AuthContext';
import { Input } from '@/components/Input';

import { Alert, AlertProps } from '@/components/Alert';
import { Button } from '@/components/Button';
import { AppError, handleError } from '@/errors/AppError';
import { PublicLayout } from '@/layouts/PublicLayout';

const formSchema = z.object({
  username: z.string().min(1, 'Nome de usuário é obrigatório'),
  password: z.string().min(1, 'Senha é obrigatória'),
});

type FormProps = z.infer<typeof formSchema>;

const formDefaultValues: FormProps = {
  username: '',
  password: '',
};

export default function SignIn() {
  const router = useRouter();
  const { signIn } = useAuth();
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState<AlertProps | null>({} as AlertProps);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormProps>({
    resolver: zodResolver(formSchema),
    defaultValues: formDefaultValues,
  });

  const handleSignIn = useCallback(
    async (formData: FormProps) => {
      try {
        setAlert({} as AlertProps);
        setLoading(true);
        await signIn(formData);
        await router.push('/dashboard');
      } catch (error) {
        const appError = error as AppError;
        const message =
          appError.response.status === 400 ? 'Usuário ou senha inválidos' : '';
        handleError({
          error,
          message,
          action: setAlert,
        });
        setLoading(false);
      }
    },
    [router, signIn],
  );

  return (
    <PublicLayout>
      <Alert message={alert?.message} type={alert?.type} />
      <form onSubmit={handleSubmit(handleSignIn)}>
        <Input
          control={control}
          label="Login"
          name="username"
          placeholder="Nome de usuário"
          error={errors.username?.message}
        />
        <Input
          control={control}
          type="password"
          label="Senha"
          name="password"
          placeholder="Sua senha secreta"
          error={errors.password?.message}
        />
        <Button type="submit" size="fluid" loading={loading}>
          Entrar
        </Button>
      </form>
    </PublicLayout>
  );
}
