import { Skeleton } from "@/components/ui/skeleton";

const DashboardSkeleton = () => {
  return (
    <div className="flex flex-col md:flex-row gap-6">
      <Skeleton className="h-[125px] w-full rounded-xl" />
      <Skeleton className="h-[100px] w-full rounded-xl" />
    </div>
  );
};

export default DashboardSkeleton;
