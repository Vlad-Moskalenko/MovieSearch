import { Outlet } from 'react-router-dom';
import { Suspense } from 'react';

import { Header, Spinner } from 'components';

export const SharedLayout = () => {
  return (
    <>
      <Header />
      <Suspense fallback={<Spinner />}>
        <Outlet />
      </Suspense>
      {/* <Footer /> */}
    </>
  );
};
