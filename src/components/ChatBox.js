import React, { useState, useEffect, useRef } from "react";
import "./ChatBox.css";

function ChatBox() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const chatEndRef = useRef(null);

  // Scroll to bottom on new message
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Simulate incoming messages (fake WebSocket)
  useEffect(() => {
    const interval = setInterval(() => {
      const bots = ["Bot", "System"];
      const randomBot = bots[Math.floor(Math.random() * bots.length)];
      const replies = ["Hello!", "Ping!", "Working...", "Nice to meet you!"];
      const msg = {
        sender: randomBot,
        text: replies[Math.floor(Math.random() * replies.length)],
        time: new Date().toLocaleTimeString(),
      };
      setMessages(prev => [...prev, msg]);
    }, 15000); // every 15s
    return () => clearInterval(interval);
  }, []);

  const handleSend = () => {
    if (input.trim() === "") return;
    const newMessage = {
      sender: "You",
      text: input.trim(),
      time: new Date().toLocaleTimeString(),
    };
    setMessages([...messages, newMessage]);
    setInput("");
  };

  return (
    <div className="chat-container">
      <div className="chat-box">
        {messages.map((msg, idx) => (
          <div key={idx} className={`message ${msg.sender === "You" ? "user" : "bot"}`}>
            <div className="msg-info">
              <strong>{msg.sender}</strong> <span>{msg.time}</span>
            </div>
            <div>{msg.text}</div>
          </div>
        ))}
        <div ref={chatEndRef}></div>
      </div>
      <div className="input-area">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyPress={e => e.key === "Enter" && handleSend()}
          placeholder="Type a message..."
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
}

export default ChatBox;
