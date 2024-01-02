import type { DefineMethods } from 'aspida';

export type Methods = DefineMethods<{
  get: {
    query: {
      userId: string;
    };
    resBody: {
      id: string;
      content: string;
      userId: string;
      timestamp: Date;
      role: string;
    }[];
  };

  post: {
    reqBody: {
      content: string;
      userId: string;
      role: string;
    };
  };
}>;
