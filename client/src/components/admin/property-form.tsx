import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, X, MapPin, Home, Bed, Bath, Maximize } from "lucide-react";
import { Property, insertPropertySchema } from "@shared/schema";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { ObjectUploader } from "./object-uploader";
import { useState, useEffect } from "react";
import { z } from "zod";
import { calculateDpeClass, calculateGesClass, getDpeColor, getGesColor } from "@/lib/energy-calculator";

interface PropertyFormProps {
  property?: Property | null;
  onClose: () => void;
}

type PropertyFormData = z.infer<typeof insertPropertySchema>;

const propertyTypes = [
  { value: "château", label: "Château" },
  { value: "maison de maître", label: "Maison de maître" },
  { value: "maison de ville", label: "Maison de ville" },
  { value: "propriété viticole", label: "Propriété viticole" },
  { value: "villa", label: "Villa" },
  { value: "appartement", label: "Appartement" },
  { value: "loft", label: "Loft" },
];

export function PropertyForm({ property, onClose }: PropertyFormProps) {
  const { toast } = useToast();
  const [selectedImages, setSelectedImages] = useState<string[]>(property?.images || []);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>(property?.features || []);
  const [newFeature, setNewFeature] = useState("");
  const [dpeValue, setDpeValue] = useState<number>(property?.dpeValue || 0);
  const [gesValue, setGesValue] = useState<number>(property?.gesValue || 0);
  const [dpeClass, setDpeClass] = useState<string | null>(property?.dpeClass || null);
  const [gesClass, setGesClass] = useState<string | null>(property?.gesClass || null);

  const isEditing = Boolean(property);

  const form = useForm<PropertyFormData>({
    resolver: zodResolver(insertPropertySchema),
    defaultValues: {
      title: property?.title || "",
      description: property?.description || "",
      type: property?.type || "",
      price: property ? Number(property.price) : 0,
      city: property?.city || "",
      address: property?.address || "",
      latitude: property ? property.latitude : "0",
      longitude: property ? property.longitude : "0",
      bedrooms: property?.bedrooms || 0,
      bathrooms: property?.bathrooms || 0,
      surface: property?.surface || 0,
      landSize: property?.landSize || 0,
      images: property?.images || [],
      features: property?.features || [],
      dpeValue: property?.dpeValue || null,
      dpeClass: property?.dpeClass || null,
      gesValue: property?.gesValue || null,
      gesClass: property?.gesClass || null,
    },
  });

  // Calcul automatique des classes énergétiques
  useEffect(() => {
    const newDpeClass = calculateDpeClass(dpeValue > 0 ? dpeValue : null);
    const newGesClass = calculateGesClass(gesValue > 0 ? gesValue : null);
    
    if (newDpeClass !== dpeClass) {
      setDpeClass(newDpeClass);
      form.setValue('dpeClass', newDpeClass);
    }
    
    if (newGesClass !== gesClass) {
      setGesClass(newGesClass);
      form.setValue('gesClass', newGesClass);
    }
  }, [dpeValue, gesValue, dpeClass, gesClass, form]);

  // Create/Update property mutation
  const propertyMutation = useMutation({
    mutationFn: async (data: PropertyFormData) => {
      const payload = {
        ...data,
        images: selectedImages,
        features: selectedFeatures,
        dpeValue: dpeValue > 0 ? dpeValue : null,
        dpeClass,
        gesValue: gesValue > 0 ? gesValue : null,
        gesClass,
      };

      if (isEditing && property) {
        await apiRequest("PUT", `/api/admin/properties/${property.id}`, payload);
      } else {
        await apiRequest("POST", "/api/admin/properties", payload);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/properties"] });
      toast({
        title: isEditing ? "Propriété modifiée" : "Propriété créée",
        description: isEditing 
          ? "La propriété a été modifiée avec succès" 
          : "La nouvelle propriété a été créée avec succès",
      });
      onClose();
    },
    onError: () => {
      toast({
        title: "Erreur",
        description: isEditing 
          ? "Impossible de modifier la propriété" 
          : "Impossible de créer la propriété",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: PropertyFormData) => {
    propertyMutation.mutate(data);
  };

  const handleImageUpload = (urls: string[]) => {
    setSelectedImages([...selectedImages, ...urls]);
  };

  const removeImage = (index: number) => {
    setSelectedImages(selectedImages.filter((_, i) => i !== index));
  };

  const addFeature = () => {
    if (newFeature.trim() && !selectedFeatures.includes(newFeature.trim())) {
      setSelectedFeatures([...selectedFeatures, newFeature.trim()]);
      setNewFeature("");
    }
  };

  const removeFeature = (feature: string) => {
    setSelectedFeatures(selectedFeatures.filter(f => f !== feature));
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={onClose}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour au tableau de bord
          </Button>
          <h1 className="text-2xl font-bold text-black">
            {isEditing ? "Modifier la propriété" : "Nouvelle propriété"}
          </h1>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Home className="h-5 w-5 mr-2" />
                  Informations générales
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-black">Titre</FormLabel>
                        <FormControl>
                          <Input placeholder="Château du XVIIIe siècle" className="text-black" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-black">Type de propriété</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="text-black bg-white border-gray-300">
                              <SelectValue placeholder="Sélectionnez un type" className="text-black" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-white border border-gray-200">
                            {propertyTypes.map((type) => (
                              <SelectItem key={type.value} value={type.value} className="text-black hover:bg-gray-100 focus:bg-gray-100">
                                {type.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-black">Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Description détaillée de la propriété..."
                          className="min-h-[120px] text-black"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-black">Prix (€)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="1500000"
                          className="text-black"
                          {...field}
                          onChange={(e) => field.onChange(Number(e.target.value))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="h-5 w-5 mr-2" />
                  Localisation
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-black">Ville</FormLabel>
                        <FormControl>
                          <Input placeholder="Angers" className="text-black" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-black">Adresse</FormLabel>
                        <FormControl>
                          <Input placeholder="123 Rue du Château" className="text-black" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="latitude"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-black">Latitude</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            step="any"
                            placeholder="47.4731"
                            className="text-black"
                            {...field}
                            onChange={(e) => field.onChange(e.target.value)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="longitude"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-black">Longitude</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            step="any"
                            placeholder="-0.5515"
                            className="text-black"
                            {...field}
                            onChange={(e) => field.onChange(e.target.value)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Maximize className="h-5 w-5 mr-2" />
                  Caractéristiques
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <FormField
                    control={form.control}
                    name="bedrooms"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center text-black">
                          <Bed className="h-4 w-4 mr-1" />
                          Chambres
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            className="text-black"
                            {...field}
                            onChange={(e) => field.onChange(Number(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="bathrooms"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center text-black">
                          <Bath className="h-4 w-4 mr-1" />
                          Salles de bain
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            className="text-black"
                            {...field}
                            onChange={(e) => field.onChange(Number(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="surface"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-black">Surface (m²)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            className="text-black"
                            {...field}
                            onChange={(e) => field.onChange(Number(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="landSize"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-black">Terrain (m²)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            className="text-black"
                            {...field}
                            onChange={(e) => field.onChange(Number(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-black">Images</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <ObjectUploader onComplete={handleImageUpload} />
                
                {selectedImages.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                    {selectedImages.map((image, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={image}
                          alt={`Image ${index + 1}`}
                          className="w-full h-24 object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-black">Équipements et caractéristiques</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex space-x-2">
                  <Input
                    placeholder="Ajouter un équipement..."
                    value={newFeature}
                    className="text-black"
                    onChange={(e) => setNewFeature(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addFeature())}
                  />
                  <Button type="button" onClick={addFeature} variant="outline">
                    Ajouter
                  </Button>
                </div>

                {selectedFeatures.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {selectedFeatures.map((feature, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="cursor-pointer hover:bg-red-100"
                        onClick={() => removeFeature(feature)}
                      >
                        {feature}
                        <X className="h-3 w-3 ml-1" />
                      </Badge>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-black">
                  <Home className="h-5 w-5 mr-2" />
                  Diagnostic de Performance Énergétique
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <FormLabel className="text-black">DPE (kWh/m²/an)</FormLabel>
                    <div className="space-y-2">
                      <Input
                        type="number"
                        placeholder="150"
                        className="text-black"
                        value={dpeValue || ''}
                        onChange={(e) => {
                          const value = parseInt(e.target.value) || 0;
                          setDpeValue(value);
                          form.setValue('dpeValue', value > 0 ? value : null);
                        }}
                      />
                      {dpeClass && (
                        <div className="flex items-center space-x-2">
                          <div 
                            className="w-8 h-8 rounded flex items-center justify-center font-bold text-white"
                            style={{ backgroundColor: getDpeColor(dpeClass) }}
                          >
                            {dpeClass}
                          </div>
                          <span className="text-sm text-gray-600">
                            Classe énergétique DPE
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <FormLabel className="text-black">GES (kg CO2/m²/an)</FormLabel>
                    <div className="space-y-2">
                      <Input
                        type="number"
                        placeholder="30"
                        className="text-black"
                        value={gesValue || ''}
                        onChange={(e) => {
                          const value = parseInt(e.target.value) || 0;
                          setGesValue(value);
                          form.setValue('gesValue', value > 0 ? value : null);
                        }}
                      />
                      {gesClass && (
                        <div className="flex items-center space-x-2">
                          <div 
                            className="w-8 h-8 rounded flex items-center justify-center font-bold text-white"
                            style={{ backgroundColor: getGesColor(gesClass) }}
                          >
                            {gesClass}
                          </div>
                          <span className="text-sm text-gray-600">
                            Classe GES
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">
                    <strong>Information :</strong> Les classes énergétiques sont calculées automatiquement selon les barèmes officiels. 
                    DPE de A (&le;70 kWh/m²/an) à G (&gt;420 kWh/m²/an). GES de A (&le;6 kg CO2/m²/an) à G (&gt;100 kg CO2/m²/an).
                  </p>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end space-x-4 pt-6">
              <Button type="button" variant="outline" onClick={onClose}>
                Annuler
              </Button>
              <Button
                type="submit"
                className="bg-chartreuse text-black hover:bg-chartreuse/90"
                disabled={propertyMutation.isPending}
              >
                {propertyMutation.isPending
                  ? (isEditing ? "Modification..." : "Création...")
                  : (isEditing ? "Modifier" : "Créer")
                }
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}