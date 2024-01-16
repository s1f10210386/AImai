/* eslint-disable complexity */
import { useAtom } from 'jotai';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Calendar from 'src/components/Calendar/index.page';
import Chat from 'src/components/Chat/index.page';
import { Loading } from 'src/components/Loading/Loading';
import MenuBar from 'src/components/MenuBar/index.page';
import Profile from 'src/components/Profile/index.page';
import SideBar from 'src/components/SideBar/index.page';
import { userAtom } from '../atoms/user';
import styles from './index.module.css';

const Home = () => {
  const [user] = useAtom(userAtom);
  const router = useRouter();
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isSettingOpen, setIsSettingOpen] = useState<boolean>(false);
  const [isResult, setIsResult] = useState<boolean>(false);
  const [isLoding, setIsLoading] = useState<boolean>(false);

  //ログイン状態じゃないならローディングしてリダイレクト
  if (!user) {
    router.push('/login');
    return <Loading visible />;
  }

  const toggleDone = () => {
    setIsLoading(true);
    setIsResult(!isResult);

    setTimeout(() => {
      setIsLoading(false);
    }, 5000); // 5000ミリ秒 = 5秒

    setTimeout(() => {
      setIsResult(false);
    }, 8000);
  };

  const toggleCalendar = () => {
    setIsCalendarOpen(!isCalendarOpen);
  };

  const toggleSetting = () => {
    setIsSettingOpen(!isSettingOpen);
  };

  const toggleSave = () => {
    setIsLoading(true);

    setTimeout(() => {
      setIsSettingOpen(!isSettingOpen);
      setIsLoading(false);
    }, 2000); // 5000ミリ秒 = 5秒
  };

  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <SideBar />
      </div>
      <div className={styles.main} style={{ width: '120vh' }}>
        <div className={styles.menu}>
          <MenuBar
            onDoneClick={toggleDone}
            onCalendarClick={toggleCalendar}
            onSettingsClick={toggleSetting}
          />
        </div>

        <div className={styles.chat}>
          <Chat />
        </div>
        {isLoding && <Loading visible />}
        {isResult && <div className={styles.result}>a</div>}
        {isCalendarOpen && (
          <div className={styles.calendar}>
            <Calendar />
          </div>
        )}
        {isSettingOpen && (
          <div className={styles.setting}>
            <Profile onCancelClick={toggleSetting} onSaveClick={toggleSave} />
            {isLoding && <Loading visible />}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
