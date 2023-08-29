import { useRedirectLinks } from "@/hooks/useRedirectLinks";
import AppHeader from "./header";
import LinkTable from "./link-table";

const App = () => {
  return (
    <div className="app flex flex-col gap-5 items-center">
      <AppHeader />
      <LinkTable />
    </div>
  );
};

export default App;
