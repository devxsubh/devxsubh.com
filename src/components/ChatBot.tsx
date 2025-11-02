"use client"

import { useState, useRef, useEffect } from "react"
import { Bot, Maximize2, RotateCcw, X, Send, MessageCircleMore } from "lucide-react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

const SUGGESTED_QUESTIONS = [
  "What technologies do you work with?",
  "Tell me about your recent projects",
  "How can I contact you for work?",
  "What is your experience with AI/ML?",
  "Can you tell me about your blockchain projects?",
  "What services do you offer?",
  "Tell me about your education background",
  "What are your strongest programming skills?",
]

const FLOATING_PARTICLES = Array.from({ length: 15 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 4 + 2,
  speed: Math.random() * 2 + 1,
}))

function filterGeminiResponse(text: string): string {
  return text
    .split("\n")
    .filter((line) => line.trim() && !/^start/i.test(line) && !/^stop/i.test(line))
    .join("\n")
}

export default function ChatBot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      id: 1,
      from: "bot",
      text: `Hi! I'm Subham's AI assistant. I can tell you about my work, experience, skills, projects, and services. Feel free to ask me anything or choose from the suggested questions below!`,
      timestamp: new Date(),
      reactions: [],
    },
  ])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const [showButton, setShowButton] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [isClosing, setIsClosing] = useState(false)
  const [inputFocused, setInputFocused] = useState(false)
  const [hoveredMessage, setHoveredMessage] = useState(null)
  const [showQuickActions, setShowQuickActions] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const [voiceMode, setVoiceMode] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const chatContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (open && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages, open])

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollBottom = scrollPosition + windowHeight;

      // Show button when scrolled down from top, but hide when near bottom
      if (scrollPosition > 200 && scrollBottom < documentHeight - 100) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    }
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const sendMessage = async (msg: string) => {
    if (!msg.trim()) return
    const newMessage = {
      id: Date.now(),
      from: "user",
      text: msg,
      timestamp: new Date(),
      reactions: [],
    }
    setMessages((prev) => [...prev, newMessage])
    setInput("")
    setLoading(true)
    setIsTyping(true)

    // Simulate typing delay
    setTimeout(() => setIsTyping(false), 1500)

    try {
      const res = await fetch("/api/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: msg }),
      })
      const data = await res.json()
      const botMessage = {
        id: Date.now() + 1,
        from: "bot",
        text: data.reply,
        timestamp: new Date(),
        reactions: [],
      }
      setMessages((prev) => [...prev, botMessage])
    } catch (e) {
      const errorMessage = {
        id: Date.now() + 1,
        from: "bot",
        text: "Sorry, something went wrong.",
        timestamp: new Date(),
        reactions: [],
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setLoading(false)
    }
  }

  const clearConversation = () => {
    setMessages([
      {
        id: 1,
        from: "bot",
        text: `Hi! I'm Subham's AI assistant. I can tell you about my work, experience, skills, projects, and services. Feel free to ask me anything or choose from the suggested questions below!`,
        timestamp: new Date(),
        reactions: [],
      },
    ])
  }

  const handleClose = () => {
    setIsClosing(true)
    setTimeout(() => {
      setOpen(false)
      setIsClosing(false)
    }, 400)
  }

//   const addReaction = (messageId: number, emoji: string) => {
//     setMessages((prev) =>
//       prev.map((msg) => (msg.id === messageId ? { ...msg, reactions: [...(msg.reactions || []), emoji] } : msg)),
//     )
//   }

  const copyMessage = (text: string) => {
    navigator.clipboard.writeText(text)
    // Could add a toast notification here
  }

  return (
    <>
      {/* Floating Particles Background */}
      {/* {open && (
        <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden">
          {FLOATING_PARTICLES.map((particle) => (
            <div
              key={particle.id}
              className="absolute rounded-full bg-white/10 backdrop-blur-sm animate-float"
              style={{
                left: `${particle.x}%`,
                top: `${particle.y}%`,
                width: `${particle.size}px`,
                height: `${particle.size}px`,
                animationDuration: `${particle.speed + 3}s`,
                animationDelay: `${particle.id * 0.2}s`,
              }}
            />
          ))}
        </div>
      )} */}

      {/* Floating Chat Button */}
      {!open && (
        <div className="fixed bottom-6 right-6 z-50">
          <button
            className={`relative bg-white backdrop-blur-xl shadow-2xl rounded-full w-16 h-16 flex items-center justify-center border border-gray-200 transition-all duration-700 ease-out hover:scale-110 hover:bg-gray-50 hover:shadow-3xl group overflow-hidden
              ${showButton ? "opacity-100 translate-x-0 translate-y-0 pointer-events-auto" : "opacity-0 translate-x-20 translate-y-10 pointer-events-none"}
            `}
            onClick={() => setOpen(true)}
            aria-label="Open chat bot"
          >
            {/* Ripple Effect */}
            <div className="absolute inset-0 rounded-full bg-white/20 scale-0 group-hover:scale-150 transition-transform duration-1000 ease-out"></div>

            {/* Breathing Animation Ring */}
            {/* <div className="absolute inset-0 rounded-full border-2 border-white/30 animate-ping"></div> */}

            <MessageCircleMore className="h-8 w-8 text-black font-light drop-shadow-lg transition-all duration-500 group-hover:scale-110 group-hover:rotate-12 z-10" />

            {/* Floating Notification Dot */}
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white/50 animate-bounce shadow-lg"></div>
          </button>
        </div>
      )}

      {/* Chat Window */}
      {open && (
        <div
          ref={chatContainerRef}
          className={`fixed z-50 rounded-3xl shadow-2xl flex flex-col overflow-hidden backdrop-blur-2xl border border-white/20 transition-all duration-500 ease-out chat-window
            ${isClosing ? "opacity-0 scale-95 translate-y-8" : "opacity-100 scale-100 translate-y-0"}
            ${isExpanded ? "inset-4 md:inset-8" : "inset-4 md:inset-auto md:bottom-6 md:right-6 md:w-[480px] md:h-[610px]"}
          `}
        >
          {/* Dynamic Background Layers */}
          <div className="absolute inset-0 bg-gradient-to-br from-black/30 via-black/20 to-black/40 animate-gradient"></div>
          <div className="absolute inset-0 bg-noise opacity-20"></div>

          {/* Header */}
          <div className="relative flex items-center px-5 py-4 border-b border-white/10 bg-white/5 backdrop-blur-xl">
            {/* AI Avatar with Breathing Animation */}
            <div className="relative mr-3 group">
              <div className="bg-white/20 backdrop-blur-xl rounded-full w-12 h-12 flex items-center justify-center border border-white/30 transition-all duration-500 group-hover:scale-105 group-hover:bg-white/30 animate-breathe">
                <MessageCircleMore className="h-6 w-6 text-white drop-shadow-lg transition-transform duration-300 group-hover:rotate-12" />
              </div>
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-white/50 animate-pulse shadow-lg"></div>
              {/* Holographic Ring */}
              <div className="absolute inset-0 rounded-full border border-white/20 scale-110 animate-spin-slow opacity-50"></div>
            </div>

            <div className="flex-1">
              <div className="font-semibold text-white text-lg drop-shadow-lg">Subham&apos;s Assistant</div>
              <div className="text-sm text-white/70 flex items-center gap-2">
                Online
                {isTyping && (
                  <span className="flex items-center gap-1 text-green-400">
                    <div className="w-1 h-1 bg-green-400 rounded-full animate-pulse"></div>
                    typing...
                  </span>
                )}
              </div>
            </div>

            {/* Enhanced Header Actions */}
            <div className="flex gap-2">
              <button
                onClick={clearConversation}
                className="text-white/70 hover:text-white transition-all duration-300 hover:bg-white/10 p-2 rounded-xl backdrop-blur-sm border border-white/10 hover:scale-105 hover:border-white/30 group"
                title="Clear conversation"
              >
                <RotateCcw className="h-4 w-4 transition-transform duration-300 group-hover:rotate-180" />
              </button>
              {/* <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-white/70 hover:text-white transition-all duration-300 hover:bg-white/10 p-2 rounded-xl backdrop-blur-sm border border-white/10 hover:scale-105 hover:border-white/30 group"
                title={isExpanded ? "Minimize" : "Expand"}
              >
                <Maximize2
                  className={`h-4 w-4 transition-transform duration-500 ${isExpanded ? "rotate-180 scale-90" : "rotate-0 scale-100"}`}
                />
              </button> */}
              <button
                onClick={handleClose}
                className="text-white/70 hover:text-white transition-all duration-300 hover:bg-white/10 p-2 rounded-xl backdrop-blur-sm border border-white/10 hover:scale-105 hover:border-white/30 group"
                title="Close"
              >
                <X className="h-4 w-4 transition-transform duration-300 group-hover:rotate-90 group-hover:scale-110" />
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div className="relative flex-1 overflow-y-auto p-5 space-y-5 bg-transparent scroll-smooth">
            {messages.map((msg, i) => (
              <div
                key={msg.id}
                className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"} message-enter group`}
                style={{
                  animationDelay: `${i * 0.1}s`,
                }}
              >
                <div className="relative max-w-[85%]">
                  {/* Message Bubble */}
                  <div
                    className={`rounded-2xl px-4 py-3 shadow-xl backdrop-blur-xl border transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl message-bubble ${
                      msg.from === "user"
                        ? "bg-white/20 text-white border-white/30 hover:bg-white/25"
                        : "bg-black/30 text-white border-white/20 hover:bg-black/40"
                    }`}
                  >
                    {msg.from === "bot" ? (
                      <div className="prose prose-zinc prose-a:text-blue-400 prose-a:underline prose-a:decoration-blue-400 prose-a:decoration-2 prose-a:underline-offset-2 prose-a:font-medium prose-a:hover:text-blue-300 prose-a:hover:decoration-blue-300 prose-ul:pl-5 prose-li:marker:text-white prose-strong:text-white prose-blockquote:border-white prose-blockquote:text-white/80 prose-p:my-2 prose-pre:bg-black/40 prose-pre:text-white prose-pre:rounded-lg prose-pre:p-2 prose-pre:backdrop-blur-sm prose-pre:border prose-pre:border-white/20 prose-code:bg-white/20 prose-code:text-white prose-code:rounded prose-code:backdrop-blur-sm px-2 py-1 text-sm">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>{filterGeminiResponse(msg.text)}</ReactMarkdown>
                      </div>
                    ) : (
                      <span className="px-2 py-1 block text-sm">{msg.text}</span>
                    )}
                  </div>

                  {/* Timestamp */}
                  <div className={`text-xs text-white/50 mt-1 ${msg.from === "user" ? "text-right" : "text-left"}`}>
                    {msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </div>
                </div>
              </div>
            ))}

            {/* Enhanced Loading Indicator */}
            {loading && (
              <div className="flex justify-start typing-indicator">
                <div className="rounded-2xl px-5 py-4 bg-black/30 text-white border border-white/20 backdrop-blur-xl shadow-xl">
                  <div className="flex items-center space-x-3">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 rounded-full bg-white/80 typing-dot"></div>
                      <div
                        className="w-2 h-2 rounded-full bg-white/80 typing-dot"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                      <div
                        className="w-2 h-2 rounded-full bg-white/80 typing-dot"
                        style={{ animationDelay: "0.4s" }}
                      ></div>
                    </div>
                    <span className="text-xs text-white/60">AI is thinking...</span>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Suggested Follow-up Questions */}
          {/* {messages.length > 1 && (
            <div className="px-4 py-2 bg-white/5 border-t border-white/10 backdrop-blur-xl suggestions-enter">
              <div className="flex flex-wrap gap-1.5 max-h-16 overflow-hidden">
                {SUGGESTED_QUESTIONS.slice(0, 3).map((q, i) => (
                  <button
                    key={i}
                    className="text-left rounded-full bg-white/10 text-white px-3 py-1.5 text-xs font-medium hover:bg-white/20 transition-all duration-300 border border-white/20 backdrop-blur-sm shadow-sm hover:scale-[1.02] hover:shadow-md hover:border-white/30 suggestion-pill group"
                    onClick={() => sendMessage(q)}
                    disabled={loading}
                    style={{
                      animationDelay: `${i * 0.05}s`,
                    }}
                  >
                    <span className="group-hover:translate-x-0.5 transition-transform duration-200 inline-block line-clamp-1">
                      {q}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )} */}

          {/* Initial Suggested Questions */}
          {messages.length === 1 && (
            <div className="px-4 py-3 bg-white/5 border-t border-white/10 backdrop-blur-xl suggestions-enter">
              <p className="text-xs text-white/60 font-medium uppercase tracking-wider mb-2 flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-white/40 rounded-full animate-pulse"></span>
                Suggested Questions
              </p>
              {SUGGESTED_QUESTIONS.slice(0, 3).map((q, i) => (
                <button
                  key={i}
                  className="w-full text-left rounded-lg bg-white/10 text-white px-3 py-2 text-xs font-medium hover:bg-white/20 transition-all duration-300 border border-white/20 backdrop-blur-sm shadow-sm hover:scale-[1.01] hover:shadow-md hover:border-white/30 suggestion-button group mb-1.5"
                  onClick={() => sendMessage(q)}
                  disabled={loading}
                  style={{
                    animationDelay: `${i * 0.05}s`,
                  }}
                >
                  <span className="group-hover:translate-x-0.5 transition-transform duration-200 inline-block">
                    {q}
                  </span>
                </button>
              ))}
            </div>
          )}

          {/* Enhanced Input Area */}
          <form
            className="relative p-4 border-t border-white/10 bg-white/5 backdrop-blur-xl"
            onSubmit={(e) => {
              e.preventDefault()
              sendMessage(input)
            }}
          >
            {/* Input Field with Magic Border */}
            <div className="relative">
              {/* <div
                className={`absolute inset-0 rounded-full bg-gradient-to-r from-white/20 via-white/10 to-white/20 transition-opacity duration-300 ${inputFocused ? "opacity-100" : "opacity-0"}`}
              ></div> */}

              <input
                className={'relative w-full bg-white/10 text-white placeholder:text-white/60 rounded-full py-4 pl-6 pr-16 outline-none border transition-all duration-500 backdrop-blur-sm text-sm'}
                placeholder={"Ask me anything..."}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onFocus={() => setInputFocused(true)}
                onBlur={() => setInputFocused(false)}
                disabled={loading}
              />

              {/* Send Button with Magnetic Effect */}
              <button
                type="submit"
                className={`absolute right-2 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/20 text-white hover:bg-white/30 transition-all duration-300 disabled:opacity-50 backdrop-blur-sm border border-white/30 shadow-lg group magnetic-button ${
                  input.trim() ? "scale-100" : "scale-90"
                }`}
                disabled={loading || !input.trim()}
                aria-label="Send message"
              >
                <Send className="h-4 w-4 transition-all duration-300 group-hover:translate-x-0.5 group-hover:scale-110" />

                {/* Ripple Effect */}
                {/* <div className="absolute inset-0 rounded-full bg-white/20 scale-0 group-hover:scale-150 transition-transform duration-500 ease-out"></div> */}
              </button>
            </div>

            {/* Character Counter */}
            {/* {input.length > 0 && (
              <div className="absolute bottom-1 left-6 text-xs text-white/50">{input.length}/500</div>
            )} */}
          </form>
        </div>
      )}

      {/* Enhanced Styles with Creative Effects */}
      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-10px) rotate(120deg); }
          66% { transform: translateY(5px) rotate(240deg); }
        }
        
        @keyframes breathe {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes messageSlideIn {
          0% { 
            opacity: 0; 
            transform: translateY(20px) scale(0.95) rotateX(10deg); 
          }
          100% { 
            opacity: 1; 
            transform: translateY(0) scale(1) rotateX(0deg); 
          }
        }
        
        @keyframes suggestionSlideIn {
          0% { 
            opacity: 0; 
            transform: translateX(-30px) scale(0.9) rotateY(10deg); 
          }
          100% { 
            opacity: 1; 
            transform: translateX(0) scale(1) rotateY(0deg); 
          }
        }
        
        @keyframes quickActionsSlide {
          0% { 
            opacity: 0; 
            transform: translateX(10px) scale(0.8); 
          }
          100% { 
            opacity: 1; 
            transform: translateX(0) scale(1); 
          }
        }
        
        @keyframes bounceIn {
          0% { 
            opacity: 0; 
            transform: scale(0.3); 
          }
          50% { 
            opacity: 1; 
            transform: scale(1.1); 
          }
          100% { 
            opacity: 1; 
            transform: scale(1); 
          }
        }
        
        @keyframes typingBounce {
          0%, 60%, 100% { 
            transform: translateY(0) scale(1); 
          }
          30% { 
            transform: translateY(-8px) scale(1.2); 
          }
        }

        .suggestion-pill {
          animation: suggestionPillSlideIn 0.4s ease-out forwards;
          opacity: 0;
          transform: translateY(10px) scale(0.95);
        }

        @keyframes suggestionPillSlideIn {
          0% { 
            opacity: 0; 
            transform: translateY(10px) scale(0.95); 
          }
          100% { 
            opacity: 1; 
            transform: translateY(0) scale(1); 
          }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-breathe {
          animation: breathe 3s ease-in-out infinite;
        }
        
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 8s ease infinite;
        }
        
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
        
        .animate-bounce-in {
          animation: bounceIn 0.6s ease-out;
        }
        
        .typing-dot {
          animation: typingBounce 1.4s infinite ease-in-out;
        }
        
        .message-enter {
          animation: messageSlideIn 0.6s ease-out forwards;
          opacity: 0;
        }
        
        .suggestions-enter {
          animation: messageSlideIn 0.4s ease-out 0.2s forwards;
          opacity: 0;
        }
        
        .suggestion-button {
          animation: suggestionSlideIn 0.5s ease-out forwards;
          opacity: 0;
        }
        
        .quick-actions {
          animation: quickActionsSlide 0.2s ease-out;
        }
        
        .typing-indicator {
          animation: messageSlideIn 0.3s ease-out;
        }
        
        .chat-window {
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
        }
        
        .bg-noise {
          background-image: 
            radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0);
          background-size: 20px 20px;
        }
        
        .magnetic-button:hover {
          transform: translateY(-50%) scale(1.1);
          box-shadow: 0 10px 25px rgba(255,255,255,0.2);
        }
        
        .message-bubble {
          position: relative;
          overflow: hidden;
        }
        
        .message-bubble::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
          transition: left 0.5s;
        }
        
        .message-bubble:hover::before {
          left: 100%;
        }
        
        /* Scrollbar Styling */
        ::-webkit-scrollbar {
          width: 6px;
        }
        
        ::-webkit-scrollbar-track {
          background: rgba(255,255,255,0.1);
          border-radius: 3px;
        }
        
        ::-webkit-scrollbar-thumb {
          background: rgba(255,255,255,0.3);
          border-radius: 3px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: rgba(255,255,255,0.5);
        }

        .line-clamp-1 {
          overflow: hidden;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 1;
        }

        /* Enhanced link styling for chatbot */
        .prose a {
          color: #60a5fa !important;
          text-decoration: underline !important;
          text-decoration-color: #60a5fa !important;
          text-decoration-thickness: 2px !important;
          text-underline-offset: 3px !important;
          font-weight: 500 !important;
          transition: all 0.2s ease !important;
        }

        .prose a:hover {
          color: #93c5fd !important;
          text-decoration-color: #93c5fd !important;
          transform: translateY(-1px) !important;
        }

        .prose a:visited {
          color: #a78bfa !important;
        }
      `}</style>
    </>
  )
}
