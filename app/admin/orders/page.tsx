"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { DataTable } from "@/components/ui/data-table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { OrderStatusBadge } from "@/components/ui/order-status-badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { formatCurrency, formatDate, generateKitchenToken } from "@/lib/utils";
import { LucidePrinter, LucideEye, LucideCheck } from "lucide-react";
import { toast } from "sonner";

// Sample orders data
const ordersData = [
  {
    id: "ORD-1686832734-123",
    tableNumber: 5,
    waiterId: "1",
    waiterName: "John Doe",
    items: [
      { menuItemId: "1", name: "Paneer Tikka", price: 280, quantity: 1 },
      { menuItemId: "2", name: "Butter Chicken", price: 360, quantity: 2 },
      { menuItemId: "3", name: "Naan", price: 60, quantity: 3 },
    ],
    type: "dine-in",
    status: "ready",
    subtotal: 1120,
    tax: 201.6,
    total: 1321.6,
    createdAt: new Date(2023, 5, 15, 14, 30),
    updatedAt: new Date(2023, 5, 15, 14, 45),
  },
  {
    id: "ORD-1686832098-456",
    tableNumber: 7,
    waiterId: "2",
    waiterName: "Jane Smith",
    items: [
      { menuItemId: "4", name: "Chicken Biryani", price: 320, quantity: 3 },
      { menuItemId: "5", name: "Gulab Jamun", price: 120, quantity: 4 },
      { menuItemId: "6", name: "Masala Chai", price: 80, quantity: 3 },
    ],
    type: "dine-in",
    status: "preparing",
    subtotal: 1640,
    tax: 295.2,
    total: 1935.2,
    createdAt: new Date(2023, 5, 15, 14, 15),
    updatedAt: new Date(2023, 5, 15, 14, 20),
  },
  {
    id: "ORD-1686831234-789",
    tableNumber: null,
    waiterId: "1",
    waiterName: "John Doe",
    items: [
      { menuItemId: "2", name: "Butter Chicken", price: 360, quantity: 1 },
      { menuItemId: "3", name: "Naan", price: 60, quantity: 2 },
    ],
    type: "parcel",
    status: "delivered",
    subtotal: 480,
    tax: 86.4,
    total: 566.4,
    createdAt: new Date(2023, 5, 15, 14, 0),
    updatedAt: new Date(2023, 5, 15, 14, 25),
    completedAt: new Date(2023, 5, 15, 14, 25),
  },
  {
    id: "ORD-1686830455-012",
    tableNumber: 2,
    waiterId: "2",
    waiterName: "Jane Smith",
    items: [
      { menuItemId: "7", name: "Chilli Paneer", price: 290, quantity: 1 },
      { menuItemId: "9", name: "Palak Paneer", price: 280, quantity: 1 },
      { menuItemId: "11", name: "Garlic Naan", price: 80, quantity: 2 },
      { menuItemId: "5", name: "Gulab Jamun", price: 120, quantity: 2 },
    ],
    type: "dine-in",
    status: "pending",
    subtotal: 970,
    tax: 174.6,
    total: 1144.6,
    createdAt: new Date(2023, 5, 15, 13, 45),
    updatedAt: new Date(2023, 5, 15, 13, 45),
  },
];

// Table columns
const columns = [
  {
    accessorKey: "id",
    header: "Order ID",
    cell: ({ row }: any) => {
      const id = row.getValue("id");
      return <div className="text-xs font-mono">{id}</div>;
    },
  },
  {
    accessorKey: "tableInfo",
    header: "Table Info",
    cell: ({ row }: any) => {
      const order = row.original;
      return order.tableNumber ? `Table ${order.tableNumber}` : "Parcel";
    },
  },
  {
    accessorKey: "waiterName",
    header: "Waiter",
  },
  {
    accessorKey: "createdAt",
    header: "Time",
    cell: ({ row }: any) => {
      const date = row.original.createdAt;
      return formatDate(date);
    },
  },
  {
    accessorKey: "total",
    header: "Total",
    cell: ({ row }: any) => {
      const total = row.getValue("total");
      return formatCurrency(total);
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }: any) => {
      const status = row.getValue("status");
      return <OrderStatusBadge status={status} />;
    },
  },
  {
    id: "actions",
    cell: ({ row }: any) => {
      const order = row.original;
      return (
        <ViewOrderButton order={order} />
      );
    },
  },
];

// View Order Button Component
function ViewOrderButton({ order }: any) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [kitchenTokenDialogOpen, setKitchenTokenDialogOpen] = useState(false);
  const [kitchenToken, setKitchenToken] = useState("");

  const handlePrintKitchenToken = () => {
    const token = generateKitchenToken(order.id, order.items);
    setKitchenToken(token);
    setKitchenTokenDialogOpen(true);
  };

  const handleStatusChange = (newStatus: string) => {
    // In a real app, this would make an API call to update the status
    toast.success(`Order status updated to ${newStatus}`);
    setIsDialogOpen(false);
  };

  return (
    <>
      <Button variant="ghost" size="sm" onClick={() => setIsDialogOpen(true)}>
        <LucideEye className="h-4 w-4 mr-1" />
        View
      </Button>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Order Details - {order.id}</DialogTitle>
            <DialogDescription>
              {order.type === "dine-in" ? `Table ${order.tableNumber}` : "Parcel"} • {formatDate(order.createdAt)}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-medium mb-1">Waiter</h4>
                <p>{order.waiterName}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium mb-1">Status</h4>
                <OrderStatusBadge status={order.status} />
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium mb-2">Items</h4>
              <div className="border rounded-md">
                <table className="w-full">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="text-left p-2 text-sm">Item</th>
                      <th className="text-center p-2 text-sm">Qty</th>
                      <th className="text-right p-2 text-sm">Price</th>
                      <th className="text-right p-2 text-sm">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.items.map((item: any, index: number) => (
                      <tr key={index} className="border-t">
                        <td className="p-2">{item.name}</td>
                        <td className="p-2 text-center">{item.quantity}</td>
                        <td className="p-2 text-right">{formatCurrency(item.price)}</td>
                        <td className="p-2 text-right">{formatCurrency(item.price * item.quantity)}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot className="bg-muted/20">
                    <tr className="border-t">
                      <td colSpan={3} className="p-2 text-right font-medium">Subtotal</td>
                      <td className="p-2 text-right">{formatCurrency(order.subtotal)}</td>
                    </tr>
                    <tr>
                      <td colSpan={3} className="p-2 text-right font-medium">Tax (18%)</td>
                      <td className="p-2 text-right">{formatCurrency(order.tax)}</td>
                    </tr>
                    <tr className="font-bold">
                      <td colSpan={3} className="p-2 text-right">Total</td>
                      <td className="p-2 text-right">{formatCurrency(order.total)}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </div>

          <DialogFooter className="flex flex-col sm:flex-row gap-2">
            <Button 
              variant="outline" 
              onClick={handlePrintKitchenToken}
              className="w-full sm:w-auto"
            >
              <LucidePrinter className="h-4 w-4 mr-2" />
              Print Kitchen Token
            </Button>
            {order.status === "pending" && (
              <Button 
                className="w-full sm:w-auto"
                onClick={() => handleStatusChange("preparing")}
              >
                <LucideCheck className="h-4 w-4 mr-2" />
                Mark as Preparing
              </Button>
            )}
            {order.status === "preparing" && (
              <Button 
                className="w-full sm:w-auto"
                onClick={() => handleStatusChange("ready")}
              >
                <LucideCheck className="h-4 w-4 mr-2" />
                Mark as Ready
              </Button>
            )}
            {order.status === "ready" && (
              <Button 
                className="w-full sm:w-auto"
                onClick={() => handleStatusChange("delivered")}
              >
                <LucideCheck className="h-4 w-4 mr-2" />
                Mark as Delivered
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={kitchenTokenDialogOpen} onOpenChange={setKitchenTokenDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Kitchen Token</DialogTitle>
            <DialogDescription>Print this token for the kitchen</DialogDescription>
          </DialogHeader>
          <div className="bg-muted p-4 rounded font-mono text-sm whitespace-pre">
            {kitchenToken}
          </div>
          <DialogFooter>
            <Button onClick={() => {
              // In a real app, this would trigger actual printing
              toast.success("Kitchen token sent to printer");
              setKitchenTokenDialogOpen(false);
            }}>
              <LucidePrinter className="h-4 w-4 mr-2" />
              Print
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default function OrdersPage() {
  return (
    <DashboardLayout role="admin">
      <div className="space-y-6">
        <h1 className="text-3xl font-bold tracking-tight">Orders</h1>

        <Card>
          <CardHeader>
            <CardTitle>Order Management</CardTitle>
            <CardDescription>View and manage all restaurant orders</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all">
              <TabsList className="mb-4">
                <TabsTrigger value="all">All Orders</TabsTrigger>
                <TabsTrigger value="pending">Pending</TabsTrigger>
                <TabsTrigger value="preparing">Preparing</TabsTrigger>
                <TabsTrigger value="ready">Ready</TabsTrigger>
                <TabsTrigger value="delivered">Delivered</TabsTrigger>
              </TabsList>
              <TabsContent value="all">
                <DataTable 
                  columns={columns} 
                  data={ordersData} 
                  searchColumn="id"
                  searchPlaceholder="Search by order ID..."
                />
              </TabsContent>
              <TabsContent value="pending">
                <DataTable 
                  columns={columns} 
                  data={ordersData.filter(order => order.status === "pending")} 
                  searchColumn="id"
                  searchPlaceholder="Search by order ID..."
                />
              </TabsContent>
              <TabsContent value="preparing">
                <DataTable 
                  columns={columns} 
                  data={ordersData.filter(order => order.status === "preparing")} 
                  searchColumn="id"
                  searchPlaceholder="Search by order ID..."
                />
              </TabsContent>
              <TabsContent value="ready">
                <DataTable 
                  columns={columns} 
                  data={ordersData.filter(order => order.status === "ready")} 
                  searchColumn="id"
                  searchPlaceholder="Search by order ID..."
                />
              </TabsContent>
              <TabsContent value="delivered">
                <DataTable 
                  columns={columns} 
                  data={ordersData.filter(order => order.status === "delivered")} 
                  searchColumn="id"
                  searchPlaceholder="Search by order ID..."
                />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}