import { RedirectLink } from "@/components/model/link";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { PlusCircle } from "lucide-react";

const LinkTable = () => {
  const columns: ColumnDef<RedirectLink>[] = [
    {
      accessorKey: "id",
      header: "ID",
    },
    {
      accessorKey: "slug",
      header: "Slug",
    },
    {
      accessorKey: "url",
      header: "Redirect Url",
    },
    {
      accessorKey: "enabled",
      header: "Enabled",
    },
  ];
  const table = useReactTable<RedirectLink>({
    data: [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="rounded-md border w-5/6">
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
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                <p className="flex flex-row items-center justify-center gap-2">
                  Click on
                  <span className="flex flex-row items-center gap-2 rounded px-2 py-1 border">
                    <PlusCircle size={18} /> Add{" "}
                  </span>{" "}
                  to add new link redirection.
                </p>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default LinkTable;
