import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import { IconButton } from '@mui/material';
import { useRouter } from 'next/navigation';
import { auth } from 'src/utils/firebase';
import styles from './index.module.css';

const MenuBar = () => {
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
      <div>{userEmail}</div>
      <IconButton color="primary" sx={{ marginLeft: 'auto' }}>
        <CalendarMonthIcon sx={{ fontSize: '30px' }} />
      </IconButton>

      <IconButton color="primary" sx={{ marginRight: '5px' }}>
        <SettingsIcon sx={{ fontSize: '30px' }} />
      </IconButton>
    </div>
  );
};

export default MenuBar;
