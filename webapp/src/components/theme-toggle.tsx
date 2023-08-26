import { useEffect, useState } from "react";
import { Switch } from "@/components/ui/switch";

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
    <div className="mt-5">
      <Switch onClick={toggleMode} />
    </div>
  );
};

export default ThemeToggle;
