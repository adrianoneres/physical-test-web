import { BrowserRouter } from 'react-router-dom';

import { AppRoutes } from './AppRoutes';

export function Routes() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}
