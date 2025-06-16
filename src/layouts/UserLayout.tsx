import { GoogleOAuthProvider } from '@react-oauth/google';
import { getLocale, Outlet } from '@umijs/max';

const UseLayout = (props: React.PropsWithChildren) => {
  const locale = getLocale();

  return (
    <>
      <GoogleOAuthProvider
        clientId="748825344046-tl39clsu38fetiopebl7jmgcb8io810c.apps.googleusercontent.com"
      >
        <Outlet />
      </GoogleOAuthProvider>
      ;
    </>
  );
};

export default UseLayout;
