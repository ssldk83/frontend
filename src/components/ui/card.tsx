import React from "react";
import { cn } from "../../lib/cn";
export function Card({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("bg-card border rounded-2xl", className)} {...props} />;
}
export function CardHeader(props: React.HTMLAttributes<HTMLDivElement>) { return <div className="p-4" {...props} />; }
export function CardContent(props: React.HTMLAttributes<HTMLDivElement>) { return <div className="p-4 pt-0" {...props} />; }
export function CardTitle(props: React.HTMLAttributes<HTMLDivElement>) { return <div className="font-semibold" {...props} />; }
