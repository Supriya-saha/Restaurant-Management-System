"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formatCurrency } from "@/lib/utils";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  LineChart,
  Line,
} from "recharts";

const dailyRevenueData = [
  { name: "Mon", revenue: 4200 },
  { name: "Tue", revenue: 3800 },
  { name: "Wed", revenue: 5100 },
  { name: "Thu", revenue: 4700 },
  { name: "Fri", revenue: 6300 },
  { name: "Sat", revenue: 7800 },
  { name: "Sun", revenue: 6900 },
];

const weeklyRevenueData = [
  { name: "Week 1", revenue: 32000 },
  { name: "Week 2", revenue: 36500 },
  { name: "Week 3", revenue: 29700 },
  { name: "Week 4", revenue: 38200 },
];

const monthlyRevenueData = [
  { name: "Jan", revenue: 125000 },
  { name: "Feb", revenue: 118000 },
  { name: "Mar", revenue: 140000 },
  { name: "Apr", revenue: 135000 },
  { name: "May", revenue: 149000 },
  { name: "Jun", revenue: 162000 },
];

interface RevenueChartProps {
  className?: string;
}

export function RevenueChart({ className }: RevenueChartProps) {
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background p-2 border rounded-md shadow-sm">
          <p className="font-medium">{label}</p>
          <p className="text-orange-500 font-bold">
            {formatCurrency(payload[0].value)}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Revenue Overview</CardTitle>
        <CardDescription>
          View your restaurant revenue over time
        </CardDescription>
      </CardHeader>
      <CardContent className="pl-2">
        <Tabs defaultValue="daily" className="w-full">
          <TabsList className="w-full grid grid-cols-3">
            <TabsTrigger value="daily">Daily</TabsTrigger>
            <TabsTrigger value="weekly">Weekly</TabsTrigger>
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
          </TabsList>
          <TabsContent value="daily" className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dailyRevenueData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" />
                <YAxis
                  tickFormatter={(value) => `₹${value / 1000}K`}
                  width={50}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar
                  dataKey="revenue"
                  fill="hsl(var(--chart-1))"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </TabsContent>
          <TabsContent value="weekly" className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyRevenueData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" />
                <YAxis
                  tickFormatter={(value) => `₹${value / 1000}K`}
                  width={50}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar
                  dataKey="revenue"
                  fill="hsl(var(--chart-2))"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </TabsContent>
          <TabsContent value="monthly" className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyRevenueData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" />
                <YAxis
                  tickFormatter={(value) => `₹${value / 1000}K`}
                  width={50}
                />
                <Tooltip content={<CustomTooltip />} />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="hsl(var(--chart-3))"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}