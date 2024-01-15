import { createRoom, fetchRoom } from '$/repository/roomRepository';
import { defineController } from './$relay';

export default defineController(() => ({
  get: async ({ query }) => {
    const result = await fetchRoom(query.userId);
    // console.log('kita', result);
    return { status: 200, body: result };
  },
  post: async ({ body }) => {
    const results = await createRoom(body.userId);

    return { status: 201, body: results };
  },
}));
