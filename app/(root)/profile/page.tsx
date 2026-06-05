import OrganizationInfo from "@/components/organizations/organization-info";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UserDetails from "@/components/user/user-deatils";
import UserProducts from "@/components/user/user-products";
import { Suspense } from "react";
import { UserIcon, PackageIcon, Building2Icon } from "lucide-react";

export default function ProfilePage() {
  return (
    <div className="relative min-h-[calc(100vh-4rem)] bg-background py-10 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 -z-10 bg-grid-pattern opacity-60 pointer-events-none" />

      <div className="max-w-5xl mx-auto">
        <Tabs defaultValue="user" orientation="vertical" className="flex flex-col md:flex-row gap-8 items-start">
          {/* Vertical Navigation Panel */}
          <TabsList className="bg-card border border-border p-2 w-full md:w-64 flex flex-col gap-1 rounded-none shadow-md shrink-0">
            <div className="text-[9px] font-mono text-muted-foreground/60 uppercase tracking-widest px-3 py-2 border-b border-border/60 mb-2 w-full text-left font-bold">
              settings_panel
            </div>
            
            <TabsTrigger 
              value="user" 
              className="justify-start px-3 py-2.5 font-mono text-[10px] font-bold uppercase tracking-wider w-full hover:bg-muted/70 transition-all duration-200"
            >
              <UserIcon className="size-4 mr-2" />
              User Details
            </TabsTrigger>
            
            <TabsTrigger 
              value="products" 
              className="justify-start px-3 py-2.5 font-mono text-[10px] font-bold uppercase tracking-wider w-full hover:bg-muted/70 transition-all duration-200"
            >
              <PackageIcon className="size-4 mr-2" />
              My Products
            </TabsTrigger>
            
            <TabsTrigger 
              value="organization" 
              className="justify-start px-3 py-2.5 font-mono text-[10px] font-bold uppercase tracking-wider w-full hover:bg-muted/70 transition-all duration-200"
            >
              <Building2Icon className="size-4 mr-2" />
              Organization
            </TabsTrigger>
          </TabsList>
          
          {/* Content panel */}
          <div className="flex-1 w-full bg-card border border-border p-6 sm:p-8 shadow-2xl">
            <TabsContent value="user" className="mt-0">
              <Suspense fallback={
                <div className="font-mono text-xs text-muted-foreground animate-pulse p-4">
                  &gt; loading profile_data...
                </div>
              }>
                <UserDetails />
              </Suspense>
            </TabsContent>
            
            <TabsContent value="products" className="mt-0">
              <Suspense fallback={
                <div className="font-mono text-xs text-muted-foreground animate-pulse p-4">
                  &gt; loading products_data...
                </div>
              }>
                <UserProducts />
              </Suspense>
            </TabsContent>
            
            <TabsContent value="organization" className="mt-0">
              <Suspense fallback={
                <div className="font-mono text-xs text-muted-foreground animate-pulse p-4">
                  &gt; loading org_data...
                </div>
              }>
                <OrganizationInfo />
              </Suspense>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
}
