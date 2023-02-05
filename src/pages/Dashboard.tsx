import { PersonSimpleRun, SignOut } from 'phosphor-react';
import { useNavigate } from 'react-router-dom';

import { Card } from '../components/Card';
import { Heading } from '../components/Heading';
import { useAuth } from '../contexts/auth';
import { UserTemplate } from './templates/UserTemplate';

export function Dashboard() {
  const { signOut } = useAuth();
  const navigate = useNavigate();

  const navigateToPhysicalTests = () => {
    navigate('/physical-tests');
  };

  return (
    <UserTemplate>
      <Heading asChild size="md">
        <h2>Dashboard</h2>
      </Heading>
      <section className="mt-8 flex gap-6">
        <Card.Root action={navigateToPhysicalTests}>
          <Card.Icon>
            <PersonSimpleRun />
          </Card.Icon>
          <Card.Label value="Avaliações Físicas" />
        </Card.Root>

        <Card.Root action={signOut}>
          <Card.Icon>
            <SignOut />
          </Card.Icon>
          <Card.Label value="Sair" />
        </Card.Root>
      </section>
    </UserTemplate>
  );
}
