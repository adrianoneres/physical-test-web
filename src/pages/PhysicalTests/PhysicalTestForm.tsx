import { useCallback, useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Check } from 'phosphor-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { omit } from 'lodash';
import * as zod from 'zod';

import { DateInput } from '../../components/DateInput';
import { Heading } from '../../components/Heading';
import { Text } from '../../components/Text';
import { UserTemplate } from '../templates/UserTemplate';
import { Button } from '../../components/Button';
import { TextInput } from '../../components/TextInput';
import { Select, SelectOption } from '../../components/Select';
import { handleError } from '../../errors/AppError';
import { Alert } from '../../components/Alert';
import { api } from '../../services/api';
import { DateHelper } from '../../helpers/DateHelper';
import { Breadcrumb } from '../../components/Breadcrumb';

const formValidationSchema = zod.object({
  date: zod.string().min(1, 'Data da avaliação é obrigatória'),
  institution_id: zod.string().min(1, 'Polo é obrigatório'),
  professional_id: zod.string().min(1, 'Avaliador é obrigatório'),
  name: zod.string().min(1, 'Nome é obrigatório'),
  gender: zod.string().min(1, 'Gênero é obrigatório'),
  birthdate: zod.string().min(1, 'Data de nascimento é obrigatória'),
  height: zod.string().min(1, 'Altura é obrigatória'),
  weight: zod.string().min(1, 'Peso é obrigatório'),
  imc: zod.string(),
  flexibility_first_attempt: zod.string().min(1, 'Flexibilidade é obrigatória'),
  flexibility_second_attempt: zod
    .string()
    .min(1, 'Flexibilidade é obrigatória'),
  flexibility_best: zod.string(),
  wingspan: zod.string().min(1, 'Envergadura é obrigatória'),
  strength_resistance: zod.string().min(1, 'Força resistência é obrigatória'),
  muscular_endurance_first_attempt: zod
    .string()
    .min(1, 'Resistência muscular é obrigatória'),
  muscular_endurance_second_attempt: zod
    .string()
    .min(1, 'Resistência muscular é obrigatória'),
  muscular_endurance_best: zod.string(),
  lower_limb_strength_first_attempt: zod
    .string()
    .min(1, 'Força explosiva é obrigatória'),
  lower_limb_strength_second_attempt: zod
    .string()
    .min(1, 'Força explosiva é obrigatória'),
  lower_limb_strength_best: zod.string(),
  upper_limb_strength_first_attempt: zod
    .string()
    .min(1, 'Força explosiva é obrigatória'),
  upper_limb_strength_second_attempt: zod
    .string()
    .min(1, 'Força explosiva é obrigatória'),
  upper_limb_strength_best: zod.string(),
  agility_first_attempt: zod.string().min(1, 'Agilidade é obrigatória'),
  agility_second_attempt: zod.string().min(1, 'Agilidade é obrigatória'),
  agility_best: zod.string(),
  general_resistance: zod.string().min(1, 'Resistência geral é obrigatória'),
  speed: zod.string().min(1, 'Velocidade é obrigatória'),
});

type FormProps = zod.infer<typeof formValidationSchema>;

export function PhysicalTestForm() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [physicalTestId, setPhysicalTestId] = useState('');
  const [imcStatus, setImcStatus] = useState('');
  const [institutions, setInstitutions] = useState<SelectOption[]>([]);
  const [professionals, setProfessionals] = useState<SelectOption[]>([]);
  const { control, handleSubmit, formState, getValues, setValue } =
    useForm<FormProps>({
      resolver: zodResolver(formValidationSchema),
      defaultValues: {
        name: '',
        date: '',
      },
    });

  const calculateImc = useCallback(() => {
    const weight = getValues('weight');
    const height = getValues('height');

    if (weight && height) {
      const imc = Number(
        (Number(weight) / (Number(height) * Number(height))).toFixed(2),
      );
      setValue('imc', String(imc));

      if (imc < 18.5) {
        setImcStatus('Magreza');
      } else if (imc >= 18.5 && imc < 25) {
        setImcStatus('Normal');
      } else if (imc >= 25 && imc < 30) {
        setImcStatus('Sobrepeso');
      } else if (imc >= 30 && imc < 40) {
        setImcStatus('Obesidade');
      } else if (imc > 40) {
        setImcStatus('Obesidade severa');
      }
    }
  }, [getValues, setValue]);

  const calculateHigher = useCallback(
    (field: string, first: string, second: string) => {
      const firstValue = getValues(first as keyof FormProps);
      const secondValue = getValues(second as keyof FormProps);

      if (firstValue && secondValue) {
        const best = Math.max(Number(firstValue), Number(secondValue));
        setValue(field as keyof FormProps, String(best));
      }
    },
    [getValues, setValue],
  );

  const calculateLower = useCallback(
    (field: string, first: string, second: string) => {
      const firstValue = getValues(first as keyof FormProps);
      const secondValue = getValues(second as keyof FormProps);

      if (firstValue && secondValue) {
        const best = Math.min(Number(firstValue), Number(secondValue));
        setValue(field as keyof FormProps, String(best));
      }
    },
    [getValues, setValue],
  );

  const loadPhysicalTest = useCallback(async () => {
    const id = location.state?.id;

    if (id) {
      const { data } = await api.get(`/physical-tests/${id}`);

      const format = 'dd/MM/yyyy';

      setValue('date', DateHelper.from(new Date(data.date), format));
      setValue('institution_id', data.institution.id);
      setValue('professional_id', data.professional.id);
      setValue('name', data.name);
      setValue('gender', data.gender);
      setValue('birthdate', DateHelper.from(new Date(data.birthdate), format));
      setValue('height', String(data.height));
      setValue('weight', String(data.weight));
      setValue(
        'flexibility_first_attempt',
        String(data.flexibilityFirstAttempt),
      );
      setValue(
        'flexibility_second_attempt',
        String(data.flexibilitySecondAttempt),
      );
      setValue('wingspan', String(data.wingspan));
      setValue('strength_resistance', String(data.strengthResistance));
      setValue(
        'muscular_endurance_first_attempt',
        String(data.muscularEnduranceFirstAttempt),
      );
      setValue(
        'muscular_endurance_second_attempt',
        String(data.muscularEnduranceSecondAttempt),
      );
      setValue(
        'lower_limb_strength_first_attempt',
        String(data.lowerLimbStrengthFirstAttempt),
      );
      setValue(
        'lower_limb_strength_second_attempt',
        String(data.lowerLimbStrengthSecondAttempt),
      );
      setValue(
        'upper_limb_strength_first_attempt',
        String(data.upperLimbStrengthFirstAttempt),
      );
      setValue(
        'upper_limb_strength_second_attempt',
        String(data.upperLimbStrengthSecondAttempt),
      );
      setValue('agility_first_attempt', String(data.agilityFirstAttempt));
      setValue('agility_second_attempt', String(data.agilitySecondAttempt));
      setValue('general_resistance', String(data.generalResistance));
      setValue('speed', String(data.speed));
      calculateImc();
      calculateHigher(
        'flexibility_best',
        'flexibility_first_attempt',
        'flexibility_second_attempt',
      );
      calculateHigher(
        'muscular_endurance_best',
        'muscular_endurance_first_attempt',
        'muscular_endurance_second_attempt',
      );
      calculateHigher(
        'lower_limb_strength_best',
        'lower_limb_strength_first_attempt',
        'lower_limb_strength_second_attempt',
      );
      calculateHigher(
        'upper_limb_strength_best',
        'upper_limb_strength_first_attempt',
        'upper_limb_strength_second_attempt',
      );
      calculateLower(
        'agility_best',
        'agility_first_attempt',
        'agility_second_attempt',
      );

      setPhysicalTestId(id);
    }

    setIsLoading(false);
  }, [
    location.state,
    setValue,
    setPhysicalTestId,
    setIsLoading,
    calculateImc,
    calculateHigher,
    calculateLower,
  ]);

  const loadProfessionals = useCallback(async () => {
    const response = await api.get('/professionals?size=9999');

    const responseData = response.data.data.map((item: any) => ({
      value: item.id,
      label: `${item.name} - ${item.registration}`,
    }));

    setProfessionals(responseData);
  }, [setProfessionals]);

  const loadInstitutions = useCallback(async () => {
    const response = await api.get('/institutions?size=9999');

    const responseData = response.data.data.map((item: any) => ({
      value: item.id,
      label: item.name,
    }));

    setInstitutions(responseData);
  }, [setInstitutions]);

  useEffect(() => {
    loadProfessionals();
    loadInstitutions();
    loadPhysicalTest();
  }, [loadInstitutions, loadProfessionals, loadPhysicalTest]);

  const handleSave = useCallback(
    async (form: Partial<FormProps>) => {
      try {
        const sanitizedForm = omit(form, [
          'imc',
          'flexibility_best',
          'muscular_endurance_best',
          'lower_limb_strength_best',
          'upper_limb_strength_best',
          'agility_best',
        ]);

        const formDate = DateHelper.to(sanitizedForm.date!, 'dd/MM/yyyy');
        const formBirthate = DateHelper.to(
          sanitizedForm.birthdate!,
          'dd/MM/yyyy',
        );

        const request = {
          ...sanitizedForm,
          date: DateHelper.from(formDate, 'yyyy-MM-dd'),
          birthdate: DateHelper.from(formBirthate, 'yyyy-MM-dd'),
          height: Number(form.height),
          weight: Number(form.weight),
          flexibility_first_attempt: Number(form.flexibility_first_attempt),
          flexibility_second_attempt: Number(form.flexibility_second_attempt),
          wingspan: Number(form.wingspan),
          strength_resistance: Number(form.strength_resistance),
          muscular_endurance_first_attempt: Number(
            form.muscular_endurance_first_attempt,
          ),
          muscular_endurance_second_attempt: Number(
            form.muscular_endurance_second_attempt,
          ),
          lower_limb_strength_first_attempt: Number(
            form.lower_limb_strength_first_attempt,
          ),
          lower_limb_strength_second_attempt: Number(
            form.lower_limb_strength_second_attempt,
          ),
          upper_limb_strength_first_attempt: Number(
            form.upper_limb_strength_first_attempt,
          ),
          upper_limb_strength_second_attempt: Number(
            form.upper_limb_strength_second_attempt,
          ),
          agility_first_attempt: Number(form.agility_first_attempt),
          agility_second_attempt: Number(form.agility_second_attempt),
          general_resistance: Number(form.general_resistance),
          speed: Number(form.speed),
        };

        console.log('>> request', request);

        let message = '';

        if (physicalTestId) {
          await api.put(`/physical-tests/${physicalTestId}`, request);
          message = 'Avaliação física alterada com sucesso';
        } else {
          await api.post('/physical-tests', request);
          message = 'Avaliação física cadastrada com sucesso';
        }

        navigate('/app/physical-tests', { state: { message } });
      } catch (error) {
        handleError(error, setErrorMessage);
      }
    },
    [navigate, physicalTestId],
  );

  return (
    <UserTemplate>
      <Breadcrumb.Root>
        <Breadcrumb.Item
          label="Avaliações Físicas"
          route="/app/physical-tests"
          hideDivisor
        />
      </Breadcrumb.Root>
      <Heading asChild size="md">
        <h2 className="text-black">Nova Avaliação Física</h2>
      </Heading>
      <Alert message={errorMessage} />
      {!isLoading && (
        <form onSubmit={handleSubmit(handleSave)}>
          <section className="my-8">
            <div className="w-full flex my-4 gap-4">
              <div className="flex-1">
                <Text asChild>
                  <span className="font-semibold text-black mb-2">Polo</span>
                </Text>
                <Select
                  control={control}
                  name="professional_id"
                  // placeholder="Avaliador"
                  error={formState.errors.professional_id?.message}
                  options={professionals}
                />
              </div>
            </div>
            <div className="w-full flex my-4 gap-4">
              <div className="flex-1">
                <Text asChild>
                  <span className="font-semibold text-black mb-2">
                    Data da avaliação
                  </span>
                </Text>
                <DateInput.Root error={formState.errors.date?.message}>
                  <DateInput.Input
                    control={control}
                    name="date"
                    format="dd/MM/yyyy"
                    placeholder="dia/mês/ano"
                    invalidMessage="Data inválida"
                  />
                </DateInput.Root>
              </div>
              <div className="flex-1">
                <Text asChild>
                  <span className="font-semibold text-black mb-2">Polo</span>
                </Text>
                <Select
                  control={control}
                  name="institution_id"
                  // placeholder="Polo da avaliação"
                  error={formState.errors.institution_id?.message}
                  options={institutions}
                />
              </div>
            </div>
            <Heading asChild size="md">
              <h2 className="text-black my-8">Informações pessoais</h2>
            </Heading>
            <div className="w-full flex my-4">
              <div className="flex-1">
                <Text asChild>
                  <span className="font-semibold text-black mb-2">Nome</span>
                </Text>
                <TextInput.Root error={formState.errors.name?.message}>
                  <TextInput.Input
                    control={control}
                    name="name"
                    placeholder="Nome da pessoa"
                  />
                </TextInput.Root>
              </div>
            </div>
            <div className="w-full flex my-4 gap-4">
              <div className="flex-1">
                <Text asChild>
                  <span className="font-semibold text-black mb-2">Gênero</span>
                </Text>
                <Select
                  control={control}
                  name="gender"
                  // placeholder="Gênero da pessoa"
                  error={formState.errors.gender?.message}
                  options={[
                    { value: 'M', label: 'Masculino' },
                    { value: 'F', label: 'Feminino' },
                  ]}
                />
              </div>
              <div className="flex-1">
                <Text asChild>
                  <span className="font-semibold text-black mb-2">
                    Date de nascimento
                  </span>
                </Text>
                <DateInput.Root error={formState.errors.birthdate?.message}>
                  <DateInput.Input
                    control={control}
                    name="birthdate"
                    format="dd/MM/yyyy"
                    placeholder="dia/mês/ano"
                    invalidMessage="Data inválida"
                    ageSuffix="anos"
                    showAge
                  />
                </DateInput.Root>
              </div>
            </div>
            <div className="w-full flex my-4 gap-4">
              <div className="flex-1 max-w-[250px]">
                <Text asChild>
                  <span className="font-semibold text-black mb-2">
                    Peso (Kg)
                  </span>
                </Text>
                <TextInput.Root error={formState.errors.weight?.message}>
                  <TextInput.Input
                    control={control}
                    name="weight"
                    type="number"
                    onKeyUp={calculateImc}
                    placeholder="Peso da pessoa"
                  />
                </TextInput.Root>
              </div>
              <div className="flex-1 max-w-[250px]">
                <Text asChild>
                  <span className="font-semibold text-black mb-2">
                    Altura (m)
                  </span>
                </Text>
                <TextInput.Root error={formState.errors.height?.message}>
                  <TextInput.Input
                    control={control}
                    name="height"
                    type="number"
                    onKeyUp={calculateImc}
                    placeholder="Peso da pessoa"
                  />
                </TextInput.Root>
              </div>
              <div className="flex-1">
                <Text asChild>
                  <span className="font-semibold text-black mb-2">IMC</span>
                </Text>
                <TextInput.Root error={formState.errors.imc?.message} readonly>
                  <TextInput.Input
                    control={control}
                    name="imc"
                    type="number"
                    placeholder="Índice de Massa Corpórea"
                    info={imcStatus}
                    readOnly
                  />
                </TextInput.Root>
              </div>
            </div>
            <Heading asChild size="md">
              <h2 className="text-black my-8">Avaliações</h2>
            </Heading>
            <div className="w-full mt-8">
              <Heading asChild size="sm">
                <h2 className="text-black">Flexibilidade</h2>
              </Heading>
              <Text size="sm" asChild>
                <span className="text-black">Sentar e alcançar</span>
              </Text>
              <div className="flex gap-4 mt-4">
                <div className="flex-1 max-w-[300px]">
                  <Text asChild>
                    <span className="font-semibold text-black mb-2">
                      1ª tentativa
                    </span>
                  </Text>
                  <TextInput.Root
                    error={formState.errors.flexibility_first_attempt?.message}
                  >
                    <TextInput.Input
                      control={control}
                      name="flexibility_first_attempt"
                      type="number"
                      onKeyUp={() =>
                        calculateHigher(
                          'flexibility_best',
                          'flexibility_first_attempt',
                          'flexibility_second_attempt',
                        )
                      }
                    />
                  </TextInput.Root>
                </div>
                <div className="flex-1 max-w-[300px]">
                  <Text asChild>
                    <span className="font-semibold text-black mb-2">
                      2ª tentativa
                    </span>
                  </Text>
                  <TextInput.Root
                    error={formState.errors.flexibility_second_attempt?.message}
                  >
                    <TextInput.Input
                      control={control}
                      name="flexibility_second_attempt"
                      type="number"
                      onKeyUp={() =>
                        calculateHigher(
                          'flexibility_best',
                          'flexibility_first_attempt',
                          'flexibility_second_attempt',
                        )
                      }
                    />
                  </TextInput.Root>
                </div>
                <div className="flex-1 max-w-[300px]">
                  <Text asChild>
                    <span className="font-semibold text-black mb-2">
                      Melhor resultado
                    </span>
                  </Text>
                  <TextInput.Root
                    error={formState.errors.flexibility_best?.message}
                    readonly
                  >
                    <TextInput.Input
                      control={control}
                      name="flexibility_best"
                      type="number"
                      readOnly
                    />
                  </TextInput.Root>
                </div>
              </div>
            </div>
            <div className="w-full mt-8">
              <Heading asChild size="sm">
                <h2 className="text-black">Envergadura</h2>
              </Heading>
              <div className="flex gap-4 mt-4">
                <div className="flex-1 max-w-[300px]">
                  <Text asChild>
                    <span className="font-semibold text-black mb-2">
                      1ª tentativa
                    </span>
                  </Text>
                  <TextInput.Root error={formState.errors.wingspan?.message}>
                    <TextInput.Input
                      control={control}
                      name="wingspan"
                      type="number"
                    />
                  </TextInput.Root>
                </div>
              </div>
            </div>
            <div className="w-full mt-8">
              <Heading asChild size="sm">
                <h2 className="text-black">Força resistência</h2>
              </Heading>
              <Text size="sm" asChild>
                <span className="text-black">1 minuto abdominal</span>
              </Text>
              <div className="flex gap-4 mt-4">
                <div className="flex-1 max-w-[300px]">
                  <Text asChild>
                    <span className="font-semibold text-black mb-2">
                      1ª tentativa
                    </span>
                  </Text>
                  <TextInput.Root
                    error={formState.errors.strength_resistance?.message}
                  >
                    <TextInput.Input
                      control={control}
                      name="strength_resistance"
                      type="number"
                    />
                  </TextInput.Root>
                </div>
              </div>
            </div>
            <div className="w-full mt-8">
              <Heading asChild size="sm">
                <h2 className="text-black">Resistência muscular</h2>
              </Heading>
              <Text size="sm" asChild>
                <span className="text-black">Flexão de braço</span>
              </Text>
              <div className="flex gap-4 mt-4">
                <div className="flex-1 max-w-[300px]">
                  <Text asChild>
                    <span className="font-semibold text-black mb-2">
                      1ª tentativa
                    </span>
                  </Text>
                  <TextInput.Root
                    error={
                      formState.errors.muscular_endurance_first_attempt?.message
                    }
                  >
                    <TextInput.Input
                      control={control}
                      name="muscular_endurance_first_attempt"
                      type="number"
                      onKeyUp={() =>
                        calculateHigher(
                          'muscular_endurance_best',
                          'muscular_endurance_first_attempt',
                          'muscular_endurance_second_attempt',
                        )
                      }
                    />
                  </TextInput.Root>
                </div>
                <div className="flex-1 max-w-[300px]">
                  <Text asChild>
                    <span className="font-semibold text-black mb-2">
                      2ª tentativa
                    </span>
                  </Text>
                  <TextInput.Root
                    error={
                      formState.errors.muscular_endurance_second_attempt
                        ?.message
                    }
                  >
                    <TextInput.Input
                      control={control}
                      name="muscular_endurance_second_attempt"
                      type="number"
                      onKeyUp={() =>
                        calculateHigher(
                          'muscular_endurance_best',
                          'muscular_endurance_first_attempt',
                          'muscular_endurance_second_attempt',
                        )
                      }
                    />
                  </TextInput.Root>
                </div>
                <div className="flex-1 max-w-[300px]">
                  <Text asChild>
                    <span className="font-semibold text-black mb-2">
                      Melhor resultado
                    </span>
                  </Text>
                  <TextInput.Root
                    error={formState.errors.muscular_endurance_best?.message}
                    readonly
                  >
                    <TextInput.Input
                      control={control}
                      name="muscular_endurance_best"
                      type="number"
                      readOnly
                    />
                  </TextInput.Root>
                </div>
              </div>
            </div>
            <div className="w-full mt-8">
              <Heading asChild size="sm">
                <h2 className="text-black">
                  Força explosiva de membros inferiores
                </h2>
              </Heading>
              <Text size="sm" asChild>
                <span className="text-black">Salto horizontal</span>
              </Text>
              <div className="flex gap-4 mt-4">
                <div className="flex-1 max-w-[300px]">
                  <Text asChild>
                    <span className="font-semibold text-black mb-2">
                      1ª tentativa
                    </span>
                  </Text>
                  <TextInput.Root
                    error={
                      formState.errors.lower_limb_strength_first_attempt
                        ?.message
                    }
                  >
                    <TextInput.Input
                      control={control}
                      name="lower_limb_strength_first_attempt"
                      type="number"
                      onKeyUp={() =>
                        calculateHigher(
                          'lower_limb_strength_best',
                          'lower_limb_strength_first_attempt',
                          'lower_limb_strength_second_attempt',
                        )
                      }
                    />
                  </TextInput.Root>
                </div>
                <div className="flex-1 max-w-[300px]">
                  <Text asChild>
                    <span className="font-semibold text-black mb-2">
                      2ª tentativa
                    </span>
                  </Text>
                  <TextInput.Root
                    error={
                      formState.errors.lower_limb_strength_second_attempt
                        ?.message
                    }
                  >
                    <TextInput.Input
                      control={control}
                      name="lower_limb_strength_second_attempt"
                      type="number"
                      onKeyUp={() =>
                        calculateHigher(
                          'lower_limb_strength_best',
                          'lower_limb_strength_first_attempt',
                          'lower_limb_strength_second_attempt',
                        )
                      }
                    />
                  </TextInput.Root>
                </div>
                <div className="flex-1 max-w-[300px]">
                  <Text asChild>
                    <span className="font-semibold text-black mb-2">
                      Melhor resultado
                    </span>
                  </Text>
                  <TextInput.Root
                    error={formState.errors.lower_limb_strength_best?.message}
                    readonly
                  >
                    <TextInput.Input
                      control={control}
                      name="lower_limb_strength_best"
                      type="number"
                      readOnly
                    />
                  </TextInput.Root>
                </div>
              </div>
            </div>
            <div className="w-full mt-8">
              <Heading asChild size="sm">
                <h2 className="text-black">
                  Força explosiva de membros superiores
                </h2>
              </Heading>
              <Text size="sm" asChild>
                <span className="text-black">Arremesso de medicineball</span>
              </Text>
              <div className="flex gap-4 mt-4">
                <div className="flex-1 max-w-[300px]">
                  <Text asChild>
                    <span className="font-semibold text-black mb-2">
                      1ª tentativa
                    </span>
                  </Text>
                  <TextInput.Root
                    error={
                      formState.errors.upper_limb_strength_first_attempt
                        ?.message
                    }
                  >
                    <TextInput.Input
                      control={control}
                      name="upper_limb_strength_first_attempt"
                      type="number"
                      onKeyUp={() =>
                        calculateHigher(
                          'upper_limb_strength_best',
                          'upper_limb_strength_first_attempt',
                          'upper_limb_strength_second_attempt',
                        )
                      }
                    />
                  </TextInput.Root>
                </div>
                <div className="flex-1 max-w-[300px]">
                  <Text asChild>
                    <span className="font-semibold text-black mb-2">
                      2ª tentativa
                    </span>
                  </Text>
                  <TextInput.Root
                    error={
                      formState.errors.upper_limb_strength_second_attempt
                        ?.message
                    }
                  >
                    <TextInput.Input
                      control={control}
                      name="upper_limb_strength_second_attempt"
                      type="number"
                      onKeyUp={() =>
                        calculateHigher(
                          'upper_limb_strength_best',
                          'upper_limb_strength_first_attempt',
                          'upper_limb_strength_second_attempt',
                        )
                      }
                    />
                  </TextInput.Root>
                </div>
                <div className="flex-1 max-w-[300px]">
                  <Text asChild>
                    <span className="font-semibold text-black mb-2">
                      Melhor resultado
                    </span>
                  </Text>
                  <TextInput.Root
                    error={formState.errors.upper_limb_strength_best?.message}
                    readonly
                  >
                    <TextInput.Input
                      control={control}
                      name="upper_limb_strength_best"
                      type="number"
                      readOnly
                    />
                  </TextInput.Root>
                </div>
              </div>
            </div>
            <div className="w-full mt-8">
              <Heading asChild size="sm">
                <h2 className="text-black">Agilidade</h2>
              </Heading>
              <Text size="sm" asChild>
                <span className="text-black">Teste do quadrado</span>
              </Text>
              <div className="flex gap-4 mt-4">
                <div className="flex-1 max-w-[300px]">
                  <Text asChild>
                    <span className="font-semibold text-black mb-2">
                      1ª tentativa
                    </span>
                  </Text>
                  <TextInput.Root
                    error={formState.errors.agility_first_attempt?.message}
                  >
                    <TextInput.Input
                      control={control}
                      name="agility_first_attempt"
                      type="number"
                      onKeyUp={() =>
                        calculateLower(
                          'agility_best',
                          'agility_first_attempt',
                          'agility_second_attempt',
                        )
                      }
                    />
                  </TextInput.Root>
                </div>
                <div className="flex-1 max-w-[300px]">
                  <Text asChild>
                    <span className="font-semibold text-black mb-2">
                      2ª tentativa
                    </span>
                  </Text>
                  <TextInput.Root
                    error={formState.errors.agility_second_attempt?.message}
                  >
                    <TextInput.Input
                      control={control}
                      name="agility_second_attempt"
                      type="number"
                      onKeyUp={() =>
                        calculateLower(
                          'agility_best',
                          'agility_first_attempt',
                          'agility_second_attempt',
                        )
                      }
                    />
                  </TextInput.Root>
                </div>
                <div className="flex-1 max-w-[300px]">
                  <Text asChild>
                    <span className="font-semibold text-black mb-2">
                      Melhor resultado
                    </span>
                  </Text>
                  <TextInput.Root
                    error={formState.errors.agility_best?.message}
                    readonly
                  >
                    <TextInput.Input
                      control={control}
                      name="agility_best"
                      type="number"
                      readOnly
                    />
                  </TextInput.Root>
                </div>
              </div>
            </div>
            <div className="w-full mt-8">
              <Heading asChild size="sm">
                <h2 className="text-black">Resistência geral</h2>
              </Heading>
              <Text size="sm" asChild>
                <span className="text-black">Teste 9 minutos</span>
              </Text>
              <div className="flex gap-4 mt-4">
                <div className="flex-1 max-w-[300px]">
                  <Text asChild>
                    <span className="font-semibold text-black mb-2">
                      1ª tentativa
                    </span>
                  </Text>
                  <TextInput.Root
                    error={formState.errors.general_resistance?.message}
                  >
                    <TextInput.Input
                      control={control}
                      name="general_resistance"
                      type="number"
                    />
                  </TextInput.Root>
                </div>
              </div>
            </div>
            <div className="w-full mt-8">
              <Heading asChild size="sm">
                <h2 className="text-black">Velocidade</h2>
              </Heading>
              <Text size="sm" asChild>
                <span className="text-black">Corrida de 20 metros</span>
              </Text>
              <div className="flex gap-4 mt-4">
                <div className="flex-1 max-w-[300px]">
                  <Text asChild>
                    <span className="font-semibold text-black mb-2">
                      1ª tentativa
                    </span>
                  </Text>
                  <TextInput.Root error={formState.errors.speed?.message}>
                    <TextInput.Input
                      control={control}
                      name="speed"
                      type="number"
                    />
                  </TextInput.Root>
                </div>
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
