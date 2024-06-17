import { UserProvider } from '@auth0/nextjs-auth0/client';
import type { ReactNode } from 'react';

const Layout = ({ children }: Readonly<{ children: ReactNode }>) => {
  return (
    <UserProvider loginUrl="/_/auth/login" profileUrl="/_/auth/me">
      {children}
    </UserProvider>
  );
};

export default Layout;
