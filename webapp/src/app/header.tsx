import ThemeToggle from "@/components/theme-toggle";

const AppHeader = () => {
  return (
    <div className="w-full  bg-slate-100 dark:bg-slate-900 flex flex-row justify-center">
      <div className="w-5/6 h-16 flex flex-row items-center px-5 align-middle">
        <h2 className="flex-grow text-3xl">
          <span className="text-amber-700">LINK</span>-TOOLS
        </h2>
        <ThemeToggle />
      </div>
    </div>
  );
};

export default AppHeader;
