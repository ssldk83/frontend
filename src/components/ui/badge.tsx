import React from "react";
export function Badge({ children, variant="default", className="" }:{children:React.ReactNode; variant?: "default"|"secondary"|"outline"; className?:string}) {
  const styles = {
    default: "bg-black text-white",
    secondary: "bg-gray-100 text-gray-800",
    outline: "border border-gray-300"
  }[variant];
  return <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs ${styles} ${className}`}>{children}</span>;
}
