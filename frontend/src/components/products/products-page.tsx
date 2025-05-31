"use client";
import { FilterProvider } from "@/context/filters-context";
import ProductsTable from "./products-table";

const ProductsPage = () => {
  return (
    <FilterProvider>
      <ProductsTable />
    </FilterProvider>
  );
};

export default ProductsPage;
