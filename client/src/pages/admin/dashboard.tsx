import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  MoreHorizontal, 
  Plus, 
  Edit, 
  Trash2, 
  Home, 
  Euro, 
  MapPin, 
  Users,
  Mail,
  Phone
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/hooks/use-auth";
import { Property, Contact } from "@shared/schema";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { PropertyForm } from "@/components/admin/property-form";
import { SortablePropertyList } from "@/components/admin/sortable-property-list";

function AdminDashboard() {
  const { user, logoutMutation } = useAuth();
  const { toast } = useToast();
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [showPropertyForm, setShowPropertyForm] = useState(false);

  // Fetch properties
  const { data: properties, isLoading: propertiesLoading } = useQuery<Property[]>({
    queryKey: ["/api/properties"],
  });

  // Fetch contacts
  const { data: contacts, isLoading: contactsLoading } = useQuery<Contact[]>({
    queryKey: ["/api/contacts"],
  });

  // Delete property mutation
  const deletePropertyMutation = useMutation({
    mutationFn: async (id: string) => {
      await apiRequest("DELETE", `/api/admin/properties/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/properties"] });
      toast({
        title: "Propriété supprimée",
        description: "La propriété a été supprimée avec succès",
      });
    },
    onError: () => {
      toast({
        title: "Erreur",
        description: "Impossible de supprimer la propriété",
        variant: "destructive",
      });
    },
  });

  const handleEditProperty = (property: Property) => {
    setSelectedProperty(property);
    setShowPropertyForm(true);
  };

  const handleDeleteProperty = (id: string) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer cette propriété ?")) {
      deletePropertyMutation.mutate(id);
    }
  };

  const handleAddProperty = () => {
    setSelectedProperty(null);
    setShowPropertyForm(true);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  if (showPropertyForm) {
    return (
      <PropertyForm
        property={selectedProperty}
        onClose={() => {
          setShowPropertyForm(false);
          setSelectedProperty(null);
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="font-display font-bold text-xl text-black">
                Hors-Série<span className="text-terracotta-500">.immo</span>
              </h1>
              <p className="text-sm text-gray-600">Tableau de bord administrateur</p>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                Bienvenue, <strong>{user?.username}</strong>
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => logoutMutation.mutate()}
                disabled={logoutMutation.isPending}
              >
                Déconnexion
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Propriétés</CardTitle>
              <Home className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{properties?.length || 0}</div>
              <p className="text-xs text-muted-foreground">biens au catalogue</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Contacts</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{contacts?.length || 0}</div>
              <p className="text-xs text-muted-foreground">demandes reçues</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Valeur Portfolio</CardTitle>
              <Euro className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {properties?.length
                  ? formatPrice(properties.reduce((total, property) => total + Number(property.price), 0))
                  : "0 €"}
              </div>
              <p className="text-xs text-muted-foreground">valeur totale</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="properties" className="space-y-6">
          <TabsList>
            <TabsTrigger value="properties">Propriétés</TabsTrigger>
            <TabsTrigger value="contacts">Contacts</TabsTrigger>
          </TabsList>

          <TabsContent value="properties" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-black">Gestion des Propriétés</h2>
              <Button onClick={handleAddProperty} className="bg-chartreuse text-black hover:bg-chartreuse/90">
                <Plus className="h-4 w-4 mr-2" />
                Nouvelle Propriété
              </Button>
            </div>

            {propertiesLoading ? (
              <div className="text-center py-8">Chargement des propriétés...</div>
            ) : properties && properties.length > 0 ? (
              <SortablePropertyList 
                properties={properties}
                onEdit={handleEditProperty}
                onDelete={handleDeleteProperty}
                formatPrice={formatPrice}
              />
            ) : (
              <div className="text-center py-8 text-gray-500">
                Aucune propriété trouvée
              </div>
            )}
          </TabsContent>

          <TabsContent value="contacts" className="space-y-6">
            <h2 className="text-lg font-semibold text-black">Demandes de Contact</h2>
            
            {contactsLoading ? (
              <div className="text-center py-8">Chargement des contacts...</div>
            ) : (
              <div className="grid gap-4">
                {contacts?.map((contact) => (
                  <Card key={contact.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold text-lg text-black mb-2">
                            {contact.name}
                          </h3>
                          <div className="space-y-2 text-sm text-gray-600">
                            <div className="flex items-center">
                              <Mail className="h-4 w-4 mr-2" />
                              {contact.email}
                            </div>
                            {contact.phone && (
                              <div className="flex items-center">
                                <Phone className="h-4 w-4 mr-2" />
                                {contact.phone}
                              </div>
                            )}
                          </div>
                          <p className="mt-3 text-sm text-gray-700">
                            {contact.message}
                          </p>
                        </div>
                        <div className="text-right">
                          <Badge variant="outline">
                            {contact.propertyId ? "Propriété spécifique" : "Contact général"}
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                
                {(!contacts || contacts.length === 0) && !contactsLoading && (
                  <Card>
                    <CardContent className="p-8 text-center">
                      <p className="text-gray-600">Aucune demande de contact pour le moment</p>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default AdminDashboard;