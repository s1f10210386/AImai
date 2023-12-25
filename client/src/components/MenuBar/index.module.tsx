import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LogoutIcon from '@mui/icons-material/Logout';
import { IconButton } from '@mui/material';
import styles from './index.module.css';
const MenuBar = () => {
  return (
    <div className={styles.container}>
      <div className={styles.button} />
      <IconButton color="primary" sx={{ marginLeft: '10px' }}>
        <LogoutIcon sx={{ fontSize: '30px' }} />
      </IconButton>

      <IconButton color="primary" sx={{ marginLeft: 'auto', marginRight: '10px' }}>
        <CalendarMonthIcon sx={{ fontSize: '30px' }} />
      </IconButton>
    </div>
  );
};

export default MenuBar;
