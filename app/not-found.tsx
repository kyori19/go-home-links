import { HomeOutlined } from '@ant-design/icons';
import { Button, Result } from 'antd';
import Link from 'next/link';

const Page = () => {
  return (
    <Result
      status="error"
      title="404 Not Found"
      subTitle="The page you are looking for was not found."
      extra={[
        <Link href="/" key="home">
          <Button>
            <HomeOutlined /> Go Home
          </Button>
        </Link>,
      ]}
      style={{ marginTop: '120px' }}
    />
  );
};

export default Page;
