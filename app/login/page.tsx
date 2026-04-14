"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Lock, Loader2 } from "lucide-react";

export default function LoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      router.push("/");
      router.refresh();
    } else {
      setError("Mot de passe incorrect.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center px-4 bg-grid-pattern">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-cyan-500/5 blur-3xl pointer-events-none" aria-hidden="true" />

      <div className="relative z-10 w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-white/5 border border-white/10 text-cyan-400 mb-4">
            <Lock size={22} aria-hidden="true" />
          </div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">
            Saïd<span className="text-cyan-400">.</span>
          </h1>
          <p className="text-sm text-slate-500 mt-1">Site privé — accès restreint</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white/5 border border-white/10 rounded-2xl p-7 backdrop-blur-sm"
        >
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-slate-300 mb-1.5">
              Mot de passe
            </label>
            <input
              id="password"
              type="password"
              required
              autoFocus
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••"
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-slate-100 placeholder-slate-600 text-sm focus:outline-none focus:border-cyan-400/50 transition-all duration-200 min-h-[44px]"
            />
            {error && (
              <p className="mt-2 text-xs text-red-400">{error}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 w-full px-6 py-3.5 text-sm font-semibold text-slate-950 bg-linear-to-r from-cyan-400 to-blue-500 rounded-xl hover:opacity-90 disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-200 min-h-[44px]"
          >
            {loading ? (
              <><Loader2 size={16} className="animate-spin" aria-hidden="true" />Vérification...</>
            ) : (
              "Accéder au site"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
