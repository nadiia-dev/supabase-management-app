"use client";

import FormsSkeleton from "@/components/layout/forms-skeleton";
import ProductForm from "@/components/products/product-form";
import { useProducts } from "@/context/products-context";
import { useParams } from "next/navigation";

const Page = () => {
  const params = useParams();
  const id = params.id! as string;

  const { useGetProduct } = useProducts();
  const { data: product, isLoading } = useGetProduct(id);

  if (isLoading) return <FormsSkeleton />;

  return <ProductForm formMode="edit" product={product} />;
};

export default Page;
