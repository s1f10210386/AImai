import { createUserWithEmailAndPassword } from 'firebase/auth';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { apiClient } from 'src/utils/apiClient';
import { auth } from 'src/utils/firebase';
import { returnNull } from 'src/utils/returnNull';
import styles from './index.module.css';

type FormValues = {
  email: string;
  password: string;
};

const Register = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    await createUserWithEmailAndPassword(auth, data.email, data.password)
      .then(async (userCredential) => {
        // Signed in
        const user = userCredential.user.uid;
        const userEmail = userCredential.user.email;
        alert('登録が完了しました！ログインしてください');
        if (userEmail !== null) {
          await apiClient.user.post({ body: { id: user, email: userEmail } }).catch(returnNull);
          router.push('/login');
        }
      })

      .catch((error) => {
        //alert(error);
        if (error.code === 'auth/email-already-in-use') {
          alert('このメールアドレスはすでに使用されています。');
        }
      });
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <h1 className={styles.title}>新規登録</h1>

        {/* メールアドレス */}
        <div style={{ marginBottom: '16px' }}>
          <label className={styles.label}>Email</label>
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

        {/* パスワード */}
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

        {/* 新規登録 */}
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button type="submit" className={styles.submitButton}>
            新規登録
          </button>
        </div>

        <div style={{ marginTop: '16px' }}>
          <span style={{ fontSize: '14px', lineHeight: '20px' }}>
            既にアカウントをお持ちですか？
          </span>
          <Link href={'/login'} className={styles.linkText}>
            ログインページへ
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
