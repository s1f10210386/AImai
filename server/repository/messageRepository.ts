import { prismaClient } from '$/service/prismaClient';

export const postMessage = async (content: string, userId: string, role: string) => {
  console.log('postMessage');
  const message = await prismaClient.message.create({
    data: {
      content,
      userId,
      timestamp: new Date(),
      role,
    },
  });
  console.log(message);
  return message;
};
