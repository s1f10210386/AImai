import type { DefineMethods } from 'aspida';

export type Methods = DefineMethods<{
  get: {
    query: {
      roomId: string;
    };
    resBody: {
      id: string;
      content: string;
      userId: string;
      roomId: string;
      timestamp: Date;
      role: string;
    }[];
  };

  post: {
    reqBody: {
      content: string;
      userId: string;
      roomId: string;
      role: string;
    };
  };
}>;
