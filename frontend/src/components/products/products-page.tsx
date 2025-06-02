"use client";
import { FilterProvider } from "@/context/filters-context";
import ProductsTable from "./products-table";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";

const ProductsPage = () => {
  return (
    <FilterProvider>
      <Button variant="outline">
        <Link href="/products/new">
          <Plus />
        </Link>
      </Button>
      <ProductsTable />
    </FilterProvider>
  );
};

export default ProductsPage;
