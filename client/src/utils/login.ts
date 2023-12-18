import { GithubAuthProvider } from 'firebase/auth';
// import { createAuth } from 'src/utils/firebase';

export const loginWithGitHub = async () => {
  const ghProvider = new GithubAuthProvider();
  ghProvider.addScope('read:user');

  // await signInWithPopup(createAuth(), ghProvider).catch(returnNull);
};

// export const logout = async () => {
//   await createAuth().signOut();
// };
