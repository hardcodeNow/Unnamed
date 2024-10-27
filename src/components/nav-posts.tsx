"use client";

import { FileText, MoreHorizontal, Share, Trash2 } from "lucide-react";

import { QRCodeSVG } from "qrcode.react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { type Post } from "@/types/post";
import Link from "next/link";
import { api } from "@/trpc/react";
import { toast } from "sonner";
import { Dialog, DialogClose, DialogContent } from "./ui/dialog";
import { useState } from "react";

export function NavPosts({ posts = [] }: { posts: Post[] }) {
  const { isMobile } = useSidebar();

  const utils = api.useUtils();

  const deleteMutation = api.post.delete.useMutation({
    onSuccess: async () => {
      await utils.post.list.invalidate();
      toast.success("移除成功");
    },
    onError: (error) => {
      toast.error(`移除失败: ${error.message}`);
    },
  });

  const handleDelete = (id: number) => {
    deleteMutation.mutate(id);
  };

  const [showQrcode, setShowQrcode] = useState<boolean>(false);
  const [url, setUrl] = useState<string>("");

  return (
    <>
      <SidebarGroup className="group-data-[collapsible=icon]:hidden">
        <SidebarGroupLabel className="my-1">文档列表</SidebarGroupLabel>
        <SidebarMenu>
          {posts.map((item) => (
            <SidebarMenuItem key={item.id}>
              <SidebarMenuButton asChild>
                <Link
                  href={{
                    pathname: `/app/post/${item.id}`,
                  }}
                >
                  <FileText />
                  <div className="flex flex-col">
                    <span className={"line-clamp-1"}>{item.name}</span>
                  </div>
                </Link>
              </SidebarMenuButton>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuAction showOnHover>
                    <MoreHorizontal />
                    <span className="sr-only">More</span>
                  </SidebarMenuAction>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-48"
                  side={isMobile ? "bottom" : "right"}
                  align={isMobile ? "end" : "start"}
                >
                  <DropdownMenuItem
                    onClick={() => {
                      setUrl("https://dev.airbozh.cn/app/post/" + item.id);
                      setShowQrcode(true);
                    }}
                  >
                    <Share className="text-muted-foreground" />
                    <span>分享</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleDelete(item.id)}>
                    <Trash2 className="text-muted-foreground" />
                    <span>移除文章</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroup>
      <Dialog open={showQrcode} onOpenChange={setShowQrcode}>
        <DialogContent className="flex h-[300px] w-[300px] items-center justify-center">
          <QRCodeSVG width="100%" height="100%" value={url} />,
        </DialogContent>
      </Dialog>
    </>
  );
}
