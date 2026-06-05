import Hero from "@/components/landing-page/Hero";
import RecentlyLaunchedProducts from "@/components/landing-page/RecentlyLaunchedProducts";
import { Suspense } from "react";

export default function Home() {
  return (
    <>
    <Hero />
    <Suspense fallback={<div>Loading...</div>}>
      <RecentlyLaunchedProducts />
    </Suspense>
    
    </>
  );
}
