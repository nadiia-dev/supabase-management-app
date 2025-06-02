"use client";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useProducts } from "@/context/products-context";
import { useTeam } from "@/hooks/use-team";
import { Product } from "@/types/product";
import {
  useReactTable,
  ColumnDef,
  flexRender,
  getCoreRowModel,
} from "@tanstack/react-table";
import { Pencil, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import PaginationControl from "./pagination-control";
import { useState } from "react";
import Filters from "./filters";
import { useFilterContext } from "@/context/filters-context";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";

const ProductsTable = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const { columnFilters } = useFilterContext();
  const limit = 5;
  const offset = (currentPage - 1) * limit;
  const { data: team } = useTeam();
  const { useGetProducts, changeStatus } = useProducts();

  const { data } = useGetProducts(
    team?.data.team?.id ?? "",
    offset,
    limit,
    columnFilters
  );
  const productsData = data?.data;
  const totalCount = productsData ? productsData.length : 1;
  const totalPages = Math.ceil(totalCount / limit);
  const router = useRouter();

  const handleDelete = (id: string) => {
    changeStatus.mutate({ id: id, status: "deleted" });
  };

  const columns: ColumnDef<Product>[] = [
    {
      accessorKey: "image",
      header: "Image",
      cell: ({ row }) => {
        return (
          <Avatar className="h-8 w-8 rounded-lg">
            <AvatarImage
              src={row.getValue("image")}
              alt={row.getValue("title")}
            />
          </Avatar>
        );
      },
    },
    {
      accessorKey: "title",
      header: "Title",
    },
    {
      accessorKey: "description",
      header: "Description",
    },
    {
      accessorKey: "status",
      header: "Status",
    },
    {
      accessorKey: "author_name",
      header: "Author",
    },
    {
      accessorKey: "created_at",
      header: "Created at",
      cell: ({ row }) => {
        const created_at = new Date(row.getValue("created_at"));
        const formatted = created_at.toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        });

        return formatted;
      },
    },
    {
      accessorKey: "actions",
      header: () => <div className="text-center">Actions</div>,
      cell: ({ row }) => {
        const id = row.original.id;
        const status = row.getValue("status");
        return (
          <div className="flex justify-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => router.push(`/products/${id}/edit`)}
              disabled={status !== "draft"}
            >
              <Pencil className="h-4 w-4" />
            </Button>

            <Button
              variant="destructive"
              size="icon"
              onClick={() => handleDelete(id!)}
              disabled={status === "deleted"}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        );
      },
    },
  ];
  const products = productsData ?? [];

  const table = useReactTable({
    data: products,
    columns,
    manualPagination: true,
    pageCount: totalPages,
    getCoreRowModel: getCoreRowModel(),
    state: {
      columnFilters,
    },
  });

  return (
    <div className="m-2 md:grid md:grid-cols-[300px_1fr] md:gap-4">
      <Filters />
      <div>
        <div className="rounded-md border p-2">
          <Table>
            <TableCaption>A list of your products.</TableCaption>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className="flex items-center justify-end space-x-2 py-4">
          <div className="flex-1 text-sm text-muted-foreground">
            {table.getFilteredSelectedRowModel().rows.length
              ? `${table.getFilteredSelectedRowModel().rows.length} of{" "}`
              : null}
            {table.getFilteredRowModel().rows.length} row(s)
          </div>
          <div className="flex items-center justify-end space-x-2 py-4">
            <PaginationControl
              curPage={currentPage}
              total={totalPages}
              onPageChange={(pageNumber) => setCurrentPage(pageNumber)}
              showPrevNext
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsTable;
