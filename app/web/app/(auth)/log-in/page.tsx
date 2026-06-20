"use client";
import React, { useState } from "react";
import { GlassPanel } from "@healthmesh/ui";
import { useRouter } from "next/navigation";
import { useStore } from "../../../store/useStore";
import { Shield } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

export default function LogInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const login = useStore((state) => state.login);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      // Simulate network delay
      await new Promise(r => setTimeout(r, 800));

      if (password.length < 4) {
        throw new Error("Invalid cryptographic credential.");
      }

      // Mock Login
      login(email);

      // Determine role based on email to set cookie
      let role = 'patient';
      if (email.includes('hospital')) role = 'hospital';
      else if (email.includes('pharmacy')) role = 'pharmacy';
      else if (email.includes('insurance')) role = 'insurance';

      document.cookie = `healthmesh_token=${role}; path=/; max-age=86400`;
      
      toast.success("Authentication successful");
      router.push("/");
    } catch (err: any) {
      setError(err.message || "Authentication failed");
      toast.error("Authentication failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <GlassPanel accentColor="cyan" className="w-full max-w-md">
        <div className="flex flex-col items-center mb-8">
          <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#29F0E0] to-[#2E6FFF] shadow-[0_0_20px_rgba(41,240,224,0.3)] mb-4 flex items-center justify-center">
            <Shield className="text-black w-6 h-6" />
          </div>
          <h1 className="text-2xl font-medium text-white">Access Network</h1>
          <p className="text-white/50 text-sm mt-1">Enter your cryptographic credentials.</p>
        </div>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div>
            <label className="text-xs text-white/50 uppercase tracking-widest mb-1 block">Email</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-black/40 border border-white/10 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-[#29F0E0]/50 transition-colors"
              required
              placeholder="patient@demo.com"
            />
          </div>
          <div>
            <label className="text-xs text-white/50 uppercase tracking-widest mb-1 block">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-black/40 border border-white/10 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-[#29F0E0]/50 transition-colors"
              required
              placeholder="••••••••"
            />
          </div>

          {error && <p className="text-[#FF4D6D] text-sm">{error}</p>}

          <button 
            type="submit" 
            disabled={isLoading}
            className="mt-4 w-full py-3 rounded-lg bg-gradient-to-r from-[#29F0E0] to-[#2E6FFF] text-black font-medium hover:opacity-90 transition-opacity shadow-[0_0_20px_rgba(41,240,224,0.2)] disabled:opacity-50"
          >
            {isLoading ? "Authenticating..." : "Authenticate"}
          </button>
        </form>

        <div className="mt-6 text-center flex flex-col gap-2">
          <p className="text-sm text-white/40">
            Unregistered entity? <Link href="/sign-up" className="text-[#29F0E0] hover:underline">Request access.</Link>
          </p>
          <div className="mt-4 pt-4 border-t border-white/10 text-xs text-white/30 text-left">
            <p className="font-medium mb-1">Demo Credentials:</p>
            <ul className="space-y-1">
              <li>patient@demo.com</li>
              <li>hospital@demo.com</li>
              <li>pharmacy@demo.com</li>
              <li>insurance@demo.com</li>
            </ul>
          </div>
        </div>
      </GlassPanel>
    </div>
  );
}
