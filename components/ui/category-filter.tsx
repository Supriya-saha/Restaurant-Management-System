"use client";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

export function CategoryFilter({
  categories,
  selectedCategory,
  onSelectCategory,
}: CategoryFilterProps) {
  return (
    <ScrollArea className="whitespace-nowrap pb-2">
      <div className="flex gap-2 p-1">
        <Button
          variant={selectedCategory === "all" ? "default" : "outline"}
          className={cn(
            "rounded-full",
            selectedCategory === "all" 
              ? "bg-orange-500 hover:bg-orange-600" 
              : "hover:bg-orange-500/10 hover:text-orange-500"
          )}
          onClick={() => onSelectCategory("all")}
        >
          All
        </Button>
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            className={cn(
              "rounded-full",
              selectedCategory === category 
                ? "bg-orange-500 hover:bg-orange-600" 
                : "hover:bg-orange-500/10 hover:text-orange-500"
            )}
            onClick={() => onSelectCategory(category)}
          >
            {category}
          </Button>
        ))}
      </div>
    </ScrollArea>
  );
}