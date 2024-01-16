import { prismaClient } from '$/service/prismaClient';

export const fetchRoom = async (userId: string) => {
  const message = await prismaClient.room.findMany({
    where: {
      userId,
    },
    orderBy: {
      timestamp: 'desc', // ここで'createdAt'を降順に指定
    },
  });
  return message;
};

export const createRoom = async (userId: string) => {
  const room = await prismaClient.room.create({
    data: {
      userId,
      timestamp: new Date(),
    },
  });
  return room;
};
