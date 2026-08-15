import type { HTMLAttributes } from "react";

export default function SectionLabel({ 
  className = "", 
  children,
  ...rest 
}: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={`block text-[10px] font-bold uppercase tracking-[0.15em] text-gray-500 ${className}`}
      {...rest}
    >
      {children}
    </span>
  );
}
