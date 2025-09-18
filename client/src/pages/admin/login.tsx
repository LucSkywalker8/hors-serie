import { useState } from "react";
import { useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/use-auth";
import { Lock } from "lucide-react";

const loginSchema = z.object({
  username: z.string().min(1, "Le nom d'utilisateur est requis"),
  password: z.string().min(1, "Le mot de passe est requis"),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function AdminLogin() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const { user, loginMutation } = useAuth();

  const form = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  // Redirect if already authenticated
  if (user) {
    setLocation("/admin/dashboard");
    return null;
  }

  const onSubmit = (data: LoginForm) => {
    loginMutation.mutate(data, {
      onSuccess: () => {
        toast({
          title: "Connexion réussie",
          description: "Bienvenue dans l'administration",
        });
        setLocation("/admin/dashboard");
      },
      onError: (error) => {
        toast({
          title: "Erreur de connexion",
          description: error.message,
          variant: "destructive",
        });
      },
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-700 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="mx-auto w-16 h-16 bg-chartreuse rounded-full flex items-center justify-center mb-4">
            <Lock className="w-8 h-8 text-black" />
          </div>
          <h1 className="text-3xl font-bold text-white">Administration</h1>
          <p className="text-gray-300 mt-2">Hors-Série.immo</p>
        </div>

        <Card className="bg-gray-800 border-gray-600">
          <CardHeader>
            <CardTitle className="text-center text-white">Connexion</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Nom d'utilisateur</FormLabel>
                      <FormControl>
                        <Input 
                          {...field} 
                          disabled={loginMutation.isPending}
                          className="bg-gray-700 border-gray-600 text-white focus:ring-chartreuse focus:border-chartreuse"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Mot de passe</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="password"
                          disabled={loginMutation.isPending}
                          className="bg-gray-700 border-gray-600 text-white focus:ring-chartreuse focus:border-chartreuse"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full bg-chartreuse text-black hover:bg-chartreuse/90"
                  disabled={loginMutation.isPending}
                >
                  {loginMutation.isPending ? "Connexion..." : "Se connecter"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        <div className="text-center mt-6 text-sm text-gray-400">
          <p>Identifiants par défaut : admin / admin123</p>
        </div>
      </div>
    </div>
  );
}