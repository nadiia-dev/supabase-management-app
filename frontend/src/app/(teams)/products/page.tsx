"use client";
import ProductsTable from "@/components/products/products-table";
import { FilterProvider } from "@/context/filters-context";

const Page = () => {
  return (
    <FilterProvider>
      <ProductsTable />
    </FilterProvider>
  );
};

export default Page;
