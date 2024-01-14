import { useState } from 'react';
import styles from './index.module.css';

const SideBar = () => {
  const [isClickable, setIsClickable] = useState(true);
  return (
    <div className={styles.container}>
      <div style={{ flexGrow: 1 }}>
        <div
          className={isClickable ? styles.createroom : styles.nocreateroom}
          onClick={() => setIsClickable(!isClickable)}
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
