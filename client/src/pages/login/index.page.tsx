import { APP_TITLE } from 'commonConstantsWithClient';
import { useRouter } from 'next/navigation';
import { GithubIcon } from 'src/components/icons/GithubIcon';
import { staticPath } from 'src/utils/$path';
import { loginWithGitHub } from 'src/utils/login';
import { useLoading } from '../@hooks/useLoading';
import styles from './index.module.css';

const Login = () => {
  const { loadingElm, addLoading, removeLoading } = useLoading();
  const router = useRouter();

  const login = async () => {
    addLoading();
    await loginWithGitHub();
    removeLoading();
    await router.push('/');
    console.log('aa');
  };

  return (
    <div
      className={styles.container}
      style={{ background: `center/cover url('${staticPath.images.odaiba_jpg}')` }}
    >
      <div className={styles.main}>
        <div className={styles.title}>{APP_TITLE}</div>
        <div style={{ marginTop: '16px' }} onClick={login}>
          <div className={styles.btn}>
            <GithubIcon size={18} fill="#fff" />
            <span>Login with GitHub</span>
          </div>
        </div>
      </div>
      {loadingElm}
    </div>
  );
};

export default Login;
