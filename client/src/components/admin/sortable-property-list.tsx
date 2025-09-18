import { useState, useEffect } from "react";
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from "@dnd-kit/core";
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MapPin, MoreHorizontal, Edit, Trash2, GripVertical } from "lucide-react";
import type { Property } from "@shared/schema";
import { useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

interface SortablePropertyItemProps {
  property: Property;
  onEdit: (property: Property) => void;
  onDelete: (id: string) => void;
  formatPrice: (price: number) => string;
}

function SortablePropertyItem({ property, onEdit, onDelete, formatPrice }: SortablePropertyItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: property.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <Card ref={setNodeRef} style={style} className={`hover:shadow-md transition-shadow ${isDragging ? 'z-50' : ''}`}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex space-x-4 flex-1">
            <div 
              className="cursor-grab active:cursor-grabbing flex items-center"
              {...attributes}
              {...listeners}
            >
              <GripVertical className="h-5 w-5 text-gray-400" />
            </div>
            {property.images?.[0] && (
              <img
                src={property.images[0]}
                alt={property.title}
                className="w-20 h-20 object-cover rounded-lg"
              />
            )}
            <div className="flex-1">
              <h3 className="font-semibold text-lg text-black mb-1">
                {property.title}
              </h3>
              <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-1" />
                  {property.city}
                </div>
                <Badge variant="secondary">{property.type}</Badge>
              </div>
              <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                {property.description}
              </p>
              <div className="text-lg font-semibold text-black">
                {formatPrice(property.price)}
              </div>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0 text-black hover:bg-gray-100">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-white border border-gray-200">
              <DropdownMenuItem onClick={() => onEdit(property)} className="text-black hover:bg-gray-100">
                <Edit className="h-4 w-4 mr-2" />
                Modifier
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => onDelete(property.id)}
                className="text-red-600 hover:bg-red-50"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Supprimer
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardContent>
    </Card>
  );
}

interface SortablePropertyListProps {
  properties: Property[];
  onEdit: (property: Property) => void;
  onDelete: (id: string) => void;
  formatPrice: (price: number) => string;
}

export function SortablePropertyList({ properties, onEdit, onDelete, formatPrice }: SortablePropertyListProps) {
  const [items, setItems] = useState(properties);
  const { toast } = useToast();
  
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const updateOrderMutation = useMutation({
    mutationFn: async (propertyIds: string[]) => {
      await apiRequest("PATCH", "/api/admin/properties/order", {
        propertyIds
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/properties"] });
      toast({
        title: "Ordre mis à jour",
        description: "L'ordre des propriétés a été sauvegardé avec succès",
      });
    },
    onError: () => {
      toast({
        title: "Erreur",
        description: "Impossible de sauvegarder l'ordre des propriétés",
        variant: "destructive",
      });
      // Reset items to original order on error
      setItems(properties);
    },
  });

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (active.id !== over?.id) {
      const oldIndex = items.findIndex((item) => item.id === active.id);
      const newIndex = items.findIndex((item) => item.id === over?.id);
      
      const newItems = arrayMove(items, oldIndex, newIndex);
      setItems(newItems);
      
      // Update order on server
      const propertyIds = newItems.map(item => item.id);
      updateOrderMutation.mutate(propertyIds);
    }
  }

  // Update local items when properties change
  useEffect(() => {
    setItems(properties);
  }, [properties]);

  return (
    <div className={updateOrderMutation.isPending ? "opacity-50 pointer-events-none" : ""}>
      {updateOrderMutation.isPending && (
        <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-700">Mise à jour de l'ordre en cours...</p>
        </div>
      )}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={items.map(item => item.id)} strategy={verticalListSortingStrategy}>
          <div className="grid gap-4">
            {items.map((property) => (
              <SortablePropertyItem
                key={property.id}
                property={property}
                onEdit={onEdit}
                onDelete={onDelete}
                formatPrice={formatPrice}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
}