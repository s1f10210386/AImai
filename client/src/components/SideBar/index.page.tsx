import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { roomIdAtom } from 'src/atoms/user';
import { apiClient } from 'src/utils/apiClient';
import { auth } from 'src/utils/firebase';
import { returnNull } from 'src/utils/returnNull';
import styles from './index.module.css';

export type Room = {
  id: string;
  userId: string;
  timestamp: Date;
};

const SideBar = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [roomId, setRoomId] = useAtom(roomIdAtom);
  const [isClickable, setIsClickable] = useState(true);
  const user = auth.currentUser?.uid;
  // console.log('User', user);

  const fetchRooms = async () => {
    if (user === undefined) return;
    const roomList = await apiClient.room.$get({ query: { userId: user } }).catch(returnNull);
    if (roomList !== null) setRooms(roomList);
  };

  useEffect(() => {
    fetchRooms();
  });

  const hoge = (roomId: string) => {
    console.log('hoge', roomId);
    setRoomId(roomId);
  };

  const createRoom = async () => {
    if (user === undefined) return;
    await apiClient.room.post({ body: { userId: user } }).catch(returnNull);
    setIsClickable(!isClickable);

    await fetchRooms();
  };

  return (
    <div className={styles.container}>
      <div style={{ flexGrow: 1 }}>
        <div
          className={isClickable ? styles.createroom : styles.nocreateroom}
          onClick={() => createRoom()}
        >
          <span style={{ color: 'white', fontSize: '20px' }}>+</span>
          <h1 style={{ fontWeight: '600' }}>New Day</h1>
        </div>
        <ul>
          {rooms.map((room) => (
            <li className={styles.rooms} key={room.id} onClick={() => hoge(room.id)}>
              {room.id}
            </li>
          ))}

          <li className={styles.rooms}>12/24</li>
          <li className={styles.rooms}>12/25</li>
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
