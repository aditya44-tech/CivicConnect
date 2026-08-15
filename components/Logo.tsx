import { FlagIcon } from "./icons";

export default function Logo({ size = "md" }: { size?: "sm" | "md" }) {
  const box = size === "sm" ? "h-8 w-8 rounded-xl" : "h-9 w-9 rounded-xl";
  const icon = size === "sm" ? "h-4 w-4" : "h-5 w-5";
  return (
    <span className="inline-flex items-center gap-2.5">
      <span
        className={`${box} inline-flex items-center justify-center bg-gradient-to-br from-primary to-primary-dark text-white shadow-md shadow-primary/30`}
      >
        <FlagIcon className={icon} />
      </span>
      <span className="text-lg font-bold tracking-tight text-gray-900">
        CivicConnect
      </span>
    </span>
  );
}
