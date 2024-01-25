import { Outlet } from 'react-router-dom';

import { Header, LeftSideBar } from './index';

const Layout = () => {
  return (
    <div className="px-8 py-4 min-h-screen">
      <div className="flex flex-col">
        <Header />
        <div className="flex gap-4 mt-6">
          <LeftSideBar />
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
