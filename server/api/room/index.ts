import type { DefineMethods } from 'aspida';

export type Methods = DefineMethods<{
  get: {
    query: {
      userId: string;
    };
    resBody: {
      id: string;
      userId: string;
      timestamp: Date;
    }[];
  };

  post: {
    reqBody: {
      userId: string;
    };
  };
}>;
