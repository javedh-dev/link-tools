import AppHeader from "./header";
import LinkTable from "./link-table";
import AppMenu from "./menu";

const App = () => {
  return (
    <div className="app flex flex-col gap-5 items-center">
      <AppHeader />
      <AppMenu />
      <LinkTable />
    </div>
  );
};

export default App;
