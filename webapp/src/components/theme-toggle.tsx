import { useEffect, useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Moon, Sun } from "lucide-react";

const ThemeToggle = () => {
  const [theme, setTheme] = useState<string>();

  useEffect(() => {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }, []);

  useEffect(() => {
    console.log("Switching theme");
    if (theme == "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const toggleMode = () => {
    if (theme === "dark") {
      localStorage.theme = "light";
      setTheme("light");
    } else {
      localStorage.theme = "dark";
      setTheme("dark");
    }
  };

  return (
    <div className="flex flex-row items-center gap-2">
      <Sun />
      <Switch onClick={toggleMode} checked={theme == "dark"} />
      <Moon />
    </div>
  );
};

export default ThemeToggle;
