import React, { memo } from 'react';

/**
 * SkillForgeBotIcon
 * Premium, brand-aligned visual emblem for the SkillForge AI Assistant.
 * Combines the SkillForge anvil/forge flame 'S' emblem with AI intelligence nodes & sparkles.
 */
const SkillForgeBotIcon = memo(({ className = 'w-6 h-6', animated = false, size = 24 }) => {
  return (
    <div className={`relative inline-flex items-center justify-center shrink-0 ${animated ? 'group-hover:scale-105 transition-transform duration-300' : ''}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`${className} transition-all duration-300 drop-shadow-md`}
      >
        <defs>
          {/* Main Brand Gradient */}
          <linearGradient id="sfBotBg" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#8B5CF6" />
            <stop offset="50%" stopColor="#6E56CF" />
            <stop offset="100%" stopColor="#4C1D95" />
          </linearGradient>

          {/* Core Emblem Metallic Highlight Gradient */}
          <linearGradient id="sfBotCore" x1="12" y1="8" x2="36" y2="40" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="40%" stopColor="#E9D5FF" />
            <stop offset="100%" stopColor="#C084FC" />
          </linearGradient>

          {/* Flame/Energy Accent */}
          <linearGradient id="sfBotFlame" x1="18" y1="12" x2="32" y2="34" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FDE047" />
            <stop offset="60%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#EF4444" />
          </linearGradient>

          {/* Glow filter */}
          <filter id="sfGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Rounded Hexagonal Shield Outer Frame */}
        <path
          d="M24 4L38.7 11.8V27.4L24 43.5L9.3 27.4V11.8L24 4Z"
          fill="url(#sfBotBg)"
          stroke="#A855F7"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />

        {/* Inner Glowing Hex Line */}
        <path
          d="M24 7.5L35.5 13.6V25.8L24 38.5L12.5 25.8V13.6L24 7.5Z"
          fill="none"
          stroke="url(#sfBotCore)"
          strokeWidth="1"
          strokeOpacity="0.4"
        />

        {/* SkillForge 'S' Anvil & AI Core Synthesis */}
        <path
          d="M28.5 14C31.5 14 33 15.5 33 17.5C33 21 26 21 25 24C24 27 31 27 31 30.5C31 33 28.5 34.5 24 34.5C19.5 34.5 16.5 33 16.5 30"
          fill="none"
          stroke="url(#sfBotCore)"
          strokeWidth="3.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#sfGlow)"
        />

        {/* AI Intelligence Sparkle Node - Top Right */}
        <path
          d="M34 11L35.2 13.8L38 15L35.2 16.2L34 19L32.8 16.2L30 15L32.8 13.8L34 11Z"
          fill="url(#sfBotFlame)"
        />

        {/* AI Intelligence Sparkle Nodes */}
        <circle cx="15.5" cy="18.5" r="1.8" fill="#FDE047" />
        <circle cx="32.5" cy="28.5" r="1.5" fill="#E9D5FF" />
      </svg>
    </div>
  );
});

SkillForgeBotIcon.displayName = 'SkillForgeBotIcon';

export default SkillForgeBotIcon;
