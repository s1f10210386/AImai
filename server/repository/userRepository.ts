import { prismaClient } from '$/service/prismaClient';

export const createUser = async (id: string, email: string) => {
  const user = await prismaClient.user.create({
    data: {
      id,
      email,
    },
  });
  return user;
};
