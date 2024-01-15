import { useState } from 'react';
import { apiClient } from 'src/utils/apiClient';
import { auth } from 'src/utils/firebase';
import { returnNull } from 'src/utils/returnNull';
import styles from './index.module.css';

const SideBar = () => {
  const [isClickable, setIsClickable] = useState(true);
  const user = auth.currentUser?.uid;
  console.log('User', user);

  const createRoom = async () => {
    if (user === undefined) return;
    await apiClient.room.post({ body: { userId: user } }).catch(returnNull);
    setIsClickable(!isClickable);
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
          <li className={styles.rooms}>12/24</li>
          <li className={styles.rooms}>12/25</li>
        </ul>
      </div>
    </div>
  );
};

export default SideBar;