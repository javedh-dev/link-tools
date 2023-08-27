import { RedirectLink } from "@/components/model/link";
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
  ColumnFiltersState,
  Row,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { LucideEdit, PlusCircle, Trash2 } from "lucide-react";
import AppMenu from "./menu";
import { useEffect, useMemo, useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";

type LinkTableProps = {};

const RowAction = ({ row }: { row: Row<RedirectLink> }) => {
  useEffect(() => {
    console.count("Component Rendered ");
  }, []);
  return (
    <div className=" flex flex-row gap-4 justify-end">
      <Button
        variant={"ghost"}
        size={"icon"}
        className="text-slate-400 hover:text-emerald-600"
      >
        <LucideEdit size={18} />
      </Button>
      <Button
        variant={"ghost"}
        size={"icon"}
        className="text-slate-400 hover:text-rose-600"
      >
        <Trash2 size={18} />
      </Button>
    </div>
  );
};

const LinkTable = ({}: LinkTableProps) => {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const columns: ColumnDef<RedirectLink>[] = [
    {
      id: "id",
      accessorKey: "id",
      header: "ID",
    },
    {
      id: "slug",
      accessorKey: "slug",
      header: "Slug",
    },
    {
      id: "url",
      accessorKey: "url",
      header: "Redirect Url",
    },
    {
      id: "enabled",
      accessorKey: "enabled",
      header: "Enabled",
      cell: ({ row }) => {
        return (
          <div>
            <Switch checked={row.getValue("enabled")} onClick={() => {}} />
          </div>
        );
      },
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        return <RowAction row={row} />;
      },
    },
  ];
  const table = useReactTable<RedirectLink>({
    data: useMemo(
      () => [
        {
          id: 1,
          slug: "test-1",
          url: "https://test.com",
          enabled: true,
        },
        {
          id: 2,
          slug: "test-2",
          url: "https://test.com",
          enabled: true,
        },
      ],
      []
    ),
    columns,
    getCoreRowModel: getCoreRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      columnFilters,
    },
  });

  return (
    <>
      <AppMenu table={table} />
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
                <TableRow key={row.index}>
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
                  <p className="flex flex-row items-center justify-center gap-2">
                    Click on
                    <span className="flex flex-row items-center gap-2 rounded px-2 py-1 border">
                      <PlusCircle size={18} /> New
                    </span>{" "}
                    to add new link redirection.
                  </p>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default LinkTable;
