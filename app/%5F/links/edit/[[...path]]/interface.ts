export enum ValidateKeyResult {
  OK,
  UNPROCESSABLE,
  USED,
}

export type RegisterParams = {
  key: string;
  target: string;
};

export enum RegisterResult {
  UNAUTHORIZED,
  UNPROCESSABLE,
}
