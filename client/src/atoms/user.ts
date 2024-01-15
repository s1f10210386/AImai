import type { UserModel } from 'commonTypesWithClient/models';
import { atom } from 'jotai';
import type { Room } from 'src/components/SideBar/index.page';
export const userAtom = atom<UserModel | null>(null);

export const roomAtom = atom<Room[]>([]);

export const roomIdAtom = atom<string>('');
export const roomNameAtom = atom<string>('');
