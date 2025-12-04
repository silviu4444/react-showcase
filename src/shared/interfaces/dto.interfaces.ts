export type Dto<TData> = {
  data: TData;
};

export type DtoWithMeta<TData, TMeta> = Dto<TData> & {
  meta: TMeta;
};

export type DtoWithPagination<TData> = Dto<TData> & {
  pagination: { lastPage: number; page: number; total: number };
};

export type ErrorDto = {
  code: number;
  details: string;
  message: string;
  timestamp: string;
};
