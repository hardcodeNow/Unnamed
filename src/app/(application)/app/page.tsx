"use client";

import { AppSidebar } from "@/components/app-sidebar";
import PersonalCard from "@/components/personal-card";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Mic, Sparkles } from "lucide-react";
import { useState } from "react";

export default function Page() {
  const [tab, setTab] = useState("card");

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center justify-between gap-2">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">张博面试介绍</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>生成总结</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="flex items-center gap-2 px-4">
            <Tabs value={tab} onValueChange={(e) => setTab(e)}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="outline">大纲</TabsTrigger>
                <TabsTrigger value="card">AI 卡片</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </header>
        {tab === "outline" && (
          <div className="relative m-4 mt-0 flex-1 rounded-xl bg-zinc-50 p-4">
            原文
            <div className="absolute bottom-4 left-0 right-0 flex w-full items-center justify-center gap-2">
              <Button variant="outline" className="rounded-full">
                <Mic />
                录制
              </Button>
              <Button className="rounded-full">
                <Sparkles />
                生成
              </Button>
            </div>
          </div>
        )}
        {tab === "card" && (
          <div className="m-4 mt-0 flex flex-1 flex-col items-center justify-center rounded-xl bg-zinc-50 pt-0">
            {/* <HackathonCard /> */}
            <PersonalCard />
          </div>
        )}
      </SidebarInset>
    </SidebarProvider>
  );
}
