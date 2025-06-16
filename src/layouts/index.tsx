import { getLocale, Outlet, useLocation } from '@umijs/max';
import { ConfigProvider } from 'antd';
import UseLayout from './UserLayout';

const BasicLayout = () => {
  const locale = getLocale();

  return (
    <>
      <ConfigProvider>
        <Outlet />
      </ConfigProvider>
    </>
  );
};

export default BasicLayout;
