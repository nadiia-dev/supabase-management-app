import { Skeleton } from "../ui/skeleton";

const FormsSkeleton = () => {
  return (
    <div className="flex flex-col gap-6">
      <Skeleton className="h-[40px] w-full rounded-xl" />
      <Skeleton className="h-[40px] w-full rounded-xl" />
      <Skeleton className="h-[80px] w-20 rounded-xl" />
    </div>
  );
};

export default FormsSkeleton;
