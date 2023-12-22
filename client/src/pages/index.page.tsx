import { useAtom } from 'jotai';
import { useRouter } from 'next/navigation';
import Chat from 'src/components/Chat/index.module';
import { Loading } from 'src/components/Loading/Loading';
import MenuBar from 'src/components/MenuBar/index.module';
import { userAtom } from '../atoms/user';
import styles from './index.module.css';

const Home = () => {
  const [user] = useAtom(userAtom);
  const router = useRouter();

  //ログイン状態じゃないならローディングしてリダイレクト
  if (!user) {
    router.push('/login');
    return <Loading visible />;
  }

  return (
    <div className={styles.container}>
      <div className={styles.main} style={{ width: '120vh' }}>
        <div className={styles.three}>
          <MenuBar />
        </div>
        <div className={styles.chat}>
          <Chat />
        </div>
      </div>
    </div>
  );
};

export default Home;
