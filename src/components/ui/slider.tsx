import React from "react";
export function Slider({ defaultValue=[50], min=0, max=100, step=1, className="", onChange }:{
  defaultValue?: number[]; min?: number; max?: number; step?: number; className?:string; onChange?:(v:number)=>void
}) {
  const [v, setV] = React.useState(defaultValue[0] ?? min);
  return (
    <input
      type="range" value={v} min={min} max={max} step={step}
      onChange={(e)=>{ const val = Number(e.target.value); setV(val); onChange?.(val); }}
      className={`w-full ${className}`}
    />
  );
}
