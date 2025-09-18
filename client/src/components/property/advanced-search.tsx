import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";
import { useState } from "react";

interface AdvancedSearchProps {
  onSearch?: (filters: {
    type?: string;
    city?: string;
    minPrice?: number;
    maxPrice?: number;
    minSurface?: number;
  }) => void;
}

export default function AdvancedSearch({ onSearch }: AdvancedSearchProps) {
  const [filters, setFilters] = useState({
    type: "",
    city: "",
    budget: "",
    surface: ""
  });

  const handleSubmit = () => {
    if (!onSearch) return;

    const searchFilters: any = {};
    
    if (filters.type && filters.type !== "tous") {
      searchFilters.type = filters.type;
    }
    
    if (filters.city && filters.city !== "maine-et-loire") {
      searchFilters.city = filters.city;
    }
    
    if (filters.budget && filters.budget !== "unlimited") {
      const budgetMap: Record<string, { min?: number; max?: number }> = {
        "300000": { max: 300000 },
        "500000": { min: 300000, max: 500000 },
        "800000": { min: 500000, max: 800000 },
        "1200000": { min: 800000, max: 1200000 },
        "unlimited": { min: 1200000 }
      };
      
      const range = budgetMap[filters.budget];
      if (range?.min) searchFilters.minPrice = range.min;
      if (range?.max) searchFilters.maxPrice = range.max;
    }
    
    if (filters.surface && filters.surface !== "unlimited") {
      const surfaceMap: Record<string, number> = {
        "150": 150,
        "250": 250,
        "400": 400
      };
      searchFilters.minSurface = surfaceMap[filters.surface];
    }

    onSearch(searchFilters);
  };
  return (
    <section className="py-16 bg-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="bg-gray-800 shadow-lg border-gray-600">
          <CardContent className="p-8">
            <h2 className="font-display font-semibold text-2xl text-white mb-6 text-center">Recherche Avancée</h2>
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div>
                  <label className="block text-sm font-medium text-white mb-2">Type de bien</label>
                  <Select value={filters.type} onValueChange={(value) => setFilters({...filters, type: value})}>
                    <SelectTrigger className="w-full p-3 bg-gray-700 border border-gray-600 text-white rounded-md focus:ring-2 focus:ring-chartreuse focus:border-chartreuse">
                      <SelectValue placeholder="Tous les types" />
                    </SelectTrigger>
                    <SelectContent side="bottom" align="start" sideOffset={5}>
                      <SelectItem value="tous">Tous les types</SelectItem>
                      <SelectItem value="château">Château</SelectItem>
                      <SelectItem value="manoir">Manoir</SelectItem>
                      <SelectItem value="maison de maître">Maison de maître</SelectItem>
                      <SelectItem value="propriété viticole">Propriété viticole</SelectItem>
                      <SelectItem value="loft">Loft</SelectItem>
                      <SelectItem value="villa">Villa</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-white mb-2">Localisation</label>
                  <Select value={filters.city} onValueChange={(value) => setFilters({...filters, city: value})}>
                    <SelectTrigger className="w-full p-3 bg-gray-700 border border-gray-600 text-white rounded-md focus:ring-2 focus:ring-chartreuse focus:border-chartreuse">
                      <SelectValue placeholder="Maine-et-Loire (49)" />
                    </SelectTrigger>
                    <SelectContent side="bottom" align="start" sideOffset={5}>
                      <SelectItem value="maine-et-loire">Maine-et-Loire (49)</SelectItem>
                      <SelectItem value="angers">Angers</SelectItem>
                      <SelectItem value="saumur">Saumur</SelectItem>
                      <SelectItem value="segré">Segré</SelectItem>
                      <SelectItem value="cholet">Cholet</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-white mb-2">Budget (€)</label>
                  <Select value={filters.budget} onValueChange={(value) => setFilters({...filters, budget: value})}>
                    <SelectTrigger className="w-full p-3 bg-gray-700 border border-gray-600 text-white rounded-md focus:ring-2 focus:ring-chartreuse focus:border-chartreuse">
                      <SelectValue placeholder="Budget maximum" />
                    </SelectTrigger>
                    <SelectContent side="bottom" align="start" sideOffset={5}>
                      <SelectItem value="300000">Jusqu'à 300 000</SelectItem>
                      <SelectItem value="500000">300 000 - 500 000</SelectItem>
                      <SelectItem value="800000">500 000 - 800 000</SelectItem>
                      <SelectItem value="1200000">800 000 - 1 200 000</SelectItem>
                      <SelectItem value="unlimited">Plus de 1 200 000</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-white mb-2">Surface (m²)</label>
                  <Select value={filters.surface} onValueChange={(value) => setFilters({...filters, surface: value})}>
                    <SelectTrigger className="w-full p-3 bg-gray-700 border border-gray-600 text-white rounded-md focus:ring-2 focus:ring-chartreuse focus:border-chartreuse">
                      <SelectValue placeholder="Surface minimum" />
                    </SelectTrigger>
                    <SelectContent side="bottom" align="start" sideOffset={5}>
                      <SelectItem value="150">Jusqu'à 150 m²</SelectItem>
                      <SelectItem value="250">150 - 250 m²</SelectItem>
                      <SelectItem value="400">250 - 400 m²</SelectItem>
                      <SelectItem value="unlimited">Plus de 400 m²</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="flex justify-center">
                <Button onClick={handleSubmit} className="btn-chartreuse px-8 py-3">
                  <Search className="mr-2 h-4 w-4" />
                  Rechercher
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
