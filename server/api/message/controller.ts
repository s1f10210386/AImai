import { postMessage } from '$/repository/messageRepository';
import { defineController } from './$relay';

export default defineController(() => ({
  get: () => ({ status: 200, body: 'Hello' }),
  post: async ({ body }) => {
    console.log('kita');
    return { status: 201, body: await postMessage(body.content, body.userId, body.role) };
  },
}));
