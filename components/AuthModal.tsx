"use client";

import React, { useState } from "react";
import { X, Mail, Lock, User as UserIcon, ArrowRight, CheckCircle2, AlertCircle, LogOut } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type AuthMode = "signin" | "signup" | "forgot";

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const { user, signInWithEmail, signUpWithEmail, signOut, resetPassword } = useAuth();
  const [mode, setMode] = useState<AuthMode>("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);
    setLoading(true);

    try {
      if (mode === "signin") {
        const { error } = await signInWithEmail(email, password);
        if (error) {
          setErrorMsg(error.message || "Failed to sign in. Please check your credentials.");
        } else {
          setSuccessMsg("Welcome back to Edlizer!");
          setTimeout(() => {
            onClose();
          }, 1000);
        }
      } else if (mode === "signup") {
        if (!password || password.length < 6) {
          setErrorMsg("Password must be at least 6 characters.");
          setLoading(false);
          return;
        }
        const { error } = await signUpWithEmail(email, password, fullName);
        if (error) {
          setErrorMsg(error.message || "Failed to create account.");
        } else {
          setSuccessMsg("Account created! Please check your email to verify your account.");
        }
      } else if (mode === "forgot") {
        const { error } = await resetPassword(email);
        if (error) {
          setErrorMsg(error.message || "Failed to send reset link.");
        } else {
          setSuccessMsg("Password reset email sent! Check your inbox.");
        }
      }
    } catch (err: unknown) {
      setErrorMsg(
        err instanceof Error ? err.message : "An unexpected error occurred."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    setLoading(true);
    await signOut();
    setLoading(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden border border-[#e6e0d3] z-10 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-6 bg-[#171512] text-white flex items-center justify-between relative">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#E3B358]">
              Edlizer Beauty Portal
            </span>
            <h3 className="font-display text-2xl font-normal mt-0.5">
              {user
                ? "Your Account"
                : mode === "signin"
                ? "Sign In"
                : mode === "signup"
                ? "Create Account"
                : "Reset Password"}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {user ? (
            /* Logged in view */
            <div className="space-y-6">
              <div className="p-4 rounded-2xl bg-[#f7f4ee] border border-[#e6e0d3] flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[#C58E2A]/20 text-[#C58E2A] flex items-center justify-center font-bold text-lg uppercase">
                  {user.user_metadata?.full_name
                    ? user.user_metadata.full_name.charAt(0)
                    : user.email?.charAt(0)}
                </div>
                <div className="overflow-hidden">
                  <div className="font-semibold text-sm text-[#171512] truncate">
                    {user.user_metadata?.full_name || "Valued Client"}
                  </div>
                  <div className="text-xs text-[#6f6a60] truncate">{user.email}</div>
                  <div className="text-[10px] text-[#2f8f5c] font-medium mt-0.5">
                    ● Connected via Supabase Auth
                  </div>
                </div>
              </div>

              <div className="space-y-2 text-xs text-[#6f6a60]">
                <div className="flex justify-between py-2 border-b border-[#e6e0d3]/60">
                  <span>User ID</span>
                  <span className="font-sans tabular-nums text-[#171512]">{user.id.slice(0, 12)}...</span>
                </div>
                <div className="flex justify-between py-2 border-b border-[#e6e0d3]/60">
                  <span>Last Signed In</span>
                  <span className="text-[#171512]">
                    {user.last_sign_in_at
                      ? new Date(user.last_sign_in_at).toLocaleDateString()
                      : "Today"}
                  </span>
                </div>
              </div>

              <button
                onClick={handleSignOut}
                disabled={loading}
                className="w-full bg-[#171512] hover:bg-red-700 text-white py-3 rounded-full text-xs uppercase font-semibold tracking-wider transition-colors flex items-center justify-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                <span>{loading ? "Signing Out..." : "Sign Out"}</span>
              </button>
            </div>
          ) : (
            /* Auth Form */
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Tabs */}
              <div className="grid grid-cols-2 gap-1 p-1 bg-[#f7f4ee] rounded-full border border-[#e6e0d3] text-xs font-semibold mb-2">
                <button
                  type="button"
                  onClick={() => {
                    setMode("signin");
                    setErrorMsg(null);
                    setSuccessMsg(null);
                  }}
                  className={`py-2 rounded-full transition-all uppercase tracking-wider ${
                    mode === "signin"
                      ? "bg-white text-[#171512] shadow-xs"
                      : "text-[#6f6a60] hover:text-[#171512]"
                  }`}
                >
                  Sign In
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMode("signup");
                    setErrorMsg(null);
                    setSuccessMsg(null);
                  }}
                  className={`py-2 rounded-full transition-all uppercase tracking-wider ${
                    mode === "signup"
                      ? "bg-white text-[#171512] shadow-xs"
                      : "text-[#6f6a60] hover:text-[#171512]"
                  }`}
                >
                  Register
                </button>
              </div>

              {/* Status alerts */}
              {errorMsg && (
                <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {successMsg && (
                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{successMsg}</span>
                </div>
              )}

              {/* Full Name for Signup */}
              {mode === "signup" && (
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#6f6a60] mb-1">
                    Full Name
                  </label>
                  <div className="relative flex items-center">
                    <UserIcon className="w-4 h-4 text-[#a49e91] absolute left-3.5" />
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Ama Mensah"
                      className="w-full bg-[#f7f4ee] border border-[#e6e0d3] rounded-xl pl-10 pr-4 py-2.5 text-xs text-[#171512] focus:outline-none focus:border-[#C58E2A]"
                    />
                  </div>
                </div>
              )}

              {/* Email */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#6f6a60] mb-1">
                  Email Address
                </label>
                <div className="relative flex items-center">
                  <Mail className="w-4 h-4 text-[#a49e91] absolute left-3.5" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full bg-[#f7f4ee] border border-[#e6e0d3] rounded-xl pl-10 pr-4 py-2.5 text-xs text-[#171512] focus:outline-none focus:border-[#C58E2A]"
                  />
                </div>
              </div>

              {/* Password */}
              {mode !== "forgot" && (
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-semibold uppercase tracking-wider text-[#6f6a60]">
                      Password
                    </label>
                    {mode === "signin" && (
                      <button
                        type="button"
                        onClick={() => {
                          setMode("forgot");
                          setErrorMsg(null);
                          setSuccessMsg(null);
                        }}
                        className="text-[11px] text-[#C58E2A] hover:underline"
                      >
                        Forgot password?
                      </button>
                    )}
                  </div>
                  <div className="relative flex items-center">
                    <Lock className="w-4 h-4 text-[#a49e91] absolute left-3.5" />
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-[#f7f4ee] border border-[#e6e0d3] rounded-xl pl-10 pr-4 py-2.5 text-xs text-[#171512] focus:outline-none focus:border-[#C58E2A]"
                    />
                  </div>
                </div>
              )}

              {/* Submit button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#C58E2A] hover:bg-[#E3B358] text-[#171512] font-semibold text-xs uppercase tracking-wider py-3.5 rounded-full shadow-lg transition-all duration-300 flex items-center justify-center gap-2 mt-4"
              >
                <span>
                  {loading
                    ? "Processing..."
                    : mode === "signin"
                    ? "Sign In to Edlizer"
                    : mode === "signup"
                    ? "Create Account"
                    : "Send Reset Link"}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {mode === "forgot" && (
                <div className="text-center pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setMode("signin");
                      setErrorMsg(null);
                      setSuccessMsg(null);
                    }}
                    className="text-xs text-[#6f6a60] hover:text-[#171512] underline"
                  >
                    Back to Sign In
                  </button>
                </div>
              )}
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
