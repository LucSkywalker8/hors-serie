import HeroSection from "@/components/sections/hero-section";
import AdvancedSearch from "@/components/property/advanced-search";
import PropertyFilters from "@/components/property/property-filters";
import PropertyCard from "@/components/property/property-card";
import PhilosophySection from "@/components/sections/philosophy-section";
import TestimonialsSection from "@/components/sections/testimonials-section";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import type { Property } from "@shared/schema";

export default function Home() {
  const [activeFilter, setActiveFilter] = useState("tous");
  const [searchFilters, setSearchFilters] = useState<{
    type?: string;
    city?: string;
    minPrice?: number;
    maxPrice?: number;
    minSurface?: number;
  } | null>(null);

  const { data: properties, isLoading } = useQuery<Property[]>({
    queryKey: ["/api/properties"],
    enabled: !searchFilters && activeFilter === "tous",
  });

  const { data: filteredProperties } = useQuery<Property[]>({
    queryKey: ["/api/properties/type", activeFilter],
    enabled: !searchFilters && activeFilter !== "tous",
  });

  const { data: searchResults } = useQuery<Property[]>({
    queryKey: ["/api/properties/search", searchFilters],
    queryFn: async () => {
      if (!searchFilters) return [];
      
      const params = new URLSearchParams();
      if (searchFilters.type) params.append('type', searchFilters.type);
      if (searchFilters.city) params.append('city', searchFilters.city);
      if (searchFilters.minPrice) params.append('minPrice', searchFilters.minPrice.toString());
      if (searchFilters.maxPrice) params.append('maxPrice', searchFilters.maxPrice.toString());
      if (searchFilters.minSurface) params.append('minSurface', searchFilters.minSurface.toString());
      
      const response = await fetch(`/api/properties/search?${params.toString()}`);
      if (!response.ok) throw new Error('Search failed');
      return response.json();
    },
    enabled: !!searchFilters,
  });

  const handleAdvancedSearch = (filters: {
    type?: string;
    city?: string;
    minPrice?: number;
    maxPrice?: number;
    minSurface?: number;
  }) => {
    setSearchFilters(filters);
    setActiveFilter("tous"); // Reset filter when using advanced search
  };

  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
    setSearchFilters(null); // Reset advanced search when using type filter
  };

  let displayProperties: Property[] = [];
  if (searchFilters) {
    displayProperties = searchResults || [];
  } else if (activeFilter === "tous") {
    displayProperties = properties || [];
  } else {
    displayProperties = filteredProperties || [];
  }
  
  const featuredProperties = displayProperties.slice(0, 6);

  return (
    <div className="pt-20">
      <HeroSection />
      <AdvancedSearch onSearch={handleAdvancedSearch} />
      
      {/* Properties Section - Style GolfSpace avec format original */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display font-light text-4xl text-gray-900 mb-6">
              Nos Biens d'<span className="text-gradient font-bold">Exception</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Une sélection rigoureuse de propriétés uniques, chacune racontant une histoire particulière.
            </p>
          </div>

          <PropertyFilters activeFilter={activeFilter} onFilterChange={handleFilterChange} />

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="property-card rounded-2xl overflow-hidden animate-pulse">
                  <div className="h-64 bg-gray-800"></div>
                  <div className="p-6 space-y-4">
                    <div className="h-4 bg-gray-800 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-800 rounded w-1/2"></div>
                    <div className="h-12 bg-gray-800 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProperties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Link href="/biens">
              <Button className="btn-chartreuse px-8 py-3 rounded-full">
                Voir tous nos biens
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <PhilosophySection />
      <TestimonialsSection />
    </div>
  );
}