import React from 'react';

// Define the shape of the profile prop coming from the homepage
interface NavbarProps {
  profile: unknown; 
  onSignOut: () => void;
}

export default function Navbar({ profile, onSignOut }: NavbarProps) {
  const LOGIN_URL = "http://localhost:8000/api/v1/auth/github/login/";

  return (
    <nav className="w-full bg-ghSection border-b border-ghBorder px-4 py-3 flex items-center justify-between selection:bg-blue-500/30">
      {/* Left side: Logo & Navigation Links */}
      <div className="flex items-center space-x-4">
        <div className="text-ghText font-black text-xl tracking-tight hover:text-opacity-80 cursor-pointer flex items-center">
          <span>🐙</span>
          <span className="ml-1.5 font-bold">OctoHub</span>
        </div>
        
        {/* Navigation Items (All now have proper hover and cursor-pointer) */}
        <div className="hidden md:flex items-center space-x-3 text-sm font-semibold text-ghText">
          <span className="hover:bg-ghBorder px-2 py-1 rounded cursor-pointer transition">Dashboard</span>
          <span className="hover:bg-ghBorder px-2 py-1 rounded cursor-pointer text-ghTextMuted hover:text-ghText transition">Repositories</span>
          <span className="hover:bg-ghBorder px-2 py-1 rounded cursor-pointer text-ghTextMuted hover:text-ghText transition">Pull Requests</span>
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

      {/* Right side: Actions & Dynamic Auth Toggle */}
      <div className="flex items-center space-x-3">
        <button className="text-ghTextMuted hover:text-ghText p-1 rounded-md hover:bg-ghBorder cursor-pointer transition">
          🔔
        </button>
        
        {/* DYNAMIC BUTTON: Switches based on authentication profile state */}
        {profile ? (
          <button 
            onClick={onSignOut}
            className="bg-[#da3637] hover:bg-opacity-95 text-white text-xs font-semibold px-3 py-1.5 rounded-md transition duration-150 ease-in-out shadow-sm flex items-center cursor-pointer"
          >
            Sign Out
          </button>
        ) : (
          <a 
            href={LOGIN_URL}
            className="bg-[#238636] hover:bg-opacity-90 text-white text-xs font-semibold px-3 py-1.5 rounded-md transition duration-150 ease-in-out shadow-sm flex items-center cursor-pointer"
          >
            Sign In with GitHub
          </a>
        )}
      </div>
    </nav>
  );
}