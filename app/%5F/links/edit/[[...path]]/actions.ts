'use server';

import { kv } from '@vercel/kv';
import { redirect } from 'next/navigation';
import auth0 from '@/app/%5F/auth0';
import { RegisterResult, ValidateKeyResult } from './interface';
import type { RegisterParams } from './interface';

const UnprocessableError = new Error();

const getParam = (params: object, key: PropertyKey): unknown => {
  if (!(key in params)) {
    throw UnprocessableError;
  }

  return (params as Record<PropertyKey, unknown>)[key];
};

const normalizeKey = (key: unknown) => {
  if (typeof key !== 'string') {
    throw UnprocessableError;
  }

  const segments = key.split('/');
  if (segments[0] === '_' || segments.some((x) => !x)) {
    throw UnprocessableError;
  }

  return segments.map((x) => encodeURIComponent(x)).join('/');
};

const getRegisterParams = (params: unknown): RegisterParams => {
  if (!params || typeof params !== 'object') {
    throw UnprocessableError;
  }

  const target = getParam(params, 'target');
  if (typeof target !== 'string' || !URL.canParse(target)) {
    throw UnprocessableError;
  }

  return {
    key: normalizeKey(getParam(params, 'key')),
    target,
  };
};

export const validateKey = async (
  rawKey: unknown,
): Promise<ValidateKeyResult> => {
  try {
    const key = normalizeKey(rawKey);

    if (await kv.sismember('links', key)) {
      return ValidateKeyResult.USED;
    }

    return ValidateKeyResult.OK;
  } catch (e) {
    if (e === UnprocessableError) {
      return ValidateKeyResult.UNPROCESSABLE;
    }

    throw e;
  }
};

export const register = async (rawParams: unknown): Promise<RegisterResult> => {
  try {
    const session = await auth0.getSession();

    if (!session) {
      return RegisterResult.UNAUTHORIZED;
    }

    const params = getRegisterParams(rawParams);

    if (await kv.sismember('links', params.key)) {
      throw UnprocessableError;
    }

    await Promise.all([
      kv.sadd('links', params.key),
      kv.hset(`link:${params.key}`, { target: params.target }),
    ]);

    redirect(`/_/links/edit/${params.key}`);
  } catch (e) {
    if (e === UnprocessableError) {
      return RegisterResult.UNPROCESSABLE;
    }

    throw e;
  }
};
