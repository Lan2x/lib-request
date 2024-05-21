"use client";

import classNames from "classnames";
import { useEffect, useMemo, useState } from "react";
import Logo from "@/components/icons/logo";
import CollapsIcon from "@/components/icons/collaps-icon";
import { Button } from "./button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSidebar } from "@/hooks/useSidebar";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  FolderSearchIcon,
  ListChecksIcon,
  LogOutIcon,
  NewspaperIcon,
} from "lucide-react";
import { signOut } from "next-auth/react";
import { LogoutAlertModal } from "../modals/logout-alert";

interface MenuItems {
  id: number;
  label: string;
  icon: React.ElementType;
  link: string;
}

interface SidebarProps {
  accountType: string;
  menuItems: MenuItems[];
}

const Sidebar: React.FC<SidebarProps> = ({ accountType, menuItems }) => {
  const router = useRouter();
  const { toggleCollapse, isCollapsible, handleSidebarToggle } = useSidebar();
  const [confirmLogoutModal, setConfirmLogoutModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const pathName = usePathname();

  return (
    <div
      className={cn(
        "h-screen px-4 pt-8 pb-4 bg-light flex justify-start flex-col",
        toggleCollapse ? "w-20" : "w-80"
      )}
    >
      <LogoutAlertModal
        isOpen={confirmLogoutModal}
        onClose={() => {
          setLoading(false);
          setConfirmLogoutModal(false);
        }}
        onConfirm={() => {
          setLoading(false);
          signOut({ callbackUrl: "/" });
        }}
        loading={loading}
      />
      <div className="flex flex-col">
        <div className="flex items-center pb-5 justify-between relative">
          <div
            className="flex items-center pl-1 gap-4 cursor-pointer"
            onClick={() => router.push(`/`)}
          >
            <FolderSearchIcon />
            <span
              className={classNames("text-lg font-medium text-text", {
                hidden: toggleCollapse,
              })}
            >
              <h2 className="text-base text-primary font-bold">
                Library Request Monitoring
              </h2>
              <div className="text-sm text-black">{accountType}</div>
            </span>
          </div>

          <Button
            className={cn(
              "rounded bg-light-lighter absolute right-0 items-center",
              toggleCollapse ? "rotate-180 left-11" : ""
            )}
            variant="ghost"
            size="icon"
            onClick={handleSidebarToggle}
          >
            <CollapsIcon />
          </Button>
        </div>
      </div>

      <div className="mt-4 flex flex-col items-start">
        {menuItems.map(({ id, icon: Icon, ...menu }) => {
          return (
            <div
              key={id}
              className={cn(
                "flex items-center cursor-pointer hover:text-blue-600 rounded w-full overflow-hidden whitespace-nowrap",
                menu.link.startsWith("/treasurer/rent-payments/bus-office") &&
                  pathName.startsWith("/treasurer/rent-payments")
                  ? "bg-gray-200 text-blue-600"
                  : pathName.startsWith(menu.link)
                  ? "bg-gray-200 text-blue-600"
                  : ""
              )}
            >
              <Link href={menu.link}>
                <div className="flex py-4 px-3 items-center w-full h-full">
                  <div style={{ width: "2.5rem" }}>
                    <Icon className="ml-0.5 h-5 w-5" />
                  </div>
                  <span
                    className={classNames(
                      "text-md font-medium text-text-light"
                    )}
                  >
                    {menu.label}
                  </span>
                </div>
              </Link>
            </div>
          );
        })}
        <div
          className={cn(
            "flex items-center cursor-pointer hover:text-blue-600 rounded w-full overflow-hidden whitespace-nowrap"
          )}
        >
          <div className="flex py-4 px-3 items-center w-full h-full">
            <div style={{ width: "2.5rem" }}>
              <LogOutIcon className="h-5 w-5" />
            </div>
            <span
              className={classNames("text-md font-medium text-text-light")}
              onClick={() => {
                setLoading(false);
                setConfirmLogoutModal(true);
              }}
            >
              Logout
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
