/* eslint-disable no-unused-vars */
import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Send, Bot, User, X, MessageCircle } from "lucide-react";
import { postChat, resetChat } from "../../redux/User/ChatAI/chatAiSlice";
import toast from "react-hot-toast";

const ChatAI = () => {
  const dispatch = useDispatch();
  const { messages, loading, error, currentResponse } = useSelector(
    (state) => state.postChat
  );
  const { user } = useSelector((state) => state.account);

  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const messagesEndRef = useRef(null);

  // Auto scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory]);

  // Update chat history when receiving response
  useEffect(() => {
    if (currentResponse && !loading) {
      // Parse response - API trả về object {reply: "..."}
      const replyContent =
        typeof currentResponse === "object"
          ? currentResponse.reply || JSON.stringify(currentResponse)
          : currentResponse;

      setChatHistory((prev) => [
        ...prev,
        {
          role: "assistant",
          content: replyContent,
          timestamp: new Date().toISOString(),
        },
      ]);
    }
  }, [currentResponse, loading]);

  const handleSendMessage = () => {
    if (!inputMessage.trim()) {
      toast.error("Vui lòng nhập tin nhắn!");
      return;
    }

    if (!user) {
      toast.error("Vui lòng đăng nhập để sử dụng chat AI!");
      return;
    }

    // Add user message to history
    const userMessage = {
      role: "user",
      content: inputMessage,
      timestamp: new Date().toISOString(),
    };

    setChatHistory((prev) => [...prev, userMessage]);

    // Send to API
    dispatch(postChat(inputMessage));
    setInputMessage("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleClearChat = () => {
    setChatHistory([]);
    dispatch(resetChat());
    toast.success("Đã xóa lịch sử chat!");
  };

  return (
    <>
      {/* Chat Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-amber-600 to-orange-600 text-white p-4 rounded-full shadow-2xl hover:shadow-amber-500/50 transition-all duration-300 hover:scale-110 group"
        >
          <MessageCircle className="w-6 h-6 group-hover:rotate-12 transition-transform" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
            AI
          </span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-96 h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-amber-200">
          {/* Header */}
          <div className="bg-gradient-to-r from-amber-600 to-orange-600 text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <Bot className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg">Healink AI</h3>
                <p className="text-xs text-amber-100">
                  Trợ lý sức khỏe tinh thần
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-white/20 p-2 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-amber-50 to-orange-50">
            {chatHistory.length === 0 ? (
              <div className="text-center text-gray-500 mt-20">
                <Bot className="w-16 h-16 mx-auto mb-4 text-amber-500" />
                <p className="text-lg font-semibold mb-2">Xin chào! 👋</p>
                <p className="text-sm">
                  Tôi là trợ lý AI của Healink.
                  <br />
                  Hãy chia sẻ với tôi những điều bạn đang nghĩ!
                </p>
              </div>
            ) : (
              chatHistory.map((msg, index) => (
                <div
                  key={index}
                  className={`flex gap-3 ${
                    msg.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  {msg.role === "assistant" && (
                    <div className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <Bot className="w-5 h-5 text-white" />
                    </div>
                  )}
                  <div
                    className={`max-w-[75%] p-3 rounded-2xl ${
                      msg.role === "user"
                        ? "bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-br-none"
                        : "bg-white text-gray-800 rounded-bl-none shadow-md"
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                    <span className="text-xs opacity-70 mt-1 block">
                      {new Date(msg.timestamp).toLocaleTimeString("vi-VN", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                  {msg.role === "user" && (
                    <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <User className="w-5 h-5 text-white" />
                    </div>
                  )}
                </div>
              ))
            )}
            {loading && (
              <div className="flex gap-3 justify-start">
                <div className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div className="bg-white p-3 rounded-2xl rounded-bl-none shadow-md">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-amber-500 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-amber-500 rounded-full animate-bounce delay-100"></div>
                    <div className="w-2 h-2 bg-amber-500 rounded-full animate-bounce delay-200"></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 bg-white border-t border-amber-200">
            <div className="flex gap-2 items-end">
              <textarea
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Nhập tin nhắn..."
                className="flex-1 p-3 border border-amber-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none max-h-24"
                rows={1}
                disabled={loading}
              />
              <button
                onClick={handleSendMessage}
                disabled={loading || !inputMessage.trim()}
                className={`p-3 rounded-xl transition-all ${
                  loading || !inputMessage.trim()
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-gradient-to-r from-amber-600 to-orange-600 hover:shadow-lg hover:scale-105"
                } text-white`}
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
            {chatHistory.length > 0 && (
              <button
                onClick={handleClearChat}
                className="text-xs text-amber-600 hover:text-amber-700 mt-2 underline"
              >
                Xóa lịch sử chat
              </button>
            )}
          </div>
        </div>
      )}

      <style>{`
        @keyframes bounce {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-5px);
          }
        }
        .animate-bounce {
          animation: bounce 1s infinite;
        }
        .delay-100 {
          animation-delay: 0.1s;
        }
        .delay-200 {
          animation-delay: 0.2s;
        }
      `}</style>
    </>
  );
};

export default ChatAI;
