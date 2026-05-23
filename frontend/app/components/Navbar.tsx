import React from 'react';

export default function Navbar() {
  return (
    <nav className="w-full bg-ghSection border-b border-ghBorder px-4 py-3 flex items-center justify-between">
      {/* Left side: Logo & Navigation Links */}
      <div className="flex items-center space-x-4">
        {/* Mock GitHub Logo (Octocat Icon Placeholder) */}
        <div className="text-ghText font-black text-xl tracking-tight hover:text-opacity-80 cursor-pointer">
          🐙 <span className="hidden sm:inline ml-1 font-bold">OctoHub</span>
        </div>
        
        {/* Navigation Items */}
        <div className="hidden md:flex items-center space-x-3 text-sm font-semibold text-ghText">
          <span className="hover:bg-ghBorder px-2 py-1 rounded cursor-pointer transition">Dashboard</span>
          <span className="hover:bg-ghBorder px-2 py-1 rounded cursor-pointer text-ghTextMuted transition">Repositories</span>
          <span className="hover:bg-ghBorder px-2 py-1 rounded cursor-pointer text-ghTextMuted transition">Pull Requests</span>
        </div>
      </div>

      {/* Center: Command Search Bar */}
      <div className="flex-1 max-w-md mx-4 hidden sm:block">
        <div className="relative">
          <input 
            type="text" 
            placeholder="Type / to search or jump to..." 
            className="w-full bg-ghBg border border-ghBorder rounded-md px-3 py-1 text-xs text-ghText placeholder-ghTextMuted focus:outline-none focus:border-blue-500 transition"
            disabled
          />
          <div className="absolute right-2 top-1.5 bg-ghSection border border-ghBorder rounded px-1.5 text-[10px] text-ghTextMuted">
            /
          </div>
        </div>
      </div>

      {/* Right side: Actions & Profile Indicator */}
      <div className="flex items-center space-x-3">
        {/* Mock Notifications Button */}
        <button className="text-ghTextMuted hover:text-ghText p-1 rounded-md hover:bg-ghBorder transition">
          🔔
        </button>
        
        {/* Mock Create New Button */}
        <button className="text-ghTextMuted hover:text-ghText p-1 rounded-md hover:bg-ghBorder transition text-lg leading-none">
          ＋
        </button>

        {/* User Profile Avatar Circle Placeholder */}
        <div className="w-7 h-7 bg-ghBorder rounded-full border border-ghBorder flex items-center justify-center text-xs font-bold text-ghText cursor-pointer hover:border-ghTextMuted transition">
          U
        </div>
      </div>
    </nav>
  );
}