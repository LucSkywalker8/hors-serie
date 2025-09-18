import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/hooks/use-auth";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Properties from "@/pages/properties";
import PropertyDetail from "@/pages/property-detail";
import Contact from "@/pages/contact";
import Equipe from "@/pages/equipe";
import Philosophie from "@/pages/philosophie";
import AdminLogin from "@/pages/admin/login";
import AdminDashboard from "@/pages/admin/dashboard";
import { ProtectedRoute } from "@/components/admin/protected-route";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";

function Router() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/biens" component={Properties} />
          <Route path="/biens/:id" component={PropertyDetail} />
          <Route path="/contact" component={Contact} />
          <Route path="/equipe" component={Equipe} />
          <Route path="/philosophie" component={Philosophie} />
          <Route path="/admin" component={AdminLogin} />
          <Route path="/admin/login" component={AdminLogin} />
          <Route path="/admin/dashboard" component={() => (
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          )} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
