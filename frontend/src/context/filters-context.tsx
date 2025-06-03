import { ColumnFiltersState } from "@tanstack/react-table";
import { createContext, use, useState } from "react";

const FilterContext = createContext<{
  columnFilters: ColumnFiltersState;
  setFilterValue: <T>(id: string, value: T) => void;
}>({ columnFilters: [], setFilterValue: () => {} });

export const useFilterContext = () => use(FilterContext);

export const FilterProvider = ({ children }: { children: React.ReactNode }) => {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const setFilterValue = <T,>(id: string, value: T) => {
    setColumnFilters((prev) => {
      const existing = prev.find((f) => f.id === id);
      if (existing) {
        return prev.map((f) => (f.id === id ? { ...f, value } : f));
      }
      return [...prev, { id, value }];
    });
  };

  return (
    <FilterContext value={{ columnFilters, setFilterValue }}>
      {children}
    </FilterContext>
  );
};
