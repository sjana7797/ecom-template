"use client";

import * as React from "react";
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  DollarSign,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  ShoppingCart,
  SquareTerminal,
  User,
} from "lucide-react";

import { NavMain } from "~/components/nav-main";
import { NavProjects } from "~/components/nav-projects";
import { NavUser } from "~/components/nav-user";
import { TeamSwitcher } from "~/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@repo/ui/components/sidebar";

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
  ],
  navMain: [
    {
      title: "Users",
      url: "#",
      icon: User,
      isActive: true,
      items: [
        {
          title: "Add",
          url: "/user/add",
        },
        {
          title: "All",
          url: "/user/all",
        },
      ],
    },
    {
      title: "Products",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Add",
          url: "/product/add",
        },
        {
          title: "All",
          url: "/product/all",
        },
      ],
    },
    {
      title: "Brands",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Add",
          url: "/brand/add",
        },
        {
          title: "All",
          url: "/brand/all",
        },
      ],
    },
    {
      title: "Categories",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Add",
          url: "/category/add",
        },
        {
          title: "All",
          url: "/category/all",
        },
      ],
    },
    {
      title: "Orders",
      url: "#",
      icon: ShoppingCart,
      items: [
        {
          title: "All",
          url: "/order/all",
        },
      ],
    },
    {
      title: "Transactions",
      url: "#",
      icon: DollarSign,
      items: [
        {
          title: "All",
          url: "/transaction/all",
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
