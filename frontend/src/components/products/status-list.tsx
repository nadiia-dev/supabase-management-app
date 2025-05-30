import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { useFilterContext } from "@/context/filters-context";

const StatusList = ({ id }: { id: string }) => {
  const { columnFilters, setFilterValue } = useFilterContext();
  const statusFilter = columnFilters.find((filter) => filter.id === id);

  const selectedStatuses = Array.isArray(statusFilter?.value)
    ? statusFilter.value
    : [];

  const toggleStatus = (status: string) => {
    const newStatus = selectedStatuses[0] === status ? null : status;

    setFilterValue("status", newStatus ? [newStatus] : []);
  };

  const statuses = ["draft", "active", "deleted"];
  return (
    <div>
      {statuses.map((status) => (
        <div className="flex items-center gap-3 not-last:mb-3" key={status}>
          <Checkbox
            id={status}
            className="w-4 h-4"
            checked={selectedStatuses.includes(status)}
            onCheckedChange={() => toggleStatus(status)}
          />
          <Label htmlFor={status} className="text-md">
            {status}
          </Label>
        </div>
      ))}
    </div>
  );
};

export default StatusList;
