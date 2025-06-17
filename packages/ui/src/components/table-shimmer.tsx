"use client";

import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./table";

interface ShimmerTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  rows: number;
}

export default function TableShimmer<TData, TValue>({
  columns,
  rows,
}: ShimmerTableProps<TData, TValue>) {
  const table = useReactTable({
    data: [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <div className="w-full">
      <Table>
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
                          header.getContext(),
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {Array.from({ length: rows }).map((_, index) =>
            table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
              >
                {headerGroup.headers.map((header) => {
                  return (
                    <TableCell key={header.id}>
                      <div className="h-4 w-full animate-pulse rounded bg-gray-200" />
                    </TableCell>
                  );
                })}
              </TableRow>
            )),
          )}
        </TableBody>
      </Table>

      {/* Navigation buttons shimmer */}
      <div className="mt-4 flex justify-end gap-2">
        <div className="h-8 w-8 animate-pulse rounded bg-gray-200" />
        <div className="h-8 w-8 animate-pulse rounded bg-gray-200" />
      </div>
    </div>
  );
}
