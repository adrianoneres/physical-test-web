import { useEffect, useState } from 'react';
import { Navigate, Outlet, useRoutes } from 'react-router-dom';
import { useAuth } from '../contexts/auth';

import { Dashboard } from '../pages/Dashboard';
import { ListPhysicalTests } from '../pages/ListPhysicalTests';
import { PhysicalTestForm } from '../pages/PhysicalTestForm';
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
        { path: 'physical-tests', element: <ListPhysicalTests /> },
        { path: 'physical-tests/new', element: <PhysicalTestForm /> },
      ],
    },
  ]);

  return routes;
}
