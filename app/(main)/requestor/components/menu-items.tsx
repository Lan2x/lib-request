"use client";

import {
  Home,
  Ticket,
  User,
  BusFront,
  Users,
  AreaChart,
  Building,
  Square,
  HomeIcon,
  TicketIcon,
  Building2,
  LayoutDashboardIcon,
  ClipboardListIcon,
  UserCheckIcon,
  SendIcon,
} from "lucide-react";

interface MenuItems {
  id: number;
  label: string;
  icon: React.ElementType;
  link: string;
}

export const menuItems: MenuItems[] = [
  {
    id: 2,
    label: "Requests",
    icon: SendIcon,
    link: "/requestor/request",
  },
  {
    id: 6,
    label: "Profile",
    icon: User,
    link: "/super-admin/profile",
  },
];
