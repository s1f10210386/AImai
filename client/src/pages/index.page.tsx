import type { TaskModel } from 'commonTypesWithClient/models';
import { useAtom } from 'jotai';
import type { ChangeEvent, FormEvent } from 'react';
import { useEffect, useState } from 'react';
// import { Loading } from 'src/components/Loading/Loading';
import { useRouter } from 'next/navigation';
import { Loading } from 'src/components/Loading/Loading';
import { BasicHeader } from 'src/pages/@components/BasicHeader/BasicHeader';
import { apiClient } from 'src/utils/apiClient';
import { returnNull } from 'src/utils/returnNull';
import { userAtom } from '../atoms/user';
import styles from './index.module.css';

const Home = () => {
  const [user] = useAtom(userAtom);
  const [tasks, setTasks] = useState<TaskModel[]>();
  const [label, setLabel] = useState('');

  const router = useRouter();
  const inputLabel = (e: ChangeEvent<HTMLInputElement>) => {
    setLabel(e.target.value);
  };

  // if (!user) {
  //   router.push('/login');
  // }

  const fetchTasks = async () => {
    const tasks = await apiClient.tasks.$get().catch(returnNull);

    if (tasks !== null) setTasks(tasks);
  };
  const createTask = async (e: FormEvent) => {
    e.preventDefault();
    if (!label) return;

    await apiClient.tasks.post({ body: { label } }).catch(returnNull);
    setLabel('');
    await fetchTasks();
  };
  const toggleDone = async (task: TaskModel) => {
    await apiClient.tasks
      ._taskId(task.id)
      .patch({ body: { done: !task.done } })
      .catch(returnNull);
    await fetchTasks();
  };
  const deleteTask = async (task: TaskModel) => {
    await apiClient.tasks._taskId(task.id).delete().catch(returnNull);
    await fetchTasks();
  };

  useEffect(() => {
    if (!user) return;

    fetchTasks();
  }, [user]);

  console.log('user', user);

  //ログイン状態じゃないならローディングしてリダイレクト
  if (!user) {
    router.push('/login');
    return <Loading visible />;
  }

  return (
    <>
      <BasicHeader user={user} />
      <div className={styles.title} style={{ marginTop: '160px' }}>
        AImai
      </div>
    </>
  );
};

export default Home;
