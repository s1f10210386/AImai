import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { roomAtom, roomIdAtom, roomNameAtom } from 'src/atoms/user';
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
  const [rooms, setRooms] = useAtom(roomAtom);
  const [roomId, setRoomId] = useAtom(roomIdAtom);
  const [roomName, setRoomName] = useAtom(roomNameAtom);
  const [isClickable, setIsClickable] = useState(true);
  const user = auth.currentUser?.uid;
  // console.log('User', user);

  // 全ルームを取得
  const fetchRooms = async () => {
    if (user === undefined) return;
    const roomList = await apiClient.room.$get({ query: { userId: user } }).catch(returnNull);
    if (roomList !== null) setRooms(roomList);
  };

  useEffect(() => {
    fetchRooms();
  });

  const handleClick = (timestamp: string, roomId: string) => {
    setRoomName(timestamp);
    setRoomId(roomId);
  };

  const createRoom = async () => {
    if (user === undefined) return;
    await apiClient.room.post({ body: { userId: user } }).catch(returnNull);
    setIsClickable(!isClickable);

    await fetchRooms();
  };

  //rooms取得してきた日付のフォーマットを変更
  const formattedRooms = rooms.map((room) => {
    const date = new Date(room.timestamp);
    const newtimestamp = `${date.getMonth() + 1}/${date.getDate()}`;
    return { ...room, newtimestamp };
  });

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
          {formattedRooms.map((room) => (
            <li
              className={styles.rooms}
              key={room.id}
              onClick={() => handleClick(room.newtimestamp, room.id)}
            >
              {room.newtimestamp}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
