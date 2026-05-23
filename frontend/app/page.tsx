'use client';

import { useEffect, useState } from 'react';

interface UserProfile {
  id: number;
  username: string;
  email: string;
  bio: string;
  location: string;
  avatar_url: string | null;
  date_joined: string;
}

export default function Home() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Attempt to check if an authenticated session exists on the backend
    async function checkSession() {
      try {
        // We'll peek into our database profile. 
        // In a full production system, we'd call an auth/me endpoint.
        // For our monorepo milestone, we try to fetch our logged-in state.
        const response = await fetch('http://localhost:8000/api/v1/users/wisdomtheophilus100-cloud/');
        
        if (response.ok) {
          const data = await response.json();
          setProfile(data);
        }
      } catch (err) {
        console.error("Error checking authentication session:", err);
        console.log("No active authentication session detected.");
      } finally {
        setLoading(false);
      }
    }

    checkSession();
  }, []);

  if (loading) {
    return (
      <main className="flex min-h-[80vh] items-center justify-center bg-ghBg text-ghTextMuted">
        <div className="animate-pulse text-sm">Synchronizing with OctoHub core...</div>
      </main>
    );
  }

  // CONDITION 1: User is NOT logged in yet (Anonymous State)
  if (!profile) {
    return (
      <main className="min-h-[85vh] bg-ghBg text-ghText flex flex-col items-center justify-center px-4">
        <div className="max-w-md text-center space-y-6 border border-ghBorder bg-ghSection p-8 rounded-lg shadow-xl">
          <div className="text-5xl">📊</div>
          <h1 className="text-2xl font-bold tracking-tight">Welcome to OctoHub</h1>
          <p className="text-sm text-ghTextMuted leading-relaxed">
            A specialized monorepo system tracking engineering metrics. To view your synchronized repository profiles and commit streams, authenticate via the secure gateway.
          </p>
          <div className="pt-2">
            <a 
              href="http://localhost:8000/api/v1/auth/github/login/"
              className="inline-block bg-[#238636] hover:bg-opacity-90 text-white text-xs font-bold px-4 py-2.5 rounded-md transition"
            >
              Get Started with GitHub
            </a>
          </div>
        </div>
      </main>
    );
  }

  // CONDITION 2: User IS logged in successfully (Authenticated State)
  return (
    <main className="min-h-[85vh] bg-ghBg text-ghText px-4 py-12 max-w-4xl mx-auto">
      <div className="bg-ghSection border border-ghBorder rounded-lg p-6 shadow-xl space-y-6">
        
        {/* Profile Card Header */}
        <div className="flex items-center space-x-4">
          {profile.avatar_url ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img 
              src={profile.avatar_url} 
              alt={profile.username}
              className="w-16 h-16 rounded-full border-2 border-ghBorder object-cover"
            />
          ) : (
            <div className="w-16 h-16 bg-ghBorder rounded-full flex items-center justify-center text-2xl font-bold uppercase">
              {profile.username[0]}
            </div>
          )}
        
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-xl font-bold tracking-tight">{profile.username}</h1>
              <span className="bg-ghBorder text-ghTextMuted text-[10px] px-2 py-0.5 rounded-full border border-ghBorder font-mono">
                PROVISIONED
              </span>
            </div>
            <p className="text-sm text-ghTextMuted">{profile.email}</p>
          </div>
        </div>

        <hr className="border-ghBorder" />

        {/* Detailed Meta Parameters */}
        <div className="space-y-4 text-sm">
          <div>
            <span className="text-ghTextMuted block text-xs font-semibold uppercase tracking-wider font-mono">Profile Bio</span>
            <p className="mt-1 bg-ghBg border border-ghBorder rounded p-3 text-sm italic text-ghTextMuted">
              {profile.bio || "This GitHub account hasn't established a public bio matrix yet."}
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="bg-ghBg border border-ghBorder p-3 rounded">
              <span className="text-ghTextMuted block text-xs font-semibold uppercase tracking-wider font-mono">Location Data</span>
              <p className="mt-1 font-medium">{profile.location || "Remote / Unspecified"}</p>
            </div>
            <div className="bg-ghBg border border-ghBorder p-3 rounded">
              <span className="text-ghTextMuted block text-xs font-semibold uppercase tracking-wider font-mono">Synchronization Date</span>
              <p className="mt-1 font-medium">{new Date(profile.date_joined).toLocaleDateString()}</p>
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}