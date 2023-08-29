import AddNewLink from "@/components/add-link";
import { NewLink, RedirectLink } from "@/components/model/link";
import { Input } from "@/components/ui/input";
import { Table } from "@tanstack/react-table";
import { useEffect, useState } from "react";

type AppMenuProps = {
  table: Table<RedirectLink>;
  dialogOpen: boolean;
  setDialogOpen: (state: boolean) => void;
  link?: RedirectLink;
  setLink: (state: RedirectLink | undefined) => void;
  addLink: (newLink: NewLink) => Promise<any>;
  updateLink: (newLink: RedirectLink) => Promise<any>;
};

const AppMenu = ({
  table,
  addLink,
  dialogOpen,
  setDialogOpen,
  link,
  setLink,
  updateLink,
}: AppMenuProps) => {
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
      <AddNewLink
        addLink={addLink}
        dialogOpen={dialogOpen}
        setDialogOpen={setDialogOpen}
        link={link}
        setLink={setLink}
        updateLink={updateLink}
      />
    </div>
  );
};

export default AppMenu;
