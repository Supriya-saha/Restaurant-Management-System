import { OrderStatus } from "@/types";
import { Badge } from "@/components/ui/badge";
import { LucideClock as LucideClockIcon, LucideChefHat, LucideCheckCircle2, LucidePackageCheck, LucideXCircle } from "lucide-react";

interface OrderStatusBadgeProps {
  status: OrderStatus;
}

export function OrderStatusBadge({ status }: OrderStatusBadgeProps) {
  const getStatusConfig = (status: OrderStatus) => {
    switch (status) {
      case "pending":
        return {
          label: "Pending",
          icon: <LucideClockIcon className="h-3 w-3 mr-1" />,
          variant: "outline" as const,
        };
      case "preparing":
        return {
          label: "Preparing",
          icon: <LucideChefHat className="h-3 w-3 mr-1" />,
          variant: "default" as const,
        };
      case "ready":
        return {
          label: "Ready",
          icon: <LucideCheckCircle2 className="h-3 w-3 mr-1" />,
          variant: "secondary" as const,
        };
      case "delivered":
        return {
          label: "Delivered",
          icon: <LucidePackageCheck className="h-3 w-3 mr-1" />,
          variant: "success" as const,
        };
      case "cancelled":
        return {
          label: "Cancelled",
          icon: <LucideXCircle className="h-3 w-3 mr-1" />,
          variant: "destructive" as const,
        };
      default:
        return {
          label: "Unknown",
          icon: null,
          variant: "outline" as const,
        };
    }
  };

  const config = getStatusConfig(status);

  return (
    <Badge variant={config.variant} className="flex items-center">
      {config.icon}
      {config.label}
    </Badge>
  );
}