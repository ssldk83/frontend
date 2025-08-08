import React, { useState } from "react";
export function Tabs({ defaultValue, children }:{defaultValue:string; children:React.ReactNode}) {
  return <div data-default={defaultValue}>{children}</div>;
}
export function TabsList({ children, className="" }:{children:React.ReactNode; className?:string}) {
  return <div className={`inline-grid gap-2 rounded-lg border p-1 ${className}`}>{children}</div>;
}
export function TabsTrigger({ value, children, onSelect }:{value:string; children:React.ReactNode; onSelect?:(v:string)=>void}) {
  const [active, setActive] = useState(false);
  return (
    <button
      onClick={() => { setActive(true); onSelect?.(value); }}
      className={`px-3 py-1 rounded-md text-sm ${active ? "bg-black text-white" : "bg-gray-100"}`}
    >
      {children}
    </button>
  );
}
export function TabsContent({ children }:{children:React.ReactNode}) { return <div>{children}</div>; }
