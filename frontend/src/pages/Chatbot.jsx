import { useState, useRef, useEffect } from "react";
import axios from "axios";

function Chatbot() {

  const [chatInput, setChatInput] = useState("");
  const [loading, setLoading] = useState(false);
  

  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text: "Hello! Ask me anything about fake reviews."
    }
  ]);
  const chatEndRef = useRef(null);

useEffect(() => {

  chatEndRef.current?.scrollIntoView({
    behavior: "smooth"
  });

}, [messages]);

  const sendMessage = async () => {

    if (!chatInput) return;
    setLoading(true);

    const userMessage = {
      sender: "user",
      text: chatInput
    };

    setMessages((prev) => [
      ...prev,
      userMessage
    ]);

    try {

      const response = await axios.post(
        "http://127.0.0.1:8000/chat",
        {
          message: chatInput
        }
      );

      const aiMessage = {
        sender: "ai",
        text: response.data.reply
      };

      setMessages((prev) => [
        ...prev,
        aiMessage
      ]);
      setLoading(false);

    } catch (error) {

      console.error(error);
      setLoading(false);

      const errorMessage = {
        sender: "ai",
        text: "Failed to connect to AI backend."
      };

      setMessages((prev) => [
        ...prev,
        errorMessage
      ]);

    }

    setChatInput("");
  };

  return (
  <div className="flex flex-col h-screen bg-slate-900 text-white p-6">

    <h1 className="text-3xl font-bold text-blue-400 mb-6">
      AI Chatbot
    </h1>

    {/* Chat Messages */}
    <div className="flex-1 overflow-y-auto bg-slate-800 rounded-2xl p-4 shadow-lg space-y-4">

      {messages.map((msg, index) => (

        <div
          key={index}
          className={`flex ${
            msg.sender === "user"
              ? "justify-end"
              : "justify-start"
          }`}
        >

          <div
            className={`max-w-[70%] p-4 rounded-2xl shadow-md ${
              msg.sender === "user"
                ? "bg-blue-500"
                : "bg-slate-700"
            }`}
          >
            {msg.text}
          </div>

        </div>

      ))}

      {loading && (
        <div className="text-slate-400 animate-pulse">
          TrustReview AI is typing...
        </div>
      )}
      <div ref={chatEndRef}></div>

    </div>

    {/* Input Section */}
    <div className="flex gap-4 mt-4">

      <input
        type="text"
        value={chatInput}
        onChange={(e) => setChatInput(e.target.value)}
        placeholder="Ask TrustReview AI..."
        className="flex-1 bg-slate-800 text-white p-4 rounded-xl outline-none border border-slate-700 focus:border-blue-500"
      />

      <button
        onClick={sendMessage}
        className="bg-blue-500 hover:bg-blue-600 transition-all duration-300 px-6 rounded-xl font-semibold"
      >
        Send
      </button>

    </div>

  </div>
);
}

export default Chatbot;