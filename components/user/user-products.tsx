import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { getUserProducts } from "@/lib/products/products-select";
import UserProductsList from "./user-products-list";

export default async function UserProducts() {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  const user = session?.user;

  if (!user?.id) {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-4 text-center border border-dashed border-border/70 bg-background/50">
        <p className="text-xs text-muted-foreground font-mono">&gt; session_error: user not logged in</p>
      </div>
    );
  }

  const products = await getUserProducts(user.id);

  return <UserProductsList products={products} />;
}