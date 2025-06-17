import { useAuth } from "@clerk/nextjs";
import { useEffect } from "react";
import { useSubscriptionStore } from "../stores/SubscriptionStore";

export default function AuthSync() {
  const { isSignedIn } = useAuth();
  const { setIsAuthenticated } = useSubscriptionStore();

  useEffect(() => {
    setIsAuthenticated(!!isSignedIn);
  }, [isSignedIn, setIsAuthenticated]);

  return null; // This component only handles sync, no UI
} 