'use client';

import { HomeOutlined } from '@ant-design/icons';
import { useUser } from '@auth0/nextjs-auth0/client';
import { Button, Result } from 'antd';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect } from 'react';

const AutoClose = () => {
  const params = useSearchParams();
  const close = params.get('close');

  useEffect(() => {
    if (close !== null) {
      window.close();
    }
  }, [close]);

  return null;
};

const Page = () => {
  const { user, isLoading, error } = useUser();

  const title =
    isLoading || error ? 'Success' : user ? 'Logged In' : 'Logged Out';

  return (
    <>
      <Result
        status="success"
        title={title}
        subTitle="You may safely close this tab."
        extra={[
          <Link href="/" key="home">
            <Button>
              <HomeOutlined /> Go Home
            </Button>
          </Link>,
        ]}
        style={{ marginTop: '120px' }}
      />
      <Suspense fallback={null}>
        <AutoClose />
      </Suspense>
    </>
  );
};

export default Page;
