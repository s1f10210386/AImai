import { auth } from './firebase';

export const logout = async () => {
  await auth.signOut();
};
