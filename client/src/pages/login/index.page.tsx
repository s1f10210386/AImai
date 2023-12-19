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

  console.log('User', user);

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
          alert('そのようなユーザーは存在しません');
        }
      });
    removeLoading();
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit(signInWithEmail)} className={styles.main}>
        <h1 className="mb-4 text-2xl text-gray-700 font-medium">ログイン</h1>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">Email</label>
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
            className="mt-1 border-2 rounded-md w-full p-2"
          />
          {errors.email && <span className="text-red-600 text-sm">{errors.email.message}</span>}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">Password</label>
          <input
            {...register('password', {
              required: 'パスワードを入力してください',
              minLength: {
                value: 6,
                message: '6文字以上入力してください',
              },
            })}
            type="Password"
            className="mt-1 border-2 rounded-md w-full p-2"
          />
          {errors.password && (
            <span className="text-red-600 text-sm">{errors.password.message}</span>
          )}
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700"
          >
            ログイン
          </button>
        </div>
        <div className="mt-4">
          <span className="text-gray-600 text-sm">新規登録の方はこちらから</span>
          <Link
            href={'/register'}
            className="text-blue-500 text-sm font-bold ml-1 hover:text-blue-700"
          >
            新規登録ページへ
          </Link>
        </div>
      </form>
      {loadingElm}
    </div>
  );
};

export default Login;
