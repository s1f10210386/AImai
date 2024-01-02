import type { DefineMethods } from 'aspida';

export type Methods = DefineMethods<{
  get: {
    resBody: string;
  };

  post: {
    reqBody: {
      content: string;
      userId: string;
      role: string;
    };
  };
}>;
