import React from "react";
export function Select({ defaultValue, children }:{defaultValue?:string; children:React.ReactNode}) { return <div data-value={defaultValue}>{children}</div>; }
export function SelectTrigger({ className="", children }:{className?:string; children:React.ReactNode}) { return <div className={`border rounded-lg px-3 py-2 text-sm ${className}`}>{children}</div>; }
export function SelectContent({ children }:{children:React.ReactNode}) { return <div className="hidden">{children}</div>; }
export function SelectValue(){ return <span />; }
export function SelectItem({ value, children }:{value:string; children:React.ReactNode}) { return <div data-value={value}>{children}</div>; }
