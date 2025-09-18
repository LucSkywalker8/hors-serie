import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, MapPin, Bed, Bath, Maximize } from "lucide-react";
import { Link } from "wouter";
import type { Property } from "@shared/schema";
import { getDpeColor, getGesColor } from "@/lib/energy-calculator";

interface PropertyCardProps {
  property: Property;
}

export default function PropertyCard({ property }: PropertyCardProps) {
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
    <div className="bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl hover:transform hover:scale-105 transition-all duration-300 border border-gray-700">
      <div className="relative overflow-hidden">
        <img 
          src={property.images[0]} 
          alt={property.title}
          className="w-full h-64 object-cover transition-transform duration-300 hover:scale-105"
        />
        <div className="absolute top-4 left-4 flex flex-col space-y-2">
          <Badge className="bg-chartreuse text-black">
            {getTypeDisplayName(property.type)}
          </Badge>
          {((property.dpeClass && property.dpeValue) || (property.gesClass && property.gesValue)) && (
            <div className="flex space-x-1">
              {property.dpeClass && property.dpeValue && (
                <Badge 
                  data-testid={`dpe-badge-${property.id}`}
                  className="text-white font-bold text-xs px-2 py-1"
                  style={{ backgroundColor: getDpeColor(property.dpeClass) }}
                >
                  DPE {property.dpeClass}
                </Badge>
              )}
              {property.gesClass && property.gesValue && (
                <Badge 
                  data-testid={`ges-badge-${property.id}`}
                  className="text-white font-bold text-xs px-2 py-1"
                  style={{ backgroundColor: getGesColor(property.gesClass) }}
                >
                  GES {property.gesClass}
                </Badge>
              )}
            </div>
          )}
        </div>
        <div className="absolute top-4 right-4">
          <button className="bg-black/60 text-white p-2 rounded-full hover:bg-chartreuse hover:text-black transition-colors">
            <Heart className="h-4 w-4" />
          </button>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <h3 className="font-display text-xl text-white">{property.title}</h3>
          <span className="text-chartreuse font-semibold text-lg">{formatPrice(property.price.toString())}</span>
        </div>
        
        <p className="text-gray-300 mb-3 flex items-center">
          <MapPin className="h-4 w-4 text-chartreuse mr-1" />
          {property.city}
        </p>
        
        <p className="text-gray-400 mb-4 text-sm line-clamp-2">
          {property.description}
        </p>
        
        <div className="flex justify-between items-center text-sm text-gray-300 mb-4">
          <span className="flex items-center">
            <Bed className="h-4 w-4 mr-1" /> {property.bedrooms} chambres
          </span>
          <span className="flex items-center">
            <Bath className="h-4 w-4 mr-1" /> {property.bathrooms} sdb
          </span>
          <span className="flex items-center">
            <Maximize className="h-4 w-4 mr-1" /> {property.surface} m²
          </span>
        </div>
        
        <Link href={`/biens/${property.id}`}>
          <Button className="w-full btn-outline-chartreuse transition-colors">
            Découvrir ce bien
          </Button>
        </Link>
      </div>
    </div>
  );
}
