import ThemeToggle from "@/components/theme-toggle";

const AppHeader = () => {
  return (
    <div className="w-full flex flex-row justify-center mb-8 bg-zinc-100 dark:bg-zinc-900 ">
      <div className="w-5/6 h-16 flex flex-row items-center px-5 align-middle">
        <h2 className="flex-grow text-3xl">
          <span className="text-rose-600">LINK</span>-TOOLS
        </h2>
        <ThemeToggle />
      </div>
    </div>
  );
};

export default AppHeader;
