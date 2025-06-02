"use client";

import { ProductsProvider } from "@/context/products-context";

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <ProductsProvider>{children}</ProductsProvider>;
};

export default layout;
