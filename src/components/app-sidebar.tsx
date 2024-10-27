"use client";

import * as React from "react";

import Logo from "@/assets/logo.png";

import { NavPosts } from "@/components/nav-posts";
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
import { useEffect } from "react";
import { type Post } from "@/types/post";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { posts, setPosts } = usePostStore();
  const { data: listData } = api.post.list.useQuery();

  useEffect(() => {
    setPosts(listData as unknown as Post[]);
  }, [listData, setPosts]);

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
                  <span className="truncate font-semibold">Voice2Note</span>
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
      </SidebarContent>
      <SidebarFooter>
        <NavAction />
      </SidebarFooter>
    </Sidebar>
  );
}
