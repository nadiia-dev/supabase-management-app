"use client";

import ProductForm from "@/components/products/product-form";
import { useProducts } from "@/context/products-context";
import { useParams } from "next/navigation";

const Page = () => {
  const params = useParams();
  const id = params.id! as string;

  const { useGetProduct } = useProducts();
  const { data: product, isLoading } = useGetProduct(id);

  if (isLoading) return <p>Loading...</p>;

  return <ProductForm formMode="edit" product={product?.data} />;
};

export default Page;
