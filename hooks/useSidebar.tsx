import { useState, useEffect } from "react";

export function useSidebar() {
  const [toggleCollapse, setToggleCollapse] = useState(false);
  const [isCollapsible, setIsCollapsible] = useState(false);

  const handleSidebarToggle = () => {
    setToggleCollapse(!toggleCollapse);
  };

  useEffect(() => {
    // This function will be called when the hook is mounted and updated.
  }, [toggleCollapse, isCollapsible]); // This array of dependencies tells React when to re-run the effect.

  return {
    toggleCollapse,
    isCollapsible,
    handleSidebarToggle,
  };
}
