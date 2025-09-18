import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import { Send } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { InsertContact } from "@shared/schema";

export default function ContactForm() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    consent: false,
  });

  const contactMutation = useMutation({
    mutationFn: async (data: InsertContact) => {
      const response = await apiRequest("POST", "/api/contacts", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Message envoyé",
        description: "Nous vous recontacterons rapidement.",
      });
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
        consent: false,
      });
    },
    onError: () => {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'envoi du message.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.consent) {
      toast({
        title: "Consentement requis",
        description: "Veuillez accepter que vos données soient utilisées pour vous recontacter.",
        variant: "destructive",
      });
      return;
    }

    contactMutation.mutate({
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      subject: formData.subject,
      message: formData.message,
    });
  };

  return (
    <Card className="bg-white">
      <CardContent className="p-8">
        <h3 className="font-display font-semibold text-2xl text-gray-900 mb-6">Envoyez-nous un message</h3>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="firstName" className="text-sm font-medium text-gray-700 mb-2">Prénom *</Label>
              <Input
                id="firstName"
                type="text"
                required
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                className="p-3 border-2 border-gray-300 rounded-md focus:ring-2 focus:ring-chartreuse focus:border-chartreuse text-gray-900 bg-white"
              />
            </div>
            <div>
              <Label htmlFor="lastName" className="text-sm font-medium text-gray-700 mb-2">Nom *</Label>
              <Input
                id="lastName"
                type="text"
                required
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                className="p-3 border-2 border-gray-300 rounded-md focus:ring-2 focus:ring-chartreuse focus:border-chartreuse text-gray-900 bg-white"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="email" className="text-sm font-medium text-gray-700 mb-2">Email *</Label>
            <Input
              id="email"
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="p-3 border-2 border-gray-300 rounded-md focus:ring-2 focus:ring-chartreuse focus:border-chartreuse text-gray-900 bg-white"
            />
          </div>

          <div>
            <Label htmlFor="phone" className="text-sm font-medium text-gray-700 mb-2">Téléphone</Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="p-3 border-2 border-gray-300 rounded-md focus:ring-2 focus:ring-chartreuse focus:border-chartreuse text-gray-900 bg-white"
            />
          </div>

          <div>
            <Label htmlFor="subject" className="text-sm font-medium text-gray-700 mb-2">Sujet</Label>
            <Select value={formData.subject} onValueChange={(value) => setFormData({ ...formData, subject: value })}>
              <SelectTrigger className="p-3 border-2 border-gray-300 rounded-md focus:ring-2 focus:ring-chartreuse focus:border-chartreuse text-gray-900 bg-white">
                <SelectValue placeholder="Sélectionner un sujet" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recherche">Recherche d'un bien</SelectItem>
                <SelectItem value="vente">Vente d'un bien</SelectItem>
                <SelectItem value="estimation">Estimation</SelectItem>
                <SelectItem value="information">Information générale</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="message" className="text-sm font-medium text-gray-700 mb-2">Message *</Label>
            <Textarea
              id="message"
              rows={4}
              required
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="p-3 border-2 border-gray-300 rounded-md focus:ring-2 focus:ring-chartreuse focus:border-chartreuse text-gray-900 bg-white"
            />
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="consent"
              checked={formData.consent}
              onCheckedChange={(checked) => setFormData({ ...formData, consent: checked as boolean })}
              className="data-[state=checked]:bg-chartreuse data-[state=checked]:border-chartreuse"
            />
            <Label htmlFor="consent" className="text-sm text-gray-700">
              J'accepte que mes données soient utilisées pour me recontacter *
            </Label>
          </div>

          <Button 
            type="submit" 
            disabled={contactMutation.isPending}
            className="w-full bg-chartreuse text-gray-900 hover:bg-chartreuse/90 py-3 font-semibold"
          >
            {contactMutation.isPending ? "Envoi en cours..." : "Envoyer le message"}
            <Send className="ml-2 h-4 w-4" />
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
