"use client";

import * as React from "react";
import { LifeBuoy } from "lucide-react";

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
import { usePostStore } from "@/stores/post";
import { api } from "@/trpc/react";

const data = {
  navSecondary: [
    {
      title: "联系我们",
      url: "https://github.com/hardcodeNow",
      icon: LifeBuoy,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { posts, setPosts } = usePostStore();
// todo useeffect
  const postsRes = api.post.list.useQuery();
  if (postsRes.data) {
    setPosts(postsRes.data);
  }
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
        <NavPosts posts={posts} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter className="pb-0">
        <NavAction />
      </SidebarFooter>
    </Sidebar>
  );
}
