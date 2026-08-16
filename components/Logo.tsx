export default function Logo({ size = "md" }: { size?: "sm" | "md" }) {
  return (
    <span className="inline-flex items-center gap-2.5">
      <span className="text-[17px] font-bold tracking-tight text-gray-900">
        CivicConnect
      </span>
    </span>
  );
}
