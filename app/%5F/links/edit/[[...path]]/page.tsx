'use client';

import { BulbOutlined } from '@ant-design/icons';
import { Button, Flex, Form, Input, Tooltip } from 'antd';
import { useForm } from 'antd/es/form/Form';
import FormItem from 'antd/es/form/FormItem';
import base58 from 'bs58';
import { useCallback } from 'react';
import BaseUrl from './BaseUrl';

const isValidKey = (key: string) => !key?.split('/')?.some((x) => !x);

const Page = ({ params: {} }: { params: { path: string[] } }) => {
  const [form] = useForm();

  const onRandomClick = useCallback(() => {
    form.setFieldValue(
      'key',
      base58.encode(window.crypto.getRandomValues(new Uint8Array(4))),
    );
  }, [form]);

  return (
    <Form form={form} labelCol={{ span: 6, lg: 4 }}>
      <FormItem
        label="Custom URL Path"
        name="key"
        rules={[
          {
            required: true,
            message: 'Custom URL Path is required.',
          },
          {
            validator: async (_, value) => {
              if (!value || isValidKey(value)) {
                return;
              }

              throw new Error('Empty path segment is not allowed.');
            },
          },
        ]}
      >
        <Input
          addonBefore={
            <>
              <BaseUrl />/
            </>
          }
          addonAfter={
            <Tooltip title="Generate Random Path">
              <BulbOutlined onClick={onRandomClick} />
            </Tooltip>
          }
        />
      </FormItem>

      <FormItem
        label="Redirect URL"
        name="target"
        rules={[
          { required: true, message: 'Redirect URL is required.' },
          { type: 'url', message: 'Redirect URL must be a valid URL.' },
        ]}
      >
        <Input />
      </FormItem>

      <FormItem>
        <Flex justify="center">
          <Button type="primary" htmlType="submit">
            Create
          </Button>
        </Flex>
      </FormItem>
    </Form>
  );
};

export default Page;
