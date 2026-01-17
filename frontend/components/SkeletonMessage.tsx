export default function SkeletonMessage() {
  return (
    <div className="max-w-[92%] rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
      <div className="h-3 w-40 bg-zinc-200/80 rounded animate-pulse" />
      <div className="mt-3 space-y-2">
        <div className="h-3 w-full bg-zinc-200/80 rounded animate-pulse" />
        <div className="h-3 w-5/6 bg-zinc-200/80 rounded animate-pulse" />
        <div className="h-3 w-2/3 bg-zinc-200/80 rounded animate-pulse" />
      </div>
    </div>
  );
}
