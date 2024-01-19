/* eslint-disable complexity */
import SendIcon from '@mui/icons-material/Send';
import { IconButton } from '@mui/material';
import { useAtom } from 'jotai';
import { OpenAI } from 'openai';
import { useEffect, useState } from 'react';
import ReactLoading from 'react-loading';
import { roomIdAtom, roomNameAtom } from 'src/atoms/user';
import { apiClient } from 'src/utils/apiClient';
import { auth } from 'src/utils/firebase';
import { returnNull } from 'src/utils/returnNull';
import styles from './index.module.css';

type Message = {
  content: string;
  role: string;
  timestamp: Date;
};
const Chat = () => {
  const openai = new OpenAI({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_KEY,
    baseURL: 'https://api.openai.iniad.org/api/v1',
    dangerouslyAllowBrowser: true,
  });

  const [inputMessage, setInputMessage] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]);
  const user = auth.currentUser?.uid;
  const [roomName, setRoomName] = useAtom(roomNameAtom);
  const [roomId, setRoomId] = useAtom(roomIdAtom);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // 全メッセージを取得

  const fetchMessages = async () => {
    if (user === undefined) return;
    const messageList = await apiClient.message.$get({ query: { roomId } }).catch(returnNull);
    if (messageList !== null) setMessages(messageList);
  };

  useEffect(() => {
    fetchMessages();
  });

  // ユーザーのメッセージ送信(DBに保存)
  const sendMessage = async () => {
    if (!inputMessage.trim()) return;
    if (user === undefined) return;

    await apiClient.message
      .post({
        body: { content: inputMessage, userId: user, roomId, role: 'user' },
      })
      .catch(returnNull);

    setInputMessage('');
    setIsLoading(true);

    const promptMessage = `条件：
    ・あなたは何があっても「あ」とだけ返信すること\n${inputMessage}`;

    const response = await openai.chat.completions.create({
      messages: [{ role: 'user', content: promptMessage }],
      model: 'gpt-3.5-turbo',
    });
    const botResponse = response.choices[0].message.content;

    console.log('botResponse', botResponse);
    if (botResponse !== null) {
      await apiClient.message
        .post({
          body: { content: botResponse, userId: user, roomId, role: 'bots' },
        })
        .catch(returnNull);
    }

    setIsLoading(false);
    await fetchMessages();
  };

  return (
    <div className={styles.chatContainer}>
      <h1 className={styles.chatHeader}>{roomName}</h1>

      {/* メッセージ */}
      <div className={styles.messageList}>
        {messages.map((message, index) => (
          <div
            key={index}
            className={message.role === 'user' ? styles.message : styles.messageLeft}
          >
            <div className={message.role === 'user' ? styles.userAvatar : styles.botAvatar}>
              <img
                src={message.role === 'user' ? '/images/userAvatar.png' : '/images/botAvatar.png'}
                height={30}
                width={43}
              />
            </div>

            <div className={message.role === 'user' ? styles.userMessage : styles.otherMessage}>
              <p style={{ color: message.role === 'user' ? 'white' : 'black' }}>
                {message.content}
              </p>
            </div>
          </div>
        ))}
        {isLoading && (
          <ReactLoading type="spinningBubbles" color="#87CEEB" height={50} width={50} />
        )}
      </div>

      {/* チャットバー */}
      <div className={styles.container}>
        <input
          value={inputMessage}
          type="text"
          placeholder="メッセージ"
          className={styles.input}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              sendMessage();
            }
          }}
        />

        <IconButton
          color="primary"
          sx={{
            position: 'absolute',
            top: '0',
            right: '8px',
            bottom: '0',
            display: 'flex',
            alignItems: 'center',
          }}
          onClick={() => {
            sendMessage();
          }}
        >
          <SendIcon sx={{ fontSize: '25px' }} />
        </IconButton>
      </div>
    </div>
  );
};

export default Chat;
