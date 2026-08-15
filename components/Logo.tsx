import { BuildingIcon } from "./icons";

export default function Logo({ size = "md" }: { size?: "sm" | "md" }) {
  const box = size === "sm" ? "h-8 w-8 rounded-[9px]" : "h-9 w-9 rounded-[10px]";
  const icon = size === "sm" ? "h-4 w-4" : "h-5 w-5";
  return (
    <span className="inline-flex items-center gap-2.5">
      <span
        className={`${box} inline-flex items-center justify-center bg-primary text-white shadow-sm`}
      >
        <BuildingIcon className={icon} />
      </span>
      <span className="text-[17px] font-bold tracking-tight text-gray-900">
        CivicConnect
      </span>
    </span>
  );
}
