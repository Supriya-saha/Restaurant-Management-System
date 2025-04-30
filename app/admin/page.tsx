"use client";

import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { StatCard } from "@/components/ui/stat-card";
import { RevenueChart } from "@/components/dashboard/revenue-chart";
import { TopSellingItems } from "@/components/dashboard/top-selling-items";
import { formatCurrency } from "@/lib/utils";
import { Grid, BarChart, ArrowUpCircle, ArrowDownCircle, Clock } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import { OrderStatusBadge } from "@/components/ui/order-status-badge";
import { Button } from "@/components/ui/button";

// Sample data for recent orders
const recentOrders = [
  {
    id: "ORD-1686832734-123",
    tableNumber: 5,
    total: 1250,
    status: "ready",
    items: 4,
    time: "10 mins ago",
  },
  {
    id: "ORD-1686832098-456",
    tableNumber: 7,
    total: 1850,
    status: "preparing",
    items: 6,
    time: "15 mins ago",
  },
  {
    id: "ORD-1686831234-789",
    tableNumber: null,
    total: 750,
    status: "delivered",
    items: 2,
    time: "25 mins ago",
  },
  {
    id: "ORD-1686830455-012",
    tableNumber: 2,
    total: 1550,
    status: "pending",
    items: 5,
    time: "30 mins ago",
  },
];

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
    accessorKey: "tableNumber",
    header: "Table",
    cell: ({ row }: any) => {
      const tableNumber = row.getValue("tableNumber");
      return tableNumber ? `Table ${tableNumber}` : "Parcel";
    },
  },
  {
    accessorKey: "items",
    header: "Items",
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
    accessorKey: "time",
    header: "Time",
  },
  {
    id: "actions",
    cell: ({ row }: any) => {
      const order = row.original;
      return (
        <Button variant="ghost" size="sm">
          View
        </Button>
      );
    },
  },
];

export default function AdminDashboard() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <DashboardLayout role="admin">
      <div className="space-y-6">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Today's Revenue"
            value={formatCurrency(45800)}
            description="Total sales for today"
            icon={<BarChart className="h-4 w-4" />}
            trend={{ value: 12, positive: true }}
          />
          <StatCard
            title="Total Orders"
            value="38"
            description="Orders placed today"
            icon={<Grid className="h-4 w-4" />}
            trend={{ value: 5, positive: true }}
          />
          <StatCard
            title="Average Order Value"
            value={formatCurrency(1205)}
            description="Per order average"
            icon={<ArrowUpCircle className="h-4 w-4" />}
            trend={{ value: 3, positive: true }}
          />
          <StatCard
            title="Pending Orders"
            value="4"
            description="Waiting to be processed"
            icon={<Clock className="h-4 w-4" />}
            trend={{ value: 2, positive: false }}
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <RevenueChart />
          <TopSellingItems />
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
            <CardDescription>A list of recent orders placed in your restaurant</CardDescription>
          </CardHeader>
          <CardContent>
            <DataTable columns={columns} data={recentOrders} />
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}