import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { CheckIcon } from '@heroicons/react/24/outline';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { useAuth } from '@/contexts/AuthContext';
import { getApiClient } from '@/services/api';
import { PrivateLayout } from '@/layouts/PrivateLayout';
import { parseNumber } from '@/helpers/number.helper';
import { handleError } from '@/errors/AppError';
import { Alert, AlertProps } from '@/components/Alert';
import { Button } from '@/components/Button';
import { Icon } from '@/components/Icon';
import { Input } from '@/components/Input';
import { DatePicker } from '@/components/DatePicker';
import { format, today } from '@/helpers/date.helper';
import { Select, SelectOption } from '@/components/Select';
import { Row } from '@/components/Row';
import { Title } from '@/components/Title';

const formSchema = z.object({
  name: z.string().nonempty('Nome é obrigatório'),
  date: z.date({ required_error: 'Data é obrigatória' }),
  institution_id: z.string().nonempty('Polo é obrigatório'),
  professional_id: z.string().nonempty('Avaliador é obrigatório'),
  gender: z.string().nonempty('Gênero é obrigatórioa'),
  birthdate: z.date({ required_error: 'Data de nascimento é obrigatória' }),
  height: z.string().nonempty('Altura é obrigatória'),
  weight: z.string().nonempty('Peso é obrigatório'),
  flexibility_first_attempt: z.string().nonempty('Flexibilidade é obrigatória'),
  flexibility_second_attempt: z
    .string()
    .nonempty('Flexibilidade é obrigatória'),
  wingspan: z.string().nonempty('Envergadura é obrigatória'),
  strength_resistance: z.string().nonempty('Força resistência é obrigatória'),
  muscular_endurance_first_attempt: z
    .string()
    .nonempty('Resistência muscular é obrigatória'),
  muscular_endurance_second_attempt: z
    .string()
    .nonempty('Resistência muscular é obrigatória'),
  lower_limb_strength_first_attempt: z
    .string()
    .nonempty('Força explosiva é obrigatória'),
  lower_limb_strength_second_attempt: z
    .string()
    .nonempty('Força explosiva é obrigatória'),
  upper_limb_strength_first_attempt: z
    .string()
    .nonempty('Força explosiva é obrigatória'),
  upper_limb_strength_second_attempt: z
    .string()
    .nonempty('Força explosiva é obrigatória'),
  agility_first_attempt: z.string().nonempty('Agilidade é obrigatória'),
  agility_second_attempt: z.string().nonempty('Agilidade é obrigatória'),
  general_resistance: z.string().nonempty('Resistência geral é obrigatória'),
  speed: z.string().nonempty('Velocidade é obrigatória'),
});

type FormProps = z.infer<typeof formSchema>;

const formDefaultValues: FormProps = {
  name: '',
  date: today(),
  institution_id: '',
  professional_id: '',
  gender: '',
  birthdate: today(),
  height: '',
  weight: '',
  flexibility_first_attempt: '',
  flexibility_second_attempt: '',
  wingspan: '',
  strength_resistance: '',
  muscular_endurance_first_attempt: '',
  muscular_endurance_second_attempt: '',
  lower_limb_strength_first_attempt: '',
  lower_limb_strength_second_attempt: '',
  upper_limb_strength_first_attempt: '',
  upper_limb_strength_second_attempt: '',
  agility_first_attempt: '',
  agility_second_attempt: '',
  general_resistance: '',
  speed: '',
};

export default function PhysicalTestsNew() {
  const router = useRouter();
  const { signOut } = useAuth();
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState<AlertProps | null>({} as AlertProps);
  const [professionalsOptions, setProfessionalsOptions] = useState<
    SelectOption[]
  >([]);
  const [institutionsOptions, setInstitutionsOptions] = useState<
    SelectOption[]
  >([]);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormProps>({
    resolver: zodResolver(formSchema),
    defaultValues: formDefaultValues,
  });
  const genderOptions: SelectOption[] = [
    {
      label: 'Feminino',
      value: 'F',
    },
    {
      label: 'Masculino',
      value: 'M',
    },
  ];

  const loadInstitutionsOptions = useCallback(async () => {
    const response = await getApiClient().get('/institutions');

    const { data } = response.data;

    if (data) {
      const options = data.map((item: any) => ({
        label: item.name,
        value: item.id,
      }));

      setInstitutionsOptions(options);
    }
  }, []);

  const loadProfessionalsOptions = useCallback(async () => {
    const response = await getApiClient().get('/professionals');

    const { data } = response.data;

    if (data) {
      const options = data.map((item: any) => ({
        label: item.name,
        value: item.id,
      }));

      setProfessionalsOptions(options);
    }
  }, []);

  useEffect(() => {
    loadInstitutionsOptions();
    loadProfessionalsOptions();
  }, [loadInstitutionsOptions, loadProfessionalsOptions]);

  const handleSave = useCallback(
    async (formData: FormProps) => {
      try {
        setLoading(true);
        const requestData = {
          name: formData.name,
          date: format(formData.date.toISOString(), 'yyyy-MM-dd'),
          institution_id: formData.institution_id,
          professional_id: formData.professional_id,
          gender: formData.gender,
          birthdate: format(formData.birthdate.toISOString(), 'yyyy-MM-dd'),
          height: parseNumber(formData.height),
          weight: parseNumber(formData.weight),
          flexibility_first_attempt: parseNumber(
            formData.flexibility_first_attempt,
          ),
          flexibility_second_attempt: parseNumber(
            formData.flexibility_second_attempt,
          ),
          wingspan: parseNumber(formData.wingspan),
          strength_resistance: parseNumber(formData.strength_resistance),
          muscular_endurance_first_attempt: parseNumber(
            formData.muscular_endurance_first_attempt,
          ),
          muscular_endurance_second_attempt: parseNumber(
            formData.muscular_endurance_second_attempt,
          ),
          lower_limb_strength_first_attempt: parseNumber(
            formData.lower_limb_strength_first_attempt,
          ),
          lower_limb_strength_second_attempt: parseNumber(
            formData.lower_limb_strength_second_attempt,
          ),
          upper_limb_strength_first_attempt: parseNumber(
            formData.upper_limb_strength_first_attempt,
          ),
          upper_limb_strength_second_attempt: parseNumber(
            formData.upper_limb_strength_second_attempt,
          ),
          agility_first_attempt: parseNumber(formData.agility_first_attempt),
          agility_second_attempt: parseNumber(formData.agility_second_attempt),
          general_resistance: parseNumber(formData.general_resistance),
          speed: parseNumber(formData.speed),
        };
        await getApiClient().post('/physical-tests', requestData);
        router.push({
          pathname: '/physical-tests',
          query: {
            message: `Avaliação física de ${formData.name} criada com sucesso`,
          },
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
    <PrivateLayout title="Cadastro de Avaliação Física">
      <Alert message={alert?.message} type={alert?.type} />
      <form onSubmit={handleSubmit(handleSave)}>
        <Row>
          <DatePicker
            control={control}
            label="Data da avaliação"
            name="date"
            placeholder="Data da avaliação"
            error={errors.date?.message}
            className="w-40"
          />
          <Select
            control={control}
            label="Polo"
            name="institution_id"
            placeholder="Selecione o polo"
            error={errors.institution_id?.message}
            options={institutionsOptions}
          />
          <Select
            control={control}
            label="Avaliador"
            name="professional_id"
            placeholder="Selecione o avaliador"
            error={errors.professional_id?.message}
            options={professionalsOptions}
          />
        </Row>
        <Row>
          <Input
            control={control}
            label="Nome"
            name="name"
            placeholder="Nome do avaliado"
            error={errors.name?.message}
          />
          <Select
            control={control}
            label="Gênero"
            name="gender"
            placeholder="Selecione o gênero"
            error={errors.gender?.message}
            options={genderOptions}
            className="w-2/6"
          />
          <DatePicker
            control={control}
            label="Data de nascimento"
            name="birthdate"
            placeholder="Data da nascimento"
            error={errors.birthdate?.message}
            className="w-40"
          />
        </Row>
        <Row>
          <Input
            control={control}
            type="number"
            step="0.01"
            label="Peso (kilogramas)"
            name="weight"
            placeholder="Peso do avaliado"
            error={errors.weight?.message}
            className="w-3/6"
            decimal
          />
          <Input
            control={control}
            type="number"
            step="0.01"
            label="Altura (metros)"
            name="height"
            placeholder="Altura do avaliado"
            error={errors.height?.message}
            className="w-3/6"
            decimal
          />
        </Row>
        <Title legend="Sentar e alcançar">Teste de flexibilidade</Title>
        <Row>
          <Input
            control={control}
            type="number"
            step="0.01"
            label="Flexibilidade - 1ª tentativa (metros)"
            name="flexibility_first_attempt"
            placeholder="1ª tentativa"
            error={errors.flexibility_first_attempt?.message}
            className="w-3/6"
            decimal
          />
          <Input
            control={control}
            type="number"
            step="0.01"
            label="Flexibilidade - 2ª tentativa (metros)"
            name="flexibility_second_attempt"
            placeholder="2ª tentativa"
            error={errors.flexibility_second_attempt?.message}
            className="w-3/6"
            decimal
          />
        </Row>
        <Title legend="Alcance de envergadura">Teste de envergadura</Title>
        <Row>
          <Input
            control={control}
            type="number"
            step="0.01"
            label="Envergadura (metros)"
            name="wingspan"
            placeholder="Envergadura do Avaliado"
            error={errors.wingspan?.message}
            className="w-3/6"
            decimal
          />
        </Row>
        <Title legend="1 minuto abdominal">Força resistência</Title>
        <Row>
          <Input
            control={control}
            type="number"
            step="1"
            label="Força resistência (qtd)"
            name="strength_resistance"
            placeholder="Força resistência do avaliado"
            error={errors.strength_resistance?.message}
            className="w-3/6"
          />
        </Row>
        <Title legend="Flexão de braço">Resistência muscular</Title>
        <Row>
          <Input
            control={control}
            type="number"
            step="0.01"
            label="Resistência muscular - 1ª tentativa (qtd)"
            name="muscular_endurance_first_attempt"
            placeholder="1ª tentativa"
            error={errors.muscular_endurance_first_attempt?.message}
            className="w-3/6"
          />
          <Input
            control={control}
            type="number"
            step="0.01"
            label="Resistência muscular - 2ª tentativa (qtd)"
            name="muscular_endurance_second_attempt"
            placeholder="2ª tentativa"
            error={errors.muscular_endurance_second_attempt?.message}
            className="w-3/6"
          />
        </Row>
        <Title legend="Salto horizontal">
          Força explosiva de membros inferiores
        </Title>
        <Row>
          <Input
            control={control}
            type="number"
            step="0.01"
            label="Força explosiva - 1ª tentativa (metros)"
            name="lower_limb_strength_first_attempt"
            placeholder="1ª tentativa"
            error={errors.lower_limb_strength_first_attempt?.message}
            className="w-3/6"
            decimal
          />
          <Input
            control={control}
            type="number"
            step="0.01"
            label="Força explosiva - 2ª tentativa (metros)"
            name="lower_limb_strength_second_attempt"
            placeholder="2ª tentativa"
            error={errors.lower_limb_strength_second_attempt?.message}
            className="w-3/6"
            decimal
          />
        </Row>
        <Title legend="Arremesso de medicineball">
          Força explosiva de membros superiores
        </Title>
        <Row>
          <Input
            control={control}
            type="number"
            step="0.01"
            label="Força explosiva - 1ª tentativa (metros)"
            name="upper_limb_strength_first_attempt"
            placeholder="1ª tentativa"
            error={errors.upper_limb_strength_first_attempt?.message}
            className="w-3/6"
            decimal
          />
          <Input
            control={control}
            type="number"
            step="0.01"
            label="Força explosiva - 2ª tentativa (metros)"
            name="upper_limb_strength_second_attempt"
            placeholder="2ª tentativa"
            error={errors.upper_limb_strength_second_attempt?.message}
            className="w-3/6"
            decimal
          />
        </Row>
        <Title legend="Teste do quadrado">Agilidade</Title>
        <Row>
          <Input
            control={control}
            type="number"
            step="0.01"
            label="Agilidade - 1ª tentativa (segundos)"
            name="agility_first_attempt"
            placeholder="1ª tentativa"
            error={errors.agility_first_attempt?.message}
            className="w-3/6"
            decimal
          />
          <Input
            control={control}
            type="number"
            step="0.01"
            label="Agilidade - 2ª tentativa (segundos)"
            name="agility_second_attempt"
            placeholder="2ª tentativa"
            error={errors.agility_second_attempt?.message}
            className="w-3/6"
            decimal
          />
        </Row>
        <Title legend="Teste de 9 minutos">Resistência geral</Title>
        <Row>
          <Input
            control={control}
            type="number"
            step="0.01"
            label="Resistência geral (metros)"
            name="general_resistance"
            placeholder="Resistência geral do Avaliado"
            error={errors.general_resistance?.message}
            className="w-3/6"
            decimal
          />
        </Row>
        <Title legend="Corrida de 20 metros">Velocidade</Title>
        <Row>
          <Input
            control={control}
            type="number"
            step="0.01"
            label="Velocidade (segundos)"
            name="speed"
            placeholder="Velocidade do Avaliado"
            error={errors.speed?.message}
            className="w-3/6"
            decimal
          />
        </Row>
        <Button type="submit" loading={loading} className="mt-4">
          <Icon name={CheckIcon} className="w-4 h-4" />
          Salvar
        </Button>
      </form>
    </PrivateLayout>
  );
}
