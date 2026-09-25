"use client";

import { useState, type FormEvent } from "react";
import { User, Phone, Mail, MapPin, Building2 } from "lucide-react";

export function ContactForm() {
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    // Front-end only demo — no backend is wired up yet.
    window.setTimeout(() => {
      setSubmitting(false);
      setDone(true);
      e.currentTarget.reset();
      window.setTimeout(() => setDone(false), 4000);
    }, 900);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <FieldInput id="fullName" label="Full Name" icon={<User className="h-4 w-4" />} placeholder="Rohit Kapoor" required />
        <FieldInput id="phoneNo" label="Phone Number" icon={<Phone className="h-4 w-4" />} placeholder="+91 98XXX XXXXX" type="tel" required />
      </div>
      <FieldInput id="emailAddr" label="Email Address" icon={<Mail className="h-4 w-4" />} placeholder="you@email.com" type="email" required />
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="inquiryType" className="mb-2 block text-sm font-semibold text-primary">
            I am a
          </label>
          <div className="relative">
            <Building2 className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <select
              id="inquiryType"
              className="w-full rounded-[4px] border border-border bg-card py-3 pl-10 pr-3 text-sm focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
            >
              <option>Contractor</option>
              <option>Supplier</option>
              <option>Partner / Investor</option>
              <option>Other</option>
            </select>
          </div>
        </div>
        <FieldInput id="cityLoc" label="City" icon={<MapPin className="h-4 w-4" />} placeholder="Gurugram" />
      </div>
      <div>
        <label htmlFor="msgBox" className="mb-2 block text-sm font-semibold text-primary">
          Project Details
        </label>
        <textarea
          id="msgBox"
          rows={4}
          placeholder="Tell us what you need — materials, categories, or how we can help…"
          className="w-full resize-y rounded-[4px] border border-border bg-card p-3 text-sm focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
        />
      </div>
      <button
        type="submit"
        disabled={submitting}
        className="w-full rounded-[4px] bg-accent px-6 py-3.5 text-sm font-semibold text-accent-foreground shadow-sm transition-transform hover:-translate-y-0.5 disabled:opacity-60"
      >
        {submitting ? "Please wait…" : done ? "Enquiry sent ✓" : "Submit Enquiry"}
      </button>
    </form>
  );
}

function FieldInput({
  id,
  label,
  icon,
  placeholder,
  type = "text",
  required,
}: {
  id: string;
  label: string;
  icon: React.ReactNode;
  placeholder?: string;
  type?: string;
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

export default ContactForm;
