import React from "react";
import { cn } from "../../lib/cn";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "outline" | "secondary";
  size?: "default" | "icon";
};
export function Button({ className, variant="default", size="default", ...props }: Props) {
  const v = {
    default: "bg-black text-white hover:opacity-90",
    outline: "border border-gray-300 bg-white hover:bg-gray-50",
    secondary: "bg-gray-100 hover:bg-gray-200"
  }[variant];
  const s = size === "icon" ? "p-2 aspect-square inline-flex items-center justify-center" : "px-3 py-2";
  return <button className={cn("rounded-xl text-sm", v, s, className)} {...props} />;
}
