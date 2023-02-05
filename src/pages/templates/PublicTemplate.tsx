import { Outlet } from 'react-router-dom';

export function NotAuthorizedLayout() {
  return (
    <main className="bg-slate-100">
      <Outlet />
    </main>
  );
}
