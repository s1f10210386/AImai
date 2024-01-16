import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import DoneIcon from '@mui/icons-material/Done';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import { IconButton } from '@mui/material';
import { useRouter } from 'next/navigation';
import { auth } from 'src/utils/firebase';
import styles from './index.module.css';

//MenuBarはカレンダーとか設定の詳しい情報に関心を持たないからprops受け渡し(関心の分離)
interface MenuBarProps {
  onCalendarClick: () => void;
  onSettingsClick: () => void;
  onDoneClick: () => void;
}

const MenuBar = ({ onCalendarClick, onSettingsClick, onDoneClick }: MenuBarProps) => {
  const router = useRouter();
  const userEmail = auth.currentUser?.email;

  const logout = () => {
    auth.signOut();
    router.push('/login');
  };

  return (
    <div className={styles.container}>
      <div className={styles.button} />
      <IconButton color="primary" sx={{ marginLeft: '5px' }} onClick={() => logout()}>
        <LogoutIcon sx={{ fontSize: '30px' }} />
      </IconButton>
      <div style={{ marginLeft: '5px' }}>ログイン中：{userEmail}</div>

      <IconButton color="primary" sx={{ marginLeft: 'auto', marginRight: '5px' }}>
        <DoneIcon sx={{ fontSize: '30px' }} onClick={onDoneClick} />
      </IconButton>

      <IconButton color="primary" sx={{ marginRight: '5px' }}>
        <CalendarMonthIcon sx={{ fontSize: '30px' }} onClick={onCalendarClick} />
      </IconButton>

      <IconButton color="primary" sx={{ marginRight: '5px' }}>
        <SettingsIcon sx={{ fontSize: '30px' }} onClick={onSettingsClick} />
      </IconButton>
    </div>
  );
};

export default MenuBar;
