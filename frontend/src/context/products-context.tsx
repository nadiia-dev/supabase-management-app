import {
  changeProductStatusAction,
  createProductAction,
  getProductAction,
  getTeamProducts,
  updateProductAction,
} from "@/actions/products";
import { Product } from "@/types/product";
import { Result } from "@/types/result";
import {
  useMutation,
  UseMutationResult,
  useQuery,
} from "@tanstack/react-query";
import { ColumnFiltersState } from "@tanstack/react-table";
import { format } from "date-fns";
import { createContext, ReactNode, use } from "react";
import { DateRange } from "react-day-picker";
import { toast } from "sonner";

type FilterValue<T> = {
  id: string;
  value: T;
};

type ProductsContextType = {
  useGetProducts: (
    team_id: string,
    offset: number,
    limit: number,
    columnFilters?: ColumnFiltersState,
    searhc?: string
  ) => ReturnType<typeof useQuery<Result>>;
  useGetProduct: (id: string) => ReturnType<typeof useQuery<Product>>;
  createProduct: UseMutationResult<Product, Error, Product, unknown>;
  updateProduct: UseMutationResult<
    Product,
    Error,
    { id: string; data: Partial<Product> },
    unknown
  >;
  changeStatus: UseMutationResult<
    Product,
    Error,
    { id: string; status: string },
    unknown
  >;
};

const ProductsContext = createContext<ProductsContextType | undefined>(
  undefined
);

export const ProductsProvider = ({ children }: { children: ReactNode }) => {
  const useGetProducts = (
    team_id: string,
    offset: number,
    limit: number,
    columnFilters?: ColumnFiltersState,
    search?: string
  ) => {
    const status = columnFilters?.find((filter) => filter.id === "status") as
      | FilterValue<string>
      | undefined;

    const author = columnFilters?.find((filter) => filter.id === "author") as
      | FilterValue<string>
      | undefined;

    const date = columnFilters?.find((filter) => filter.id === "date") as
      | FilterValue<DateRange>
      | undefined;

    const from = date?.value?.from
      ? format(date.value.from, "yyyy-MM-dd HH:mm")
      : "";
    const to = date?.value?.to ? format(date.value.to, "yyyy-MM-dd HH:mm") : "";

    return useQuery({
      queryKey: [
        "getTeamProducts",
        team_id,
        offset,
        limit,
        status?.value,
        author?.value,
        from,
        to,
        search,
      ],
      queryFn: () =>
        getTeamProducts(
          team_id,
          offset,
          limit,
          status?.value,
          author?.value,
          from,
          to,
          search
        ),
      enabled: !!team_id,
    });
  };

  const useGetProduct = (id: string) => {
    return useQuery({
      queryKey: ["getProduct", id],
      queryFn: () => getProductAction(id),
      enabled: !!id,
    });
  };

  const createProduct = useMutation({
    mutationFn: createProductAction,
    onSuccess: (data) => {
      toast.success("Product successfully created!");
    },
    onError: (error: any) => {
      toast.error(error.message || "Something went wrong");
    },
  });

  const updateProduct = useMutation({
    mutationFn: updateProductAction,
    onSuccess: (data) => {
      toast.success("Product successfully updated!");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Something went wrong");
    },
  });

  const changeStatus = useMutation({
    mutationFn: changeProductStatusAction,
    onSuccess: (data) => {
      toast.success("Product status was changed!");
    },
    onError: (error: any) => {
      toast.error(error.message || "Something went wrong");
    },
  });

  return (
    <ProductsContext
      value={{
        useGetProducts,
        useGetProduct,
        createProduct,
        updateProduct,
        changeStatus,
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
