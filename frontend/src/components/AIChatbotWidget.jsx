import React, { useState, useRef, useEffect, memo, useCallback } from 'react';
import { Bot, Sparkles, X, Send, RotateCcw, Copy, Check, MessageSquare, ArrowDown } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const AIChatbotWidget = memo(() => {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [copiedId, setCopiedId] = useState(null);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'ai',
      text: `Hi ${user?.name || 'Student'}! 👋 I'm your SkillForge AI Assistant. Ask me anything about Data Structures, System Design, ATS Resume prep, or coding challenges!`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  const chatEndRef = useRef(null);
  const launcherRef = useRef(null);
  const inputRef = useRef(null);
  const popupRef = useRef(null);

  const predefinedPrompts = [
    '⚡ Time Complexity of QuickSort',
    '📐 How to design a Rate Limiter?',
    '📄 Tips to boost ATS Resume score',
    '🧩 Core System Design Principles'
  ];

  const scrollToBottom = useCallback((behavior = 'smooth') => {
    chatEndRef.current?.scrollIntoView({ behavior });
  }, []);

  useEffect(() => {
    if (isOpen) {
      scrollToBottom('instant');
      // Focus input field when opened
      setTimeout(() => {
        inputRef.current?.focus();
      }, 150);
    } else {
      // Focus back launcher button when closed
      launcherRef.current?.focus();
    }
  }, [isOpen, scrollToBottom]);

  useEffect(() => {
    if (isOpen) {
      scrollToBottom('smooth');
    }
  }, [messages, isTyping, isOpen, scrollToBottom]);

  // Handle ESC key press to close chat popup
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const handleSendMessage = (textToSend) => {
    const query = (textToSend || inputText).trim();
    if (!query || isTyping) return;

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: query,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputText('');
    setIsTyping(true);

    // Dynamic AI Smart Responses
    setTimeout(() => {
      let aiText = "That's a great question! For high-scale technical interviews, focus on analyzing time/space trade-offs and handling edge cases in test suites.";
      const lowerQuery = query.toLowerCase();

      if (lowerQuery.includes('quicksort') || lowerQuery.includes('complexity') || lowerQuery.includes('time complexity')) {
        aiText = "⚡ **QuickSort Time Complexity**:\n• Best/Average Case: **O(N log N)** using randomized pivot.\n• Worst Case: **O(N²)** when array is already sorted and first/last element is chosen as pivot.\n• Space Complexity: **O(log N)** for recursive call stack.";
      } else if (lowerQuery.includes('rate limiter') || lowerQuery.includes('system design')) {
        aiText = "📐 **Rate Limiter Design Overview**:\n1. **Algorithms**: Token Bucket, Leaky Bucket, Sliding Window Counter.\n2. **Storage**: Distributed Redis cache with atomic INCR & EXPIRE.\n3. **Headers**: Return `X-RateLimit-Remaining` and `Retry-After` to clients.";
      } else if (lowerQuery.includes('ats') || lowerQuery.includes('resume')) {
        aiText = "📄 **Top ATS Resume Optimization Tips**:\n1. Use standard single-column layout without complex graphics or tables.\n2. Match exact job description keywords (e.g., React.js, System Design, REST APIs).\n3. Quantify impact: *'Improved API latency by 35% using Redis caching'*.";
      } else if (lowerQuery.includes('system design principles') || lowerQuery.includes('principles')) {
        aiText = "🧩 **Key System Design Principles**:\n• **Scalability**: Horizontal scaling over vertical scaling.\n• **Availability**: Single Point of Failure (SPOF) elimination via redundancy.\n• **Consistency vs Availability**: Evaluate trade-offs using CAP Theorem.\n• **Caching**: Implement multi-tier caching (CDN, Application, DB).";
      }

      const aiMsg = {
        id: Date.now() + 1,
        sender: 'ai',
        text: aiText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 850);
  };

  const handleCopyMessage = (id, text) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: Date.now(),
        sender: 'ai',
        text: `Chat reset. 👋 How else can I assist you today, ${user?.name || 'Student'}?`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  return (
    <>
      {/* 
        ========================================================================
        FIXED VIEWPORT FLOATING LAUNCHER BUTTON (Bottom-Right Fixed)
        ========================================================================
      */}
      {!isOpen && (
        <button
          ref={launcherRef}
          onClick={() => setIsOpen(true)}
          aria-expanded={isOpen}
          aria-controls="ai-chat-popup"
          aria-label="Open SkillForge AI Assistant"
          aria-haspopup="dialog"
          title="Open SkillForge AI Assistant"
          className="fixed bottom-6 right-6 z-[9999] group flex items-center gap-3 px-4 py-3 rounded-full bg-[#1F1B2D]/95 backdrop-blur-xl text-white border border-white/20 shadow-[0_12px_36px_rgba(91,78,128,0.35)] hover:shadow-[0_18px_48px_rgba(91,78,128,0.5)] transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer overflow-hidden"
        >
          {/* Ambient Glow Accent Backdrop */}
          <span className="absolute inset-0 bg-gradient-to-r from-[#5B4E80]/40 via-[#9333EA]/30 to-[#6E56CF]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          {/* Animated Emblem Icon */}
          <div className="relative w-8 h-8 rounded-full bg-gradient-to-br from-[#6E56CF] to-[#5B4E80] p-0.5 flex items-center justify-center shadow-inner group-hover:rotate-12 transition-transform duration-300">
            <Bot className="w-5 h-5 text-white" />
            <Sparkles className="w-3 h-3 text-amber-300 absolute -top-0.5 -right-0.5 animate-pulse" />
          </div>

          {/* Launcher Label */}
          <div className="flex flex-col text-left">
            <span className="font-display text-xs font-bold text-white tracking-wide leading-tight group-hover:text-purple-200 transition-colors">
              Ask AI
            </span>
            <span className="text-[10px] text-purple-300/80 font-mono leading-tight">
              SkillForge Assistant
            </span>
          </div>

          {/* Active Status Pulse Badge */}
          <span className="relative flex h-2.5 w-2.5 ml-1">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
          </span>
        </button>
      )}

      {/* 
        ========================================================================
        SMOOTH POPUP CHAT WINDOW (Bottom-Right Positioned Dialog)
        ========================================================================
      */}
      {isOpen && (
        <div
          ref={popupRef}
          id="ai-chat-popup"
          role="dialog"
          aria-modal="false"
          aria-labelledby="ai-chat-header-title"
          className="fixed bottom-6 right-6 z-[9999] w-[calc(100vw-2rem)] sm:w-96 max-h-[85vh] sm:max-h-[580px] h-[520px] bg-white/95 backdrop-blur-2xl text-[#1F1B2D] rounded-3xl shadow-[0_24px_60px_rgba(91,78,128,0.28)] border border-white/80 flex flex-col overflow-hidden animate-pop-in-br font-sans"
        >
          {/* POPUP HEADER */}
          <div className="px-4 py-3.5 bg-gradient-to-r from-[#1F1B2D] via-[#28213B] to-[#4C4070] text-white flex justify-between items-center border-b border-white/10 shadow-sm shrink-0">
            <div className="flex items-center gap-3">
              <div className="relative w-9 h-9 rounded-full bg-gradient-to-br from-[#6E56CF] to-[#5B4E80] p-1 flex items-center justify-center shadow-md">
                <Bot className="w-5 h-5 text-white" />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-[#1F1B2D]" />
              </div>
              <div>
                <h2 id="ai-chat-header-title" className="font-display text-xs font-bold text-white tracking-wide">
                  SkillForge AI Assistant
                </h2>
                <p className="text-[10px] text-purple-200/80 font-mono flex items-center gap-1.5 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  Online • Ready to assist
                </p>
              </div>
            </div>

            {/* Header Actions */}
            <div className="flex items-center gap-1">
              <button
                onClick={handleResetChat}
                aria-label="Reset Conversation"
                title="Reset Conversation"
                className="p-1.5 text-purple-200/70 hover:text-white hover:bg-white/10 rounded-lg transition-all active:scale-95"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                aria-label="Close AI Assistant"
                title="Close AI Assistant"
                className="p-1.5 text-purple-200/70 hover:text-white hover:bg-white/10 rounded-lg transition-all active:scale-95"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* MESSAGES AREA */}
          <div
            role="log"
            aria-live="polite"
            aria-atomic="false"
            aria-label="Chat messages log"
            className="p-4 flex-1 overflow-y-auto space-y-3.5 bg-gradient-to-b from-[#F9FAFC] to-[#F4F0FA]/40 text-xs scrollbar-thin"
          >
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2 group ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'ai' && (
                  <div className="w-6 h-6 rounded-full bg-[#EAE5F5] border border-[#DCD4EE] flex items-center justify-center shrink-0 mt-0.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#5B4E80]" />
                  </div>
                )}

                <div
                  className={`relative max-w-[82%] p-3.5 rounded-2xl leading-relaxed transition-all ${
                    msg.sender === 'user'
                      ? 'bg-gradient-to-r from-[#5B4E80] to-[#6E56CF] text-white rounded-br-xs shadow-md'
                      : 'bg-white text-[#1F1B2D] border border-[#EAE5F5] rounded-bl-xs shadow-xs hover:border-[#D0C5E8]'
                  }`}
                >
                  {/* Message Content */}
                  <div className="whitespace-pre-line font-sans text-xs">
                    {msg.text}
                  </div>

                  {/* Message Footer: Time + Copy Button */}
                  <div className="flex items-center justify-end gap-2 mt-1.5 pt-1 border-t border-black/5 opacity-80">
                    <span className="text-[9px] font-mono opacity-75">
                      {msg.time}
                    </span>

                    {msg.sender === 'ai' && (
                      <button
                        onClick={() => handleCopyMessage(msg.id, msg.text)}
                        aria-label="Copy Response"
                        title="Copy message"
                        className="opacity-0 group-hover:opacity-100 p-0.5 hover:text-[#5B4E80] transition-opacity cursor-pointer"
                      >
                        {copiedId === msg.id ? (
                          <Check className="w-3 h-3 text-emerald-600" />
                        ) : (
                          <Copy className="w-3 h-3" />
                        )}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {/* TYPING INDICATOR */}
            {isTyping && (
              <div className="flex items-center gap-2 p-2 bg-white/80 border border-[#EAE5F5] rounded-2xl w-max shadow-xs text-[#5B4E80] text-xs">
                <Sparkles className="w-3.5 h-3.5 animate-spin text-[#6E56CF]" />
                <span className="text-[11px] font-mono font-medium">AI is crafting answer</span>
                <div className="flex items-center gap-1 ml-1">
                  <span className="w-1.5 h-1.5 bg-[#5B4E80] rounded-full animate-dot-1" />
                  <span className="w-1.5 h-1.5 bg-[#6E56CF] rounded-full animate-dot-2" />
                  <span className="w-1.5 h-1.5 bg-[#9333EA] rounded-full animate-dot-3" />
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* QUICK PROMPT SUGGESTIONS */}
          <div className="px-3 py-2 bg-[#F9FAFC] border-t border-[#EAE5F5] flex gap-1.5 overflow-x-auto scrollbar-none shrink-0">
            {predefinedPrompts.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(prompt)}
                disabled={isTyping}
                className="px-2.5 py-1 rounded-full bg-white hover:bg-[#F0EBFA] text-[#4B5563] hover:text-[#5B4E80] text-[10px] font-semibold whitespace-nowrap border border-[#E5E7EB] hover:border-[#D0C5E8] transition-all duration-200 active:scale-95 shadow-xs cursor-pointer disabled:opacity-50"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* INPUT FORM */}
          <div className="p-3 bg-white border-t border-[#EAE5F5] shrink-0">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="relative flex items-center"
            >
              <input
                ref={inputRef}
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Ask AI a technical question..."
                disabled={isTyping}
                aria-label="Ask AI a technical question"
                className="w-full bg-[#F3F4F6] focus:bg-white border border-[#E5E7EB] focus:border-[#6E56CF] rounded-full py-2 pl-4 pr-11 text-xs text-[#1F1B2D] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#6E56CF]/20 transition-all"
              />
              <button
                type="submit"
                disabled={!inputText.trim() || isTyping}
                aria-label="Send Message"
                title="Send Message"
                className={`absolute right-1.5 p-1.5 rounded-full transition-all duration-200 ${
                  inputText.trim() && !isTyping
                    ? 'bg-gradient-to-r from-[#5B4E80] to-[#6E56CF] text-white shadow-xs hover:scale-105 active:scale-95 cursor-pointer'
                    : 'text-[#9CA3AF] bg-transparent cursor-not-allowed'
                }`}
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
});

AIChatbotWidget.displayName = 'AIChatbotWidget';

export default AIChatbotWidget;
