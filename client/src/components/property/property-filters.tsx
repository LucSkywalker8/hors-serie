import { Button } from "@/components/ui/button";

interface PropertyFiltersProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

export default function PropertyFilters({ activeFilter, onFilterChange }: PropertyFiltersProps) {
  const filters = [
    { key: "tous", label: "Tous" },
    { key: "château", label: "Châteaux" },
    { key: "maison de maître", label: "Maisons de maître" },
    { key: "maison de ville", label: "Maisons de ville" },
    { key: "propriété viticole", label: "Propriétés viticoles" },
    { key: "villa", label: "Villas" },
    { key: "appartement", label: "Appartements" },
    { key: "loft", label: "Lofts" }
  ];

  return (
    <div className="flex flex-wrap justify-center gap-4 mb-12">
      {filters.map((filter) => (
        <Button
          key={filter.key}
          onClick={() => onFilterChange(filter.key)}
          className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
            activeFilter === filter.key
              ? "btn-chartreuse"
              : "bg-gray-700 text-white hover:bg-chartreuse hover:text-black border border-gray-600"
          }`}
        >
          {filter.label}
        </Button>
      ))}
    </div>
  );
}
