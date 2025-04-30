"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";
import { PieChart, Pie, ResponsiveContainer, Cell, Legend, Tooltip } from "recharts";

const data = [
  { name: "Butter Chicken", value: 28, revenue: 44800 },
  { name: "Paneer Tikka", value: 22, revenue: 30800 },
  { name: "Chicken Biryani", value: 18, revenue: 25200 },
  { name: "Naan", value: 12, revenue: 7200 },
  { name: "Others", value: 20, revenue: 28000 },
];

const COLORS = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
];

interface TopSellingItemsProps {
  className?: string;
}

export function TopSellingItems({ className }: TopSellingItemsProps) {
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background p-2 border rounded-md shadow-sm">
          <p className="font-medium">{payload[0].name}</p>
          <p className="text-sm">{payload[0].value}% of sales</p>
          <p className="text-orange-500 font-bold">
            {formatCurrency(payload[0].payload.revenue)}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Top Selling Items</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={110}
                innerRadius={70}
                fill="#8884d8"
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}