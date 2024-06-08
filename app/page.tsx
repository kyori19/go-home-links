import { GithubOutlined } from '@ant-design/icons';
import { Button, Card, Col, Row, Typography } from 'antd';
import Paragraph from 'antd/es/typography/Paragraph';
import Title from 'antd/es/typography/Title';
import Link from 'next/link';

const Page = () => {
  return (
    <Typography>
      <div style={{ textAlign: 'center' }}>
        <Title>Go Home Links</Title>

        <Paragraph>Easy-to-use custom URL shortener (redirector)</Paragraph>
      </div>

      <Row gutter={[16, 16]}>
        <Col span={24} md={12}>
          <Card title="Use this server">
            <Paragraph>
              This server is not public. Authentication is required to create or
              edit links.
            </Paragraph>
          </Card>
        </Col>
        <Col span={24} md={12}>
          <Card
            title="Host your server"
            actions={[
              <Link
                href="https://github.com/kyori19/go-home-links"
                key="source"
              >
                <Button type="text">
                  <GithubOutlined /> Check GitHub
                </Button>
              </Link>,
            ]}
          >
            <Paragraph>
              Go Home Links is an open source project developed on GitHub. It is
              easy to deploy your server on{' '}
              <Link href="https://vercel.com/">Vercel</Link>.
            </Paragraph>
          </Card>
        </Col>
      </Row>
    </Typography>
  );
};

export default Page;
