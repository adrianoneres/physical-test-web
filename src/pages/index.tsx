import { useRouter } from 'next/router';

import { Button } from '@/components/Button';
import { PublicLayout } from '@/layouts/PublicLayout';

export default function Index() {
  const router = useRouter();

  return (
    <PublicLayout>
      <div className="h-[190px] flex items-center justify-center">
        <Button size="fluid" onClick={() => router.push('/signin')}>
          Login
        </Button>
      </div>
    </PublicLayout>
  );
}
