import { prismaClient } from '$/service/prismaClient';

export const fetchMessage = async (roomId: string) => {
  const message = await prismaClient.message.findMany({
    where: {
      roomId,
    },
    orderBy: {
      timestamp: 'asc',
    },
  });
  return message;
};
export const postMessage = async (
  content: string,
  userId: string,
  roomId: string,
  role: string
) => {
  const messages = await prismaClient.message.create({
    data: {
      content,
      userId,
      roomId,
      timestamp: new Date(),
      role,
    },
  });
  return messages;
};
