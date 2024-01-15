import { createRoom } from '$/repository/roomRepository';
import { defineController } from './$relay';

export default defineController(() => ({
  post: async ({ body }) => {
    const results = await createRoom(body.userId);
    console.log('kita', results);
    return { status: 201, body: results };
  },
}));
