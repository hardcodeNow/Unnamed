"use client";

import { AppSidebar } from "@/components/app-sidebar";
import { AudioPlayer } from "@/components/player";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SidebarProvider>
        <AppSidebar style={{ height: "calc(100% - 70px)" }} />
        <SidebarInset>{children}</SidebarInset>
      </SidebarProvider>
      <AudioPlayer />
    </>
  );
}
