import { Routes, Route } from 'react-router-dom';
import { AuthorizedLayout } from './pages/templates/UserTemplate';
import { NotAuthorizedLayout } from './pages/templates/PublicTemplate';

import { Dashboard } from './pages/Dashboard';
import { ListPhysicalTests } from './pages/ListPhysicalTests';
import { SignIn } from './pages/SignIn';

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<NotAuthorizedLayout />}>
        <Route path="/sign-in" element={<SignIn />} />
      </Route>
      <Route path="/app" element={<AuthorizedLayout />}>
        <Route path="/app/dashboard" element={<Dashboard />} />
        <Route path="/app/physical-tests" element={<ListPhysicalTests />} />
      </Route>
    </Routes>
  );
}
