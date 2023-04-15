import { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { GetServerSideProps } from 'next';
import Head from 'next/head';

import { Header } from '@/components/Header';
import { DatePicker } from '@/components/DatePicker';
import { Input } from '@/components/Input';
import { Button } from '@/components/Button';
import { isAuthenticated } from '@/helpers/auth.helper';
import { today } from '@/helpers/date.helper';

export default function PhysicalTests() {
  const { control, handleSubmit, reset } = useForm();

  useEffect(() => {
    reset({
      test: today(),
    });
  }, [reset]);

  const handleFilter = useCallback(async (formData: any) => {
    console.log('>> formData', formData.test.toISOString());
  }, []);

  return (
    <>
      <Head>
        <title>Avaliações Físicas | Listagem de Avaliações Físicas</title>
      </Head>
      <div className="w-full min-h-screen bg-slate-100">
        <Header />
        <main className="w-full max-w-5xl flex flex-col mx-auto">
          <h1 className="text-2xl text-black font-bold">
            PhysicalTests Records
          </h1>
          <form onSubmit={handleSubmit(handleFilter)}>
            <Input
              control={control}
              label="Login"
              name="username"
              placeholder="Nome de usuário"
            />
            <DatePicker control={control} name="test" label="Test date" />
            <Button type="submit" size="fluid">
              Entrar
            </Button>
          </form>
        </main>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async context => {
  if (!isAuthenticated(context)) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {
      testProp: 'another test prop',
    },
  };
};
