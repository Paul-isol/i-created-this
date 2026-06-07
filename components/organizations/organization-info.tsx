"use client";

import { useState, useEffect } from "react";
import {
  Building2Icon,
  PlusIcon,
  SparklesIcon,
  TerminalIcon,
  UsersIcon,
  CheckIcon,
  ArrowRightIcon,
  Loader2Icon,
} from "lucide-react";
import { Button } from "../ui/button";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import {
  getAllOrganizationsAction,
  joinOrganizationAction,
} from "@/lib/organizations/org-actions";
import Link from "next/link";

interface DiscoverableOrg {
  id: string;
  name: string;
  slug: string;
  createdAt: string;
  memberCount: number;
  isMember: boolean;
}

export default function OrganizationInfo() {
  const { data: session, isPending: isSessionPending } = authClient.useSession();
  const { data: activeOrg, isPending: isOrgPending } = authClient.useActiveOrganization();
  const { data: orgList, isPending: isListPending } = authClient.useListOrganizations();

  const [orgName, setOrgName] = useState("");
  const [createLoading, setCreateLoading] = useState(false);
  
  const [allOrgs, setAllOrgs] = useState<DiscoverableOrg[]>([]);
  const [loadingDirectory, setLoadingDirectory] = useState(false);

  // Fetch all organizations in the system (for the discover directory)
  const fetchDirectory = async () => {
    setLoadingDirectory(true);
    const res = await getAllOrganizationsAction();
    if (res.success) {
      setAllOrgs(res.organizations);
    }
    setLoadingDirectory(false);
  };

  useEffect(() => {
    if (session) {
      fetchDirectory();
    }
  }, [session, activeOrg]);

  const handleCreateOrg = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!orgName.trim()) return;

    // Generate slug: lowercase, no special characters, dashes for spaces
    const slug = orgName
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-");

    await authClient.organization.create(
      {
        name: orgName,
        slug: slug,
      },
      {
        onRequest: () => {
          setCreateLoading(true);
        },
        onSuccess: () => {
          setCreateLoading(false);
          setOrgName("");
          toast.success(`Organization "${orgName}" created!`);
          fetchDirectory();
        },
        onError: (ctx) => {
          setCreateLoading(false);
          toast.error(ctx.error.message || "Failed to create organization.");
        },
      }
    );
  };

  const handleSetActive = async (orgId: string) => {
    await authClient.organization.setActive(
      {
        organizationId: orgId,
      },
      {
        onSuccess: () => {
          toast.success("Switched active organization!");
        },
        onError: (ctx) => {
          toast.error(ctx.error.message || "Failed to switch organization.");
        },
      }
    );
  };

  const handleJoinOrg = async (orgId: string, orgName: string) => {
    const res = await joinOrganizationAction(orgId);
    if (res.success) {
      toast.success(res.message);
      // Automatically switch to the newly joined organization
      await handleSetActive(orgId);
    } else {
      toast.error(res.message || "Failed to join organization.");
    }
  };

  const handleLeaveOrg = async (orgId: string) => {
    if (!confirm("Are you sure you want to leave this organization?")) return;
    
    await authClient.organization.leave(
      {
        organizationId: orgId,
      },
      {
        onSuccess: () => {
          toast.success("Left organization successfully.");
          fetchDirectory();
        },
        onError: (ctx) => {
          toast.error(ctx.error.message || "Failed to leave organization.");
        },
      }
    );
  };

  if (isSessionPending) {
    return (
      <div className="flex flex-col items-center justify-center py-12 font-mono text-xs text-muted-foreground gap-2">
        <Loader2Icon className="size-4 animate-spin text-primary" />
        Checking login status...
      </div>
    );
  }

  if (!session) {
    return (
      <div className="border border-border bg-card p-8 text-center space-y-4 max-w-sm mx-auto">
        <TerminalIcon className="size-8 text-destructive mx-auto animate-pulse" />
        <h3 className="font-heading text-sm font-bold uppercase tracking-wider text-foreground">
          Sign In Required
        </h3>
        <p className="text-xs text-muted-foreground font-mono leading-relaxed">
          Please sign in to manage your organizations and collaborate with teams.
        </p>
        <Link href="/login" className="block">
          <Button className="font-mono text-[10px] font-bold uppercase tracking-wider w-full rounded-none">
            Sign In
          </Button>
        </Link>
      </div>
    );
  }

  // Filter organizations to list only directory ones that the user has not joined
  const joinedOrgIds = new Set(orgList?.map((o) => o.id) || []);
  const discoverableOrgs = allOrgs.filter((o) => !joinedOrgIds.has(o.id));
  const hasOrgs = orgList && orgList.length > 0;

  return (
    <div className="max-w-2xl mx-auto space-y-12 py-4">
      {/* Title Header */}
      <div className="flex items-center gap-2 pb-4">
        <Building2Icon className="size-4 text-primary" />
        <h2 className="font-heading text-base font-black uppercase tracking-wider text-foreground">
          Organization Hub
        </h2>
      </div>

      {/* Main Single-Column Stack */}
      <div className="space-y-12 divide-y divide-border/60">
        
        {/* Section 1: Active Organization */}
        <div className="space-y-4 pt-0">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-mono text-muted-foreground uppercase tracking-wider font-bold">
              Active Organization
            </h3>
            {activeOrg && (
              <span className="text-[9px] font-mono text-green-500 uppercase tracking-widest bg-green-500/5 px-2 py-0.5 border border-green-500/10">
                Active
              </span>
            )}
          </div>

          {isOrgPending ? (
            <div className="py-6 flex items-center justify-center font-mono text-xs text-muted-foreground gap-2">
              <Loader2Icon className="size-3.5 animate-spin text-primary" />
              Loading organization...
            </div>
          ) : activeOrg ? (
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="size-8 border border-primary/20 bg-primary/5 text-primary flex items-center justify-center font-heading text-xs font-black uppercase">
                  {activeOrg.name.slice(0, 2)}
                </div>
                <div>
                  <h4 className="font-heading text-sm font-bold uppercase text-foreground">
                    {activeOrg.name}
                  </h4>
                  <p className="text-[10px] text-muted-foreground font-mono">
                    ID: {activeOrg.id}
                  </p>
                </div>
              </div>

              {/* Status details & Members - Stacked in a single column */}
              <div className="space-y-4 font-mono text-xs">
                {/* Org Status Card */}
                <div className="border border-border/50 p-4 space-y-2 bg-muted/10">
                  <div className="flex justify-between py-1 border-b border-border/20">
                    <span className="text-muted-foreground">Slug:</span>
                    <span className="text-foreground font-medium">{activeOrg.slug}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-border/20">
                    <span className="text-muted-foreground">Members:</span>
                    <span className="text-foreground font-medium">{activeOrg.members.length} active</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-muted-foreground">Status:</span>
                    <span className="text-green-500 font-bold">Connected & Ready</span>
                  </div>
                </div>

                {/* Workspace Members list */}
                <div className="border border-border/50 p-4 space-y-3">
                  <div className="flex items-center gap-1.5 text-muted-foreground border-b border-border/20 pb-2">
                    <UsersIcon className="size-3.5" />
                    <span className="text-[9px] font-bold uppercase tracking-wider">
                      Members List ({activeOrg.members.length})
                    </span>
                  </div>
                  <div className="space-y-2 max-h-[160px] overflow-y-auto">
                    {activeOrg.members.map((member) => (
                      <div
                        key={member.id}
                        className="flex items-center justify-between text-xs py-0.5"
                      >
                        <span className="truncate text-foreground max-w-[200px]">
                          {member.user?.name || member.userId}
                        </span>
                        <span className="text-[9px] uppercase text-muted-foreground">
                          {member.role}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex justify-start">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleLeaveOrg(activeOrg.id)}
                  className="font-mono text-[9px] font-bold uppercase tracking-widest rounded-none text-muted-foreground hover:text-red-500 hover:border-red-500/20"
                >
                  Leave Organization
                </Button>
              </div>
            </div>
          ) : (
            <div className="py-8 text-center border border-dashed border-border/60 font-mono text-xs text-muted-foreground">
              No active organization selected. Please select one below or create a new one.
            </div>
          )}
        </div>

        {/* Section 2: Switch Organization list */}
        <div className="space-y-4 pt-8">
          <h3 className="text-xs font-mono text-muted-foreground uppercase tracking-wider font-bold">
            Your Organizations
          </h3>

          <div className="border border-border divide-y divide-border bg-card/25">
            {isListPending ? (
              <div className="p-6 text-center font-mono text-xs text-muted-foreground">
                Loading organizations...
              </div>
            ) : !orgList || orgList.length === 0 ? (
              <div className="p-6 text-center font-mono text-xs text-muted-foreground">
                You are not a member of any organizations yet.
              </div>
            ) : (
              orgList.map((org) => {
                const isActive = activeOrg?.id === org.id;
                return (
                  <div
                    key={org.id}
                    className="p-4 flex items-center justify-between gap-4"
                  >
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="font-heading text-sm font-bold uppercase text-foreground">
                          {org.name}
                        </span>
                        <span className="text-[9px] font-mono text-muted-foreground">
                          ({org.slug})
                        </span>
                      </div>
                      <p className="text-[9px] text-muted-foreground font-mono">
                        ID: {org.id}
                      </p>
                    </div>

                    <div>
                      {isActive ? (
                        <span className="inline-flex items-center gap-1 font-mono text-[9px] font-bold uppercase tracking-widest text-primary border border-primary/20 bg-primary/5 px-2 py-0.5">
                          <CheckIcon className="size-2.5" />
                          Active
                        </span>
                      ) : (
                        <Button
                          variant="outline"
                          onClick={() => handleSetActive(org.id)}
                          className="font-mono text-[9px] font-bold uppercase tracking-wider rounded-none gap-1 py-1 h-7"
                        >
                          Select
                          <ArrowRightIcon className="size-2.5" />
                        </Button>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Section 3: Create Organization Form */}
        {!hasOrgs && (
          <div className="space-y-4 pt-8">
            <h3 className="text-xs font-mono text-muted-foreground uppercase tracking-wider font-bold">
              Create Organization
            </h3>
            <p className="text-xs text-muted-foreground font-mono leading-relaxed">
              Start a new organization to publish products and collaborate with other developers.
            </p>

            <form onSubmit={handleCreateOrg} className="space-y-4 max-w-md">
              <div className="space-y-1.5">
                <label className="text-[9px] font-mono font-bold uppercase tracking-wider text-muted-foreground block">
                  Organization Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Antigravity Labs"
                  value={orgName}
                  onChange={(e) => setOrgName(e.target.value)}
                  className="w-full h-9 bg-background border border-border px-3 py-2 text-xs text-foreground focus:outline-none focus:border-primary transition-all duration-300 rounded-none placeholder:text-muted-foreground/60 font-mono disabled:opacity-50"
                  required
                  disabled={createLoading}
                />
              </div>

              <Button
                type="submit"
                className="font-mono text-[9px] font-bold uppercase tracking-widest rounded-none h-9 gap-1 px-4"
                disabled={createLoading}
              >
                {createLoading ? (
                  <Loader2Icon className="size-3.5 animate-spin" />
                ) : (
                  <PlusIcon className="size-3.5" />
                )}
                Create
              </Button>
            </form>
          </div>
        )}

        {/* Section 4: Discover Directory */}
        {!hasOrgs && (
          <div className="space-y-4 pt-8">
            <h3 className="text-xs font-mono text-muted-foreground uppercase tracking-wider font-bold">
              Directory
            </h3>
            <p className="text-xs text-muted-foreground font-mono leading-relaxed">
              Find and join other organizations in the database.
            </p>

            <div className="border border-border divide-y divide-border bg-card/25">
              {loadingDirectory ? (
                <div className="p-6 text-center font-mono text-xs text-muted-foreground flex justify-center items-center gap-1.5">
                  <Loader2Icon className="size-3 animate-spin text-primary" />
                  Loading directory...
                </div>
              ) : discoverableOrgs.length === 0 ? (
                <div className="p-6 text-center font-mono text-xs text-muted-foreground/60">
                  No other organizations found.
                </div>
              ) : (
                discoverableOrgs.map((org) => (
                  <div
                    key={org.id}
                    className="p-4 flex items-center justify-between gap-4"
                  >
                    <div className="space-y-0.5">
                      <span className="font-heading text-sm font-bold uppercase text-foreground">
                        {org.name}
                      </span>
                      <p className="text-[9px] text-muted-foreground font-mono">
                        org_{org.slug} • {org.memberCount} developer{org.memberCount !== 1 ? "s" : ""}
                      </p>
                    </div>

                    <Button
                      variant="outline"
                      onClick={() => handleJoinOrg(org.id, org.name)}
                      className="font-mono text-[9px] font-bold uppercase tracking-wider rounded-none px-3 h-7 hover:bg-primary/5 hover:text-primary hover:border-primary/20"
                    >
                      Join
                    </Button>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* Section 5: Team Sync Info */}
        <div className="pt-8 text-xs text-muted-foreground font-mono space-y-2 border-t-0">
          <div className="flex items-center gap-1.5 text-primary">
            <SparklesIcon className="size-3.5" />
            <span className="font-bold uppercase tracking-wider text-[9px]">Team Workspaces</span>
          </div>
          <p className="leading-relaxed">
            Organizations let developers publish products together under a shared team, making it easy to manage products, count views, and review team feedback.
          </p>
        </div>

      </div>
    </div>
  );
}