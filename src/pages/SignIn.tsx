import { useCallback, useState } from 'react';
import { Lock, UserCircle } from 'phosphor-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import * as zod from 'zod';

import { Button } from '../components/Button';
import { Heading } from '../components/Heading';
import { Text } from '../components/Text';
import { TextInput } from '../components/TextInput';
import { useAuth } from '../contexts/auth';
import { Alert } from '../components/Alert';
import { AppError, handleError } from '../components/errors/AppError';

const formValidationSchema = zod.object({
  username: zod.string().min(1, 'Nome de usuário é obrigatório'),
  password: zod.string().min(1, 'Senha é obrigatória'),
});

type FormProps = zod.infer<typeof formValidationSchema>;

export function SignIn() {
  const [errorMessage, setErrorMessage] = useState('');
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const { control, handleSubmit, formState } = useForm<FormProps>({
    resolver: zodResolver(formValidationSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const handleSingIn = useCallback(
    async (form: FormProps) => {
      try {
        await signIn(form);
        navigate('/app/dashboard');
      } catch (error) {
        const appError = error as AppError;
        const message =
          appError.response.status === 400 ? 'Usuário ou senha inválidos' : '';

        handleError(error, setErrorMessage, message);
      }
    },
    [signIn],
  );

  return (
    <section className="w-full h-screen max-w-[464px] m-auto px-8 flex flex-col justify-center">
      <form onSubmit={handleSubmit(handleSingIn)}>
        <header className="flex flex-col justify-center mb-8">
          <span className="text-2xl flex justify-center">🫀</span>
          <Heading size="lg" asChild>
            <h1 className="flex justify-center">Avaliação Física</h1>
          </Heading>
          <Text size="lg" asChild>
            <h2 className="flex justify-center">Faça seu login</h2>
          </Text>
        </header>
        <main>
          <Alert message={errorMessage} />
          <div className="mb-8">
            <Text asChild>
              <span className="font-semibold mb-2">Usuário</span>
            </Text>
            <TextInput.Root error={formState.errors.username?.message}>
              <TextInput.Icon>
                <UserCircle />
              </TextInput.Icon>
              <TextInput.Input
                control={control}
                name="username"
                placeholder="Nome de usuário"
              />
            </TextInput.Root>
          </div>
          <div className="mb-8">
            <Text asChild>
              <span className="font-semibold mb-2">Senha</span>
            </Text>
            <TextInput.Root error={formState.errors.password?.message}>
              <TextInput.Icon>
                <Lock />
              </TextInput.Icon>
              <TextInput.Input
                type="password"
                control={control}
                name="password"
                placeholder="Senha de acesso"
              />
            </TextInput.Root>
          </div>
        </main>
        <footer>
          <Button type="submit" value="Entrar" size="full" />
        </footer>
      </form>
    </section>
  );
}
