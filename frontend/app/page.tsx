'use client'; // This tells Next.js this file runs in the browser

import { useEffect, useState } from 'react';

// Define what our User data looks like based on our Django Serializer
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
  const [error, setError] = useState<string | null>(null);

  // Replace this with the actual superuser username you created in Day 1
  const TARGET_USERNAME = "OctoHub123"; 

  useEffect(() => {
    // Asynchronous function to fetch data from our Django Backend
    async function fetchProfile() {
      try {
        const response = await fetch(`http://localhost:8000/api/v1/users/${TARGET_USERNAME}/`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch user profile from backend');
        }
        
        const data = await response.json();
        setProfile(data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unexpected error occurred');
        }
      } finally {
        setLoading(false);
      }
    }

    fetchProfile();
  }, []);

  // 1. Loading State Screen
  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-ghBg text-ghTextMuted">
        <div className="animate-pulse text-sm">Loading profile matrix...</div>
      </main>
    );
  }

  // 2. Error State Screen
  if (error || !profile) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-ghBg text-red-400 p-6 text-center">
        <div className="border border-red-900 bg-red-950/30 px-4 py-3 rounded-md">
          <p className="font-semibold">Backend Connection Failure</p>
          <p className="text-xs mt-1 text-red-300/80">{error || "User data empty"}</p>
        </div>
      </main>
    );
  }

  // 3. Success State: Render the Profile Card using GitHub colors!
  return (
    <main className="min-h-screen bg-ghBg text-ghText px-4 py-8 max-w-4xl mx-auto">
      <div className="bg-ghSection border border-ghBorder rounded-lg p-6 shadow-xl">
        <div className="flex items-center space-x-4">
          {/* Circular Profile Identifier */}
          <div className="w-16 h-16 bg-ghBorder rounded-full flex items-center justify-center text-2xl font-bold text-ghText uppercase">
            {profile.username[0]}
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight">{profile.username}</h1>
            <p className="text-sm text-ghTextMuted">{profile.email}</p>
          </div>
        </div>

        <hr className="border-ghBorder my-4" />

        {/* Detailed Meta Grid */}
        <div className="space-y-3 text-sm">
          <div>
            <span className="text-ghTextMuted block text-xs font-semibold uppercase tracking-wider">Bio</span>
            <p className="mt-0.5">{profile.bio || "No profile bio structured yet."}</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div>
              <span className="text-ghTextMuted block text-xs font-semibold uppercase tracking-wider">Location</span>
              <p className="mt-0.5">{profile.location || "Not Specified"}</p>
            </div>
            <div>
              <span className="text-ghTextMuted block text-xs font-semibold uppercase tracking-wider">Engine Joined</span>
              <p className="mt-0.5">{new Date(profile.date_joined).toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}