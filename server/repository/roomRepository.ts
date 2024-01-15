import { prismaClient } from '$/service/prismaClient';

export const createRoom = async (userId: string) => {
  const room = await prismaClient.room.create({
    data: {
      userId,
    },
  });
  return room;
};
