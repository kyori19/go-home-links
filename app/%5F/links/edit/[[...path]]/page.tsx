'use client';

import { BulbOutlined } from '@ant-design/icons';
import { useUser } from '@auth0/nextjs-auth0/client';
import {
  Alert,
  Button,
  Col,
  Flex,
  Form,
  Input,
  Row,
  Spin,
  Tooltip,
} from 'antd';
import { useForm } from 'antd/es/form/Form';
import FormItem from 'antd/es/form/FormItem';
import base58 from 'bs58';
import { useCallback, useEffect, useState } from 'react';
import BaseUrl from './BaseUrl';
import { register, validateKey as remoteValidateKey } from './actions';
import { RegisterResult, ValidateKeyResult } from './interface';
import type { RegisterParams } from './interface';

const loginPath = `/_/auth/login?returnTo=${encodeURIComponent('/_/auth/done?close')}`;
const login = () => window.open(new URL(loginPath, window.location.origin));

enum State {
  EDITING,
  SENDING,
  AUTHORIZING,
}

const FormAlert = ({
  state,
  setState,
}: {
  state: State;
  setState: (state: State) => void;
}) => {
  const removeAlert = useCallback(() => {
    setState(State.EDITING);
  }, [setState]);

  switch (state) {
    case State.SENDING: {
      return (
        <Alert
          type="info"
          message="Creating…"
          description="Wait for a while…"
          showIcon
          icon={<Spin />}
        />
      );
    }
    case State.AUTHORIZING: {
      return (
        <Alert
          type="error"
          message="Not Authorized"
          description="Log in and try again."
          showIcon
          closable
          onClose={removeAlert}
          action={
            <Button size="small" onClick={login}>
              Log in
            </Button>
          }
        />
      );
    }
  }

  return null;
};

const validateKey = async (key: string, loggedIn: boolean) => {
  const segments = key.split('/');

  if (segments[0] === '_') {
    throw new Error("Path cannot be started with '_/'.");
  }

  if (segments.some((x) => !x)) {
    throw new Error('Empty path segment is not allowed.');
  }

  if (loggedIn && (await remoteValidateKey(key)) !== ValidateKeyResult.OK) {
    throw new Error('URL is already used.');
  }
};

const Page = ({ params: {} }: { params: { path: string[] } }) => {
  const [form] = useForm();
  const [state, setState] = useState<State>(State.EDITING);
  const { user, checkSession } = useUser();

  const onRandomClick = useCallback(() => {
    form.setFieldValue(
      'key',
      base58.encode(window.crypto.getRandomValues(new Uint8Array(4))),
    );
  }, [form]);

  const onFinish = useCallback(
    async (params: RegisterParams) => {
      setState(State.SENDING);

      switch (await register(params)) {
        case RegisterResult.UNAUTHORIZED: {
          setState(State.AUTHORIZING);
          login();
          break;
        }
        case RegisterResult.UNPROCESSABLE: {
          setState(State.EDITING);
          await form.validateFields();
          break;
        }
      }
    },
    [form],
  );

  useEffect(() => {
    if (state === State.AUTHORIZING) {
      document.addEventListener('visibilitychange', checkSession);

      if (user) {
        setState(State.EDITING);
        form.submit();
      }

      return () =>
        document.removeEventListener('visibilitychange', checkSession);
    }
  }, [checkSession, form, state, user]);

  return (
    <>
      <Form<RegisterParams>
        form={form}
        labelCol={{ span: 6, lg: 4 }}
        disabled={state !== State.EDITING}
        onFinish={onFinish}
      >
        <FormItem
          label="Custom URL Path"
          name="key"
          rules={[
            {
              required: true,
              message: 'Custom URL Path is required.',
            },
            {
              validator: async (_, value: string | null) =>
                value && validateKey(value, !!user),
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

      <Row>
        <Col
          span={24}
          md={{ span: 18, offset: 3 }}
          lg={{ span: 16, offset: 4 }}
        >
          <FormAlert state={state} setState={setState} />
        </Col>
      </Row>
    </>
  );
};

export default Page;
