import React, { useState, useRef, useEffect, memo } from 'react';
import { useAuth } from '../context/AuthContext';

const AIChatbotWidget = memo(() => {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'ai',
      text: `Hi ${user?.name || 'Student'}! I'm your AI Assistant on SkillForge. Ask me anything about Data Structures, System Design, or Resume ATS prep.`,
      time: 'Just now'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  const predefinedPrompts = [
    'Explain Time Complexity of QuickSort',
    'How to design a Rate Limiter?',
    'Tips to improve ATS Resume Score'
  ];

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isOpen]);

  const handleSendMessage = (textToSend) => {
    const query = textToSend || inputText;
    if (!query.trim()) return;

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: query,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputText('');
    setIsTyping(true);

    setTimeout(() => {
      let aiText = "That's a great question! For high-scale technical interviews, focus on analyzing time/space trade-offs and handling edge cases in test suites.";
      
      if (query.toLowerCase().includes('quicksort') || query.toLowerCase().includes('complexity')) {
        aiText = "QuickSort has average time complexity O(N log N) and worst-case O(N²) when pivot selection is poor. Using randomized pivot selection guarantees expected O(N log N).";
      } else if (query.toLowerCase().includes('rate limiter') || query.toLowerCase().includes('system design')) {
        aiText = "Rate Limiters can be implemented using: 1. Token Bucket algorithm, 2. Leaky Bucket algorithm, 3. Sliding Window Logs. Redis is ideal for distributed counter caching.";
      } else if (query.toLowerCase().includes('ats') || query.toLowerCase().includes('resume')) {
        aiText = "To boost ATS Match Score: 1. Use standard section headers, 2. Match exact technical keywords (e.g. React.js, B-Tree, REST), 3. Quantify project impact with metrics.";
      }

      const aiMsg = {
        id: Date.now() + 1,
        sender: 'ai',
        text: aiText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 800);
  };

  // Fixed Bottom-Right Viewport Launcher Button labeled "Ask AI"
  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        aria-label="Ask AI Assistant"
        title="Ask AI Assistant"
        className="fixed bottom-6 right-6 z-[9999] flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-white/90 backdrop-blur-xl text-[#1F1B2D] border border-white/80 shadow-[0_12px_30px_rgba(91,78,128,0.22)] hover:shadow-[0_18px_36px_rgba(91,78,128,0.32)] transition-all hover:scale-105 active:scale-95 group relative overflow-hidden font-sans cursor-pointer"
      >
        {/* Bottom Ambient Glow Accent Bar */}
        <span className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#5B4E80] via-[#9333EA] to-[#3B82F6] opacity-80 group-hover:opacity-100 transition-opacity" />

        {/* Emblem Badge Icon */}
        <div className="w-7 h-7 rounded-full bg-[#F0EBFA] border border-[#EAE5F5] p-1 flex items-center justify-center shadow-xs">
          <img src="/skillforge-logo.png" alt="SkillForge AI Logo" className="w-full h-full object-contain" />
        </div>

        {/* Clear Accessible Label: Ask AI */}
        <span className="font-display text-xs font-extrabold text-[#1F1B2D] tracking-wide pr-1">Ask AI</span>
        
        {/* Active Indicator Pulse */}
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-emerald-100 animate-pulse" />
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 w-80 sm:w-96 bg-white/95 backdrop-blur-2xl text-[#1F1B2D] rounded-3xl shadow-2xl border border-white flex flex-col overflow-hidden z-[9999] animate-fade-in-up font-sans">
      {/* Popover Header */}
      <div className="p-4 border-b border-[#EAEAEA] bg-[#F9FAFC] flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#F0EBFA] border border-[#EAE5F5] p-1 flex items-center justify-center">
            <img src="/skillforge-logo.png" alt="SkillForge AI Logo" className="w-full h-full object-contain" />
          </div>
          <div>
            <h4 className="font-display text-xs font-bold text-[#1F1B2D]">SkillForge AI Assistant</h4>
            <p className="text-[10px] text-[#5B4E80] font-mono">AI Active • Ready to help</p>
          </div>
        </div>
        <button
          onClick={() => setIsOpen(false)}
          aria-label="Close Chat"
          className="p-1 text-[#9CA3AF] hover:text-[#1F1B2D] rounded-lg transition-colors"
        >
          <span className="material-symbols-outlined text-[18px]">close</span>
        </button>
      </div>

      {/* Messages Area */}
      <div className="p-4 h-72 overflow-y-auto space-y-3 bg-[#F9FAFC]/80 text-xs">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[85%] p-3 rounded-2xl leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-[#5B4E80] text-white rounded-br-none shadow-xs'
                  : 'bg-white text-[#1F1B2D] border border-[#E5E7EB] rounded-bl-none shadow-xs'
              }`}
            >
              <p>{msg.text}</p>
              <span className="text-[9px] opacity-60 mt-1 block text-right font-mono">{msg.time}</span>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex items-center gap-2 text-[#5B4E80] text-xs font-mono">
            <span className="material-symbols-outlined text-[14px] animate-spin">sync</span>
            <span>AI Assistant is typing...</span>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Quick Prompts */}
      <div className="px-3 py-2 bg-[#F9FAFC] border-t border-[#EAEAEA] flex gap-1.5 overflow-x-auto">
        {predefinedPrompts.map((prompt, idx) => (
          <button
            key={idx}
            onClick={() => handleSendMessage(prompt)}
            className="px-2.5 py-1 rounded-full bg-white hover:bg-[#F0EBFA] text-[#4B5563] hover:text-[#5B4E80] text-[10px] font-semibold whitespace-nowrap border border-[#E5E7EB] transition-colors"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Input Form */}
      <div className="p-3 bg-white border-t border-[#EAEAEA]">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="relative"
        >
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Ask AI a technical question..."
            className="w-full bg-[#F3F4F6] border border-[#E5E7EB] rounded-full py-2 pl-4 pr-10 text-xs text-[#1F1B2D] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-1 focus:ring-[#5B4E80]"
          />
          <button
            type="submit"
            aria-label="Send Message"
            className="absolute right-2 top-1/2 -translate-y-1/2 text-[#5B4E80] hover:text-[#4C4070] p-1"
          >
            <span className="material-symbols-outlined text-[18px]">send</span>
          </button>
        </form>
      </div>
    </div>
  );
});

AIChatbotWidget.displayName = 'AIChatbotWidget';

export default AIChatbotWidget;
