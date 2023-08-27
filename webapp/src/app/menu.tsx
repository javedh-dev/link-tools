import AddNewLink from "@/components/add-link";
import { RedirectLink } from "@/components/model/link";
import { Input } from "@/components/ui/input";
import { Table } from "@tanstack/react-table";
import { useEffect, useState } from "react";

type AppMenuProps = {
  table: Table<RedirectLink>;
};

const AppMenu = ({ table }: AppMenuProps) => {
  const [filterValue, setFilterValue] = useState(
    (table.getColumn("slug")?.getFilterValue() as string) ?? ""
  );

  useEffect(() => {
    table.getColumn("slug")?.setFilterValue(filterValue);
  }, [filterValue]);

  return (
    <div className=" flex flex-row w-5/6 gap-8 justify-between">
      <Input
        className="max-w-sm"
        placeholder="Start typing to filter the urls..."
        value={filterValue}
        onChange={(event) => setFilterValue(event.target.value)}
      />
      <AddNewLink />
    </div>
  );
};

export default AppMenu;
