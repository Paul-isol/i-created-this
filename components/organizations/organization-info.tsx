"use client";

import { useState } from "react";
import { Building2Icon, PlusIcon, SparklesIcon, TerminalIcon, UsersIcon } from "lucide-react";
import { Button } from "../ui/button";

export default function OrganizationInfo() {
  const [hasOrg, setHasOrg] = useState(false);
  const [orgName, setOrgName] = useState("");
  const [submittedName, setSubmittedName] = useState("");

  const handleCreateOrg = (e: React.FormEvent) => {
    e.preventDefault();
    if (orgName.trim()) {
      setSubmittedName(orgName);
      setHasOrg(true);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-2 border-b border-border pb-4">
        <Building2Icon className="size-5 text-primary" />
        <h2 className="font-heading text-lg font-black uppercase tracking-wider text-foreground">
          Organization Hub
        </h2>
      </div>

      {!hasOrg ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          {/* Main Option Card */}
          <div className="lg:col-span-2 border border-border bg-background p-6 shadow-sm space-y-6">
            <div className="space-y-2">
              <h3 className="font-heading text-sm font-bold uppercase tracking-wider text-foreground">
                Create an Organization
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed font-mono">
                Organizations allow developers to collaborate on products, share views and likes, and coordinate team reviews.
              </p>
            </div>

            <form onSubmit={handleCreateOrg} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-muted-foreground block">
                  Organization Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Antigravity Labs"
                  value={orgName}
                  onChange={(e) => setOrgName(e.target.value)}
                  className="w-full h-10 bg-card border border-border px-3 py-2 text-xs text-foreground focus:outline-none focus:border-primary transition-all duration-300 rounded-none placeholder:text-muted-foreground/60"
                  required
                />
              </div>

              <Button type="submit" className="font-mono text-[10px] font-bold uppercase tracking-widest rounded-none">
                <PlusIcon className="size-3.5 mr-1" />
                Initialize Org
              </Button>
            </form>
          </div>

          {/* Info Card */}
          <div className="border border-border/80 bg-background/50 p-5 border-l-2 border-l-primary shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-primary">
              <SparklesIcon className="size-4" />
              <h4 className="font-heading text-[11px] font-bold uppercase tracking-widest">
                Team Features
              </h4>
            </div>
            <p className="text-[11px] text-muted-foreground font-mono leading-relaxed">
              Teams can link multiple members, claim shared project authorship, and manage organization backlogs inside the directory.
            </p>
          </div>
        </div>
      ) : (
        <div className="border border-border bg-background p-6 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-border pb-4">
            <div className="flex items-center gap-3">
              <div className="size-10 bg-primary/10 border border-primary/20 text-primary flex items-center justify-center font-heading text-sm font-black uppercase">
                {submittedName.slice(0, 2)}
              </div>
              <div>
                <h3 className="font-heading text-sm font-bold uppercase tracking-wide text-foreground">
                  {submittedName}
                </h3>
                <p className="text-[10px] text-muted-foreground font-mono mt-0.5">
                  ID: org_{Math.random().toString(36).substring(2, 9)}
                </p>
              </div>
            </div>

            <span className="px-2 py-0.5 border border-primary/20 bg-primary/5 text-primary text-[8px] font-mono font-bold uppercase tracking-widest">
              Owner
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="border border-border/80 bg-background/50 p-4 space-y-2">
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <UsersIcon className="size-3.5" />
                <span className="text-[9px] font-mono font-bold uppercase tracking-wider">Members (1)</span>
              </div>
              <p className="text-xs font-bold text-foreground">1 Active Developer</p>
            </div>
            <div className="border border-border/80 bg-background/50 p-4 space-y-2">
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <TerminalIcon className="size-3.5" />
                <span className="text-[9px] font-mono font-bold uppercase tracking-wider">Console Logs</span>
              </div>
              <p className="text-[10px] text-muted-foreground font-mono truncate">&gt; org initialized successfully.</p>
            </div>
          </div>
          
          <Button variant="outline" onClick={() => setHasOrg(false)} className="font-mono text-[9px] font-bold uppercase tracking-widest rounded-none text-muted-foreground hover:text-foreground">
            Leave Organization
          </Button>
        </div>
      )}
    </div>
  );
}