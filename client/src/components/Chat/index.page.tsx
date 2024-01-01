import SendIcon from '@mui/icons-material/Send';
import { IconButton } from '@mui/material';
import OpenAI from 'openai';
import { useState } from 'react';
import styles from './index.module.css';
const Chat = () => {
  const openai = new OpenAI({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_KEY,

    dangerouslyAllowBrowser: true,
  });

  const [inputMessage, setInputMessage] = useState<string>('');

  const sendMessage = async () => {
    const gptResponse = async () => {
      const response = await openai.chat.completions.create({
        messages: [{ role: 'user', content: inputMessage }],
        model: 'gpt-3.5-turbo',
      });
      const botResponse = response.choices[0].message.content;

      await apiClient;
    };
  };

  const messages = [
    { sender: 'user', content: 'ぴーーーーん' },
    { semder: 'bot', content: '私はカウンセラーです！どうかしましたか？' },
    { sender: 'user', content: 'つらいよおおおお' },
    { semder: 'bot', content: '詳しく聞かせてください！何がつらいんですか' },
  ];

  return (
    <div className={styles.chatContainer}>
      <h1 className={styles.chatHeader}>12/25</h1>

      {/* メッセージ */}
      <div className={styles.messageList}>
        {messages.map((message, index) => (
          <div
            key={index}
            className={message.sender === 'user' ? styles.message : styles.messageLeft}
          >
            <div className={message.sender === 'user' ? styles.userAvatar : styles.botAvatar}>
              〇
            </div>

            <div className={message.sender === 'user' ? styles.userMessage : styles.otherMessage}>
              <p style={{ color: message.sender === 'user' ? 'white' : 'black' }}>
                {message.content}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* チャットバー */}
      <div className={styles.container}>
        <input
          value={inputMessage}
          type="text"
          placeholder="メッセージ"
          className={styles.input}
          onChange={(e) => setInputMessage(e.target.value)}
          // onKeyDown={(e) => {
          //   if (e.key === 'Enter') {
          //     sendMessage();
          //   }
          // }}
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
            gptResponse();
          }}
        >
          <SendIcon sx={{ fontSize: '25px' }} />
        </IconButton>
      </div>
    </div>
  );
};

export default Chat;
