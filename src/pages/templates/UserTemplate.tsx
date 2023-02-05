import { Outlet } from 'react-router-dom';

import { Header } from '../../components/Header';

export function AuthorizedLayout() {
  return (
    <main className="bg-slate-100">
      <Header />
      <Outlet />
    </main>
  );
}
