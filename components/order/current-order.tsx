"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { OrderItem, OrderType, MenuItem } from "@/types";
import { ScrollArea } from "@/components/ui/scroll-area";
import { formatCurrency, calculateTax, calculateTotal } from "@/lib/utils";
import { LucideTrash2, LucideReceipt } from "lucide-react";

interface CurrentOrderProps {
  items: OrderItem[];
  onRemoveItem: (index: number) => void;
  onUpdateQuantity: (index: number, quantity: number) => void;
  onSubmitOrder: (tableNumber: string, orderType: OrderType) => void;
  onClearOrder: () => void;
}

export function CurrentOrder({
  items,
  onRemoveItem,
  onUpdateQuantity,
  onSubmitOrder,
  onClearOrder,
}: CurrentOrderProps) {
  const [orderType, setOrderType] = useState<OrderType>("dine-in");
  const [tableNumber, setTableNumber] = useState("");
  const [subtotal, setSubtotal] = useState(0);
  const [tax, setTax] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    // Calculate subtotal
    const newSubtotal = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    setSubtotal(newSubtotal);

    // Calculate tax (18%)
    const newTax = calculateTax(newSubtotal);
    setTax(newTax);

    // Calculate total
    const newTotal = calculateTotal(newSubtotal);
    setTotal(newTotal);
  }, [items]);

  const handleSubmit = () => {
    if (orderType === "dine-in" && !tableNumber.trim()) {
      alert("Please enter a table number");
      return;
    }

    if (items.length === 0) {
      alert("Please add items to the order");
      return;
    }

    onSubmitOrder(tableNumber, orderType);
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl flex items-center justify-between">
          Current Order
          {items.length > 0 && (
            <Button
              variant="outline"
              size="icon"
              onClick={onClearOrder}
              className="h-8 w-8"
            >
              <LucideTrash2 className="h-4 w-4" />
            </Button>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-grow overflow-hidden p-0">
        {items.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center p-6 text-center">
            <LucideReceipt className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No items in order</p>
            <p className="text-sm text-muted-foreground mt-1">
              Add items from the menu to create an order
            </p>
          </div>
        ) : (
          <ScrollArea className="h-[calc(100%-2rem)] px-6">
            <div className="space-y-4">
              {items.map((item, index) => (
                <div key={index} className="flex justify-between items-center">
                  <div className="flex-grow">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {formatCurrency(item.price)} each
                        </p>
                      </div>
                      <div className="flex items-center">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() => onUpdateQuantity(index, Math.max(1, item.quantity - 1))}
                        >
                          -
                        </Button>
                        <span className="w-7 text-center">{item.quantity}</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() => onUpdateQuantity(index, item.quantity + 1)}
                        >
                          +
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-1">
                      <p className="text-sm font-medium">
                        {formatCurrency(item.price * item.quantity)}
                      </p>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 text-destructive"
                        onClick={() => onRemoveItem(index)}
                      >
                        <LucideTrash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        )}
      </CardContent>
      <div className="px-6 pb-3">
        <Separator className="my-3" />
        <div className="space-y-1.5">
          <div className="flex justify-between">
            <span className="text-sm">Subtotal</span>
            <span>{formatCurrency(subtotal)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm">Tax (18%)</span>
            <span>{formatCurrency(tax)}</span>
          </div>
          <div className="flex justify-between font-bold">
            <span>Total</span>
            <span>{formatCurrency(total)}</span>
          </div>
        </div>
      </div>
      <CardFooter className="flex-col gap-4 pt-0">
        <RadioGroup
          value={orderType}
          onValueChange={(value) => setOrderType(value as OrderType)}
          className="flex"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="dine-in" id="dine-in" />
            <Label htmlFor="dine-in">Dine-in</Label>
          </div>
          <div className="flex items-center space-x-2 ml-4">
            <RadioGroupItem value="parcel" id="parcel" />
            <Label htmlFor="parcel">Parcel</Label>
          </div>
        </RadioGroup>
        
        {orderType === "dine-in" && (
          <div className="w-full">
            <Label htmlFor="table-number">Table Number</Label>
            <Input
              id="table-number"
              value={tableNumber}
              onChange={(e) => setTableNumber(e.target.value)}
              placeholder="Enter table number"
              className="mt-1"
            />
          </div>
        )}
        
        <Button
          onClick={handleSubmit}
          className="w-full bg-orange-500 hover:bg-orange-600"
          disabled={items.length === 0}
        >
          Place Order
        </Button>
      </CardFooter>
    </Card>
  );
}