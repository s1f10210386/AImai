import SendIcon from '@mui/icons-material/Send';
import { useState } from 'react';
import styles from './index.module.css';
const Chat = () => {
  // const openai = new OpenAI({
  //   apiKey: process.env.NEXT_PUBLIC_OPENAI_KEY,

  //   dangerouslyAllowBrowser: true,
  // });

  const messages = [
    { sender: 'user', content: 'ぴーーーーん' },
    { semder: 'bot', content: '私はカウンセラーです！どうかしましたか？' },
    { sender: 'user', content: 'つらいよおおおお' },
    { semder: 'bot', content: '詳しく聞かせてください！何がつらいんですか' },
  ];

  const [inputMessage, setInputMessage] = useState<string>('');
  // const gpt3Response = async () => {
  //   const response = await openai.chat.completions.create({
  //     messages: [{ role: 'user', content: '眠いです' }],
  //     model: 'gpt-3.5-turbo',
  //   });
  //   console.log(response);
  // };

  // gpt3Response();

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
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              // 修正: 比較演算子を使用
              sendMessage();
            }
          }}
        />

        <button className={styles.button}>
          <SendIcon />
        </button>
      </div>
    </div>
  );
};

export default Chat;
