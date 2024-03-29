import { fetchMessage, postMessage } from '$/repository/messageRepository';
import { defineController } from './$relay';

export default defineController(() => ({
  get: async ({ query }) => {
    const result = await fetchMessage(query.roomId);
    // console.log(result);
    return { status: 200, body: result };
  },
  post: async ({ body }) => {
    const results = await postMessage(body.content, body.userId, body.roomId, body.role);
    return { status: 201, body: results };
  },
}));
