import { Outlet } from 'react-router-dom';

import { Header, Footer } from 'components';

export const SharedLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};
