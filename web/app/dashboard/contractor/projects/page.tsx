"use client";

import { useState, type FormEvent } from "react";
import { Plus, MapPin } from "lucide-react";
import { DashboardShell, DashboardPageHeader } from "@/components/dashboard/dashboard-shell";
import { useStore, createProject } from "@/lib/store";
import { useCurrentUser } from "@/lib/use-current-user";
import { fmtINR } from "@/lib/format";

function ProjectsContent() {
  const user = useCurrentUser()!;
  const store = useStore();
  const [showForm, setShowForm] = useState(false);
  const myProjects = store.projects.filter((p) => p.contractorId === user.id);

  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [value, setValue] = useState("");

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!name || !location || !value) return;
    createProject({ name, location, valueInr: Number(value) });
    setName("");
    setLocation("");
    setValue("");
    setShowForm(false);
  };

  return (
    <>
      <DashboardPageHeader
        title="My Projects"
        description="Every project you're procuring materials for."
        action={
          <button
            type="button"
            onClick={() => setShowForm((v) => !v)}
            className="flex items-center gap-2 rounded-[4px] bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground"
          >
            <Plus className="h-4 w-4" />
            New Project
          </button>
        }
      />

      {showForm && (
        <form onSubmit={submit} className="mb-8 grid gap-4 rounded-2xl border border-border bg-card p-6 sm:grid-cols-3">
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-primary">Project Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Green Residency"
              required
              className="w-full rounded-[4px] border border-border bg-background p-2.5 text-sm focus:border-accent focus:outline-none"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-primary">Location</label>
            <input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Hyderabad, Telangana"
              required
              className="w-full rounded-[4px] border border-border bg-background p-2.5 text-sm focus:border-accent focus:outline-none"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-primary">Project Value (₹)</label>
            <input
              type="number"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="5000000"
              required
              className="w-full rounded-[4px] border border-border bg-background p-2.5 text-sm focus:border-accent focus:outline-none"
            />
          </div>
          <div className="sm:col-span-3">
            <button type="submit" className="rounded-[4px] bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground">
              Create Project
            </button>
          </div>
        </form>
      )}

      {myProjects.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border p-12 text-center text-muted-foreground">
          No projects yet. Create one to start posting procurement requests against it.
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {myProjects.map((p) => (
            <div key={p.id} className="rounded-2xl border border-border bg-card p-6">
              <div className="mb-3 flex items-start justify-between">
                <h3 className="font-semibold text-primary">{p.name}</h3>
                <span className="rounded-full bg-secondary px-2.5 py-1 text-xs font-semibold capitalize text-muted-foreground">
                  {p.status}
                </span>
              </div>
              <div className="mb-3 flex items-center gap-1.5 text-sm text-muted-foreground">
                <MapPin className="h-3.5 w-3.5" />
                {p.location}
              </div>
              <div className="text-sm text-muted-foreground">
                Project value <span className="font-semibold text-primary">{fmtINR(p.valueInr)}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default function ProjectsPage() {
  return (
    <DashboardShell requiredRole="contractor">
      <ProjectsContent />
    </DashboardShell>
  );
}
