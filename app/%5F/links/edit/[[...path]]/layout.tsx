import { Typography } from 'antd';
import Paragraph from 'antd/es/typography/Paragraph';
import Title from 'antd/es/typography/Title';
import type { ReactNode } from 'react';

const Layout = ({ children }: Readonly<{ children: ReactNode }>) => {
  return (
    <Typography>
      <div style={{ textAlign: 'center' }}>
        <Title>Edit your link</Title>

        <Paragraph>Create your shortened URLs</Paragraph>
      </div>

      {children}
    </Typography>
  );
};

export default Layout;
