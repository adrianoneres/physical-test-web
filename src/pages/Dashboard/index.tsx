import {
  Buildings,
  ChalkboardTeacher,
  PersonSimpleRun,
  SignOut,
} from 'phosphor-react';
import { useNavigate } from 'react-router-dom';

import { Card } from '../../components/Card';
import { Heading } from '../../components/Heading';
import { useAuth } from '../../contexts/auth';
import { UserTemplate } from '../templates/UserTemplate';

export function Dashboard() {
  const { signOut } = useAuth();
  const navigate = useNavigate();

  const navigateToInstitutions = () => {
    navigate('/app/institutions');
  };

  const navigateToProfessionals = () => {
    navigate('/app/professionals');
  };

  const navigateToPhysicalTests = () => {
    navigate('/app/physical-tests');
  };

  return (
    <UserTemplate>
      <section>
        <Heading asChild size="md">
          <h2>Cadastros</h2>
        </Heading>
        <div className="mt-8 flex gap-6">
          <Card.Root action={navigateToPhysicalTests}>
            <Card.Icon>
              <PersonSimpleRun size={64} />
            </Card.Icon>
            <Card.Label value="Avaliações Físicas" />
          </Card.Root>

          <Card.Root action={navigateToProfessionals}>
            <Card.Icon>
              <ChalkboardTeacher size={64} />
            </Card.Icon>
            <Card.Label value="Avaliadores" />
          </Card.Root>

          <Card.Root action={navigateToInstitutions}>
            <Card.Icon>
              <Buildings size={64} />
            </Card.Icon>
            <Card.Label value="Polos" />
          </Card.Root>
        </div>
      </section>
      <section className="mt-8">
        <Heading asChild size="md">
          <h2>Opções</h2>
        </Heading>
        <div className="mt-8">
          <Card.Root action={signOut}>
            <Card.Icon>
              <SignOut size={64} />
            </Card.Icon>
            <Card.Label value="Sair" />
          </Card.Root>
        </div>
      </section>
    </UserTemplate>
  );
}
