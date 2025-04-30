"use client";

import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { CategoryFilter } from "@/components/ui/category-filter";
import { MenuItemCard } from "@/components/ui/menu-item-card";
import { CurrentOrder } from "@/components/order/current-order";
import { OrderType, OrderItem, MenuItem } from "@/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { generateOrderId, formatCurrency, calculateTotal } from "@/lib/utils";
import { toast } from "sonner";

// Sample menu data categorized
const menuCategories = [
  "Starters", 
  "Main Course", 
  "Breads", 
  "Rice & Biryani", 
  "Desserts", 
  "Beverages"
];

const menuItems: MenuItem[] = [
  {
    id: "1",
    name: "Paneer Tikka",
    description: "Chunks of cottage cheese marinated in yogurt and spices, grilled to perfection.",
    price: 280,
    category: "Starters",
    image: "https://images.pexels.com/photos/7813568/pexels-photo-7813568.jpeg",
    available: true,
    preparationTime: 15,
    vegetarian: true,
    spicyLevel: 2,
  },
  {
    id: "2",
    name: "Butter Chicken",
    description: "Tender chicken pieces cooked in a rich tomato and butter gravy.",
    price: 360,
    category: "Main Course",
    image: "https://images.pexels.com/photos/7625056/pexels-photo-7625056.jpeg",
    available: true,
    preparationTime: 20,
    vegetarian: false,
    spicyLevel: 1,
  },
  {
    id: "3",
    name: "Naan",
    description: "Soft, leavened flatbread baked in a tandoor.",
    price: 60,
    category: "Breads",
    image: "https://images.pexels.com/photos/1117862/pexels-photo-1117862.jpeg",
    available: true,
    preparationTime: 10,
    vegetarian: true,
  },
  {
    id: "4",
    name: "Chicken Biryani",
    description: "Fragrant basmati rice cooked with tender chicken pieces and aromatic spices.",
    price: 320,
    category: "Rice & Biryani",
    image: "https://images.pexels.com/photos/7437719/pexels-photo-7437719.jpeg",
    available: true,
    preparationTime: 25,
    vegetarian: false,
    spicyLevel: 3,
  },
  {
    id: "5",
    name: "Gulab Jamun",
    description: "Soft, spongy milk-solid balls soaked in sugar syrup.",
    price: 120,
    category: "Desserts",
    image: "https://images.pexels.com/photos/13326900/pexels-photo-13326900.jpeg",
    available: true,
    preparationTime: 5,
    vegetarian: true,
  },
  {
    id: "6",
    name: "Masala Chai",
    description: "Traditional Indian spiced tea brewed with milk and sugar.",
    price: 80,
    category: "Beverages",
    image: "https://images.pexels.com/photos/5946971/pexels-photo-5946971.jpeg",
    available: true,
    preparationTime: 5,
    vegetarian: true,
  },
  {
    id: "7",
    name: "Chilli Paneer",
    description: "Crispy paneer tossed with bell peppers in a spicy sauce.",
    price: 290,
    category: "Starters",
    image: "https://images.pexels.com/photos/5835353/pexels-photo-5835353.jpeg",
    available: true,
    preparationTime: 15,
    vegetarian: true,
    spicyLevel: 3,
  },
  {
    id: "8",
    name: "Chicken Tikka",
    description: "Boneless chicken pieces marinated and grilled in a tandoor.",
    price: 320,
    category: "Starters",
    image: "https://images.pexels.com/photos/12842119/pexels-photo-12842119.jpeg",
    available: true,
    preparationTime: 18,
    vegetarian: false,
    spicyLevel: 2,
  },
  {
    id: "9",
    name: "Palak Paneer",
    description: "Cottage cheese cubes in a creamy spinach gravy.",
    price: 280,
    category: "Main Course",
    image: "https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg",
    available: true,
    preparationTime: 20,
    vegetarian: true,
    spicyLevel: 1,
  },
  {
    id: "10",
    name: "Rogan Josh",
    description: "Aromatic lamb curry with a rich gravy.",
    price: 380,
    category: "Main Course",
    image: "https://images.pexels.com/photos/8696567/pexels-photo-8696567.jpeg",
    available: false,
    preparationTime: 30,
    vegetarian: false,
    spicyLevel: 3,
  },
  {
    id: "11",
    name: "Garlic Naan",
    description: "Naan bread topped with garlic and butter.",
    price: 80,
    category: "Breads",
    image: "https://images.pexels.com/photos/2679501/pexels-photo-2679501.jpeg",
    available: true,
    preparationTime: 10,
    vegetarian: true,
  },
  {
    id: "12",
    name: "Veg Pulao",
    description: "Fragrant rice cooked with mixed vegetables and spices.",
    price: 220,
    category: "Rice & Biryani",
    image: "https://images.pexels.com/photos/7625056/pexels-photo-7625056.jpeg",
    available: true,
    preparationTime: 15,
    vegetarian: true,
    spicyLevel: 1,
  },
];

export default function WaiterMenuPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [currentItems, setCurrentItems] = useState<OrderItem[]>([]);
  const [filteredItems, setFilteredItems] = useState<MenuItem[]>(menuItems);
  const [searchQuery, setSearchQuery] = useState("");

  // Filter menu items based on selected category and search query
  useEffect(() => {
    let filtered = menuItems;
    
    if (selectedCategory !== "all") {
      filtered = filtered.filter((item) => item.category === selectedCategory);
    }
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (item) =>
          item.name.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query)
      );
    }
    
    setFilteredItems(filtered);
  }, [selectedCategory, searchQuery]);

  const handleAddToOrder = (item: MenuItem, quantity: number) => {
    const existingItemIndex = currentItems.findIndex(
      (orderItem) => orderItem.menuItemId === item.id
    );

    if (existingItemIndex !== -1) {
      // Update quantity if item already exists in order
      const updatedItems = [...currentItems];
      updatedItems[existingItemIndex].quantity += quantity;
      setCurrentItems(updatedItems);
    } else {
      // Add new item to order
      setCurrentItems([
        ...currentItems,
        {
          menuItemId: item.id,
          name: item.name,
          price: item.price,
          quantity: quantity,
        },
      ]);
    }

    toast.success(`Added ${quantity}x ${item.name} to order`);
  };

  const handleRemoveItem = (index: number) => {
    const newItems = [...currentItems];
    newItems.splice(index, 1);
    setCurrentItems(newItems);
  };

  const handleUpdateQuantity = (index: number, quantity: number) => {
    const newItems = [...currentItems];
    newItems[index].quantity = quantity;
    setCurrentItems(newItems);
  };

  const handleSubmitOrder = async (tableNumber: string, orderType: OrderType) => {
    // Calculate totals
    const subtotal = currentItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    const total = calculateTotal(subtotal);

    // Create order object
    const order = {
      id: generateOrderId(),
      tableNumber: orderType === "dine-in" ? parseInt(tableNumber) : undefined,
      items: currentItems,
      type: orderType,
      status: "pending",
      subtotal: subtotal,
      tax: total - subtotal,
      total: total,
      waiterId: "1", // In a real app, this would be the logged-in user's ID
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // In a real app, you would send this to your API
    console.log("Submitting order:", order);
    
    // Show success message and clear order
    toast.success("Order placed successfully!");
    setCurrentItems([]);
  };

  const handleClearOrder = () => {
    setCurrentItems([]);
    toast.info("Order cleared");
  };

  return (
    <DashboardLayout role="waiter">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <h1 className="text-3xl font-bold tracking-tight">Menu</h1>
          
          <CategoryFilter
            categories={menuCategories}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredItems.map((item) => (
              <MenuItemCard
                key={item.id}
                item={item}
                onAddToOrder={handleAddToOrder}
              />
            ))}
          </div>
        </div>
        
        <div className="h-[calc(100vh-120px)] sticky top-20">
          <CurrentOrder
            items={currentItems}
            onRemoveItem={handleRemoveItem}
            onUpdateQuantity={handleUpdateQuantity}
            onSubmitOrder={handleSubmitOrder}
            onClearOrder={handleClearOrder}
          />
        </div>
      </div>
    </DashboardLayout>
  );
}