import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import SendIcon from '@mui/icons-material/Send';
import { Button, TextField } from '@mui/material';
import styles from './index.module.css';

interface ProfileProps {
  onCancelClick: () => void;
  onSaveClick: () => void;
}

const Profile = ({ onCancelClick, onSaveClick }: ProfileProps) => {
  return (
    <div className={styles.popup}>
      <h1 style={{ fontSize: '20px', fontWeight: 'bold', margin: '20px 0px 0px 20px' }}>
        あなた好みの相談相手に
      </h1>
      <div className={styles.popupcontent}>
        <TextField
          label="どんなAIにする？(100字以内)"
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
            sx={{ backgroundColor: '#9D9087', marginRight: '20px' }}
            onClick={onCancelClick}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            type="submit"
            sx={{ backgroundColor: '#90caf9' }}
            endIcon={<SendIcon />}
            onClick={onSaveClick}
          >
            SAVE
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
