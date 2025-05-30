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
import { useProducts } from "@/hooks/use-products";
import { useTeam } from "@/hooks/use-team";
import { Product } from "@/types/product";
import {
  useReactTable,
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table";
import { Pencil, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import PaginationControl from "./pagination-control";
import { useState } from "react";

const ProductsTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 5;
  const offset = (currentPage - 1) * limit;
  const { data: team } = useTeam();

  const { data, isLoading } = useProducts(
    team?.data.team?.id ?? "",
    offset,
    limit
  );
  const totalCount = data ? data.length : 1;
  const totalPages = Math.ceil(totalCount / limit);
  const router = useRouter();

  const handleDelete = () => {};

  const columns: ColumnDef<Product>[] = [
    {
      accessorKey: "image",
      header: "Image",
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
        return (
          <div className="flex justify-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => router.push(`/products/${id}/edit`)}
            >
              <Pencil className="h-4 w-4" />
            </Button>
            <Button variant="destructive" size="icon" onClick={handleDelete}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        );
      },
    },
  ];
  const products = data ?? [];

  const table = useReactTable({
    data: products,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="m-2">
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
        <PaginationControl
          curPage={currentPage}
          total={totalPages}
          onPageChange={(pageNumber) => setCurrentPage(pageNumber)}
          showPrevNext
        />
      </div>
    </div>
  );
};

export default ProductsTable;
