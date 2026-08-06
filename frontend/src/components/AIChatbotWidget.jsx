import React, { useState, useRef, useEffect, memo, useCallback } from 'react';
import { Sparkles, X, Send, RotateCcw, Copy, Check } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import SkillForgeBotIcon from './SkillForgeBotIcon';

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
      setTimeout(() => {
        inputRef.current?.focus();
      }, 150);
    } else {
      launcherRef.current?.focus();
    }
  }, [isOpen, scrollToBottom]);

  useEffect(() => {
    if (isOpen) {
      scrollToBottom('smooth');
    }
  }, [messages, isTyping, isOpen, scrollToBottom]);

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
      {/* FIXED VIEWPORT FLOATING LAUNCHER BUTTON */}
      {!isOpen && (
        <button
          ref={launcherRef}
          onClick={() => setIsOpen(true)}
          aria-expanded={isOpen}
          aria-controls="ai-chat-popup"
          aria-label="Open SkillForge AI Assistant"
          aria-haspopup="dialog"
          title="Open SkillForge AI Assistant"
          className="fixed bottom-6 right-6 z-[9999] group flex items-center gap-3 px-4 py-3 rounded-full bg-[#1F1B2D]/95 dark:bg-slate-900/95 backdrop-blur-xl text-white border border-white/20 dark:border-purple-500/30 shadow-[0_12px_36px_rgba(91,78,128,0.35)] hover:shadow-[0_18px_48px_rgba(91,78,128,0.5)] transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer overflow-hidden"
        >
          {/* Ambient Glow Accent Backdrop */}
          <span className="absolute inset-0 bg-gradient-to-r from-[#5B4E80]/40 via-[#9333EA]/30 to-[#6E56CF]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          {/* Brand-Aligned Emblem Icon */}
          <div className="relative flex items-center justify-center">
            <SkillForgeBotIcon size={30} animated={true} />
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

      {/* POPUP CHAT WINDOW */}
      {isOpen && (
        <div
          ref={popupRef}
          id="ai-chat-popup"
          role="dialog"
          aria-modal="false"
          aria-labelledby="ai-chat-header-title"
          className="fixed bottom-6 right-6 z-[9999] w-[calc(100vw-2rem)] sm:w-96 max-h-[85vh] sm:max-h-[580px] h-[520px] bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl text-[#1F1B2D] dark:text-slate-100 rounded-3xl shadow-[0_24px_60px_rgba(91,78,128,0.35)] border border-white/80 dark:border-slate-800 flex flex-col overflow-hidden animate-pop-in-br font-sans"
        >
          {/* POPUP HEADER */}
          <div className="px-4 py-3.5 bg-gradient-to-r from-[#1F1B2D] via-[#28213B] to-[#4C4070] dark:from-slate-950 dark:via-purple-950/70 dark:to-slate-900 text-white flex justify-between items-center border-b border-white/10 dark:border-slate-800 shadow-sm shrink-0">
            <div className="flex items-center gap-3">
              <div className="relative p-1 flex items-center justify-center">
                <SkillForgeBotIcon size={30} />
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
                className="p-1.5 text-purple-200/70 hover:text-white hover:bg-white/10 rounded-lg transition-all active:scale-95 cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                aria-label="Close AI Assistant"
                title="Close AI Assistant"
                className="p-1.5 text-purple-200/70 hover:text-white hover:bg-white/10 rounded-lg transition-all active:scale-95 cursor-pointer"
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
            className="p-4 flex-1 overflow-y-auto space-y-3.5 bg-gradient-to-b from-[#F9FAFC] to-[#F4F0FA]/40 dark:from-slate-900 dark:to-slate-950 text-xs scrollbar-thin"
          >
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2 group ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'ai' && (
                  <div className="shrink-0 mt-0.5">
                    <SkillForgeBotIcon size={24} />
                  </div>
                )}

                <div
                  className={`relative max-w-[82%] p-3.5 rounded-2xl leading-relaxed transition-all ${
                    msg.sender === 'user'
                      ? 'bg-gradient-to-r from-[#5B4E80] to-[#6E56CF] text-white rounded-br-xs shadow-md'
                      : 'bg-white dark:bg-slate-800 text-[#1F1B2D] dark:text-slate-100 border border-[#EAE5F5] dark:border-slate-700/60 rounded-bl-xs shadow-xs hover:border-[#D0C5E8]'
                  }`}
                >
                  {/* Message Content */}
                  <div className="whitespace-pre-line font-sans text-xs">
                    {msg.text}
                  </div>

                  {/* Message Footer */}
                  <div className="flex items-center justify-end gap-2 mt-1.5 pt-1 border-t border-black/5 dark:border-white/10 opacity-80">
                    <span className="text-[9px] font-mono opacity-75">
                      {msg.time}
                    </span>

                    {msg.sender === 'ai' && (
                      <button
                        onClick={() => handleCopyMessage(msg.id, msg.text)}
                        aria-label="Copy Response"
                        title="Copy message"
                        className="opacity-0 group-hover:opacity-100 p-0.5 hover:text-[#5B4E80] dark:hover:text-purple-300 transition-opacity cursor-pointer"
                      >
                        {copiedId === msg.id ? (
                          <Check className="w-3 h-3 text-emerald-500" />
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
              <div className="flex items-center gap-2 p-2 bg-white/80 dark:bg-slate-800/90 border border-[#EAE5F5] dark:border-slate-700 rounded-2xl w-max shadow-xs text-[#5B4E80] dark:text-purple-300 text-xs">
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
          <div className="px-3 py-2 bg-[#F9FAFC] dark:bg-slate-900/90 border-t border-[#EAE5F5] dark:border-slate-800 flex gap-1.5 overflow-x-auto scrollbar-none shrink-0">
            {predefinedPrompts.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(prompt)}
                disabled={isTyping}
                className="px-2.5 py-1 rounded-full bg-white dark:bg-slate-800 hover:bg-[#F0EBFA] dark:hover:bg-slate-700 text-[#4B5563] dark:text-slate-300 hover:text-[#5B4E80] text-[10px] font-semibold whitespace-nowrap border border-[#E5E7EB] dark:border-slate-700 hover:border-[#D0C5E8] transition-all duration-200 active:scale-95 shadow-xs cursor-pointer disabled:opacity-50"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* INPUT FORM */}
          <div className="p-3 bg-white dark:bg-slate-900 border-t border-[#EAE5F5] dark:border-slate-800 shrink-0">
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
                className="w-full bg-[#F3F4F6] dark:bg-slate-800 focus:bg-white dark:focus:bg-slate-900 border border-[#E5E7EB] dark:border-slate-700 focus:border-[#6E56CF] rounded-full py-2 pl-4 pr-11 text-xs text-[#1F1B2D] dark:text-slate-100 placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#6E56CF]/20 transition-all"
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
