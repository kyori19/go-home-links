import { GithubOutlined, LinkOutlined } from '@ant-design/icons';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { Layout, Menu } from 'antd';
import { Content, Footer, Header } from 'antd/es/layout/layout';
import Text from 'antd/es/typography/Text';
import Link from 'next/link';
import styles from './layout.module.css';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';

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
            <Header style={{ display: 'flex' }}>
              <Link href="/">
                <Text
                  style={{
                    color: 'white',
                    fontSize: '24px',
                    verticalAlign: 'middle',
                  }}
                >
                  <LinkOutlined /> Go Home Links
                </Text>
              </Link>

              <Menu
                theme="dark"
                mode="horizontal"
                selectable={false}
                items={[
                  {
                    key: 'create',
                    label: (
                      <Link href="/_/links/edit">
                        <LinkOutlined /> Create Link
                      </Link>
                    ),
                  },
                ]}
                style={{ flex: 1, justifyContent: 'flex-end', minWidth: 0 }}
              />
            </Header>
            <Content className={styles.content}>{children}</Content>
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
