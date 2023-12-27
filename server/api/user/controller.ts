import { createUser } from '$/repository/userRepository';
import { defineController } from './$relay';

export default defineController(() => ({
  // get: () => ({ status: 200, body: 'Hello' }),
  post: async ({ body }) => ({ status: 201, body: await createUser(body.id, body.email) }),
}));
