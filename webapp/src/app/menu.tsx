import AddNewLink from "@/components/add-link";
import { NewLink, RedirectLink } from "@/components/model/link";
import { Input } from "@/components/ui/input";
import { Table } from "@tanstack/react-table";
import { useEffect, useState } from "react";

type AppMenuProps = {
  table: Table<RedirectLink>;
  addLink: (newLink: NewLink) => Promise<any>;
};

const AppMenu = ({ table, addLink }: AppMenuProps) => {
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
      <AddNewLink addLink={addLink} />
    </div>
  );
};

export default AppMenu;
