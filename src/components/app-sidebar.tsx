"use client";

import * as React from "react";
import {
  BookOpen,
  Bot,
  LifeBuoy,
  Settings2,
  SquareTerminal,
} from "lucide-react";

import Logo from "@/assets/logo.png";

import { NavPosts } from "@/components/nav-posts";
import { NavSecondary } from "@/components/nav-secondary";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Image from "next/image";
import { NavAction } from "./nav-action";

const data = {
  navSecondary: [
    {
      title: "联系我们",
      url: "https://github.com/hardcodeNow",
      icon: LifeBuoy,
    },
  ],
  posts: [
    {
      name: "黑客松项目组一",
      url: "#",
    },
    {
      name: "投资人 - 张三对话",
      url: "#",
    },
    {
      name: "张博面试介绍",
      url: "#",
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="https://github.com/hardcodeNow" target="_blank">
                <div className="flex aspect-square size-9 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <Image src={Logo} alt="Logo" />
                </div>
                <div className="grid flex-1 gap-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">VoicePad</span>
                  <span className="truncate text-xs">
                    由 Hardcode Team 创作
                  </span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavPosts posts={data.posts} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter className="pb-0">
        <NavAction />
      </SidebarFooter>
    </Sidebar>
  );
}
