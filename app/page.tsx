"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { LucideUtensils } from "lucide-react";

export default function Home() {
  const router = useRouter();
  
  useEffect(() => {
    // Redirect to login page after a short delay to show the landing page
    const timer = setTimeout(() => {
      router.push("/login");
    }, 3000);
    
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-orange-500/30 to-orange-600/30 p-4">
      <div className="text-center space-y-6 max-w-2xl">
        <div className="inline-block bg-orange-500 text-white p-5 rounded-full animate-bounce">
          <LucideUtensils className="h-12 w-12" />
        </div>
        
        <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
          Paapi Pet
        </h1>
        
        <p className="text-xl md:text-2xl text-muted-foreground">
          Streamlined Food Order Management System
        </p>
        
        <p className="text-muted-foreground">
          Empowering restaurants with real-time ordering, billing, and analytics
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Button 
            onClick={() => router.push("/login")}
            className="bg-orange-500 hover:bg-orange-600 text-white"
            size="lg"
          >
            Sign In
          </Button>
          
          <Button 
            variant="outline"
            className="border-orange-500 text-orange-500 hover:bg-orange-500/10"
            size="lg"
          >
            Learn More
          </Button>
        </div>
      </div>
    </div>
  );
}