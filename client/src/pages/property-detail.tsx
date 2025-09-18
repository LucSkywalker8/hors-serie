import { useParams, Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { 
  ArrowLeft, 
  MapPin, 
  Bed, 
  Bath, 
  Maximize, 
  Heart, 
  Share2,
  Phone,
  Mail
} from "lucide-react";
import type { Property } from "@shared/schema";
import { getDpeColor, getGesColor } from "@/lib/energy-calculator";

export default function PropertyDetail() {
  const { id } = useParams();

  const { data: property, isLoading, error } = useQuery<Property>({
    queryKey: ["/api/properties", id],
  });

  if (isLoading) {
    return (
      <div className="pt-16 min-h-screen bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-neutral-200 rounded w-48 mb-8"></div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="h-96 bg-neutral-200 rounded-2xl mb-6"></div>
                <div className="grid grid-cols-3 gap-4">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="h-24 bg-neutral-200 rounded-lg"></div>
                  ))}
                </div>
              </div>
              <div className="space-y-6">
                <div className="h-32 bg-neutral-200 rounded-lg"></div>
                <div className="h-48 bg-neutral-200 rounded-lg"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="pt-16 min-h-screen bg-neutral-50 flex items-center justify-center">
        <Card className="max-w-md mx-4">
          <CardContent className="pt-6 text-center">
            <h1 className="text-2xl font-bold text-neutral-900 mb-4">Bien non trouvé</h1>
            <p className="text-neutral-600 mb-6">
              La propriété que vous recherchez n'existe pas ou n'est plus disponible.
            </p>
            <Link href="/biens">
              <Button className="bg-terracotta-500 text-white hover:bg-terracotta-600">
                Retour aux biens
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const formatPrice = (price: string) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(parseInt(price));
  };

  const getTypeDisplayName = (type: string) => {
    const typeMap: Record<string, string> = {
      'château': 'Château',
      'maison de maître': 'Maison de maître',
      'maison de ville': 'Maison de ville',
      'propriété viticole': 'Propriété viticole',
      'villa': 'Villa',
      'appartement': 'Appartement',
      'loft': 'Loft'
    };
    return typeMap[type] || type;
  };

  return (
    <div className="pt-16 min-h-screen bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <Link href="/biens" className="inline-flex items-center text-neutral-600 hover:text-terracotta-500 mb-8 transition-colors">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Retour aux biens
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Images Gallery */}
          <div className="lg:col-span-2">
            <div className="relative rounded-2xl overflow-hidden shadow-xl mb-6">
              <img 
                src={property.images[0]} 
                alt={property.title}
                className="w-full h-96 object-cover"
              />
              <div className="absolute top-4 left-4 flex flex-col space-y-2">
                <Badge className="bg-terracotta-500 text-white">
                  {getTypeDisplayName(property.type)}
                </Badge>
                {((property.dpeClass && property.dpeValue) || (property.gesClass && property.gesValue)) && (
                  <div className="flex space-x-1">
                    {property.dpeClass && property.dpeValue && (
                      <Badge 
                        data-testid={`detail-dpe-badge-${property.id}`}
                        className="text-white font-bold text-xs px-2 py-1"
                        style={{ backgroundColor: getDpeColor(property.dpeClass) }}
                      >
                        DPE {property.dpeClass}
                      </Badge>
                    )}
                    {property.gesClass && property.gesValue && (
                      <Badge 
                        data-testid={`detail-ges-badge-${property.id}`}
                        className="text-white font-bold text-xs px-2 py-1"
                        style={{ backgroundColor: getGesColor(property.gesClass) }}
                      >
                        GES {property.gesClass}
                      </Badge>
                    )}
                  </div>
                )}
              </div>
              <div className="absolute top-4 right-4 flex space-x-2">
                <button className="bg-white/20 backdrop-blur-md text-white p-2 rounded-full hover:bg-white/30 transition-colors">
                  <Heart className="h-5 w-5" />
                </button>
                <button className="bg-white/20 backdrop-blur-md text-white p-2 rounded-full hover:bg-white/30 transition-colors">
                  <Share2 className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Additional Images */}
            {property.images.length > 1 && (
              <div className="grid grid-cols-3 gap-4 mb-8">
                {property.images.slice(1, 4).map((image, index) => (
                  <div key={index} className="rounded-lg overflow-hidden">
                    <img 
                      src={image} 
                      alt={`${property.title} - Image ${index + 2}`}
                      className="w-full h-24 object-cover hover:scale-105 transition-transform duration-300 cursor-pointer"
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Description */}
            <Card>
              <CardContent className="p-6">
                <h2 className="font-display font-semibold text-2xl text-neutral-900 mb-4">Description</h2>
                <p className="text-neutral-700 leading-relaxed mb-6">
                  {property.description}
                </p>
                
                {property.features && property.features.length > 0 && (
                  <div>
                    <h3 className="font-display font-semibold text-lg text-neutral-900 mb-3">Caractéristiques</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {property.features.map((feature, index) => (
                        <div key={index} className="flex items-center text-neutral-700">
                          <div className="w-2 h-2 bg-terracotta-500 rounded-full mr-3"></div>
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Property Info Sidebar */}
          <div className="space-y-6">
            {/* Price and Details */}
            <Card>
              <CardContent className="p-6">
                <h1 className="font-display font-semibold text-2xl text-neutral-900 mb-2">
                  {property.title}
                </h1>
                <p className="text-neutral-600 mb-4 flex items-center">
                  <MapPin className="h-4 w-4 text-terracotta-500 mr-1" />
                  {property.city}
                </p>
                <div className="text-3xl font-bold text-terracotta-500 mb-6">
                  {formatPrice(property.price.toString())}
                </div>
                
                <div className="grid grid-cols-3 gap-4 py-4 border-t border-neutral-200">
                  <div className="text-center">
                    <Bed className="h-6 w-6 mx-auto text-neutral-600 mb-1" />
                    <div className="text-sm font-medium text-neutral-900">{property.bedrooms}</div>
                    <div className="text-xs text-neutral-600">Chambres</div>
                  </div>
                  <div className="text-center">
                    <Bath className="h-6 w-6 mx-auto text-neutral-600 mb-1" />
                    <div className="text-sm font-medium text-neutral-900">{property.bathrooms}</div>
                    <div className="text-xs text-neutral-600">Salles de bain</div>
                  </div>
                  <div className="text-center">
                    <Maximize className="h-6 w-6 mx-auto text-neutral-600 mb-1" />
                    <div className="text-sm font-medium text-neutral-900">{property.surface}</div>
                    <div className="text-xs text-neutral-600">m²</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Energy Performance */}
            {((property.dpeClass && property.dpeValue) || (property.gesClass && property.gesValue)) && (
              <Card data-testid={`energy-section-${property.id}`}>
                <CardContent className="p-6">
                  <h3 className="font-display font-semibold text-lg text-neutral-900 mb-4">
                    Performance énergétique
                  </h3>
                  
                  <div className="space-y-4">
                    {property.dpeClass && property.dpeValue && (
                      <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                        <div className="flex items-center space-x-3">
                          <Badge 
                            data-testid={`detail-sidebar-dpe-badge-${property.id}`}
                            className="text-white font-bold px-3 py-1"
                            style={{ backgroundColor: getDpeColor(property.dpeClass) }}
                          >
                            DPE {property.dpeClass}
                          </Badge>
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              Consommation énergétique
                            </div>
                            <div className="text-xs text-gray-600">
                              {property.dpeValue} kWh/m²/an
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {property.gesClass && property.gesValue && (
                      <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                        <div className="flex items-center space-x-3">
                          <Badge 
                            data-testid={`detail-sidebar-ges-badge-${property.id}`}
                            className="text-white font-bold px-3 py-1"
                            style={{ backgroundColor: getGesColor(property.gesClass) }}
                          >
                            GES {property.gesClass}
                          </Badge>
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              Émissions de gaz à effet de serre
                            </div>
                            <div className="text-xs text-gray-600">
                              {property.gesValue} kg CO₂/m²/an
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                    <p className="text-xs text-blue-800">
                      <strong>Information :</strong> Le DPE (Diagnostic de Performance Énergétique) 
                      indique la consommation énergétique du logement et les émissions de gaz à effet de serre, 
                      classés de A (très économe) à G (très énergivore).
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Contact Agent */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-display font-semibold text-lg text-neutral-900 mb-4">
                  Contactez notre équipe
                </h3>
                <p className="text-neutral-600 mb-6 text-sm">
                  Intéressé par ce bien ? Notre équipe vous accompagne pour organiser une visite ou répondre à vos questions.
                </p>
                
                <div className="space-y-3">
                  <Button className="w-full bg-terracotta-500 text-white hover:bg-terracotta-600">
                    <Phone className="h-4 w-4 mr-2" />
                    Appeler maintenant
                  </Button>
                  <Link href="/contact">
                    <Button variant="outline" className="w-full border-terracotta-500 text-terracotta-500 hover:bg-terracotta-500 hover:text-white">
                      <Mail className="h-4 w-4 mr-2" />
                      Envoyer un message
                    </Button>
                  </Link>
                </div>
                
                <div className="mt-6 pt-6 border-t border-neutral-200">
                  <div className="text-sm text-neutral-600">
                    <div className="flex items-center justify-between mb-2">
                      <span>Référence :</span>
                      <span className="font-medium">{property.id.slice(0, 8).toUpperCase()}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Statut :</span>
                      <Badge variant="outline" className="text-green-600 border-green-600">
                        Disponible
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
