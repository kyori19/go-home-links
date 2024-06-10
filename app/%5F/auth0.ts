// cannot type strictly
import { initAuth0 } from '@auth0/nextjs-auth0';

const addOptional = <B, K extends PropertyKey, V>(
  base: B,
  key: K,
  value: V,
): B => (value ? { ...base, [key]: value } : base);

const auth0 = initAuth0(
  addOptional(
    {
      authorizationParams: addOptional(
        {},
        'connection',
        process.env.AUTH0_AUTH_CONNECTION,
      ),
      routes: {
        callback: '/_/auth/callback',
        postLogoutRedirect: '/_/auth/done',
      },
    },
    'baseURL',
    process.env.VERCEL_URL && `https://${process.env.VERCEL_URL}`,
  ),
);

export default auth0;
