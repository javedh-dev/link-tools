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
import { useRedirectLinks } from "@/hooks/useRedirectLinks";
import { Link } from "react-router-dom";

type RowActionProps = {
  row: Row<RedirectLink>;
  setLink: (link: RedirectLink) => void;
  setDialogOpen: (state: boolean) => void;
  deleteLink: (id: string) => Promise<any>;
};

const RowAction = ({
  row,
  deleteLink,
  setLink,
  setDialogOpen,
}: RowActionProps) => {
  return (
    <div className=" flex flex-row gap-4 justify-end">
      <Button
        variant={"ghost"}
        size={"icon"}
        className="text-slate-400 hover:text-emerald-600"
        onClick={() => {
          setLink({
            id: row.getValue("id"),
            enabled: row.getValue("enabled"),
            slug: row.getValue("slug"),
            url: row.getValue("url"),
          });
          setDialogOpen(true);
        }}
      >
        <LucideEdit size={18} />
      </Button>
      <Button
        variant={"ghost"}
        size={"icon"}
        className="text-slate-400 hover:text-rose-600"
        onClick={() => {
          deleteLink(row.getValue("id"));
        }}
      >
        <Trash2 size={18} />
      </Button>
    </div>
  );
};

const LinkTable = () => {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [link, setLink] = useState<RedirectLink | undefined>();
  const { loading, data, addLink, deleteLink, updateLink } = useRedirectLinks();

  useEffect(() => {
    console.log("Data is updated", data);
  }, [data]);

  const toggleEnable = (row: Row<RedirectLink>) => {
    updateLink({
      id: row.getValue("id"),
      enabled: !row.getValue("enabled"),
      slug: row.getValue("slug"),
      url: row.getValue("url"),
    });
  };

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
      cell: ({ row }) => {
        return (
          <Link
            to={row.getValue("url")}
            replace
            className="text-lime-700 underline underline-offset-4"
          >
            {row.getValue("url")}
          </Link>
        );
      },
    },
    {
      id: "enabled",
      accessorKey: "enabled",
      header: "Enabled",
      cell: ({ row }) => {
        return (
          <div>
            <Switch
              checked={row.getValue("enabled")}
              onClick={() => toggleEnable(row)}
            />
          </div>
        );
      },
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        return (
          <RowAction
            row={row}
            deleteLink={deleteLink}
            setLink={setLink}
            setDialogOpen={setDialogOpen}
          />
        );
      },
    },
  ];
  const table = useReactTable<RedirectLink>({
    data: useMemo(() => {
      console.log("Updated Data rerendering");
      return data ? data : [];
    }, [data]),
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
      <AppMenu
        table={table}
        addLink={addLink}
        dialogOpen={dialogOpen}
        setDialogOpen={setDialogOpen}
        link={link}
        setLink={setLink}
        updateLink={updateLink}
      />
      <div className="rounded-b-md border lg:w-5/6 w-11/12">
        <Table className=" text-lg">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className="bg-secondary hover:bg-secondary"
              >
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="">
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
                  {loading ? (
                    <p className="flex flex-row items-center justify-center gap-2">
                      Loading...
                    </p>
                  ) : (
                    <p className="flex flex-row items-center justify-center gap-2">
                      Click on
                      <span className="flex flex-row items-center gap-2 rounded px-2 py-1 border">
                        <PlusCircle size={18} /> New
                      </span>{" "}
                      to add new link redirection.
                    </p>
                  )}
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
