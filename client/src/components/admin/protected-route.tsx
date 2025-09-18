import { useAuth } from "@/hooks/use-auth";
import { useLocation } from "wouter";
import { Loader2 } from "lucide-react";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, isLoading } = useAuth();
  const [, setLocation] = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-terracotta-600 mx-auto mb-4" />
          <p className="text-stone-600">Vérification de l'authentification...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    setLocation("/admin");
    return null;
  }

  return <>{children}</>;
}