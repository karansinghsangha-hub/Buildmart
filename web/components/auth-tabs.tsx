"use client";

import { useMemo, useState, type FormEvent } from "react";
import { Mail, Lock, Eye, EyeOff, User, Phone } from "lucide-react";
import { cn } from "@/lib/utils";

export function AuthTabs() {
  const [tab, setTab] = useState<"signin" | "signup">("signin");

  return (
    <div className="w-full max-w-[420px]">
      <div className="mb-8 flex rounded-full bg-secondary p-1">
        <button
          type="button"
          onClick={() => setTab("signin")}
          className={cn(
            "flex-1 rounded-full py-2.5 text-sm font-semibold text-muted-foreground transition-all",
            tab === "signin" && "bg-primary text-primary-foreground",
          )}
        >
          Sign In
        </button>
        <button
          type="button"
          onClick={() => setTab("signup")}
          className={cn(
            "flex-1 rounded-full py-2.5 text-sm font-semibold text-muted-foreground transition-all",
            tab === "signup" && "bg-primary text-primary-foreground",
          )}
        >
          Create Account
        </button>
      </div>

      {tab === "signin" ? <SignInForm /> : <SignUpForm />}

      <p className="mt-7 text-center text-sm text-muted-foreground">
        {tab === "signin" ? (
          <>
            New to BuildMart?{" "}
            <button type="button" onClick={() => setTab("signup")} className="font-bold text-accent">
              Create an account
            </button>
          </>
        ) : (
          <>
            Already have an account?{" "}
            <button type="button" onClick={() => setTab("signin")} className="font-bold text-accent">
              Sign in
            </button>
          </>
        )}
      </p>
    </div>
  );
}

function SignInForm() {
  const [showPass, setShowPass] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    window.setTimeout(() => setSubmitting(false), 900);
  };

  return (
    <div>
      <h1 className="mb-1 font-display text-2xl font-semibold text-primary">Welcome back.</h1>
      <p className="mb-7 text-sm text-muted-foreground">Sign in to track your project&apos;s live progress.</p>

      <form onSubmit={submit} className="space-y-5">
        <TextField id="siEmail" label="Email Address" icon={<Mail className="h-4 w-4" />} type="email" placeholder="you@email.com" required />
        <PasswordField
          id="siPassword"
          label="Password"
          show={showPass}
          onToggle={() => setShowPass((v) => !v)}
          placeholder="••••••••"
        />
        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2 text-muted-foreground">
            <input type="checkbox" className="h-4 w-4 accent-primary" />
            Remember me
          </label>
          <a href="#" className="font-semibold text-accent">Forgot password?</a>
        </div>
        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-[4px] bg-primary py-3.5 text-sm font-semibold text-primary-foreground disabled:opacity-60"
        >
          {submitting ? "Signing in…" : "Sign In"}
        </button>
      </form>

      <div className="my-6 flex items-center gap-4 text-xs text-muted-foreground">
        <span className="h-px flex-1 bg-border" />
        or continue with
        <span className="h-px flex-1 bg-border" />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <SocialButton label="Google" />
        <SocialButton label="Apple" />
      </div>
    </div>
  );
}

function SignUpForm() {
  const [showPass, setShowPass] = useState(false);
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const strength = useMemo(() => {
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    return score;
  }, [password]);

  const strengthColor = ["#a3392b", "#a9803f", "#a9803f", "#33724a"][Math.max(strength - 1, 0)];

  const submit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    window.setTimeout(() => setSubmitting(false), 900);
  };

  return (
    <div>
      <h1 className="mb-1 font-display text-2xl font-semibold text-primary">Create your account.</h1>
      <p className="mb-7 text-sm text-muted-foreground">
        Get formal quotes, track builds and message your engineer directly.
      </p>

      <form onSubmit={submit} className="space-y-5">
        <TextField id="suName" label="Full Name" icon={<User className="h-4 w-4" />} placeholder="Rohit Kapoor" required />
        <TextField id="suEmail" label="Email Address" icon={<Mail className="h-4 w-4" />} type="email" placeholder="you@email.com" required />
        <TextField id="suPhone" label="Phone Number" icon={<Phone className="h-4 w-4" />} type="tel" placeholder="+91 98XXX XXXXX" />
        <div>
          <PasswordField
            id="signupPassword"
            label="Password"
            show={showPass}
            onToggle={() => setShowPass((v) => !v)}
            placeholder="Create a strong password"
            value={password}
            onChange={setPassword}
          />
          <div className="mt-2 flex gap-1">
            {[0, 1, 2, 3].map((i) => (
              <span
                key={i}
                className="h-1 flex-1 rounded-full bg-border transition-colors"
                style={{ background: i < strength ? strengthColor : undefined }}
              />
            ))}
          </div>
          <p className="mt-1.5 text-xs text-muted-foreground">Use 8+ characters with a number and a symbol.</p>
        </div>
        <label className="flex items-start gap-2 text-sm text-muted-foreground">
          <input type="checkbox" required className="mt-0.5 h-4 w-4 accent-primary" />
          <span>
            I agree to the <a href="#" className="font-semibold text-accent">Terms</a> &amp;{" "}
            <a href="#" className="font-semibold text-accent">Privacy Policy</a>
          </span>
        </label>
        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-[4px] bg-primary py-3.5 text-sm font-semibold text-primary-foreground disabled:opacity-60"
        >
          {submitting ? "Creating account…" : "Create Account"}
        </button>
      </form>
    </div>
  );
}

function TextField({
  id,
  label,
  icon,
  type = "text",
  placeholder,
  required,
}: {
  id: string;
  label: string;
  icon: React.ReactNode;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-semibold text-primary">
        {label}
      </label>
      <div className="relative">
        <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground">
          {icon}
        </span>
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          required={required}
          className="w-full rounded-[4px] border border-border bg-card py-3 pl-10 pr-3 text-sm focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
        />
      </div>
    </div>
  );
}

function PasswordField({
  id,
  label,
  show,
  onToggle,
  placeholder,
  value,
  onChange,
}: {
  id: string;
  label: string;
  show: boolean;
  onToggle: () => void;
  placeholder?: string;
  value?: string;
  onChange?: (v: string) => void;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-semibold text-primary">
        {label}
      </label>
      <div className="relative">
        <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground">
          <Lock className="h-4 w-4" />
        </span>
        <input
          id={id}
          type={show ? "text" : "password"}
          placeholder={placeholder}
          required
          value={value}
          onChange={onChange ? (e) => onChange(e.target.value) : undefined}
          className="w-full rounded-[4px] border border-border bg-card py-3 pl-10 pr-10 text-sm focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
        />
        <button
          type="button"
          onClick={onToggle}
          aria-label={show ? "Hide password" : "Show password"}
          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground"
        >
          {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </button>
      </div>
    </div>
  );
}

function SocialButton({ label }: { label: string }) {
  return (
    <button
      type="button"
      className="flex items-center justify-center gap-2 rounded-[4px] border border-border bg-card py-3 text-sm font-semibold text-primary transition-colors hover:border-primary"
    >
      {label}
    </button>
  );
}

export default AuthTabs;
