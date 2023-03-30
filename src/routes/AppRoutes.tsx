import { useEffect, useState } from 'react';
import { Navigate, Outlet, useRoutes } from 'react-router-dom';
import { useAuth } from '../contexts/auth';

import { Dashboard } from '../pages/Dashboard';
import { InstitutionForm } from '../pages/Institution/InstitutionForm';
import { InstitutionsList } from '../pages/Institution/InstitutionsList';
import { ProfessionalForm } from '../pages/Professional/ProfessionalForm';
import { ProfessionalsList } from '../pages/Professional/ProfessionalsList';
import { PhysicalTestsList } from '../pages/PhysicalTests/PhysicalTestsList';
import { PhysicalTestForm } from '../pages/PhysicalTests/PhysicalTestForm';
import { SignIn } from '../pages/SignIn';

export function AppRoutes() {
  const { getUser } = useAuth();
  const [isLoggedIn, setIsLoggedIn] = useState(!!getUser()?.id);

  useEffect(() => {
    const user = getUser();
    setIsLoggedIn(!!user?.id);
  }, [getUser]);

  const routes = useRoutes([
    { path: '/', element: isLoggedIn ? <Dashboard /> : <SignIn /> },
    { path: 'sign-in', element: isLoggedIn ? <Dashboard /> : <SignIn /> },
    {
      path: 'app',
      element: isLoggedIn ? <Outlet /> : <Navigate to="/" />,
      children: [
        { path: '', element: <Navigate to="dashboard" /> },
        { path: 'dashboard', element: <Dashboard /> },
        { path: 'institutions', element: <InstitutionsList /> },
        { path: 'institutions/form', element: <InstitutionForm /> },
        { path: 'professionals', element: <ProfessionalsList /> },
        { path: 'professionals/form', element: <ProfessionalForm /> },
        { path: 'physical-tests', element: <PhysicalTestsList /> },
        { path: 'physical-tests/form', element: <PhysicalTestForm /> },
      ],
    },
  ]);

  return routes;
}
