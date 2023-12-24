import OpenAI from 'openai';
import styles from './index.module.css';

const Chat = () => {
  const openai = new OpenAI({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_KEY,
    baseURL: 'https://api.openai.iniad.org/api/v1',
    dangerouslyAllowBrowser: true,
  });

  const messages = [
    { sender: 'user', content: 'ぴーーーーん' },
    { semder: 'bot', content: '私はカウンセラーです！どうかしましたか？' },
    { sender: 'user', content: 'つらいよおおおお' },
    { semder: 'bot', content: '詳しく聞かせてください！何がつらいんですか' },
  ];

  return (
    <div className={styles.container}>
      <div
        style={{
          color: 'black',
          flexGrow: '1',
          overflowY: 'auto',
          fontWeight: '600',
          marginBottom: '16px',
        }}
      >
        {messages.map((message, index) => (
          <div
            key={index}
            className={message.sender === 'user' ? styles.textRight : styles.textLeft}
          >
            <div className={message.sender === 'user' ? styles.userMessage : styles.botsMessage}>
              <p style={{ color: 'black' }}>{message.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Chat;
