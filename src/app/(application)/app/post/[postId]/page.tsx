"use client";

import DynamicReactLoader from "@/components/dynamic-react-loader";
import { Loading } from "@/components/loading";
import { NotFound } from "@/components/not-found";
import { ProjectCard } from "@/components/personal-card";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { api } from "@/trpc/react";
import { ProjectData } from "@/types/post";
import { useState } from "react";
import OutlineEditor from "@/components/outline-editor";
import AudioPlayer from "@/components/player";

export default function Page({ params }: { params: { postId: string } }) {
  const [tab, setTab] = useState("card");
  const {
    data: postData,
    isLoading,
    isSuccess,
  } = api.post.get.useQuery(Number(params.postId), {
    enabled: !!params.postId,
  });

  if (!postData && isSuccess) {
    return <NotFound errorMsg="文档不存在" />;
  }

  if (isLoading || (isSuccess && !postData?.outline)) {
    return <Loading></Loading>;
  }

  return (
    <>
      <header className="flex h-16 shrink-0 items-center justify-between gap-2">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="#">{postData?.name}</BreadcrumbLink>
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
        <div className="relative m-4 mt-0 flex-1 rounded-xl bg-zinc-50 p-0 md:p-4">
          <OutlineEditor />
          {/* <div className="absolute bottom-4 left-0 right-0 flex w-full items-center justify-center gap-2">
            <Button variant="outline" className="rounded-full">
              <Mic />
              录制
            </Button>
            <Button className="rounded-full">
              <Sparkles />
              生成
            </Button>
          </div> */}
        </div>
      )}
      {tab === "card" && (
        <div className="m-0 w-full flex-1 flex-col pt-0">
          <ProjectCard
            card={JSON.parse(postData?.outline ?? "[]") as ProjectData}
            post={postData!}
          />
          <AudioPlayer />
        </div>
      )}
    </>
  );
}
