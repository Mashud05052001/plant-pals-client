export type TError = {
  success: false;
  message: string;
  errorSources: {
    path: string;
    message: string;
  }[];
  stack?: string;
};

export type TMeta = {
  totalData: number;
  limit: number;
  page: number;
  skip: number;
  totalPage: number;
};
export type TSuccess<T> = {
  success: true;
  message: string;
  data: T;
};
export type TSuccessWithMeta<T> = {
  success: true;
  message: string;
  data: {
    data: T;
    meta: TMeta;
  };
};
