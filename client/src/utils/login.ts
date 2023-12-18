import { signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import type { SubmitHandler } from 'react-hook-form';
import { auth } from './firebase';

type FormValues = {
  email: string;
  password: string;
};
export const signInWithEmail = () => {
  const router = useRouter();
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    console.log('data', data);
    await signInWithEmailAndPassword(auth, data.email, data.password).then((userCredentiall) => {
      router.push('/');
    });
  };
};
// import { GithubAuthProvider, signInWithPopup } from 'firebase/auth';
// import { createAuth } from 'src/utils/firebase';
// import { returnNull } from './returnNull';

// export const loginWithGitHub = async () => {
//   const ghProvider = new GithubAuthProvider();
//   ghProvider.addScope('read:user');

//   await signInWithPopup(createAuth(), ghProvider).catch(returnNull);
// };

// export const logout = async () => {
//   await createAuth().signOut();
// };
