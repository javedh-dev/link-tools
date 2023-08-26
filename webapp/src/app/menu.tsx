import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlusCircle } from "lucide-react";

const AppMenu = () => {
  return (
    <div className=" flex flex-row w-5/6 gap-8">
      <Input
        className="flex-grow"
        placeholder="Start typing to filter the urls..."
      />
      <Button variant="secondary" className="text-lg gap-2">
        <PlusCircle size={18} /> Add
      </Button>
    </div>
  );
};

export default AppMenu;
