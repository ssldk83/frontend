import React from "react";
import { cn } from "../../lib/cn";
export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input className={cn("w-full rounded-lg border px-3 py-2 text-sm", props.className)} {...props} />;
}
