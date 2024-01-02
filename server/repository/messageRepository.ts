import { prismaClient } from '$/service/prismaClient';

export const fetchMessage = async (userId: string) => {
  const message = await prismaClient.message.findMany({
    where: {
      userId,
    },
  });
  return message;
};
export const postMessage = async (content: string, userId: string, role: string) => {
  const messages = await prismaClient.message.create({
    data: {
      content,
      userId,
      timestamp: new Date(),
      role,
    },
  });
  console.log(messages);
  return messages;
};
