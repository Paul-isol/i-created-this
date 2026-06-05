import ProductSubmitForm from "@/components/products/ProductSubmitForm";
import { TerminalIcon, PlusIcon, FileTextIcon } from "lucide-react";

export default function SubmitPage() {
  return (
    <div className="relative min-h-[calc(100vh-4rem)] bg-background py-10 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 -z-10 bg-grid-pattern opacity-60 pointer-events-none" />

      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header Console */}
        <div className="border border-border bg-card p-6 shadow-md transition-all duration-300 hover:border-primary/20">
          <div className="flex items-center gap-1.5 border-b border-border pb-4 mb-4">
            <div className="size-2 bg-destructive/70" />
            <div className="size-2 bg-yellow-500/70" />
            <div className="size-2 bg-green-500/70" />
            <span className="text-[10px] font-mono text-muted-foreground ml-3 tracking-wider uppercase">
              developer_console / submit_project
            </span>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="font-heading text-2xl sm:text-3xl font-black uppercase tracking-tight text-foreground">
                Launch a Product
              </h1>
              <p className="text-xs text-muted-foreground font-mono mt-1 leading-relaxed max-w-xl">
                Submit your creation to the index. All projects are peer-reviewed and automatically cataloged upon verification.
              </p>
            </div>
            <div className="flex items-center gap-2 bg-muted/50 border border-border px-3 py-2 shrink-0">
              <PlusIcon className="size-4 text-primary animate-pulse" />
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-foreground">
                Live Status: Accepting
              </span>
            </div>
          </div>
        </div>

        {/* Main Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Form Area */}
          <div className="lg:col-span-2">
            <ProductSubmitForm />
          </div>

          {/* Guidelines Sidebar */}
          <div className="space-y-6">
            {/* Guidelines Card */}
            <div className="border border-border bg-card p-5 shadow-lg space-y-4">
              <div className="flex items-center gap-2 border-b border-border pb-3">
                <TerminalIcon className="size-4 text-primary" />
                <h3 className="font-heading text-xs font-bold uppercase tracking-wider text-foreground">
                  Submission Rules
                </h3>
              </div>
              
              <ul className="space-y-3.5 text-xs text-muted-foreground font-mono leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5 select-none">&gt;</span>
                  <span><strong>Unique Slug</strong>: The slug must only contain lowercase alphanumeric characters and hyphens.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5 select-none">&gt;</span>
                  <span><strong>Min Lengths</strong>: Name, slug, and tagline require at least 3 characters.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5 select-none">&gt;</span>
                  <span><strong>Valid URL</strong>: The website URL must be fully qualified (start with http:// or https://).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5 select-none">&gt;</span>
                  <span><strong>Tag Rules</strong>: Tags must be comma-separated, case-insensitive, and unique.</span>
                </li>
              </ul>
            </div>

            {/* Verification Notice */}
            <div className="border border-border/85 bg-background p-5 border-l-2 border-l-primary shadow-sm space-y-3">
              <div className="flex items-center gap-2 text-primary">
                <FileTextIcon className="size-4" />
                <h4 className="font-heading text-[11px] font-bold uppercase tracking-widest">
                  Review Process
                </h4>
              </div>
              <p className="text-[11px] text-muted-foreground font-mono leading-relaxed">
                Once submitted, your project will start in a <span className="text-yellow-600 dark:text-yellow-500 font-bold">pending</span> state. Reviewers will check the tagline and live link before moving the project to approved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}