import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';

import { PrintLayout } from '@/layouts/PrintLayout';
import { getApiClient } from '@/services/api';
import { Alert, AlertProps } from '@/components/Alert';
import { useAuth } from '@/contexts/AuthContext';
import { handleError } from '@/errors/AppError';
import { format } from '@/helpers/date.helper';
import { formatGender } from '@/helpers/gender.helper';
import { formatNumber } from '@/helpers/number.helper';
import { formatImc } from '@/helpers/imc.helper';
import { formatResult } from '@/helpers/result.helper';

import shotokanLogo from '../../../public/shotokan-logo.jpeg';
import leiIncentivoEsporteLogo from '../../../public/lei-incentivo-esporte-logo.png';

interface PhysicalTestsData {
  id: string;
  physicalTest: {
    id: string;
    name: string;
    date: string;
    institution: string;
    professional: string;
    gender: string;
    birthdate: string;
    height: number;
    weight: number;
    flexibilityFirstAttempt: number;
    flexibilitySecondAttempt: number;
    wingspan: number;
    strengthResistance: number;
    muscularEnduranceFirstAttempt: number;
    muscularEnduranceSecondAttempt: number;
    lowerLimbStrengthFirstAttempt: number;
    lowerLimbStrengthSecondAttempt: number;
    upperLimbStrengthFirstAttempt: number;
    upperLimbStrengthSecondAttempt: number;
    agilityFirstAttempt: number;
    agilitySecondAttempt: number;
    generalResistance: number;
    speed: number;
  };
  results: {
    age: number;
    imc: number;
    imcLevel: string;
    agilityBest: number;
    agilityLevel: string;
    flexibilityBest: number;
    flexibilityLevel: string;
    generalResistanceLevel: string;
    lowerLimbStrengthBest: number;
    lowerLimbStrengthLevel: string;
    muscularEnduranceBest: number;
    muscularEnduranceLevel: string;
    speedLevel: string;
    strengthResistanceLevel: string;
    upperLimbStrengthBest: number;
    upperLimbStrengthLevel: string;
  };
}

export default function PhysicalTests() {
  const router = useRouter();
  const { signOut } = useAuth();
  const [alert, setAlert] = useState<AlertProps | null>(null);
  const [physicalTests, setPhysicalTests] = useState<PhysicalTestsData[]>([]);

  const loadPhysicalTests = useCallback(async () => {
    const { name, dateFrom, dateTo } = router.query;
    const dateFromRequest = dateFrom || '';
    const dateToRequest = dateTo || '';
    try {
      const response = await getApiClient().get(
        `/physical-tests/results/calculate?name=${name}&dateFrom=${dateFromRequest}&dateTo=${dateToRequest}`,
      );
      const data = response.data.data.map((item: any) => ({
        ...item,
        physicalTest: {
          ...item.physicalTest,
          date: format(item.physicalTest.date),
          birthdate: format(item.physicalTest.birthdate),
          institution: item.physicalTest.institution.name,
          professional: item.physicalTest.professional.name,
        },
      }));

      setPhysicalTests(data);
    } catch (error) {
      handleError({
        error,
        action: setAlert,
        unauthorizedAction: signOut,
      });
    }
  }, [router, signOut]);

  useEffect(() => {
    loadPhysicalTests();
  }, [loadPhysicalTests]);

  return (
    <PrintLayout title="Relatório de Avaliações Físicas">
      <Alert message={alert?.message} type={alert?.type} />
      {physicalTests.map(({ id, physicalTest, results }) => (
        <div className="page" key={id}>
          <header>
            <Image src={shotokanLogo} height={200} width={200} alt="Shotokan" />
            <Image
              src={leiIncentivoEsporteLogo}
              width={200}
              alt="Lei de incentivo ao esporte"
            />
          </header>
          <table>
            <thead>
              <tr>
                <th colSpan={6}>{physicalTest.name}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={2} className="w-1/3 label">
                  Data de Nascimento
                </td>
                <td colSpan={2} className="w-1/3 label">
                  Idade
                </td>
                <td colSpan={2} className="w-1/3 label">
                  Gênero
                </td>
              </tr>
              <tr>
                <td colSpan={2}>{physicalTest.birthdate}</td>
                <td colSpan={2}>{results.age}</td>
                <td colSpan={2}>{formatGender(physicalTest.gender)}</td>
              </tr>
              <tr>
                <td colSpan={2} className="w-1/3 label">
                  Altura
                </td>
                <td colSpan={2} className="w-1/3 label">
                  Peso
                </td>
                <td colSpan={2} className="w-1/3 label">
                  IMC
                </td>
              </tr>
              <tr>
                <td colSpan={2}>{formatNumber(physicalTest.height)} m</td>
                <td colSpan={2}>{formatNumber(physicalTest.weight)} kg</td>
                <td colSpan={2}>
                  {`${formatNumber(results.imc)} - ${formatImc(
                    results.imcLevel,
                  )}`}
                </td>
              </tr>
              <tr>
                <td colSpan={6} className="spacer"></td>
              </tr>
              <tr>
                <td colSpan={2} className="w-1/3 label">
                  Data da Avaliação
                </td>
                <td colSpan={2} className="w-1/3 label">
                  Polo
                </td>
                <td colSpan={2} className="w-1/3 label">
                  Avaliador
                </td>
              </tr>
              <tr>
                <td colSpan={2}>{physicalTest.date}</td>
                <td colSpan={2}>{physicalTest.institution}</td>
                <td colSpan={2}>{physicalTest.professional}</td>
              </tr>
              <tr>
                <td colSpan={6} className="spacer"></td>
              </tr>
              <tr>
                <td colSpan={2} className="label">
                  Teste
                </td>
                <td className="w-1/6 label">1ª Tentativa</td>
                <td className="w-1/6 label">2ª Tentativa</td>
                <td className="w-1/6 label">Melhor Tentativa</td>
                <td className="w-1/6 label">Classificação</td>
              </tr>
              <tr>
                <td colSpan={2}>Envergadura</td>
                <td>{formatNumber(physicalTest.wingspan, 'm')}</td>
                <td>-</td>
                <td>{formatNumber(physicalTest.wingspan, 'm')}</td>
                <td>-</td>
              </tr>
              <tr>
                <td colSpan={2}>Força resistência</td>
                <td>
                  {formatNumber(physicalTest.strengthResistance, 'abdominais')}
                </td>
                <td>-</td>
                <td>
                  {formatNumber(physicalTest.strengthResistance, 'abdominais')}
                </td>
                <td>
                  {formatResult(
                    results.strengthResistanceLevel,
                    physicalTest.strengthResistance,
                  )}
                </td>
              </tr>
              <tr>
                <td colSpan={2}>Flexibilidade</td>
                <td>
                  {formatNumber(physicalTest.flexibilityFirstAttempt, 'm')}
                </td>
                <td>
                  {formatNumber(physicalTest.flexibilitySecondAttempt, 'm')}
                </td>
                <td>{formatNumber(results.flexibilityBest, 'm')}</td>
                <td>
                  {formatResult(
                    results.flexibilityLevel,
                    results.flexibilityBest,
                  )}
                </td>
              </tr>
              <tr>
                <td colSpan={2}>Resistência muscular</td>
                <td>
                  {formatNumber(
                    physicalTest.muscularEnduranceFirstAttempt,
                    'flexões',
                  )}
                </td>
                <td>
                  {formatNumber(
                    physicalTest.muscularEnduranceSecondAttempt,
                    'flexões',
                  )}
                </td>
                <td>
                  {formatNumber(results.muscularEnduranceBest, 'flexões')}
                </td>
                <td>
                  {formatResult(
                    results.muscularEnduranceLevel,
                    results.muscularEnduranceBest,
                  )}
                </td>
              </tr>
              <tr>
                <td colSpan={2}>Força explosiva de membros inferiores</td>
                <td>
                  {formatNumber(
                    physicalTest.lowerLimbStrengthFirstAttempt,
                    'm',
                  )}
                </td>
                <td>
                  {formatNumber(
                    physicalTest.lowerLimbStrengthSecondAttempt,
                    'm',
                  )}
                </td>
                <td>{formatNumber(results.lowerLimbStrengthBest, 'm')}</td>
                <td>
                  {formatResult(
                    results.lowerLimbStrengthLevel,
                    results.lowerLimbStrengthBest,
                  )}
                </td>
              </tr>
              <tr>
                <td colSpan={2}>Força explosiva de membros superiores</td>
                <td>
                  {formatNumber(
                    physicalTest.upperLimbStrengthFirstAttempt,
                    'm',
                  )}
                </td>
                <td>
                  {formatNumber(
                    physicalTest.upperLimbStrengthSecondAttempt,
                    'm',
                  )}
                </td>
                <td>{formatNumber(results.upperLimbStrengthBest, 'm')}</td>
                <td>
                  {formatResult(
                    results.upperLimbStrengthLevel,
                    results.upperLimbStrengthBest,
                  )}
                </td>
              </tr>
              <tr>
                <td colSpan={2}>Agilidade</td>
                <td>{formatNumber(physicalTest.agilityFirstAttempt, 's')}</td>
                <td>{formatNumber(physicalTest.agilitySecondAttempt, 's')}</td>
                <td>{formatNumber(results.agilityBest, 's')}</td>
                <td>
                  {formatResult(results.agilityLevel, results.agilityBest)}
                </td>
              </tr>
              <tr>
                <td colSpan={2}>Resistência geral</td>
                <td>{formatNumber(physicalTest.generalResistance, 'm')}</td>
                <td>-</td>
                <td>{formatNumber(physicalTest.generalResistance, 'm')}</td>
                <td>
                  {formatResult(
                    results.generalResistanceLevel,
                    physicalTest.generalResistance,
                  )}
                </td>
              </tr>
              <tr>
                <td colSpan={2}>Resistência geral</td>
                <td>{formatNumber(physicalTest.speed, 's')}</td>
                <td>-</td>
                <td>{formatNumber(physicalTest.speed, 's')}</td>
                <td>{formatResult(results.speedLevel, physicalTest.speed)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      ))}
    </PrintLayout>
  );
}
