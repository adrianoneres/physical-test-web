import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { PrivateLayout } from '@/layouts/PrivateLayout';
import { getApiClient } from '@/services/api';
import { Card } from '@/components/Card';

const dashboardDefaultValue = {
  professionals: 0,
  institutions: 0,
  physicalTests: 0,
};

export default function Dashboard() {
  const router = useRouter();
  const [dashboard, setDashboard] = useState(dashboardDefaultValue);

  const loadDashboard = useCallback(async () => {
    const response = await getApiClient().get('/dashboard');
    setDashboard(response.data);
  }, []);

  useEffect(() => {
    loadDashboard();
  }, [loadDashboard]);

  return (
    <PrivateLayout title="Dashboard">
      <section className="flex gap-8">
        <Card
          key="professionals"
          value={dashboard.professionals}
          description="Avaliadores"
          action={() => router.push('/professionals')}
        />
        <Card
          key="institutions"
          value={dashboard.institutions}
          description="Polos"
          action={() => router.push('/institutions')}
        />
        <Card
          key="physical-tests"
          value={dashboard.physicalTests}
          description="Testes Físicos"
          action={() => router.push('/physical-tests')}
        />
      </section>
    </PrivateLayout>
  );
}
