import type { Metadata } from 'next';
import { ReactNode } from 'react';
import { Layout, Tag } from 'antd';
import Link from 'next/link';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { Content, Footer, Header } from 'antd/es/layout/layout';
import { GithubOutlined } from '@ant-design/icons';

export const metadata: Metadata = {
  title: {
    default: 'Go Home Links',
    template: '%s - Go Home Links',
  },
  description: 'Easy-to-use custom URL shortener (redirector)',
};

const AppLayout = ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  return (
    <html lang="en">
      <body style={{ margin: '0' }}>
        <AntdRegistry>
          <Layout style={{ minHeight: '100vh' }}>
            <Header>
              <Tag color="magenta" style={{ fontSize: '1.25em' }}>
                Go Home Links
              </Tag>
            </Header>
            <Content>{children}</Content>
            <Footer style={{ textAlign: 'center' }}>
              Made by <Link href="https://accelf.net/">Team AccelForce</Link>.{' '}
              <Link href="https://github.com/kyori19/go-home-links">
                <GithubOutlined /> Source
              </Link>
            </Footer>
          </Layout>
        </AntdRegistry>
      </body>
    </html>
  );
};

export default AppLayout;
