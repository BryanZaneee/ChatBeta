import { useAuth } from "@clerk/nextjs";
import { useEffect } from "react";
import { useSubscriptionStore } from "../stores/SubscriptionStore";

export default function AuthSync() {
  const { isSignedIn } = useAuth();
  const { setIsAuthenticated, syncWithDatabase } = useSubscriptionStore();

  useEffect(() => {
    setIsAuthenticated(!!isSignedIn);
    
    // Sync with database when user signs in
    if (isSignedIn) {
      console.log('User signed in, syncing with database...');
      syncWithDatabase();
    }
  }, [isSignedIn, setIsAuthenticated, syncWithDatabase]);

  return null; // This component only handles sync, no UI
} 