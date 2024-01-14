import { useAtom } from 'jotai';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Calendar from 'src/components/Calendar/index.page';
import Chat from 'src/components/Chat/index.page';
import { Loading } from 'src/components/Loading/Loading';
import MenuBar from 'src/components/MenuBar/index.page';
import SideBar from 'src/components/SideBar/index.page';
import { userAtom } from '../atoms/user';
import styles from './index.module.css';

const Home = () => {
  const [user] = useAtom(userAtom);
  const router = useRouter();
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  //ログイン状態じゃないならローディングしてリダイレクト
  if (!user) {
    router.push('/login');
    return <Loading visible />;
  }

  const toggleCalendar = () => {
    setIsCalendarOpen(!isCalendarOpen);
  };

  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <SideBar />
      </div>
      <div className={styles.main} style={{ width: '120vh' }}>
        <div className={styles.menu}>
          <MenuBar onCalendarClick={toggleCalendar} />
        </div>

        <div className={styles.chat}>
          <Chat />
        </div>
        {isCalendarOpen && (
          <div className={styles.calendar}>
            <Calendar />
          </div>
        )}
        {/* <div className={styles.calendar}>{isCalendarOpen && <Calendar />}</div> */}
      </div>
    </div>
  );
};

export default Home;
