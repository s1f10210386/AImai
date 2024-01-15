import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import SendIcon from '@mui/icons-material/Send';
import { Button, TextField } from '@mui/material';
import styles from './index.module.css';

const Profile = () => {
  return (
    <div className={styles.popup}>
      <h1 style={{ fontSize: '20px', fontWeight: 'bold', margin: '20px 0px 0px 20px' }}>
        あなた好みの相談相手に
      </h1>
      <div className={styles.popupcontent}>
        <TextField
          label="どんなAIにする？"
          multiline
          rows={10}
          variant="outlined"
          style={{ marginTop: '0px' }}
          InputProps={{
            sx: {
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: '#90caf9',
              },
            },
          }}
        />
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end', // 子要素を右寄せにする
            width: '100%',
          }}
        >
          <Button
            variant="contained"
            startIcon={<KeyboardReturnIcon />}
            sx={{ backgroundColor: '#FFCC80', marginRight: '20px' }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            type="submit"
            sx={{ backgroundColor: '#90caf9' }}
            endIcon={<SendIcon />}
          >
            SAVE
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
