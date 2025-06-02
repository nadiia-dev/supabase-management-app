import {
  createProductAction,
  getProductAction,
  updateProductAction,
} from "@/actions/products";
import { Product } from "@/types/product";
import { Result } from "@/types/result";
import {
  useQueryClient,
  useMutation,
  UseMutationResult,
  useQuery,
} from "@tanstack/react-query";
import { createContext, ReactNode, use } from "react";

type ProductsContextType = {
  useGetProduct: (id: string) => ReturnType<typeof useQuery<Result>>;
  createProduct: UseMutationResult<Result, Error, Product, unknown>;
  updateProduct: UseMutationResult<
    Result,
    Error,
    { id: string; data: Product },
    unknown
  >;
  //   changeStatus: ReturnType<typeof useMutation>;
};

const ProductsContext = createContext<ProductsContextType | undefined>(
  undefined
);

export const ProductsProvider = ({ children }: { children: ReactNode }) => {
  const queryClient = useQueryClient();

  const useGetProduct = (id: string) => {
    return useQuery({
      queryKey: ["getProduct", id],
      queryFn: () => getProductAction(id),
      enabled: !!id,
    });
  };

  const createProduct = useMutation({
    mutationFn: createProductAction,
  });

  const updateProduct = useMutation({
    mutationFn: updateProductAction,
  });

  //   const changeStatus = async (id: string, status: "active" | "deleted") => {
  //     // await updateProduct(id, { status });
  //   };

  return (
    <ProductsContext
      value={{
        useGetProduct,
        createProduct,
        updateProduct,
        // changeStatus,
      }}
    >
      {children}
    </ProductsContext>
  );
};

export const useProducts = () => {
  const context = use(ProductsContext);
  if (!context) {
    throw new Error("useProducts must be used within a ProductsProvider");
  }
  return context;
};
