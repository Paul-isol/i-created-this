import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { UserIcon, MailIcon, ShieldCheckIcon, CalendarIcon, ShieldAlertIcon } from "lucide-react";

export default async function UserDetails() {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  const user = session?.user;

  const initials = user?.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "??";

  const formattedJoinedDate = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "N/A";

  return (
    <div className="space-y-6">
      {/* Tab Header */}
      <div className="flex items-center gap-2 border-b border-border pb-4">
        <UserIcon className="size-5 text-primary" />
        <h2 className="font-heading text-lg font-black uppercase tracking-wider text-foreground">
          Profile Details
        </h2>
      </div>

      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 bg-muted/20 border border-border p-6 shadow-sm">
        {/* User Avatar */}
        <div className="size-20 bg-primary/10 border-2 border-primary text-primary flex items-center justify-center font-heading text-2xl font-black shrink-0 relative overflow-hidden">
          {user?.image ? (
            <img src={user.image} alt={user.name || "User"} className="size-full object-cover animate-fade-in" />
          ) : (
            <span>{initials}</span>
          )}
        </div>

        {/* Details List */}
        <div className="flex-1 w-full space-y-4 font-mono text-xs">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Display Name */}
            <div className="border border-border/80 bg-background/50 p-3">
              <div className="text-[9px] text-muted-foreground uppercase font-bold tracking-widest mb-1">
                Display Name
              </div>
              <div className="text-sm font-bold text-foreground truncate">
                {user?.name || "Anonymous Developer"}
              </div>
            </div>

            {/* Email Address */}
            <div className="border border-border/80 bg-background/50 p-3">
              <div className="text-[9px] text-muted-foreground uppercase font-bold tracking-widest mb-1">
                Email Address
              </div>
              <div className="text-sm font-bold text-foreground truncate flex items-center gap-1.5">
                <MailIcon className="size-3.5 text-muted-foreground" />
                {user?.email}
              </div>
            </div>

            {/* Joined Date */}
            <div className="border border-border/80 bg-background/50 p-3">
              <div className="text-[9px] text-muted-foreground uppercase font-bold tracking-widest mb-1">
                Member Since
              </div>
              <div className="text-sm font-bold text-foreground truncate flex items-center gap-1.5">
                <CalendarIcon className="size-3.5 text-muted-foreground" />
                {formattedJoinedDate}
              </div>
            </div>

            {/* Verification Status */}
            <div className="border border-border/80 bg-background/50 p-3">
              <div className="text-[9px] text-muted-foreground uppercase font-bold tracking-widest mb-1">
                Verification Status
              </div>
              <div className="mt-0.5">
                {user?.emailVerified ? (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 border border-green-500/20 bg-green-500/10 text-green-500 font-bold text-[9px] tracking-wider uppercase">
                    <ShieldCheckIcon className="size-3" />
                    Verified
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 border border-yellow-500/20 bg-yellow-500/10 text-yellow-600 dark:text-yellow-500 font-bold text-[9px] tracking-wider uppercase">
                    <ShieldAlertIcon className="size-3" />
                    Pending Verification
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Console Log */}
      <div className="bg-background border border-border border-l-2 border-l-primary p-4">
        <p className="text-[10px] font-mono text-muted-foreground/80 leading-relaxed">
          <span className="text-primary font-bold">&gt; session_status:</span> AUTHENTICATED // user_id: {user?.id}
        </p>
      </div>
    </div>
  );
}