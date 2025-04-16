import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { useChat } from '../hooks/useChat';

const ChatPage = () => {
  const { id } = useParams();
  const { selectConversation, loadMessages, postNewMessage } = useChat();
  const [input, setInput] = useState('');
  const currentUser = useSelector((state: RootState) => state.auth.user?.username || 'guest');
  const { activeConversation, messages } = useSelector((state: RootState) => state.chat);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  console.log(activeConversation, "conversations");

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    selectConversation(id || '0');
    loadMessages(id || '0')
  }, [id]);

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const handleSend = async (e: React.KeyboardEvent<HTMLInputElement> | React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (!input.trim()) return;

    const newMessage = {
      conversationId: id || '0',
      sender: currentUser,
      content: input,
      timestamp: new Date().toISOString(),
    };

    postNewMessage(newMessage);
    setInput('');
  };

  return (
    <div className="flex flex-col h-screen bg-white">
      <div className="p-4 border-b bg-white shadow-sm">
        <h2 className="text-lg font-semibold text-gray-800">
          #{activeConversation?.name || 'Loading...'}
        </h2>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-6 bg-gray-50 space-y-4">
        {messages.map((msg: {
          id?: string;
          conversationId: string;
          sender: string;
          content: string;
          timestamp: string;
        }) => (
          <div
            key={msg.id}
            className={`flex ${msg.sender === currentUser ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs md:max-w-md px-4 py-2 rounded-lg text-sm shadow-sm ${msg.sender === currentUser
                ? 'bg-purple-600 text-white rounded-br-none'
                : 'bg-white border rounded-bl-none'
                }`}
            >
              <p>{msg.content}</p>
              <div className="text-[11px] text-gray-400 mt-1 text-right">
                {formatTime(msg.timestamp)}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 border-t bg-white">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend(e)}
            placeholder="Type your message..."
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <button
            onClick={handleSend}
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
