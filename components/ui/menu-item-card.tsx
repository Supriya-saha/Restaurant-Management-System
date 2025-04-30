"use client";

import { useState } from "react";
import Image from "next/image";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";
import { MenuItem } from "@/types";
import { Badge } from "@/components/ui/badge";
import { LucideClock as LucideClockIcon, LucideLeaf, LucideFlame } from "lucide-react";

interface MenuItemCardProps {
  item: MenuItem;
  onAddToOrder: (item: MenuItem, quantity: number) => void;
  compact?: boolean;
}

export function MenuItemCard({
  item,
  onAddToOrder,
  compact = false,
}: MenuItemCardProps) {
  const [quantity, setQuantity] = useState(1);

  const handleAddToOrder = () => {
    onAddToOrder(item, quantity);
    setQuantity(1);
  };

  const renderSpicyLevel = () => {
    if (!item.spicyLevel) return null;
    
    const flames = [];
    for (let i = 0; i < item.spicyLevel; i++) {
      flames.push(
        <LucideFlame
          key={i}
          className="h-4 w-4 text-red-500 inline-block"
        />
      );
    }
    
    return <div className="flex items-center gap-0.5">{flames}</div>;
  };

  return (
    <Card className={`overflow-hidden ${!item.available ? 'opacity-60' : ''}`}>
      <div className="relative">
        <div className="aspect-video w-full overflow-hidden">
          <Image
            src={item.image || "https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg"}
            alt={item.name}
            fill
            className="object-cover"
          />
        </div>
        {!item.available && (
          <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
            <Badge variant="destructive" className="text-sm">Out of Stock</Badge>
          </div>
        )}
      </div>
      <CardContent className={compact ? "p-3" : "p-4"}>
        <div className="flex justify-between items-start mb-2">
          <h3 className={`font-semibold ${compact ? 'text-sm' : 'text-lg'}`}>{item.name}</h3>
          <span className="font-bold text-orange-500">{formatCurrency(item.price)}</span>
        </div>
        {!compact && (
          <p className="text-sm text-muted-foreground line-clamp-2 mb-2">{item.description}</p>
        )}
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          {item.vegetarian && (
            <div className="flex items-center">
              <LucideLeaf className="h-3 w-3 text-green-500 mr-1" />
              <span>Veg</span>
            </div>
          )}
          {item.preparationTime && (
            <div className="flex items-center">
              <LucideClockIcon className="h-3 w-3 mr-1" />
              <span>{item.preparationTime} min</span>
            </div>
          )}
          {item.spicyLevel && renderSpicyLevel()}
        </div>
      </CardContent>
      {item.available && (
        <CardFooter className={`bg-muted/50 ${compact ? 'p-3' : 'p-4'}`}>
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 rounded-full"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                -
              </Button>
              <span className="w-8 text-center">{quantity}</span>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 rounded-full"
                onClick={() => setQuantity(quantity + 1)}
              >
                +
              </Button>
            </div>
            <Button 
              onClick={handleAddToOrder}
              className="bg-orange-500 hover:bg-orange-600"
              size={compact ? "sm" : "default"}
            >
              Add to Order
            </Button>
          </div>
        </CardFooter>
      )}
    </Card>
  );
}