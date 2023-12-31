import { signInWithEmailAndPassword } from 'firebase/auth';
import { useAtom } from 'jotai';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { userAtom } from 'src/atoms/user';
import { auth } from 'src/utils/firebase';
import { useLoading } from '../@hooks/useLoading';
import styles from './index.module.css';
type FormValues = {
  email: string;
  password: string;
};
const Login = () => {
  const [user, setUser] = useAtom(userAtom);
  const { loadingElm, addLoading, removeLoading } = useLoading();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const signInWithEmail: SubmitHandler<FormValues> = async (data) => {
    console.log('data', data);

    addLoading();
    await signInWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredentiall) => {
        const uid = userCredentiall.user.uid;
        const email = userCredentiall.user.email;

        const user = { id: uid, email, displayName: '', photoURL: '' };

        setUser(user);
        router.push('/');
      })

      .catch((error) => {
        // alert(error);
        // Firebaseライブラリが自動的に既存メアドだったらエラー吐いてくれるけど分かりずらいから自分で作った
        if (error.code === 'auth/invalid-login-credentials') {
          alert('メールアドレスまたはパスワードが間違っています。');
        }
      });
    removeLoading();
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit(signInWithEmail)} className={styles.form}>
        <h1 className={styles.title}>ログイン</h1>

        <div style={{ marginBottom: '16px' }}>
          <label className={styles.label}>Email</label>
          {/*以下react-hook-formめちゃ便利*/}
          <input
            {...register('email', {
              required: 'メールアドレスを入力してください',
              pattern: {
                value: /^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/,
                message: '正しいメールアドレスを入力してください',
              },
            })}
            type="text"
            className={styles.input}
          />
          {errors.email && <span className={styles.errorMsg}>{errors.email.message}</span>}
        </div>

        <div style={{ marginTop: '16px' }}>
          <label className={styles.label}>Password</label>
          <input
            {...register('password', {
              required: 'パスワードを入力してください',
              minLength: {
                value: 6,
                message: '6文字以上入力してください',
              },
            })}
            type="Password"
            className={styles.input}
          />
          {errors.password && <span className={styles.errorMsg}>{errors.password.message}</span>}
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button type="submit" className={styles.submitButton}>
            ログイン
          </button>
        </div>
        <div style={{ marginTop: '16px' }}>
          <span style={{ fontSize: '14px', lineHeight: '20px' }}>新規登録の方はこちらから</span>
          <Link href={'/register'} className={styles.linkText}>
            新規登録ページへ
          </Link>
        </div>
      </form>
      {loadingElm}
    </div>
  );
};

export default Login;
