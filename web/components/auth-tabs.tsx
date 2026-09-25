"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Mail, Lock, Eye, EyeOff, User, Phone, Building2, MapPin, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { signIn, signUp } from "@/lib/store";
import type { Role } from "@/lib/types";

/**
 * This runs entirely client-side against lib/store.ts (localStorage) — see
 * that file's header comment for what that does and doesn't mean. The
 * password fields below are kept for a familiar sign-in shape, but nothing
 * checks them: there's no server to verify a password against. Signing in
 * looks an account up by email only. That's stated plainly in the form
 * rather than presented as real security it isn't.
 */
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

      {tab === "signin" ? <SignInForm onSwitch={() => setTab("signup")} /> : <SignUpForm />}

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

      <p className="mt-6 flex items-start gap-2 rounded-lg bg-secondary/60 p-3 text-xs text-muted-foreground">
        <AlertCircle className="mt-0.5 h-3.5 w-3.5 flex-none" />
        Prototype account, stored only in this browser. No password is verified — this demonstrates the procurement
        workflow, not production authentication.
      </p>
    </div>
  );
}

function SignInForm({ onSwitch }: { onSwitch: () => void }) {
  const router = useRouter();
  const [showPass, setShowPass] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState("");

  const submit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    window.setTimeout(() => {
      const result = signIn(email);
      setSubmitting(false);
      if (!result.ok) {
        setError(result.error);
        return;
      }
      router.push(`/dashboard/${result.user.role}`);
    }, 500);
  };

  return (
    <div>
      <h1 className="mb-1 font-display text-2xl font-semibold text-primary">Welcome back.</h1>
      <p className="mb-7 text-sm text-muted-foreground">Sign in to your BuildMart account.</p>

      {error && (
        <div className="mb-5 rounded-lg bg-destructive/10 p-3 text-sm text-destructive">
          {error}{" "}
          <button type="button" onClick={onSwitch} className="font-semibold underline">
            Create one
          </button>
        </div>
      )}

      <form onSubmit={submit} className="space-y-5">
        <TextField
          id="siEmail"
          label="Email Address"
          icon={<Mail className="h-4 w-4" />}
          type="email"
          placeholder="you@email.com"
          required
          value={email}
          onChange={setEmail}
        />
        <PasswordField id="siPassword" label="Password" show={showPass} onToggle={() => setShowPass((v) => !v)} placeholder="••••••••" />
        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-[4px] bg-primary py-3.5 text-sm font-semibold text-primary-foreground disabled:opacity-60"
        >
          {submitting ? "Signing in…" : "Sign In"}
        </button>
      </form>
    </div>
  );
}

function SignUpForm() {
  const router = useRouter();
  const [showPass, setShowPass] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [role, setRole] = useState<Role>("contractor");
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");

  const submit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    window.setTimeout(() => {
      const result = signUp({ role, name, company, email, phone, city });
      setSubmitting(false);
      if (!result.ok) {
        setError(result.error);
        return;
      }
      router.push(`/dashboard/${role}`);
    }, 500);
  };

  return (
    <div>
      <h1 className="mb-1 font-display text-2xl font-semibold text-primary">Create your account.</h1>
      <p className="mb-6 text-sm text-muted-foreground">Get matched to suppliers or start receiving procurement requests.</p>

      <div className="mb-6 grid grid-cols-2 gap-3">
        <RoleCard active={role === "contractor"} onClick={() => setRole("contractor")} label="I'm a Contractor" desc="I need to buy materials" />
        <RoleCard active={role === "supplier"} onClick={() => setRole("supplier")} label="I'm a Supplier" desc="I want to sell materials" />
      </div>

      {error && <div className="mb-5 rounded-lg bg-destructive/10 p-3 text-sm text-destructive">{error}</div>}

      <form onSubmit={submit} className="space-y-5">
        <TextField id="suName" label="Full Name" icon={<User className="h-4 w-4" />} placeholder="Rohit Kapoor" required value={name} onChange={setName} />
        <TextField id="suCompany" label="Company Name" icon={<Building2 className="h-4 w-4" />} placeholder="Kapoor Construction Co." required value={company} onChange={setCompany} />
        <TextField id="suEmail" label="Email Address" icon={<Mail className="h-4 w-4" />} type="email" placeholder="you@email.com" required value={email} onChange={setEmail} />
        <div className="grid grid-cols-2 gap-4">
          <TextField id="suPhone" label="Phone" icon={<Phone className="h-4 w-4" />} type="tel" placeholder="+91 98XXX XXXXX" value={phone} onChange={setPhone} />
          <TextField id="suCity" label="City" icon={<MapPin className="h-4 w-4" />} placeholder="Hyderabad" required value={city} onChange={setCity} />
        </div>
        <PasswordField id="signupPassword" label="Password" show={showPass} onToggle={() => setShowPass((v) => !v)} placeholder="Create a password" />
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
          {submitting ? "Creating account…" : `Create ${role === "contractor" ? "Contractor" : "Supplier"} Account`}
        </button>
      </form>
    </div>
  );
}

function RoleCard({ active, onClick, label, desc }: { active: boolean; onClick: () => void; label: string; desc: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-lg border p-3 text-left transition-colors",
        active ? "border-accent bg-secondary/60" : "border-border",
      )}
    >
      <div className="text-sm font-semibold text-primary">{label}</div>
      <div className="text-xs text-muted-foreground">{desc}</div>
    </button>
  );
}

function TextField({
  id,
  label,
  icon,
  type = "text",
  placeholder,
  required,
  value,
  onChange,
}: {
  id: string;
  label: string;
  icon: React.ReactNode;
  type?: string;
  placeholder?: string;
  required?: boolean;
  value?: string;
  onChange?: (v: string) => void;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-semibold text-primary">
        {label}
      </label>
      <div className="relative">
        <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground">{icon}</span>
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          required={required}
          value={value}
          onChange={onChange ? (e) => onChange(e.target.value) : undefined}
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
}: {
  id: string;
  label: string;
  show: boolean;
  onToggle: () => void;
  placeholder?: string;
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

export default AuthTabs;
